import { useState } from 'react';
import { Button } from './ui/button';
import { validCuit } from '../lib/cuit';
/** Escenarios internos para demostración; no consulta información de personas reales. */
export function SimulatedCreditCheck({proposalId,cuit=''}:{proposalId:string;cuit?:string}){
 const [scenario,setScenario]=useState<'regular'|'review'|'high'>('regular');const [shown,setShown]=useState(false);
 const examples={regular:{arrears:0,debt:'$0',risk:'Bajo'},review:{arrears:1,debt:'$150.000',risk:'Medio'},high:{arrears:3,debt:'$500.000',risk:'Alto'}};const r=examples[scenario];
 return <section className="rounded-lg border bg-slate-50 p-4 space-y-3 text-sm"><h3 className="font-semibold">Consulta de situación crediticia</h3><p>CUIT / CUIL: <strong>{cuit||'No informado'}</strong></p>
 <label className="block">Escenario de evaluación <select className="border rounded px-2 py-1 ml-2" value={scenario} onChange={e=>{setScenario(e.target.value as typeof scenario);setShown(false)}}><option value="regular">Sin atrasos</option><option value="review">Con un atraso</option><option value="high">Con varios atrasos</option></select></label>
 <Button variant="outline" size="sm" disabled={!validCuit(cuit)} onClick={()=>setShown(true)}>Consultar situación</Button>
 {!validCuit(cuit)&&<p className="text-xs text-gray-600">El inquilino debe completar un CUIT/CUIL válido en su perfil.</p>}
 {shown&&<div className="bg-white rounded border p-3 space-y-1"><p className="font-medium">Resultado de evaluación</p><p>Estado: Consulta completada</p><p>Riesgo: {r.risk} · Deuda: {r.debt} · Atrasos: {r.arrears}</p><p className="text-xs text-gray-500">Resultado generado con datos de prueba; no constituye un informe financiero sobre el titular del CUIT.</p></div>}
 </section>;
}
