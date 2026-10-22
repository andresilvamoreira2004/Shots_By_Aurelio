-- Executar uma vez no SQL Editor de um projeto Supabase NOVO.
create table public.site_admins (user_id uuid primary key references auth.users(id) on delete cascade);
alter table public.site_admins enable row level security;
revoke all on public.site_admins from anon, authenticated;
grant select on public.site_admins to authenticated;
create policy "Admin can read own membership" on public.site_admins for select to authenticated using (user_id = (select auth.uid()));

create table public.site_content (
 id integer primary key check (id=1),
 data jsonb not null default '{}'::jsonb check (jsonb_typeof(data)='object'),
 version integer not null default 1,
 updated_at timestamptz not null default now()
);
insert into public.site_content(id) values(1);
alter table public.site_content enable row level security;
revoke all on public.site_content from anon,authenticated;
grant select on public.site_content to anon,authenticated;
grant update(data) on public.site_content to authenticated;
create policy "Public can read published content" on public.site_content for select to anon,authenticated using(true);
create policy "Only approved admins can publish" on public.site_content for update to authenticated
 using(exists(select 1 from public.site_admins where user_id=(select auth.uid())))
 with check(exists(select 1 from public.site_admins where user_id=(select auth.uid())));
create function public.bump_site_version() returns trigger language plpgsql set search_path='' as $$
begin new.version=old.version+1; new.updated_at=now(); return new; end; $$;
create trigger site_version before update on public.site_content for each row execute function public.bump_site_version();

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('site-media','site-media',true,10485760,array['image/jpeg','image/png','image/webp','image/avif']);
create policy "Admins upload media" on storage.objects for insert to authenticated
 with check(bucket_id='site-media' and exists(select 1 from public.site_admins where user_id=(select auth.uid())));
create policy "Admins list media" on storage.objects for select to authenticated
 using(bucket_id='site-media' and exists(select 1 from public.site_admins where user_id=(select auth.uid())));
-- Não há INSERT/DELETE de conteúdo nem escrita pública. Não existe registo de administradores pelo site.
-- Depois de criar o utilizador em Authentication > Users, autorize o UUID:
-- insert into public.site_admins(user_id) values ('UUID-DO-UTILIZADOR');
