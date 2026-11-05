-- RenTrust V14: finalización anticipada, sin bloquear por fecha.
-- Ejecutar DESPUÉS de SUPABASE_ETAPA8.sql. No elimina tablas ni datos.
-- ATENCIÓN: una vez confirmado el cierre, el contrato pasa a completed.
create or replace function public.finish_rental_contract(p_contract_id uuid)
returns void language plpgsql security definer set search_path=public as $$
declare c public.rental_contracts%rowtype;
begin
  select * into c from public.rental_contracts where id=p_contract_id for update;
  if not found or auth.uid() is null or auth.uid() not in (c.owner_id,c.tenant_id) then
    raise exception 'Sin permiso para finalizar este alquiler';
  end if;
  if c.status <> 'active' then raise exception 'El contrato no está activo'; end if;
  -- No exigir que se alcance end_date: cierre anticipado permitido.
  update public.rental_contracts set status='completed' where id=p_contract_id;
end $$;
revoke all on function public.finish_rental_contract(uuid) from public;
grant execute on function public.finish_rental_contract(uuid) to authenticated;
