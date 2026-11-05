-- Datos mínimos del solicitante, disponibles solo para el propietario receptor.
-- El CUIT se almacena en los metadatos de Supabase Auth.
create or replace function public.get_proposal_tenant_profile(p_proposal_id uuid)
returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare v_tenant uuid; v_owner uuid; v_metadata jsonb;
begin
 select tenant_id,owner_id into v_tenant,v_owner from public.rental_proposals where id=p_proposal_id;
 if v_owner is null or auth.uid() is distinct from v_owner then
  raise exception 'No tenés permiso para consultar el perfil de esta propuesta';
 end if;
 select raw_user_meta_data into v_metadata from auth.users where id=v_tenant;
 return jsonb_build_object('name',coalesce(v_metadata->'profile'->>'name',v_metadata->>'name','Inquilino'),
 'cuit',coalesce(v_metadata->'profile'->>'cuit',v_metadata->>'cuit',''),
 'avatar',coalesce(v_metadata->>'avatar',''));
end $$;
revoke all on function public.get_proposal_tenant_profile(uuid) from public,anon;
grant execute on function public.get_proposal_tenant_profile(uuid) to authenticated;
