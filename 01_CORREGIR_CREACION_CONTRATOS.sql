-- RenTrust: creación de contratos validada en el servidor.
-- Ejecutar en Supabase SQL Editor como propietario del esquema.
CREATE OR REPLACE FUNCTION public.create_rental_contract(
  p_proposal_id uuid,
  p_start_date date,
  p_end_date date,
  p_monthly_rent numeric,
  p_initial_payment_amount numeric,
  p_terms_text text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_proposal public.rental_proposals%ROWTYPE;
  v_contract_id uuid;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Tenés que iniciar sesión' USING ERRCODE = '42501';
  END IF;

  SELECT * INTO v_proposal
  FROM public.rental_proposals
  WHERE id = p_proposal_id
  FOR UPDATE;

  IF NOT FOUND OR v_proposal.owner_id IS DISTINCT FROM auth.uid() THEN
    RAISE EXCEPTION 'Solo el propietario de la propuesta puede crear el contrato' USING ERRCODE = '42501';
  END IF;
  IF v_proposal.status IS DISTINCT FROM 'accepted' THEN
    RAISE EXCEPTION 'La propuesta debe estar aceptada';
  END IF;
  IF p_start_date IS NULL OR p_end_date IS NULL OR p_end_date <= p_start_date THEN
    RAISE EXCEPTION 'Las fechas del contrato no son válidas';
  END IF;
  IF p_monthly_rent IS NULL OR p_monthly_rent <= 0 OR
     p_initial_payment_amount IS NULL OR p_initial_payment_amount <= 0 THEN
    RAISE EXCEPTION 'Los importes deben ser mayores que cero';
  END IF;
  IF p_terms_text IS NULL OR char_length(btrim(p_terms_text)) NOT BETWEEN 40 AND 10000 THEN
    RAISE EXCEPTION 'El texto del contrato debe tener entre 40 y 10000 caracteres';
  END IF;
  IF EXISTS (SELECT 1 FROM public.rental_contracts WHERE proposal_id = p_proposal_id) THEN
    RAISE EXCEPTION 'Esta propuesta ya tiene un contrato';
  END IF;

  INSERT INTO public.rental_contracts (
    proposal_id, property_id, owner_id, tenant_id,
    start_date, end_date, monthly_rent, initial_payment_amount,
    terms_text, status, payment_status,
    owner_signed_at, tenant_signed_at, payment_confirmed_at, activated_at
  ) VALUES (
    v_proposal.id, v_proposal.property_id, v_proposal.owner_id, v_proposal.tenant_id,
    p_start_date, p_end_date, p_monthly_rent, p_initial_payment_amount,
    p_terms_text, 'formalizing', 'pending', NULL, NULL, NULL, NULL
  ) RETURNING id INTO v_contract_id;

  RETURN v_contract_id;
END;
$$;

REVOKE ALL ON FUNCTION public.create_rental_contract(uuid,date,date,numeric,numeric,text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.create_rental_contract(uuid,date,date,numeric,numeric,text) FROM anon;
GRANT EXECUTE ON FUNCTION public.create_rental_contract(uuid,date,date,numeric,numeric,text) TO authenticated;
