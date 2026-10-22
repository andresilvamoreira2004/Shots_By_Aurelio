import {client,content,json,node,safeURL,mediaURL,projectCard} from './common.js';
try{
 const schema=await json('/assets/schema.json');let data;
 try{({data}=await content(client()));}catch(error){console.warn('Conteúdos remotos indisponíveis; a mostrar versão original.',error);data=await json('/assets/defaults.json');}
 for(const f of schema){const value=data.fields[f.key];if(typeof value!=='string')continue;if(f.kind==='phone'){window.shotsWhatsApp=value.replace(/\D/g,'');continue;}const el=document.querySelector(`[data-cms="${f.id}"]`);if(!el)continue;
 if(f.kind==='text'){const text=el.childNodes[f.child];if(text?.nodeType===3)text.nodeValue=value;}
 else if(f.kind==='background'){const u=mediaURL(value);if(u)el.style.backgroundImage=`url(${JSON.stringify(u)})`;}
 else if(f.kind==='link'){if(safeURL(value,{link:true}))el.setAttribute(f.attr,value);}
 else if(f.kind==='media'&&safeURL(value)){el.setAttribute(f.attr,mediaURL(value));}
 }
 const featured=data.projects.filter(p=>p.featured);const deck=document.querySelector('.spatial-deck');if(deck){deck.replaceChildren(...featured.map((p,i)=>projectCard(p,i,featured.length)));document.querySelector('.spatial-steps').replaceChildren(...featured.map(()=>node('i')));document.querySelector('.spatial-nav-count em').textContent='/'+String(featured.length).padStart(2,'0');document.querySelector('.spatial-outro-kicker').textContent=String(featured.length).padStart(2,'0')+' / END';if(!featured.length)document.querySelector('#spatialShowcase').hidden=true;}
}catch(e){console.error(e);}finally{const script=document.createElement('script');script.src='/assets/legacy.js';document.body.append(script);}
