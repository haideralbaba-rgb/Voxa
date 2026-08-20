create extension if not exists pgcrypto;

create type public.plan_tier as enum ('free', 'pro');
create type public.publication_state as enum ('draft', 'published', 'unpublished');
create type public.media_kind as enum ('image', 'video');
create type public.processing_status as enum ('pending', 'processing', 'ready', 'failed');
create type public.domain_status as enum ('pending', 'verified', 'failed', 'disabled');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  display_name text not null,
  avatar_url text,
  bio text,
  profession text,
  social_links jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan plan_tier not null default 'free',
  status text not null default 'active',
  period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.portfolios (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null unique references auth.users(id) on delete cascade,
  title text not null default 'Untitled Portfolio',
  slug text not null unique,
  description text,
  accent text not null default '#ffffff',
  typography text not null default 'Inter',
  seo_title text,
  seo_description text,
  publication_state public.publication_state not null default 'draft',
  public_plan public.plan_tier not null default 'free',
  featured_project_ids uuid[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid not null references public.portfolios(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  slug text not null,
  sort_order integer not null default 0,
  unique(portfolio_id, slug)
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid not null references public.portfolios(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  slug text not null,
  description text,
  category_id uuid references public.categories(id) on delete set null,
  tags text[] not null default '{}',
  featured boolean not null default false,
  publication_state public.publication_state not null default 'draft',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(portfolio_id, slug)
);

create table public.project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  kind public.media_kind not null,
  storage_path text not null,
  public_url text,
  thumbnail_path text,
  thumbnail_url text,
  poster_path text,
  poster_url text,
  width integer,
  height integer,
  aspect_ratio numeric(10,5),
  duration numeric(12,3),
  mime_type text not null,
  file_size bigint not null default 0,
  processing_status public.processing_status not null default 'pending',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.portfolio_domains (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid not null references public.portfolios(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  hostname text not null unique,
  status public.domain_status not null default 'pending',
  verification_token text not null,
  primary boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.portfolios enable row level security;
alter table public.categories enable row level security;
alter table public.projects enable row level security;
alter table public.project_media enable row level security;
alter table public.portfolio_domains enable row level security;

create policy "profile_owner_all" on public.profiles for all to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "profile_public_read" on public.profiles for select to anon using (true);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  base_username text;
  safe_username text;
begin
  base_username := 'creator-' || substr(replace(new.id::text, '-', ''), 1, 8);
  safe_username := base_username;
  insert into public.profiles (id, username, display_name)
  values (new.id, safe_username, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1), 'Creator'));
  insert into public.subscriptions (user_id, plan) values (new.id, 'free');
  insert into public.portfolios (owner_id, title, slug, public_plan)
  values (new.id, 'Untitled Portfolio', safe_username, 'free');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create policy "subscription_owner_read" on public.subscriptions for select to authenticated using (auth.uid() = user_id);
create policy "subscription_block_client_write" on public.subscriptions for all to authenticated using (false) with check (false);

create policy "portfolio_owner_all" on public.portfolios for all to authenticated using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "portfolio_public_read" on public.portfolios for select to anon using (publication_state = 'published');

create or replace function public.sync_portfolio_plan()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.portfolios set public_plan = new.plan, updated_at = now() where owner_id = new.user_id;
  return new;
end;
$$;

create trigger subscriptions_sync_portfolio_plan
after insert or update of plan on public.subscriptions
for each row execute function public.sync_portfolio_plan();

create policy "categories_owner_all" on public.categories for all to authenticated using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "categories_public_read" on public.categories for select to anon using (exists (
  select 1 from public.portfolios p where p.id = portfolio_id and p.publication_state = 'published'
));

create policy "projects_owner_all" on public.projects for all to authenticated using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "projects_public_read" on public.projects for select to anon using (
  publication_state = 'published' and exists (
    select 1 from public.portfolios p where p.id = portfolio_id and p.publication_state = 'published'
  )
);

create policy "media_owner_all" on public.project_media for all to authenticated using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "media_public_read" on public.project_media for select to anon using (
  exists (
    select 1 from public.projects pr
    join public.portfolios p on p.id = pr.portfolio_id
    where pr.id = project_id
      and pr.publication_state = 'published'
      and p.publication_state = 'published'
  )
);

create policy "domain_owner_all" on public.portfolio_domains for all to authenticated using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "domain_public_verified_read" on public.portfolio_domains for select to anon using (status = 'verified');

create index projects_portfolio_order_idx on public.projects(portfolio_id, publication_state, sort_order, created_at desc);
create index media_project_order_idx on public.project_media(project_id, sort_order);
create index domains_hostname_idx on public.portfolio_domains(hostname);
create index profiles_username_idx on public.profiles(username);

insert into storage.buckets (id, name, public) values ('portfolio-media', 'portfolio-media', false)
on conflict (id) do nothing;


-- Storage isolation: object paths must begin with the authenticated owner's UUID.
create policy "portfolio_media_owner_insert" on storage.objects for insert to authenticated
with check (bucket_id = 'portfolio-media' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "portfolio_media_owner_update" on storage.objects for update to authenticated
using (bucket_id = 'portfolio-media' and (storage.foldername(name))[1] = auth.uid()::text)
with check (bucket_id = 'portfolio-media' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "portfolio_media_owner_select" on storage.objects for select to authenticated using (bucket_id = 'portfolio-media' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "portfolio_media_owner_delete" on storage.objects for delete to authenticated
using (bucket_id = 'portfolio-media' and (storage.foldername(name))[1] = auth.uid()::text);

-- Reads for anonymous visitors use server-side signed URLs generated only for published media.
