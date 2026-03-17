/* ================================================
   SOLUCIONES DE HARINA — main.js
   ================================================ */
function mostrarSeccion(id){
  document.querySelectorAll('.sec').forEach(s=>s.classList.remove('on'));
  document.querySelectorAll('.nl').forEach(l=>l.classList.remove('on'));
  const s=document.getElementById(id);
  if(s){s.classList.add('on');window.scrollTo({top:0,behavior:'smooth'})}
  document.querySelectorAll('.nl').forEach(l=>{if(l.dataset.s===id)l.classList.add('on')});
  document.querySelector('.navlist')?.classList.remove('op');
  document.querySelector('.hbg')?.classList.remove('op');
}
document.querySelectorAll('.nl').forEach(l=>{
  l.addEventListener('click',()=>{if(l.dataset.s)mostrarSeccion(l.dataset.s)});
});
document.querySelector('.hbg')?.addEventListener('click',function(){
  this.classList.toggle('op');
  document.querySelector('.navlist')?.classList.toggle('op');
});
window.addEventListener('scroll',()=>{
  document.getElementById('navbar')?.classList.toggle('sc',window.scrollY>55);
});
(function(){
  const em=['🌾','🍪','🎂','🥐','🍰','🧁','🥖','🫓'];
  const c=document.getElementById('pts');
  if(!c)return;
  for(let i=0;i<10;i++){
    const el=document.createElement('div');
    el.className='pt';
    el.textContent=em[i%em.length];
    el.style.left=Math.random()*98+'vw';
    el.style.top=Math.random()*98+'vh';
    el.style.setProperty('--d',(6+Math.random()*7)+'s');
    el.style.animationDelay=(Math.random()*5)+'s';
    c.appendChild(el);
  }
})();
function mostrarToast(msg,tipo='success'){
  const t=document.getElementById('toast');
  if(!t)return;
  const ic={success:'✅',error:'❌',info:'ℹ️',warning:'⚠️'};
  t.innerHTML=(ic[tipo]||'')+' '+msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t=setTimeout(()=>t.classList.remove('show'),3800);
}
window.mostrarSeccion=mostrarSeccion;
window.mostrarToast=mostrarToast;
