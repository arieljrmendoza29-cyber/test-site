const FORM_ENDPOINT="";/* paste a Formspree/Web3Forms URL here to receive form submissions */
const MAIL="info@systemwisellc.com",D=document,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
D.getElementById('loader')?.remove();window.__ld=1;dispatchEvent(new Event('loader-done'));
const mt=D.getElementById('mt'),nv=D.querySelector('nav');mt.onclick=()=>{const o=nv.classList.toggle('open');mt.setAttribute('aria-expanded',o)};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.2});D.querySelectorAll('.rv').forEach(e=>io.observe(e));
if(!RM&&matchMedia('(pointer:fine)').matches){let tg=scrollY,cu=scrollY,run=false;const mx=()=>D.documentElement.scrollHeight-innerHeight;
const tk=()=>{cu+=(tg-cu)*.09;if(Math.abs(tg-cu)<.5){cu=tg;run=false}scrollTo(0,cu);if(run)requestAnimationFrame(tk)};
addEventListener('wheel',e=>{if(e.ctrlKey||e.target.closest('textarea,select'))return;e.preventDefault();if(!run){tg=cu=scrollY}tg=Math.max(0,Math.min(mx(),tg+e.deltaY*(e.deltaMode?32:1)));if(!run){run=true;requestAnimationFrame(tk)}},{passive:false});
addEventListener('scroll',()=>{if(!run)tg=cu=scrollY},{passive:true})}
const sv=new URLSearchParams(location.search).get('service');if(sv){const s=D.querySelector('select[name=service]');if(s)[...s.options].forEach(o=>{if(o.dataset.k===sv)s.value=o.value})}
D.querySelectorAll('form').forEach(f=>f.addEventListener('submit',async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f)),ok=f.querySelector('.ok');let sent=false;
if(FORM_ENDPOINT){try{sent=(await fetch(FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(d)})).ok}catch(x){}}
if(!sent){location.href='mailto:'+MAIL+'?subject='+encodeURIComponent('Website request: '+(d.service||d.company||'General'))+'&body='+encodeURIComponent(Object.entries(d).map(([k,v])=>k+': '+v).join('\n'));sent=true}
if(sent){ok.style.display='block';f.reset();ok.scrollIntoView({block:'center'})}}));
/* text animations */
(()=>{const T=D.querySelectorAll('header .logo span,header nav,main h1,main h2,main h3,main p,main li,main blockquote,main figcaption,main .st b,main legend,footer h4,footer .fg>div,.cp'),hs=[],ts=[];
T.forEach((el,k)=>{if(el.closest('.mq'))return;
if(/^H[123]$/.test(el.tagName)&&!el.children.length){const t=el.textContent.trim();el.setAttribute('aria-label',t);el.classList.remove('rv');el.innerHTML=t.split(/\s+/).map((w,i)=>'<span class="w" aria-hidden="true"><span style="--i:'+i+'">'+w+'</span></span>').join(' ');hs.push(el)}
else{el.classList.add('tx');el.style.setProperty('--d',(k%6)*70+'ms');ts.push(el)}});
const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-t');o.unobserve(e.target)}}),{threshold:.15});
let on=false;const go=()=>{if(on)return;on=true;hs.concat(ts).forEach(e=>o.observe(e))};go()})();
