-- ------------------------------------------------------------------
-- VOXA portfolio — contact enquiries
--
-- The site renders from typed local data (src/lib/data), so the database is
-- only responsible for durable, private state: enquiries submitted through the
-- contact form. That keeps the public site statically renderable while still
-- giving the form a real home.
-- ------------------------------------------------------------------

create table if not exists public.portfolio_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (position('@' in email) > 1),
  company text,
  budget text,
  message text not null check (char_length(message) between 20 and 2000),
  source text not null default 'portfolio',
  user_agent text,
  created_at timestamptz not null default now()
);

comment on table public.portfolio_messages is 'Inbound enquiries from the portfolio contact form.';

-- Fast triage: newest first, plus a lookup by sender.
create index if not exists portfolio_messages_created_at_idx
  on public.portfolio_messages (created_at desc);
create index if not exists portfolio_messages_email_idx
  on public.portfolio_messages (lower(email));

alter table public.portfolio_messages enable row level security;

-- Anonymous visitors may create an enquiry, and nothing else.
drop policy if exists "portfolio_messages_anon_insert" on public.portfolio_messages;
create policy "portfolio_messages_anon_insert"
  on public.portfolio_messages
  for insert
  to anon, authenticated
  with check (true);

-- Only the authenticated owner (service role / dashboard) can read or manage.
drop policy if exists "portfolio_messages_owner_read" on public.portfolio_messages;
create policy "portfolio_messages_owner_read"
  on public.portfolio_messages
  for select
  to authenticated
  using (auth.jwt() ->> 'email' = 'hello@haideralbaba.com');

-- Optional: keep the public API surface narrow.
revoke all on public.portfolio_messages from anon;
grant insert on public.portfolio_messages to anon, authenticated;
grant select on public.portfolio_messages to authenticated;
