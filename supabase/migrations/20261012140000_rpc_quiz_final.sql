-- RPCs de progresso e quiz final (#130). Dependem de 20261012130000 (tabelas) e de questoes.
-- Regras:
--   - concluir_modulo: marca o módulo como concluído.
--   - iniciar_quiz_final: exige os 6 módulos concluídos; reabre a tentativa em aberto, se houver;
--     senão sorteia 3 perguntas por módulo, sem repetir as da tentativa anterior. Máximo de 2 tentativas.
--   - enviar_quiz_final: corrige no servidor. Aprovado com 13 acertos ou mais (de 18).
-- Nenhuma função devolve resposta_correta.

-- Cria a linha de participante a partir do usuário autenticado, se ainda não existir.
create or replace function public._garantir_participante()
returns void
language plpgsql
security definer
set search_path = public, auth, pg_temp
as $$
declare
  v_uid uuid := auth.uid();
  v_email text;
  v_nome text;
begin
  if v_uid is null then
    raise exception 'nao_autenticado' using errcode = '42501';
  end if;

  if exists (select 1 from public.participantes where user_id = v_uid) then
    return;
  end if;

  select u.email, coalesce(nullif(trim(u.raw_user_meta_data->>'nome'), ''), u.email)
    into v_email, v_nome
  from auth.users u
  where u.id = v_uid;

  insert into public.participantes (user_id, nome, email)
  values (v_uid, coalesce(v_nome, ''), coalesce(v_email, ''))
  on conflict (user_id) do nothing;
end;
$$;

revoke all on function public._garantir_participante() from public, anon, authenticated;

create or replace function public.concluir_modulo(p_modulo smallint)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_uid uuid := auth.uid();
begin
  perform public._garantir_participante();

  if p_modulo is null or p_modulo not between 1 and 6 then
    raise exception 'modulo_invalido' using errcode = '22023';
  end if;

  insert into public.progresso_modulos (user_id, modulo)
  values (v_uid, p_modulo)
  on conflict (user_id, modulo) do nothing;

  return jsonb_build_object('modulo', p_modulo, 'concluido', true);
end;
$$;

create or replace function public.iniciar_quiz_final()
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_uid uuid := auth.uid();
  v_tentativa public.tentativas_quiz_final%rowtype;
  v_numero smallint;
  v_usadas bigint[];
  v_sorteadas bigint[];
  v_ids bigint[] := '{}';
  v_modulo smallint;
  v_perguntas jsonb;
begin
  perform public._garantir_participante();

  -- Trava as linhas do participante: iniciar e enviar não rodam em paralelo para o mesmo usuário.
  perform 1 from public.participantes where user_id = v_uid for update;

  if exists (select 1 from public.tentativas_quiz_final where user_id = v_uid and aprovada) then
    raise exception 'quiz_ja_aprovado';
  end if;

  if (select count(distinct modulo) from public.progresso_modulos where user_id = v_uid) < 6 then
    raise exception 'modulos_pendentes';
  end if;

  select * into v_tentativa
  from public.tentativas_quiz_final
  where user_id = v_uid and enviada_em is null;

  if not found then
    select count(*) + 1 into v_numero
    from public.tentativas_quiz_final
    where user_id = v_uid;

    if v_numero > 2 then
      raise exception 'sem_tentativas';
    end if;

    select coalesce(array_agg(x), '{}') into v_usadas
    from public.tentativas_quiz_final t, unnest(t.perguntas_ids) x
    where t.user_id = v_uid;

    for v_modulo in 1..6 loop
      select coalesce(array_agg(s.id), '{}') into v_sorteadas
      from (
        select q.id
        from public.questoes q
        where q.trilha = 'modulo'
          and q.modulo = v_modulo
          and q.ativa
          and not (q.id = any (v_usadas))
        order by random()
        limit 3
      ) s;

      if cardinality(v_sorteadas) < 3 then
        raise exception 'banco_insuficiente';
      end if;

      v_ids := v_ids || v_sorteadas;
    end loop;

    insert into public.tentativas_quiz_final (user_id, numero, perguntas_ids)
    values (v_uid, v_numero, v_ids)
    returning * into v_tentativa;
  end if;

  select jsonb_agg(
           jsonb_build_object(
             'id', q.id,
             'modulo', q.modulo,
             'enunciado', q.enunciado,
             'alternativas', q.alternativas
           )
           order by array_position(v_tentativa.perguntas_ids, q.id)
         )
    into v_perguntas
  from public.questoes q
  where q.id = any (v_tentativa.perguntas_ids);

  return jsonb_build_object(
    'tentativa_id', v_tentativa.id,
    'numero', v_tentativa.numero,
    'total', 18,
    'nota_minima', 13,
    'perguntas', v_perguntas
  );
end;
$$;

create or replace function public.enviar_quiz_final(p_tentativa_id bigint, p_respostas jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_uid uuid := auth.uid();
  v_tentativa public.tentativas_quiz_final%rowtype;
  v_acertos int;
  v_distintas int;
  v_invalidas int;
  v_aprovada boolean;
begin
  perform public._garantir_participante();

  perform 1 from public.participantes where user_id = v_uid for update;

  select * into v_tentativa
  from public.tentativas_quiz_final
  where id = p_tentativa_id and user_id = v_uid
  for update;

  if not found then
    raise exception 'tentativa_invalida';
  end if;

  if v_tentativa.enviada_em is not null then
    raise exception 'tentativa_ja_enviada';
  end if;

  if jsonb_typeof(p_respostas) <> 'array' or jsonb_array_length(p_respostas) <> 18 then
    raise exception 'respostas_invalidas';
  end if;

  if exists (
    select 1
    from jsonb_array_elements(p_respostas) e
    where coalesce(e->>'pergunta_id', '') !~ '^[0-9]+$'
       or coalesce(e->>'alternativa', '') !~ '^[0-9]+$'
  ) then
    raise exception 'respostas_invalidas';
  end if;

  with r as (
    select (e->>'pergunta_id')::bigint as pid, (e->>'alternativa')::int as alt
    from jsonb_array_elements(p_respostas) e
  ),
  checagem as (
    select r.pid, r.alt, q.resposta_correta, jsonb_array_length(q.alternativas) as n
    from r
    left join public.questoes q
      on q.id = r.pid and q.id = any (v_tentativa.perguntas_ids)
  )
  select count(*) filter (where resposta_correta = alt),
         count(*) filter (where resposta_correta is null or alt >= n),
         count(distinct pid)
    into v_acertos, v_invalidas, v_distintas
  from checagem;

  -- Cada pergunta da tentativa deve aparecer uma vez, existir e ter alternativa válida.
  if v_distintas <> 18 or v_invalidas > 0 then
    raise exception 'respostas_invalidas';
  end if;

  v_aprovada := v_acertos >= 13;

  update public.tentativas_quiz_final
     set respostas = p_respostas,
         acertos = v_acertos,
         aprovada = v_aprovada,
         enviada_em = now()
   where id = v_tentativa.id;

  return jsonb_build_object(
    'tentativa_id', v_tentativa.id,
    'numero', v_tentativa.numero,
    'acertos', v_acertos,
    'total', 18,
    'nota_minima', 13,
    'aprovada', v_aprovada
  );
end;
$$;

revoke all on function public.concluir_modulo(smallint) from public, anon;
grant execute on function public.concluir_modulo(smallint) to authenticated;

revoke all on function public.iniciar_quiz_final() from public, anon;
grant execute on function public.iniciar_quiz_final() to authenticated;

revoke all on function public.enviar_quiz_final(bigint, jsonb) from public, anon;
grant execute on function public.enviar_quiz_final(bigint, jsonb) to authenticated;
