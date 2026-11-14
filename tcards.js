(()=>{const w=document.querySelector('.tcards');if(!w)return;
const cs=[...w.querySelectorAll('.tcard')],hov=matchMedia('(hover:hover) and (pointer:fine)');
const set=i=>cs.forEach((c,k)=>{const on=k===i;c.classList.toggle('on',on);c.setAttribute('aria-expanded',on)});
cs.forEach((c,i)=>{
c.addEventListener('click',()=>set(i));
c.addEventListener('focus',()=>set(i));
c.addEventListener('mouseenter',()=>{if(hov.matches&&innerWidth>=1024)set(i)});
c.addEventListener('keydown',e=>{const n=e.key==='ArrowRight'||e.key==='ArrowDown'?1:e.key==='ArrowLeft'||e.key==='ArrowUp'?-1:0;
if(n){e.preventDefault();cs[(i+n+cs.length)%cs.length].focus()}else if(e.key==='Enter'||e.key===' '){e.preventDefault();set(i)}})});
set(0)})();
