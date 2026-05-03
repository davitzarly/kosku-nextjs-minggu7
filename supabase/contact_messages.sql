create extension if not exists pgcrypto;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

grant usage on schema public to anon;
grant insert on public.contact_messages to anon;

drop policy if exists "Anyone can submit contact messages" on public.contact_messages;

create policy "Anyone can submit contact messages"
on public.contact_messages
for insert
to anon
with check (true);
