-- Banco de questões do curso e da trilha de multiplicadores.
-- O conteúdo (enunciado, alternativas e gabarito) não fica no repositório: é carregado por seed
-- a partir de arquivo externo. Nenhum acesso direto para anon/authenticated: o participante só
-- recebe questões pelas RPCs de quiz (a serem criadas), sem a resposta correta.

create table if not exists public.questoes (
  id bigint generated always as identity primary key,
  trilha text not null check (trilha in ('modulo', 'final', 'multiplicador')),
  modulo smallint check (modulo between 1 and 6),
  ref_externa text not null unique,
  enunciado text not null check (length(trim(enunciado)) > 0),
  alternativas jsonb not null check (jsonb_typeof(alternativas) = 'array'),
  resposta_correta smallint not null check (resposta_correta >= 0),
  ativa boolean not null default true,
  criado_em timestamptz not null default now(),
  check ((trilha = 'modulo') = (modulo is not null)),
  check (resposta_correta < jsonb_array_length(alternativas))
);

comment on table public.questoes is 'Banco de questões do curso Cidadão Digital Seguro e da trilha de multiplicadores. Sem acesso direto de anon/authenticated: o gabarito só é lido pelo servidor.';

alter table public.questoes enable row level security;

revoke all on public.questoes from anon, authenticated;
