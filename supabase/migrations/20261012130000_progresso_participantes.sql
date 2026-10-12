-- Progresso do participante: cadastro, conclusão de módulos e tentativas do quiz final (#130).
-- Sem acesso de escrita para anon/authenticated: as linhas são gravadas só pelas RPCs security definer.
-- Cada usuário lê apenas as próprias linhas.

create table if not exists public.participantes (
  user_id uuid primary key references auth.users (id) on delete cascade,
  nome text not null check (length(trim(nome)) > 0),
  email text not null,
  criado_em timestamptz not null default now(),
  retencao_ate timestamptz not null default (now() + interval '6 months')
);

comment on table public.participantes is 'Participantes do curso Cidadão Digital Seguro. Nome e e-mail são dados informados no cadastro. Apagada ao fim da retenção (job com pg_cron, a implementar).';

create table if not exists public.progresso_modulos (
  user_id uuid not null references public.participantes (user_id) on delete cascade,
  modulo smallint not null check (modulo between 1 and 6),
  concluido_em timestamptz not null default now(),
  primary key (user_id, modulo)
);

create table if not exists public.tentativas_quiz_final (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.participantes (user_id) on delete cascade,
  numero smallint not null check (numero in (1, 2)),
  perguntas_ids bigint[] not null check (cardinality(perguntas_ids) = 18),
  respostas jsonb,
  acertos smallint check (acertos between 0 and 18),
  aprovada boolean,
  iniciada_em timestamptz not null default now(),
  enviada_em timestamptz,
  unique (user_id, numero),
  check ((enviada_em is null) = (respostas is null)),
  check ((enviada_em is null) = (aprovada is null))
);

-- Um certificado de curso por participante. Certificados sem participante (após a retenção) continuam válidos.
alter table public.certificados
  add column if not exists participante_id uuid references public.participantes (user_id) on delete set null;

create unique index if not exists certificados_um_curso_por_participante
  on public.certificados (participante_id)
  where tipo = 'curso' and participante_id is not null;

alter table public.participantes enable row level security;
alter table public.progresso_modulos enable row level security;
alter table public.tentativas_quiz_final enable row level security;

revoke all on public.participantes from anon, authenticated;
revoke all on public.progresso_modulos from anon, authenticated;
revoke all on public.tentativas_quiz_final from anon, authenticated;

grant select on public.participantes to authenticated;
grant select on public.progresso_modulos to authenticated;
grant select on public.tentativas_quiz_final to authenticated;

create policy participantes_leitura_propria on public.participantes
  for select to authenticated
  using (user_id = (select auth.uid()));

create policy progresso_leitura_propria on public.progresso_modulos
  for select to authenticated
  using (user_id = (select auth.uid()));

create policy tentativas_leitura_propria on public.tentativas_quiz_final
  for select to authenticated
  using (user_id = (select auth.uid()));
