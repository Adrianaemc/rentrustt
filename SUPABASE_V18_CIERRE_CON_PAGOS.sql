-- V18: protege HU-032. Ejecutar DESPUÉS de V15 y ETAPA8.
-- Bloquea cierre cuando hay cuotas YA VENCIDAS sin pagar. No bloquea cuotas futuras.
-- Nota: pagos de RenTrust son SIMULADOS; el control utiliza sus estados registrados.
create or replace function public.finish_rental_contract(p_contract_id uuid)
returns void language plpgsql security definer set search_path=public,pg_temp as $$
declare c public.rental_contracts%rowtype; v_unpaid integer;
begin
 select * into c from public.rental_contracts where id=p_contract_id for update;
 if not found or auth.uid() is null or auth.uid() not in (c.owner_id,c.tenant_id)
 then raise exception 'Sin permiso para finalizar este alquiler'; end if;
 if c.status <> 'active' then raise exception 'El contrato no está activo'; end if;
 select count(*) into v_unpaid from public.rental_monthly_payments
 where contract_id=p_contract_id and status='pending' and due_date <= current_date;
 if v_unpaid>0 then
  raise exception 'No se puede finalizar: hay % cuota(s) vencida(s) sin pago simulado. Revisá Cuotas y pagos.',v_unpaid;
 end if;
 update public.rental_contracts set status='pending_review' where id=p_contract_id;
end $$;
revoke all on function public.finish_rental_contract(uuid) from public,anon;
grant execute on function public.finish_rental_contract(uuid) to authenticated;
