create table if not exists public.kos_properties (
  id text primary key,
  name text not null,
  city text not null,
  area text not null,
  owner text not null,
  rooms integer not null check (rooms > 0),
  price integer not null check (price >= 500000 and price <= 10000000),
  availability text not null check (availability in ('Tersedia', 'Terbatas', 'Penuh')),
  rating numeric(2, 1) not null check (rating >= 0 and rating <= 5),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.kos_properties enable row level security;

grant usage on schema public to anon;
grant select, insert, update, delete on public.kos_properties to anon;

drop policy if exists "Anyone can read kos properties" on public.kos_properties;
drop policy if exists "Dashboard can insert kos properties" on public.kos_properties;
drop policy if exists "Dashboard can update kos properties" on public.kos_properties;
drop policy if exists "Dashboard can delete kos properties" on public.kos_properties;

create policy "Anyone can read kos properties"
on public.kos_properties
for select
to anon
using (true);

create policy "Dashboard can insert kos properties"
on public.kos_properties
for insert
to anon
with check (true);

create policy "Dashboard can update kos properties"
on public.kos_properties
for update
to anon
using (true)
with check (true);

create policy "Dashboard can delete kos properties"
on public.kos_properties
for delete
to anon
using (true);

insert into public.kos_properties (
  id,
  name,
  city,
  area,
  owner,
  rooms,
  price,
  availability,
  rating
)
values
  ('kos-001', 'Ayana Homestay', 'Yogyakarta', 'Imogiri', 'Sinta Rahma', 12, 2000000, 'Tersedia', 4.9),
  ('kos-002', 'Maharani Villa', 'Jakarta', 'Bendungan Hilir', 'Reza Aditya', 8, 2000000, 'Terbatas', 4.5),
  ('kos-003', 'Apartemen Land House', 'Yogyakarta', 'Jl. Tentara Pelajar', 'Dewi Laras', 16, 1800000, 'Tersedia', 4.7),
  ('kos-004', 'Kos Melati Residence', 'Padang', 'Jl. Pemuda', 'Budi Santoso', 10, 1250000, 'Penuh', 4.3),
  ('kos-005', 'Kirana Student House', 'Bandung', 'Dago', 'Nadia Putri', 14, 1650000, 'Terbatas', 4.6)
on conflict (id) do update set
  name = excluded.name,
  city = excluded.city,
  area = excluded.area,
  owner = excluded.owner,
  rooms = excluded.rooms,
  price = excluded.price,
  availability = excluded.availability,
  rating = excluded.rating,
  updated_at = now();
