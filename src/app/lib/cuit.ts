export function validCuit(input:string):boolean {
 const s=input.replace(/\D/g,'');if(s.length!==11)return false;
 const weights=[5,4,3,2,7,6,5,4,3,2];
 const sum=weights.reduce((a,w,i)=>a+w*Number(s[i]),0);
 const n=11-(sum%11);return Number(s[10])===(n===11?0:n===10?9:n);
}
