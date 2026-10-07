-- OLVÉN — esquema de catálogo
-- Pegá este script en: Supabase Dashboard → SQL Editor → New query → Run

create extension if not exists "pgcrypto";

create table if not exists public.perfumes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null check (
    category in (
      'disenador-masculino',
      'disenador-femenino',
      'alternativo-masculino',
      'arabe-masculino',
      'arabe-unisex',
      'arabe-femenino'
    )
  ),
  image_url text not null,
  created_at timestamptz not null default now()
);

create index if not exists perfumes_category_idx
  on public.perfumes (category);

alter table public.perfumes
  add column if not exists subtitle text;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null unique,
  description text,
  created_at timestamptz not null default now()
);

alter table public.categories
  add column if not exists description text;

create table if not exists public.subcategories (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete restrict,
  slug text not null,
  label text not null,
  created_at timestamptz not null default now(),
  unique (category_id, slug),
  unique (category_id, label)
);

alter table public.perfumes
  drop constraint if exists perfumes_category_check;

alter table public.perfumes
  add column if not exists subcategory_id uuid references public.subcategories(id) on delete restrict;

insert into public.categories (slug, label)
values
  ('disenador-masculino', 'Catalogo diseñador masculino'),
  ('disenador-femenino', 'Catalogo diseñador femenino'),
  ('alternativo-masculino', 'Catalogo alternativo masculino'),
  ('arabe-masculino', 'Catalogo arabe masculino'),
  ('arabe-unisex', 'Catalogo arabe unisex'),
  ('arabe-femenino', 'Catalogo arabe femenino')
on conflict (slug) do update set label = excluded.label;

create index if not exists subcategories_category_idx
  on public.subcategories (category_id);

alter table public.perfumes enable row level security;
alter table public.categories enable row level security;
alter table public.subcategories enable row level security;

drop policy if exists "Public can read perfumes" on public.perfumes;
create policy "Public can read perfumes"
  on public.perfumes
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Public can insert perfumes" on public.perfumes;
create policy "Public can insert perfumes"
  on public.perfumes
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Public can update perfumes" on public.perfumes;
create policy "Public can update perfumes"
  on public.perfumes
  for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "Public can delete perfumes" on public.perfumes;
create policy "Public can delete perfumes"
  on public.perfumes
  for delete
  to anon, authenticated
  using (true);

drop policy if exists "Public can read categories" on public.categories;
create policy "Public can read categories"
  on public.categories for select to anon, authenticated using (true);

drop policy if exists "Public can manage categories" on public.categories;
create policy "Public can manage categories"
  on public.categories for all to anon, authenticated using (true) with check (true);

drop policy if exists "Public can read subcategories" on public.subcategories;
create policy "Public can read subcategories"
  on public.subcategories for select to anon, authenticated using (true);

drop policy if exists "Public can manage subcategories" on public.subcategories;
create policy "Public can manage subcategories"
  on public.subcategories for all to anon, authenticated using (true) with check (true);

-- Storage: bucket público para las fotos
insert into storage.buckets (id, name, public)
values ('perfumes_images', 'perfumes_images', true)
on conflict (id) do update set public = true;

drop policy if exists "Public read perfume images" on storage.objects;
create policy "Public read perfume images"
  on storage.objects
  for select
  using (bucket_id = 'perfumes_images');

drop policy if exists "Public upload perfume images" on storage.objects;
create policy "Public upload perfume images"
  on storage.objects
  for insert
  with check (bucket_id = 'perfumes_images');
