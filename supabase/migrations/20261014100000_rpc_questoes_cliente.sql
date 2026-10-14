-- RPCs de questões para o cliente (#130). Dependem de 20261012120000 (questoes).
-- O cliente recebe enunciado e alternativas, nunca o gabarito, exceto na resposta de conferência
-- de uma questão de treino, que devolve a alternativa correta depois que o participante respondeu.
--   - sortear_questoes_modulo: 10 questões de treino do módulo, sorteadas (exige login).
--   - responder_questao_modulo: confere uma resposta de treino (exige login).
--   - sortear_questoes_multiplicador / responder_questao_multiplicador: trilha de multiplicadores,
--     gate por código ativo (mesmo critério de validar_certificado), sem login.

create or replace function public.sortear_questoes_modulo(p_modulo smallint)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_uid uuid := auth.uid();
begin
  if v_uid is null then
    raise exception 'nao_autenticado' using errcode = '42501';
  end if;

  if p_modulo is null or p_modulo not between 1 and 6 then
    raise exception 'modulo_invalido' using errcode = '22023';
  end if;

  return coalesce((
    select jsonb_agg(
             jsonb_build_object(
               'id', s.id,
               'enunciado', s.enunciado,
               'alternativas', s.alternativas
             )
           )
    from (
      select q.id, q.enunciado, q.alternativas
      from public.questoes q
      where q.trilha = 'modulo'
        and q.modulo = p_modulo
        and q.ativa
      order by random()
      limit 10
    ) s
  ), '[]'::jsonb);
end;
$$;

create or replace function public.responder_questao_modulo(p_questao_id bigint, p_alternativa smallint)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_uid uuid := auth.uid();
  v_questao public.questoes%rowtype;
begin
  if v_uid is null then
    raise exception 'nao_autenticado' using errcode = '42501';
  end if;

  select * into v_questao
  from public.questoes
  where id = p_questao_id and trilha = 'modulo' and ativa;

  if not found then
    raise exception 'questao_invalida' using errcode = '22023';
  end if;

  if p_alternativa is null or p_alternativa < 0 or p_alternativa >= jsonb_array_length(v_questao.alternativas) then
    raise exception 'resposta_invalida' using errcode = '22023';
  end if;

  return jsonb_build_object(
    'correta', p_alternativa = v_questao.resposta_correta,
    'resposta_correta', v_questao.resposta_correta
  );
end;
$$;

create or replace function public.sortear_questoes_multiplicador(p_codigo text)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if not exists (
    select 1 from public.certificados
    where codigo = upper(trim(p_codigo)) and ativo = true
  ) then
    raise exception 'codigo_invalido' using errcode = '42501';
  end if;

  return coalesce((
    select jsonb_agg(
             jsonb_build_object(
               'id', s.id,
               'enunciado', s.enunciado,
               'alternativas', s.alternativas
             )
           )
    from (
      select q.id, q.enunciado, q.alternativas
      from public.questoes q
      where q.trilha = 'multiplicador' and q.ativa
      order by random()
    ) s
  ), '[]'::jsonb);
end;
$$;

create or replace function public.responder_questao_multiplicador(
  p_codigo text,
  p_questao_id bigint,
  p_alternativa smallint
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_questao public.questoes%rowtype;
begin
  if not exists (
    select 1 from public.certificados
    where codigo = upper(trim(p_codigo)) and ativo = true
  ) then
    raise exception 'codigo_invalido' using errcode = '42501';
  end if;

  select * into v_questao
  from public.questoes
  where id = p_questao_id and trilha = 'multiplicador' and ativa;

  if not found then
    raise exception 'questao_invalida' using errcode = '22023';
  end if;

  if p_alternativa is null or p_alternativa < 0 or p_alternativa >= jsonb_array_length(v_questao.alternativas) then
    raise exception 'resposta_invalida' using errcode = '22023';
  end if;

  return jsonb_build_object(
    'correta', p_alternativa = v_questao.resposta_correta,
    'resposta_correta', v_questao.resposta_correta
  );
end;
$$;

revoke all on function public.sortear_questoes_modulo(smallint) from public, anon;
revoke all on function public.responder_questao_modulo(bigint, smallint) from public, anon;
revoke all on function public.sortear_questoes_multiplicador(text) from public;
revoke all on function public.responder_questao_multiplicador(text, bigint, smallint) from public;

grant execute on function public.sortear_questoes_modulo(smallint) to authenticated;
grant execute on function public.responder_questao_modulo(bigint, smallint) to authenticated;
grant execute on function public.sortear_questoes_multiplicador(text) to anon, authenticated;
grant execute on function public.responder_questao_multiplicador(text, bigint, smallint) to anon, authenticated;
