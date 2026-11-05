-- RenTrust V15: cierre anticipado -> pendiente de reseñas -> finalizado.
-- Ejecutar UNA SOLA VEZ después de SUPABASE_ETAPA8.sql y V14.
-- No borra contratos, reseñas ni pagos.
BEGIN;
ALTER TABLE public.rental_contracts DROP CONSTRAINT IF EXISTS rental_contracts_status_check;
ALTER TABLE public.rental_contracts ADD CONSTRAINT rental_contracts_status_check
 CHECK (status IN ('formalizing','active','pending_review','completed','cancelled'));

CREATE OR REPLACE FUNCTION public.finish_rental_contract(p_contract_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE c public.rental_contracts%ROWTYPE;
BEGIN
 SELECT * INTO c FROM public.rental_contracts WHERE id=p_contract_id FOR UPDATE;
 IF NOT FOUND OR auth.uid() IS NULL OR auth.uid() NOT IN (c.owner_id,c.tenant_id)
 THEN RAISE EXCEPTION 'Sin permiso para finalizar este alquiler'; END IF;
 IF c.status <> 'active' THEN RAISE EXCEPTION 'El contrato no está activo'; END IF;
 -- No se exige llegar a end_date; finalización anticipada explícita.
 UPDATE public.rental_contracts SET status='pending_review' WHERE id=p_contract_id;
END $$;
REVOKE ALL ON FUNCTION public.finish_rental_contract(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.finish_rental_contract(uuid) TO authenticated;

DROP POLICY IF EXISTS rental_reviews_insert ON public.rental_reviews;
CREATE POLICY rental_reviews_insert ON public.rental_reviews FOR INSERT TO authenticated
WITH CHECK (reviewer_id=auth.uid() AND EXISTS (
 SELECT 1 FROM public.rental_contracts c WHERE c.id=contract_id
 AND c.status='pending_review'
 AND ((c.owner_id=reviewer_id AND c.tenant_id=reviewed_id)
 OR (c.tenant_id=reviewer_id AND c.owner_id=reviewed_id))
));

CREATE OR REPLACE FUNCTION public.complete_contract_after_both_reviews()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE c public.rental_contracts%ROWTYPE;
BEGIN
 SELECT * INTO c FROM public.rental_contracts WHERE id=NEW.contract_id FOR UPDATE;
 IF c.status='pending_review' AND EXISTS (
   SELECT 1 FROM public.rental_reviews WHERE contract_id=c.id AND reviewer_id=c.owner_id
 ) AND EXISTS (
   SELECT 1 FROM public.rental_reviews WHERE contract_id=c.id AND reviewer_id=c.tenant_id
 ) THEN
   UPDATE public.rental_contracts SET status='completed' WHERE id=c.id;
 END IF;
 RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS rental_reviews_complete_contract ON public.rental_reviews;
CREATE TRIGGER rental_reviews_complete_contract AFTER INSERT ON public.rental_reviews
FOR EACH ROW EXECUTE FUNCTION public.complete_contract_after_both_reviews();
COMMIT;
