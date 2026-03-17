
const KB={
  saludos:['hola','buenos','buenas','hey','hi'],
  producto:['harina','galleta','torta','pan','postre','producto','catalogo'],
  contacto:['contacto','telefono','email','correo','direccion','ubicaci'],
  horario:['horario','hora','abre','cierra','lunes','viernes'],
  reclamo:['reclamo','queja','problema','devoluci','defecto','malo'],
  trabajo:['trabajo','empleo','vacante','contratar','trabaja','postul','cv'],
  pedido:['pedido','compra','pedir','cotiz','precio','distribuci'],
};
const R={
  saludos:['👋 ¡Bienvenido a **Soluciones de Harina**! Soy **Harinita🌾** 🌾 ¿En qué puedo ayudarte?','🌾 ¡Hola! ¿Sobre qué necesitas información?'],
  producto:['🍪 Fabricamos **harinas**, galletas artesanales, tortas, panes y postres. ¿Te interesa alguno?','🎂 Nuestra línea incluye Harina Premium, Galletas de Mantequilla, Tortas Personalizadas y Pan Artesanal.'],
  contacto:['📞 Contáctanos:\n📱 WhatsApp: +57 314 8267299\n📧 info@solucionesdeharina.com\nO ve a la sección **Contacto**.'],
  horario:['🕐 **Horario:**\nLun–Vie: 8AM – 6PM\nSáb: 8AM – 2PM\nDom y festivos: Cerrado'],
  reclamo:['😟 Ve a la sección **Reclamos** y radica tu caso. Respondemos en máximo **5 días hábiles**.'],
  trabajo:['💼 Tenemos vacantes disponibles. Ve a **Trabaja con Nosotros** y envía tu hoja de vida.'],
  pedido:['🛒 Cotizaciones:\n📧 pedidos@solucionesdeharina.com\n📱 WhatsApp: +57 314 8267299'],
  default:['🌾 Puedo ayudarte con: **productos**, **pedidos**, **horarios**, **reclamos** o **trabajo**.','💬 Escribe: **productos**, **contacto**, **horario**, **direccion**, **reclamo** o **trabajo**.'],
};
function getR(msg){
  const m=msg.toLowerCase();
  for(const[k,ws]of Object.entries(KB)){if(ws.some(w=>m.includes(w))){const a=R[k];return a[Math.floor(Math.random()*a.length)]}}
  const d=R.default;return d[Math.floor(Math.random()*d.length)];
}
function addM(txt,tipo){
  const c=document.getElementById('chm');if(!c)return;
  const d=document.createElement('div');
  d.className='msg '+tipo;
  d.innerHTML=txt.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
  c.appendChild(d);c.scrollTop=c.scrollHeight;
}
function enviarMensaje(){
  const i=document.getElementById('chi');if(!i)return;
  const t=i.value.trim();if(!t)return;
  addM(t,'usr');i.value='';
  const c=document.getElementById('chm');
  const ty=document.createElement('div');ty.className='msg bot';ty.id='ty';ty.innerHTML='<em>Harinita escribe…</em>';
  c.appendChild(ty);c.scrollTop=c.scrollHeight;
  setTimeout(()=>{document.getElementById('ty')?.remove();addM(getR(t),'bot')},700+Math.random()*600);
}
function toggleChat(){
  const p=document.getElementById('chp');if(!p)return;
  p.classList.toggle('op');
  const c=document.getElementById('chm');
  if(p.classList.contains('op')&&c&&c.children.length===0){
    setTimeout(()=>{
      addM('👋 ¡Hola! Soy **Harinita**, asistente de **Soluciones de Harina** 🌾','bot');
      setTimeout(()=>addM('Escribe: **productos**, **pedidos**, **horario**, **trabajo** o **reclamo**.','bot'),900);
    },300);
  }
}
document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('chi')?.addEventListener('keypress',e=>{if(e.key==='Enter')enviarMensaje()});
});
window.toggleChat=toggleChat;
window.enviarMensaje=enviarMensaje;
