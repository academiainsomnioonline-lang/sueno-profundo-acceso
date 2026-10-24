/* Vista de ejemplo del área del paciente (?demo=1). Todo es ficticio y se queda en este navegador: no toca la base de datos real. */
window.__USER='u_pac'; window.__RESET=true;
document.addEventListener('DOMContentLoaded',function(){ var b=document.createElement('div'); b.textContent='Vista de ejemplo · datos ficticios, nada se guarda'; b.style.cssText='position:fixed;top:0;left:0;right:0;z-index:99999;background:#D4AF37;color:#2B2118;text-align:center;font:600 12px Inter,system-ui,sans-serif;padding:5px;'; document.body.appendChild(b); });
// Fake supabase-js for local UI tests. State in localStorage('FAKE_DB') so it survives reloads.
(function(){
  const CID='c1';
  const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Madrid'}).format(new Date());
  const add=(s,n)=>{ const p=s.split('-').map(Number); return new Date(Date.UTC(p[0],p[1]-1,p[2])+n*864e5).toISOString().slice(0,10); };
  function seed(){
    const nights=(start,n,eff)=>Array.from({length:7},(_,i)=>i<n?{acostarse:'23:00',intentar:'23:10',latencia:eff?'15':'60',despertares:'2',waso:eff?'20':'90',despertar_final:'06:50',levantarte:'07:00',siestas:'0',desfase_lev:'0',salidas_num:'0',salidas_min:'0',factores:'',causa_externa:''}:{});
    const w0=add(today,-35), w1=add(today,-14), w2=add(today,-7);
    return {
      users:{u_dir:{id:'u_dir',email:'fran@x.com'}, u_pac:{id:'u_pac',email:'pac@x.com'}},
      miembros:[{user_id:'u_dir',consulta_id:CID,rol:window.__ROL||'director',nombre_profesional:'Dr. Francisco Díaz García'},{user_id:'u_psi',consulta_id:CID,rol:'psicologa',nombre_profesional:'Laura Martín (psicóloga)'}],
      pacientes:[{id:'p1',consulta_id:CID,nombre:'Paciente de ejemplo',datos_identidad:{nhc:'101',email:'pac@x.com',createdAt:add(today,-40)},activo:true,creado_el:add(today,-40)},
                 {id:'p2',consulta_id:CID,nombre:'Ana López',datos_identidad:{nhc:'102'},activo:true,creado_el:add(today,-20)}],
      registros:[
        {consulta_id:CID,paciente_id:'p1',tipo:'diary',data:{v:[{weekStart:w0,days:nights(w0,7,false)},{weekStart:w2,days:nights(w2,3,true)}]},actualizado_el:add(today,-3),actualizado_por:'u_dir'},
        {consulta_id:CID,paciente_id:'p1',tipo:'scales',data:{v:[{date:add(today,-35),results:{ISI:20,PHQ9:6,ESS:9,GAD7:5},items:{PHQ9:[1,1,1,1,0,1,0,1,0]}},{date:add(today,-20),results:{ISI:12}}]},actualizado_el:add(today,-20),actualizado_por:'u_dir'},
        {consulta_id:CID,paciente_id:'p1',tipo:'sessions',data:{v:[{fecha:add(today,-35),tipo:'Evaluación inicial',fase:'Basal'},{fecha:add(today,-14),tipo:'Sesión de tratamiento',fase:'Restricción'}]},actualizado_el:add(today,-14),actualizado_por:'u_dir'},
        {consulta_id:CID,paciente_id:'p1',tipo:'taper',data:{v:{farmacos:[{id:'f1',nombre:'Lorazepam',dosisInicial:1,unidad:'mg'}],escalones:[{farmacoId:'f1',fecha:add(today,-10),dosis:0.5}]}},actualizado_el:add(today,-10),actualizado_por:'u_dir'},
        {consulta_id:CID,paciente_id:'p1',tipo:'hc',data:{v:{}},actualizado_el:add(today,-30),actualizado_por:'u_dir'},
      ],
      meta:[], asignaciones:[],
      portal_accesos:[{consulta_id:CID,paciente_id:'p1',email:'pac@x.com',activo:true,creado_en:add(today,-30),ultimo_acceso:add(today,-1)}],
      portal_items:[{id:'it1',consulta_id:CID,paciente_id:'p1',tipo:'consentimiento',titulo:'Consentimiento informado TCC-I',storage_path:'c1/p1/x.pdf',creado_en:add(today,-1)},
                    {id:'it2',consulta_id:CID,paciente_id:'p1',tipo:'documento',titulo:'Guía de higiene',storage_path:'c1/p1/y.pdf',creado_en:add(today,-2)}],
      portal_envios:[],
      calendario_prof:[{user_id:'u_dir',consulta_id:CID,meet_url:'https://meet.google.com/aoi-fran-sala'}],
      citas:(function(){ const L=new Date(); L.setHours(0,0,0,0); L.setDate(L.getDate()-((L.getDay()+6)%7)); const at=(d,h,m)=>{ const x=new Date(L); x.setDate(x.getDate()+d); x.setHours(h,m||0,0,0); return x.toISOString(); };
        return [
          {id:'c1',consulta_id:CID,paciente_id:'p1',profesional_id:'u_dir',inicio:at(0,10),duracion_min:45,tipo:'Seguimiento',estado:'realizada',meet_url:'https://meet.google.com/aoi-fran-sala'},
          {id:'c2',consulta_id:CID,paciente_id:'p2',profesional_id:'u_dir',inicio:at(1,17,30),duracion_min:60,tipo:'Valoración inicial',estado:'programada',meet_url:'https://meet.google.com/aoi-fran-sala'},
          {id:'c3',consulta_id:CID,paciente_id:'p1',profesional_id:'u_dir',inicio:at(3,12),duracion_min:45,tipo:'Revisión',estado:'programada',meet_url:'https://meet.google.com/aoi-fran-sala'},
          {id:'c4',consulta_id:CID,paciente_id:'p2',profesional_id:'u_psi',inicio:at(2,9,30),duracion_min:60,tipo:'Sesión de psicología',estado:'programada',meet_url:'https://meet.google.com/aoi-psi-sala'},
          {id:'c5',consulta_id:CID,paciente_id:'p1',profesional_id:'u_dir',inicio:at(4,16),duracion_min:30,tipo:'Seguimiento',estado:'cancelada'}];})(), auditoria:[{id:1,consulta_id:CID,paciente_id:'p1',tabla:'registros',tipo:'hc',accion:'modifica',usuario_nombre:'Dr. Fran Díaz',en:new Date().toISOString(),hasta:new Date().toISOString(),cambios:3,detalle:{campos:['ident','motivo']}}],
      programas:[{consulta_id:CID,paciente_id:'p1',inicio:add(today,window.__PROG_INI!=null?window.__PROG_INI:-75),meses:3,fin:add(today,window.__PROG_FIN!=null?window.__PROG_FIN:17),tramos:[],renovacion_solicitada:null}],
      sugerencias:[{id:1,consulta_id:CID,origen:'paciente',paciente_id:'p2',user_id:'x',momento:'mes1',categoria:'general',puntuacion:4,texto:'Me vendría bien un recordatorio para rellenar el diario por la mañana.',estado:'nueva',mes:today.slice(0,7),omitida:false,visto_autor:false},
        {id:2,consulta_id:CID,origen:'profesional',user_id:'u_psi',momento:'libre',categoria:'plataforma',texto:'Poder ver el diario de la semana en una sola pantalla al preparar la sesión.',estado:'estudio',respuesta:'Lo estamos diseñando.',mes:today.slice(0,7),omitida:false,visto_autor:false},
        {id:3,consulta_id:CID,origen:'paciente',paciente_id:'p9',user_id:'y',momento:'fin',categoria:'tratamiento',recomendaria:10,ayudo:'Entender que no pasa nada por una mala noche.',texto:'Más vídeos cortos para los días difíciles.',estado:'nueva',mes:today.slice(0,7),omitida:false,visto_autor:false},
        {id:4,consulta_id:CID,origen:'profesional',user_id:'u_dir',momento:'libre',categoria:'seguimiento',texto:'Plantilla de mensaje para la semana de restricción.',estado:'hecha',respuesta:'Añadida en Documentos.',mes:today.slice(0,7),omitida:false,visto_autor:false}],
      mensajes:[{id:1,consulta_id:CID,hilo:'equipo',autor:'u_psi',autor_tipo:'profesional',autor_nombre:'Laura Martín (psicóloga)',texto:'Buenos días. Juan ha rellenado el diario toda la semana.',creado_en:new Date(Date.now()-3600e3).toISOString()},
        {id:2,consulta_id:CID,hilo:'pac:p1',paciente_id:'p1',autor:'u_pac',autor_tipo:'paciente',autor_nombre:'Paciente de ejemplo',texto:'Doctor, esta semana me cuesta levantarme a las 7. ¿Es normal?',creado_en:new Date(Date.now()-1800e3).toISOString()}],
      mensajes_leidos:[],
      copias:[{id:1,consulta_id:CID,creada_en:new Date().toISOString(),origen:'automatica',pacientes:2,tamano:20480,datos:{version:1}}],
      session: window.__USER? {user:{id:window.__USER}} : null,
    };
  }
  let DB; try{ DB=JSON.parse(localStorage.getItem('AOI_DEMO_DB')); }catch(e){}
  if(!DB || window.__RESET){ DB=seed(); }
  const save=()=>localStorage.setItem('AOI_DEMO_DB',JSON.stringify(DB));
  save();
  window.__FAKE=DB;
  const uid=()=>DB.session&&DB.session.user.id;
  const ok=d=>Promise.resolve({data:d,error:null});
  function Q(table){
    let rows=()=>DB[table]||(DB[table]=[]);
    const f=[]; let op='select', payload=null, opts={}, ord=null, lim=null, single=false;
    const api={
      select(){ if(op==='select') op='select'; return api; },
      eq(k,v){ f.push(r=>String(r[k])===String(v)); return api; },
      is(k,v){ f.push(r=>(r[k]===undefined?null:r[k])===v); return api; },
      in(k,arr){ f.push(r=>arr.includes(r[k])); return api; },
      gte(k,v){ f.push(r=>String(r[k])>=String(v)); return api; },
      lt(k,v){ f.push(r=>String(r[k])<String(v)); return api; },
      neq(k,v){ f.push(r=>String(r[k])!==String(v)); return api; },
      order(k,o){ ord=[k,o&&o.ascending===false?-1:1]; return api; },
      limit(n){ lim=n; return api; },
      maybeSingle(){ single=true; return api; },
      single(){ single=true; return api; },
      insert(p){ op='insert'; payload=p; return api; },
      upsert(p,o){ op='upsert'; payload=p; opts=o||{}; return api; },
      update(p){ op='update'; payload=p; return api; },
      delete(){ op='delete'; return api; },
      then(res,rej){ return run().then(res,rej); }
    };
    function run(){
      const match=r=>f.every(fn=>fn(r));
      if(op==='select'){
        let out=rows().filter(match).map(r=>JSON.parse(JSON.stringify(r)));
        if(ord) out.sort((a,b)=>String(a[ord[0]]).localeCompare(String(b[ord[0]]))*ord[1]);
        if(lim) out=out.slice(0,lim);
        return ok(single?(out[0]||null):out);
      }
      if(op==='insert'){ (Array.isArray(payload)?payload:[payload]).forEach(p=>rows().push(Object.assign({id:'id'+Math.random().toString(36).slice(2),creado_en:new Date().toISOString()},p))); save(); return ok(null); }
      if(op==='upsert'){ const keys=(opts.onConflict||'id').split(','); (Array.isArray(payload)?payload:[payload]).forEach(p=>{ const ex=rows().find(r=>keys.every(k=>String(r[k])===String(p[k]))); if(ex) Object.assign(ex,p,{actualizado_el:new Date().toISOString()}); else rows().push(Object.assign({actualizado_el:new Date().toISOString()},p)); }); save(); return ok(null); }
      if(op==='update'){ rows().filter(match).forEach(r=>Object.assign(r,payload)); save(); return ok(null); }
      if(op==='delete'){ DB[table]=rows().filter(r=>!match(r)); save(); return ok(null); }
    }
    return api;
  }
  const RPC={
    quien_soy(){ const m=DB.miembros.find(m=>m.user_id===uid()); return m?{consulta_id:m.consulta_id,rol:m.rol,nombre:m.nombre_profesional}:null; },
    portal_yo(){ const u=DB.users[uid()]; if(!u) return null; const a=DB.portal_accesos.find(a=>a.email===u.email&&a.activo); if(!a) return null; const p=DB.pacientes.find(p=>p.id===a.paciente_id); return {paciente_id:a.paciente_id,consulta_id:a.consulta_id,nombre:(p.nombre||'').split(' ')[0]}; },
    portal_mi_equipo(){ return {medicos:['Dr. Fran Díaz'],psicologo:null}; },
    portal_marcar_visto({item}){ const i=DB.portal_items.find(x=>x.id===item); if(i&&!i.visto_en) i.visto_en=new Date().toISOString(); return null; },
    portal_estado(){ const yo=RPC.portal_yo(); if(!yo) return null; const pid=yo.paciente_id;
      const sc=(DB.registros.find(r=>r.paciente_id===pid&&r.tipo==='scales')||{data:{v:[]}}).data.v;
      const esc=[]; sc.forEach(s=>Object.keys(s.results||{}).forEach(k=>esc.push({k,fecha:s.date})));
      const envios=DB.portal_envios.filter(e=>e.paciente_id===pid).map(e=>({tipo:e.tipo,clave:e.clave,datos:e.tipo==='escala'?{k:e.datos.k}:e.datos,en:e.actualizado_en}));
      const cfg=(DB.meta.find(m=>m.clave==='portal_config')||{data:{v:{}}}).data.v;
      return {escalas:esc,envios,config:cfg||{},alta:false,hoy:today}; },
    portal_enviar({p_tipo,p_clave,p_datos}){ const yo=RPC.portal_yo(); if(!yo) throw new Error('sin acceso');
      if(p_tipo==='consentimiento' && DB.portal_envios.some(e=>e.paciente_id===yo.paciente_id&&e.tipo===p_tipo&&e.clave===p_clave)) throw new Error('ya firmado');
      if(p_tipo==='consentimiento') p_datos=Object.assign({},p_datos,{firmado_en:new Date().toISOString(),email:'pac@x.com'});
      const ex=DB.portal_envios.find(e=>e.paciente_id===yo.paciente_id&&e.tipo===p_tipo&&e.clave===p_clave);
      const now=new Date().toISOString();
      if(ex){ ex.datos=p_datos; ex.actualizado_en=now; ex.procesado_en=null; } else DB.portal_envios.push({id:'e'+Math.random().toString(36).slice(2),consulta_id:yo.consulta_id,paciente_id:yo.paciente_id,tipo:p_tipo,clave:p_clave,datos:p_datos,creado_en:now,actualizado_en:now,procesado_en:null});
      return {ok:true}; },
    mi_calendario(){ const r=DB.calendario_prof.find(x=>x.user_id===uid())||{}; return {meet_url:r.meet_url||null, ics_token:'3f1c2b9e-0000-4000-8000-ab12cd34ef56'}; },
    nuevo_token_calendario(){ return 'x'; },
    portal_mis_citas(){ const yo=RPC.portal_yo(); if(!yo) return null; const now=Date.now(); return (DB.citas||[]).filter(c=>c.paciente_id===yo.paciente_id&&c.estado==='programada'&&new Date(c.inicio).getTime()+c.duracion_min*60000>=now).sort((a,b)=>a.inicio.localeCompare(b.inicio)).map(c=>({...c, profesional:(DB.miembros.find(m=>m.user_id===c.profesional_id)||{}).nombre_profesional})); },
    programa_fijar({pid,p_inicio,p_meses}){ const d=new Date(p_inicio+'T12:00:00'); d.setMonth(d.getMonth()+p_meses); const fin=d.toISOString().slice(0,10); let p=DB.programas.find(x=>x.paciente_id===pid); if(p){ Object.assign(p,{inicio:p_inicio,meses:p_meses,fin}); } else DB.programas.push({consulta_id:CID,paciente_id:pid,inicio:p_inicio,meses:p_meses,fin,tramos:[],renovacion_solicitada:null}); return {fin}; },
    programa_ampliar({pid,p_meses}){ const p=DB.programas.find(x=>x.paciente_id===pid); const desde=p.fin>=today?p.fin:today; const d=new Date(desde+'T12:00:00'); d.setMonth(d.getMonth()+(p_meses||3)); const hasta=d.toISOString().slice(0,10); p.tramos.push({desde,hasta,meses:p_meses||3}); p.fin=hasta; p.renovacion_solicitada=null; return {fin:hasta}; },
    programa_descartar_renovacion({pid}){ const p=DB.programas.find(x=>x.paciente_id===pid); p.renovacion_solicitada=null; },
    mis_sugerencias(){ return DB.sugerencias.filter(s=>s.user_id===uid()&&s.origen==='profesional').sort((a,b)=>b.id-a.id).map(s=>({id:s.id,categoria:s.categoria,texto:s.texto,estado:s.estado,respuesta:s.respuesta,nuevo:!s.visto_autor&&s.estado!=='nueva',mes:s.mes})); },
    sugerencias_vistas(){ DB.sugerencias.filter(s=>s.user_id===uid()).forEach(s=>s.visto_autor=true); },
    eliminar_paciente({p_cid,p_pid}){ ['registros','citas','programas','portal_envios','portal_accesos','portal_items','objetivos','asignaciones'].forEach(t=>{ if(DB[t]) DB[t]=DB[t].filter(r=>r.paciente_id!==p_pid); }); DB.mensajes=(DB.mensajes||[]).filter(m=>m.hilo!=='pac:'+p_pid); DB.fotos=(DB.fotos||[]).filter(f=>!(f.tipo==='pac'&&f.ref===p_pid)); DB.pacientes=DB.pacientes.filter(x=>x.id!==p_pid); save(); return {ok:true,rutas:[]}; },
    perfil_guardar({p_nombre,p_profesion,p_colegiado,p_presentacion}){ const u=window.__USER; const m=DB.miembros.find(x=>x.user_id===u); if(m&&p_nombre) m.nombre_profesional=p_nombre; DB.perfil_prof=(DB.perfil_prof||[]).filter(x=>x.user_id!==u); DB.perfil_prof.push({consulta_id:CID,user_id:u,profesion:p_profesion,colegiado:p_colegiado,presentacion:p_presentacion}); save(); return true; },
    portal_equipo_perfiles(){ return DB.miembros.map(m=>{ const pp=(DB.perfil_prof||[]).find(x=>x.user_id===m.user_id)||{}; const f=(DB.fotos||[]).find(x=>x.tipo==='prof'&&x.ref===m.user_id); return {nombre:m.nombre_profesional,profesion:pp.profesion||null,presentacion:pp.presentacion||null,foto:f?f.data:null}; }); },
    portal_perfil(){ const yo=RPC.portal_yo(); if(!yo) return null; const p=DB.pacientes.find(x=>x.id===yo.paciente_id)||{}; const di=p.datos_identidad||{}; const a=(DB.portal_accesos||[]).find(x=>x.paciente_id===yo.paciente_id); return {apodo:di.apodo||null,sin_recordatorios:!!di.sin_recordatorios,email:a?a.email:null}; },
    portal_perfil_guardar({p_apodo,p_sin_recordatorios}){ const yo=RPC.portal_yo(); const p=DB.pacientes.find(x=>x.id===yo.paciente_id); p.datos_identidad=Object.assign({},p.datos_identidad||{},{apodo:(p_apodo||'').trim()||null,sin_recordatorios:!!p_sin_recordatorios}); save(); return true; },
    portal_mi_foto(){ const yo=RPC.portal_yo(); if(!yo) return null; const f=(DB.fotos||[]).find(x=>x.tipo==='pac'&&x.ref===yo.paciente_id); return f?f.data:null; },
    portal_mi_foto_guardar({p_data}){ const yo=RPC.portal_yo(); DB.fotos=(DB.fotos||[]).filter(x=>!(x.tipo==='pac'&&x.ref===yo.paciente_id)); if(p_data) DB.fotos.push({consulta_id:CID,tipo:'pac',ref:yo.paciente_id,data:p_data}); save(); return true; },
    portal_fotos_equipo(){ return (DB.fotos||[]).filter(f=>f.tipo==='prof').map(f=>{ const m=DB.miembros.find(x=>x.user_id===f.ref); return {nombre:m?m.nombre_profesional:'', data:f.data}; }); },
    portal_programa(){ const yo=RPC.portal_yo(); if(!yo) return null; const p=DB.programas.find(x=>x.paciente_id===yo.paciente_id); if(!p) return {definido:false}; const d=new Date(p.fin+'T12:00:00'); d.setMonth(d.getMonth()+6); return {definido:true,inicio:p.inicio,fin:p.fin,meses:p.meses,ampliaciones:p.tramos.length,hoy:today,estado:today>p.fin?'terminado':'activo',acceso_hasta:d.toISOString().slice(0,10),renovacion_solicitada:p.renovacion_solicitada}; },
    portal_solicitar_renovacion(){ const yo=RPC.portal_yo(); const p=DB.programas.find(x=>x.paciente_id===yo.paciente_id); if(!p.renovacion_solicitada) p.renovacion_solicitada=new Date().toISOString(); return {ok:true}; },
    portal_mis_sugerencias(){ const yo=RPC.portal_yo(); if(!yo) return null; const p=DB.programas.find(x=>x.paciente_id===yo.paciente_id); const mine=DB.sugerencias.filter(s=>s.paciente_id===yo.paciente_id); let toca=null;
      if(p){ const d30=add(p.inicio,30), f7=add(p.fin,-7), f60=add(p.fin,60);
        for(const m of ['fin','mes1']){ if(toca) break; if(m==='mes1'&&!(today>=d30&&today<=p.fin)) continue; if(m==='fin'&&!(today>=f7&&today<=f60)) continue; const xs=mine.filter(s=>s.momento===m); if(xs.some(s=>!s.omitida)) continue; if(xs.filter(s=>s.omitida).length>=2) continue; if(xs.some(s=>s.omitida&&Date.now()-Date.parse(s.creado_en)<7*864e5)) continue; toca=m; } }
      return {toca, novedades:mine.filter(s=>!s.omitida&&!s.visto_autor&&['hecha','estudio'].includes(s.estado)).map(s=>({id:s.id,estado:s.estado,respuesta:s.respuesta,texto:(s.texto||s.ayudo||'').slice(0,140)}))}; },
    portal_sugerir(a){ const yo=RPC.portal_yo(); DB.sugerencias.push({id:DB.sugerencias.length+1,consulta_id:CID,origen:'paciente',paciente_id:yo.paciente_id,user_id:uid(),momento:a.p_momento,categoria:a.p_categoria||'general',puntuacion:a.p_puntuacion,recomendaria:a.p_recomendaria,ayudo:a.p_ayudo,texto:a.p_texto,omitida:!!a.p_omitir,estado:'nueva',mes:today.slice(0,7),visto_autor:false,creado_en:new Date().toISOString()}); return {ok:true}; },
    portal_sugerencias_vistas(){ const yo=RPC.portal_yo(); DB.sugerencias.filter(s=>s.paciente_id===yo.paciente_id).forEach(s=>s.visto_autor=true); },
    mis_hilos(){ const me=uid(); const vis=DB.mensajes.filter(m=>m.hilo==='equipo'||m.hilo.startsWith('pac:')||(m.hilo.startsWith('dm:')&&m.hilo.includes(me))); const g={}; vis.forEach(m=>{ (g[m.hilo]=g[m.hilo]||[]).push(m); });
      return Object.entries(g).map(([h,xs])=>{ const l=(DB.mensajes_leidos.find(x=>x.user_id===me&&x.hilo===h)||{}).leido_hasta||0; const u=xs[xs.length-1]; return {hilo:h,sin_leer:xs.filter(x=>x.id>l&&x.autor!==me).length,ult_id:u.id,ult_texto:u.texto.slice(0,90),ult_autor:u.autor_nombre,ult_en:u.creado_en}; }).sort((a,b)=>b.ult_id-a.ult_id); },
    portal_mensajes(){ const yo=RPC.portal_yo(); const h='pac:'+yo.paciente_id; const l=(DB.mensajes_leidos.find(x=>x.user_id===uid()&&x.hilo===h)||{}).leido_hasta||0; const xs=DB.mensajes.filter(m=>m.hilo===h); return {mensajes:xs.map(m=>({id:m.id,yo:m.autor_tipo==='paciente',autor:m.autor_tipo==='paciente'?null:m.autor_nombre,texto:m.texto,en:m.creado_en})),leido_hasta:l,sin_leer:xs.filter(m=>m.autor_tipo==='profesional'&&m.id>l).length}; },
    portal_mensaje_enviar({p_texto}){ const yo=RPC.portal_yo(); DB.mensajes.push({id:DB.mensajes.length+1,consulta_id:CID,hilo:'pac:'+yo.paciente_id,paciente_id:yo.paciente_id,autor:uid(),autor_tipo:'paciente',autor_nombre:'Juan',texto:p_texto,creado_en:new Date().toISOString()}); return {ok:true}; },
    portal_mensajes_leidos({p_hasta}){ const yo=RPC.portal_yo(); const h='pac:'+yo.paciente_id; DB.mensajes_leidos=DB.mensajes_leidos.filter(x=>!(x.user_id===uid()&&x.hilo===h)); DB.mensajes_leidos.push({user_id:uid(),hilo:h,leido_hasta:p_hasta}); },
    hacer_copia(){ DB.copias.unshift({id:DB.copias.length+1,consulta_id:CID,creada_en:new Date().toISOString(),origen:'manual',pacientes:2,tamano:30000,datos:{version:1}}); return {ok:true}; },
  };
  const client={
    from:Q,
    rpc(n,args){ try{ const r=RPC[n]?RPC[n](args||{}):null; save(); return Promise.resolve({data:r,error:null}); }catch(e){ return Promise.resolve({data:null,error:{message:e.message}}); } },
    auth:{
      getSession(){ return ok({session:DB.session}); },
      getUser(){ return ok({user:DB.session?DB.session.user:null}); },
      onAuthStateChange(){ return {data:{subscription:{unsubscribe(){}}}}; },
      signOut(){ DB.session=null; save(); return ok(null); },
      signInWithPassword(){ return ok({}); },
      updateUser(){ return ok({}); },
    },
    functions:{ invoke(n,o){ window.__INV=(window.__INV||[]).concat([o.body]); if(o.body.accion==='accesos'){ return Promise.resolve({data:{ok:true,profesionales:DB.miembros.map(m=>({user_id:m.user_id,rol:m.rol,nombre:m.nombre_profesional,email:(m.nombre_profesional||'x').split(' ')[0].toLowerCase()+'@aoi.test',ultimo:m.rol==='director'?new Date().toISOString():null,provisional:m.rol!=='director'})), pacientes:(DB.portal_accesos||[]).map(a=>({paciente_id:a.paciente_id,email:a.email,activo:a.activo!==false,ultimo:new Date(Date.now()-864e5).toISOString(),provisional:true}))},error:null}); } if(o.body.accion==='alta_profesional'){ DB.miembros.push({user_id:'u_new',consulta_id:CID,rol:o.body.rol,nombre_profesional:o.body.nombre}); save(); } return Promise.resolve({data:{ok:true,nuevo:true},error:null}); } },
    storage:{ from(){ return { upload(){ return ok({}); }, createSignedUrl(){ return ok({signedUrl:'about:blank'}); }, remove(){ return ok(null);} }; } },
  };
  window.supabase={ createClient(){ return client; } };
})();
