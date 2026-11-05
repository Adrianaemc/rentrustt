-- HU-012: acceso mínimo al historial para el dueño de una propuesta.
-- No revela domicilios ni contratos con otros propietarios.
create or replace function public.get_proposal_tenant_history(p_proposal_id uuid)
returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare v_tenant uuid; v_owner uuid; v_completed integer; v_active integer;
begin
 select tenant_id,owner_id into v_tenant,v_owner from public.rental_proposals where id=p_proposal_id;
 if v_owner is null or auth.uid() is distinct from v_owner then
  raise exception 'Solo el propietario receptor puede consultar este historial';
 end if;
 select count(*) filter(where status='completed'),count(*) filter(where status='active')
 into v_completed,v_active from public.rental_contracts where tenant_id=v_tenant;
 return jsonb_build_object('completed',v_completed,'active',v_active);
end $$;
revoke all on function public.get_proposal_tenant_history(uuid) from public,anon;
grant execute on function public.get_proposal_tenant_history(uuid) to authenticated;
