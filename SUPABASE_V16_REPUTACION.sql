-- RenTrust V16: reputación verificable sin exponer datos personales.
-- Ejecutar después de ETAPA8, V14 y V15. No elimina datos.
BEGIN;
CREATE OR REPLACE FUNCTION public.get_public_rental_reputation(p_user_id uuid)
RETURNS TABLE(rating integer, comment text, created_at timestamptz)
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT r.rating, r.comment, r.created_at
  FROM public.rental_reviews r
  JOIN public.rental_contracts c ON c.id = r.contract_id
  WHERE r.reviewed_id = p_user_id
    AND c.status = 'completed'
    AND EXISTS (SELECT 1 FROM public.rental_reviews ro WHERE ro.contract_id = c.id AND ro.reviewer_id = c.owner_id)
    AND EXISTS (SELECT 1 FROM public.rental_reviews rt WHERE rt.contract_id = c.id AND rt.reviewer_id = c.tenant_id)
  ORDER BY r.created_at DESC;
$$;
REVOKE ALL ON FUNCTION public.get_public_rental_reputation(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_rental_reputation(uuid) TO authenticated;
COMMIT;
