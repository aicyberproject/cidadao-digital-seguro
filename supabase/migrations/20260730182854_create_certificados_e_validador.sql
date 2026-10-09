create table if not exists public.certificados (
  id uuid primary key default gen_random_uuid(),
  codigo text not null unique,
  nome_participante text,
  tipo text not null default 'curso' check (tipo in ('curso', 'coringa')),
  ativo boolean not null default true,
  origem text,
  emitido_em timestamptz not null default now()
);

comment on table public.certificados is 'Certificados do curso Cidadão Digital Seguro emitidos localmente pelo app e registrados aqui para permitir a validação de acesso ao módulo de multiplicadores. Sem acesso direto de anon/authenticated: leitura/escrita só via função validar_certificado (SELECT) e via edge function emitir-certificado (INSERT, service role).';

alter table public.certificados enable row level security;

revoke all on public.certificados from anon, authenticated;

create or replace function public.validar_certificado(p_codigo text)
returns jsonb
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(
    (select jsonb_build_object('valido', true, 'tipo', tipo)
     from public.certificados
     where codigo = upper(trim(p_codigo)) and ativo = true
     limit 1),
    jsonb_build_object('valido', false, 'tipo', null)
  );
$$;

revoke all on function public.validar_certificado(text) from public;
grant execute on function public.validar_certificado(text) to anon, authenticated;

insert into public.certificados (codigo, nome_participante, tipo, ativo, origem)
values ('CDS-CORINGA-TESTE', 'Certificado de teste (coringa)', 'coringa', true, 'teste')
on conflict (codigo) do nothing;
;
