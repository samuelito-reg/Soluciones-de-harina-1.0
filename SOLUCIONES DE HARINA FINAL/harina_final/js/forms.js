/* ================================================
   SOLUCIONES DE HARINA — forms.js
   Envía datos a PHP → MySQL (XAMPP)
   ================================================ */
window.TIPO_R='';
window.TIPO_P='peticion';

async function post(archivo,datos){
  try{
    const r=await fetch('php/'+archivo,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(datos)});
    return await r.json();
  }catch(e){
    return{ok:false,msg:'❌ Error de conexión. Asegúrate de abrir el sitio desde http://localhost/harina_final/'};
  }
}

/* ── TIPO RECLAMO ── */
function selTipo(tipo,el){
  window.TIPO_R=tipo;
  document.querySelectorAll('.tb').forEach(b=>b.classList.remove('sel'));
  if(el)el.classList.add('sel');
  const h=document.getElementById('th');if(h)h.value=tipo;
}

/* ── TRABAJA ── */
function initTrabaja(){
  const bf=document.getElementById('baf');
  const if2=document.getElementById('ifoto');
  if(bf&&if2){
    bf.addEventListener('click',()=>if2.click());
    if2.addEventListener('change',e=>{
      const f=e.target.files[0];if(!f)return;
      const n=prompt('Nombre del empleado:','Nombre')||'Empleado';
      const c=prompt('Cargo:','Cargo')||'Cargo';
      const r=new FileReader();
      r.onload=ev=>{addFoto(ev.target.result,n,c);mostrarToast('¡Foto agregada! 📸','success')};
      r.readAsDataURL(f);
    });
  }
  const bcv=document.getElementById('bcv');
  const icv=document.getElementById('icv');
  if(bcv&&icv){
    bcv.addEventListener('click',()=>icv.click());
    icv.addEventListener('change',e=>{
      const f=e.target.files[0];
      if(f){bcv.innerHTML=`<span style="font-size:2rem">📄</span><p>${f.name}</p>`;mostrarToast('CV adjuntado ✅','info')}
    });
  }
  const form=document.getElementById('fpost');
  if(!form)return;
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const btn=form.querySelector('[type=submit]');
    btn.disabled=true;btn.textContent='⏳ Enviando...';
    const r=await post('guardar_postulacion.php',Object.fromEntries(new FormData(form)));
    mostrarToast(r.msg,r.ok?'success':'error');
    if(r.ok){form.reset();if(bcv)bcv.innerHTML='<span style="font-size:2rem">📎</span><p>Clic para adjuntar tu CV</p>'}
    btn.disabled=false;btn.innerHTML='🚀 Enviar Postulación';
  });
}
function addFoto(src,n,c){
  const g=document.getElementById('egrid');if(!g)return;
  const d=document.createElement('div');d.className='ec fi';
  d.innerHTML=`<div class="ef"><img src="${src}" alt="${n}"></div><h4>${n}</h4><p>${c}</p><small style="color:var(--dorado);font-weight:800;font-size:.73rem">✦ Equipo</small>`;
  const w=document.getElementById('waf');if(w)g.insertBefore(d,w);else g.appendChild(d);
}

/* ── CONTACTO ── */
function initContacto(){
  const form=document.getElementById('fcon');if(!form)return;
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const btn=form.querySelector('[type=submit]');
    btn.disabled=true;btn.textContent='⏳ Enviando...';
    const r=await post('guardar_contacto.php',Object.fromEntries(new FormData(form)));
    mostrarToast(r.msg,r.ok?'success':'error');
    if(r.ok)form.reset();
    btn.disabled=false;btn.innerHTML='📬 Enviar Mensaje';
  });
}

/* ── RECLAMOS ── */
function initReclamo(){
  const form=document.getElementById('frec');if(!form)return;
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const h=document.getElementById('th');
    const tipo=(h&&h.value.trim())||window.TIPO_R||'';
    if(!tipo){
      mostrarToast('⚠️ Selecciona el tipo de reclamo primero','warning');
      document.querySelector('.tgrid')?.scrollIntoView({behavior:'smooth',block:'center'});
      return;
    }
    const btn=form.querySelector('[type=submit]');
    btn.disabled=true;btn.textContent='⏳ Radicando...';
    const datos=Object.fromEntries(new FormData(form));
    datos.tipo=tipo;
    const r=await post('guardar_reclamo.php',datos);
    if(r.ok){
      const box=document.getElementById('radbox');
      const num=document.getElementById('numrad');
      if(box&&num){num.textContent=r.numero_radicado;box.classList.add('vis');box.scrollIntoView({behavior:'smooth'})}
      form.reset();window.TIPO_R='';
      if(h)h.value='';
      document.querySelectorAll('.tb').forEach(b=>b.classList.remove('sel'));
    }
    mostrarToast(r.msg,r.ok?'success':'error');
    btn.disabled=false;btn.innerHTML='📋 Radicar Reclamo';
  });
}

/* ── PQR ── */
function initPQR(){
  const form=document.getElementById('fpqr');if(!form)return;
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const btn=form.querySelector('[type=submit]');
    btn.disabled=true;btn.textContent='⏳ Radicando...';
    const datos=Object.fromEntries(new FormData(form));
    datos.tipo_pqr=window.TIPO_P;
    const r=await post('guardar_pqr.php',datos);
    if(r.ok){
      mostrarToast(r.msg+' · N° '+r.numero_pqr,'success');
      document.querySelector('#p1')?.classList.add('done');
      document.querySelector('#p2')?.classList.add('cur');
      form.reset();
    }else{mostrarToast(r.msg,'error')}
    btn.disabled=false;btn.innerHTML='📝 Radicar PQR';
  });
}
function cambioPQR(tipo){
  window.TIPO_P=tipo;
  document.querySelectorAll('.ptab').forEach(t=>t.classList.remove('on'));
  document.querySelector(`.ptab[data-t="${tipo}"]`)?.classList.add('on');
  const tx={
    peticion:'📋 Una <strong>Petición</strong> es una solicitud de información o documentos que necesitas de nuestra empresa.',
    queja:'😟 Una <strong>Queja</strong> expresa tu insatisfacción con nuestros productos o servicios.',
    recurso:'⚖️ Un <strong>Recurso</strong> es la solicitud de revisión de una decisión de nuestra empresa.',
  };
  const el=document.getElementById('pdtx');if(el)el.innerHTML=tx[tipo]||'';
}

document.addEventListener('DOMContentLoaded',()=>{
  initTrabaja();initContacto();initReclamo();initPQR();
  // Sincronización extra tipo reclamo
  document.querySelectorAll('.tb').forEach(btn=>{
    btn.addEventListener('click',function(){
      const m=this.getAttribute('onclick')?.match(/'([^']+)'/);
      const tipo=m?m[1]:'';
      const h=document.getElementById('th');
      if(h&&tipo)h.value=tipo;
      window.TIPO_R=tipo;
    });
  });
});
window.selTipo=selTipo;
window.cambioPQR=cambioPQR;
window.addFoto=addFoto;
