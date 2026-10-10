-- Contador de tentativas de emissão de certificado, por IP (armazenado como hash).
-- Medida imediata da issue #129. Não substitui a correção definitiva (progresso e quiz no servidor).

create table if not exists public.emissoes_tentativas (
  ip_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists emissoes_tentativas_ip_hash_created_idx
  on public.emissoes_tentativas (ip_hash, created_at);

alter table public.emissoes_tentativas enable row level security;
revoke all on table public.emissoes_tentativas from anon, authenticated;

-- Conta as tentativas da última hora para o hash e, se estiver abaixo do limite, registra a nova.
-- Executa com o dono da função, por isso não precisa de grant na tabela para service_role.
-- Limpa registros com mais de 1 dia a cada chamada, para a tabela não crescer sem limite.
create or replace function public.registrar_tentativa_emissao(p_ip_hash text, p_limite int)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  total int;
begin
  -- Serializa as chamadas do mesmo IP, para que duas requisições simultâneas não furem o limite.
  perform pg_advisory_xact_lock(hashtext(p_ip_hash));

  delete from public.emissoes_tentativas
  where created_at < now() - interval '1 day';

  select count(*) into total
  from public.emissoes_tentativas
  where ip_hash = p_ip_hash
    and created_at > now() - interval '1 hour';

  if total >= p_limite then
    return false;
  end if;

  insert into public.emissoes_tentativas (ip_hash) values (p_ip_hash);
  return true;
end;
$$;

revoke all on function public.registrar_tentativa_emissao(text, int) from public, anon, authenticated;
grant execute on function public.registrar_tentativa_emissao(text, int) to service_role;
