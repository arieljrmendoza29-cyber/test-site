import*as THREE from'three';
const D=document,B=D.body,scale=+B.dataset.scale||1,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const G=['radial-gradient(circle,#fff,#ecefff 35%,#c2d1ff)','radial-gradient(circle,#fff,#e8fbfe 38%,#a5eaf5)','radial-gradient(circle,#fff,#f0f1ff 38%,#c9ccff)'];
const ctl={progress:0,started:!!window.__ld},mouse={x:99,y:99,down:false};let stage=-1;
const sc=()=>{const p=scrollY/(innerHeight||1)*scale;ctl.progress=p;const s=p>1.55?2:p>.7?1:0;if(s!==stage){stage=s;D.getElementById('bg').style.background=G[s]}};
addEventListener('scroll',sc,{passive:true});addEventListener('resize',sc);sc();
addEventListener('pointermove',e=>{mouse.x=e.clientX/innerWidth*2-1;mouse.y=-e.clientY/innerHeight*2+1});
addEventListener('mousedown',()=>mouse.down=true);addEventListener('mouseup',()=>mouse.down=false);
addEventListener('loader-done',()=>ctl.started=true);
try{
const cv=D.getElementById('field'),W=()=>innerWidth,H=()=>innerHeight;
const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(38,W()/H(),.1,100);cam.position.set(0,0,11);
const mob=W()<768,R=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true,powerPreference:'high-performance'});
R.setPixelRatio(Math.min(devicePixelRatio,mob?1.5:2));R.setSize(W(),H());R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.15;R.shadowMap.enabled=!mob;R.shadowMap.type=THREE.PCFSoftShadowMap;
const C=h=>new THREE.Color(h),P=(a,b,c,d,e)=>({pastel:C(a),light:C(b),medium:C(c),deep:C(d),glass:C(e)});
const pal=[P('#ECEFFF','#A8C1FF','#2F69FF','#0A33BF','#4D80FF'),P('#E6FAFD','#8EE3EF','#22BCD4','#0E7C93','#3ECBE0'),P('#EEF0FF','#B3B9FF','#5B63F0','#2B2FA8','#7B82FF')];
const ROLES=['pastel','light','medium','deep','glass'],cur=P('#fff','#fff','#fff','#fff','#fff');
const hemi=new THREE.HemisphereLight(0xffffff,pal[0].medium.clone(),1.6);scene.add(hemi);
const L=(i,x,y,z)=>{const l=new THREE.DirectionalLight(0xffffff,i);l.position.set(x,y,z);scene.add(l);return l};
const key=L(1.4,-6,10,8);key.castShadow=!mob;Object.assign(key.shadow.mapSize,{width:2048,height:2048});Object.assign(key.shadow.camera,{near:.5,far:30,left:-8,right:8,top:8,bottom:-8});key.shadow.bias=-.0003;key.shadow.radius=12;
L(1.25,8,7,-8);L(.4,0,0,11);L(.3,-9,-2,4);
let vw=10,vh=6;const fr=()=>{vh=2*Math.tan(THREE.MathUtils.degToRad(cam.fov/2))*cam.position.z;vw=vh*W()/H()};fr();
const N=mob?54:96,geo=new THREE.SphereGeometry(1,48,48),balls=[];
for(let i=0;i<N;i++){const q=Math.random(),r=q<.3?.27+Math.random()*.12:q<.8?.42+Math.random()*.18:.66+Math.random()*.21,gl=Math.random()<.22;let role='glass',m;
if(gl)m=new THREE.MeshPhysicalMaterial({color:pal[0].glass,roughness:.08,clearcoat:1,clearcoatRoughness:.03,transmission:.95,ior:1.485,thickness:2.2,specularIntensity:1,attenuationColor:pal[0].pastel,attenuationDistance:1,emissive:pal[0].glass,emissiveIntensity:.12,transparent:true});
else{const c=Math.random();role=c<.25?'pastel':c<.55?'light':c<.85?'medium':'deep';m=new THREE.MeshPhysicalMaterial({color:pal[0][role],roughness:.44,clearcoat:.24,clearcoatRoughness:.35,emissive:pal[0][role],emissiveIntensity:.08,transparent:true})}
const g=new THREE.Group(),s=new THREE.Mesh(geo,m);s.scale.setScalar(r);s.castShadow=s.receiveShadow=true;g.add(s);scene.add(g);
balls.push({id:i,radius:r,mass:r**3,position:new THREE.Vector3(),velocity:new THREE.Vector3(),g,sphere:s,m,role,gl,vs:r,t:new THREE.Vector3()})}
const mean=balls.reduce((a,b)=>a+b.radius,0)/N;let shapeScale=1;
const inH=(x,y)=>{const a=x*x+y*y-1;return a*a*a-x*x*y*y*y<=0};
const heart=()=>{const S=Math.min(vw*.3,vh*.27),cy=-vh*.03;shapeScale=Math.max(.3,Math.min(1,S*.45/2.3/mean));for(const b of balls){let x,y,t=0;do{x=(Math.random()*2-1)*1.25;y=Math.random()*2.55-1.4;t++}while(!inH(x,y)&&t<60);b.t.set(x*S,(y+.12)*S+cy,(Math.random()-.5)*.35)}};heart();
const far=v=>{const r=Math.max(vw,vh)*1.5;for(const b of balls){const a=Math.random()*6.283,x=Math.cos(a)*r*1.25,y=Math.sin(a)*r*.85,z=(Math.random()-.5)*4;b.position.set(x,y,z);b.g.position.copy(b.position);v?b.velocity.set(-x,-y,-z).normalize().multiplyScalar(.08+Math.random()*.05):b.velocity.set(0,0,0)}};far(false);
const mp=new THREE.Vector3(),mw=new THREE.Vector3(),pm=new THREE.Vector3(),d=new THREE.Vector3(),cd=new THREE.Vector3(),rv=new THREE.Vector3(),dp=new THREE.Vector3(),ax=new THREE.Vector3();
const c01=v=>v<0?0:v>1?1:v,ss=(a,b,x)=>{const t=c01((x-a)/(b-a));return t*t*(3-2*t)},lp=(a,b,t)=>a+(b-a)*t;
let ls=false,es=0,ms=0;
const step=(time,prog)=>{
if(!RM){mp.set(mouse.x,mouse.y,.5).unproject(cam);const dr=mp.sub(cam.position).normalize();mw.copy(cam.position).add(dr.multiplyScalar(-cam.position.z/dr.z))}
const hF=1-ss(.3,.8,prog),dF=ss(.4,.95,prog)*(1-ss(1.25,1.75,prog)),fF=ss(2.7,3.45,prog),sF=ss(1.4,2.05,prog)*(1-ss(2.55,3,prog)),bl=ss(.55,1.05,prog),bp=ss(1.4,1.95,prog);
for(const r of ROLES)cur[r].copy(pal[0][r]).lerp(pal[1][r],bl).lerp(pal[2][r],bp);hemi.groundColor.copy(cur.medium);
const eT=1-Math.pow(1-c01((time-es)/2.2),3),aB=lp(7.5,1,eT),mi=!RM&&(Math.abs(mouse.x)<.99||Math.abs(mouse.y)<.99);
ms=mi?Math.min(3,mw.distanceTo(pm)):0;pm.copy(mw);
let dm=lp(lp(lp(.91,.992,dF),.9,sF),.985,fF);const cA=Math.max(hF,eT<1?1:0),cz=cam.position.z;
for(const b of balls){const p=b.position,v=b.velocity;
if(hF>.01){v.x+=Math.sin(time*.4+b.id*1.5)*4e-4*b.radius*hF;v.y+=Math.cos(time*.5+b.id*1.2)*4e-4*b.radius*hF;v.z+=Math.sin(time*.35+b.id)*1e-4*hF}
const cs=.0035*aB*cA;if(cs>1e-5){v.x-=p.x*cs*.38;v.y-=p.y*cs*1.85;v.z-=p.z*cs*1.8}
if(dF>.001)v.y-=.011*dF;
if(sF>.001){const k=.06*sF;v.x+=(b.t.x-p.x)*k;v.y+=(b.t.y-p.y)*k;v.z+=(b.t.z-p.z)*k}
if(fF>.001){const st=(b.id*.6180339887)%1,l=ss(st*.55,st*.55+.45,fF);v.z+=.05*l;v.x+=p.x*.006*l;v.y+=p.y*.006*l}
if(mi){d.subVectors(p,mw);const rd=d.length(),dn=mouse.down,AR=dn?6.16:4.4,AF=dn?.085:.05;if(rd<AR&&rd>1e-4){const q=rd/AR,push=(1-q*q*(3-2*q))*AF*(1+ms*3.2);d.normalize();d.z*=.12;d.normalize();v.addScaledVector(d,push)}}
v.multiplyScalar(dm);p.add(v);
const c=b.gl?cur.glass:cur[b.role];b.m.color.copy(c);b.m.emissive.copy(c);b.m.opacity=fF>.001?1-ss(cz-2.6,cz-.3,p.z):1;
b.vs+=(b.radius*(1-(1-shapeScale)*sF)-b.vs)*.12;b.sphere.scale.setScalar(b.vs)}
const cS=.28*(1-.93*sF)*(1-fF);
for(let s=0;s<4;s++)for(let i=0;i<N;i++)for(let j=i+1;j<N;j++){const a=balls[i],b=balls[j];cd.subVectors(b.position,a.position);const dist=cd.length(),md=a.vs+b.vs;
if(dist<md&&dist>.001){const ov=md-dist;cd.multiplyScalar(1/dist);const tm=a.mass+b.mass;a.position.addScaledVector(cd,-ov*b.mass/tm*cS);b.position.addScaledVector(cd,ov*a.mass/tm*cS);rv.subVectors(b.velocity,a.velocity);const vn=rv.dot(cd);
if(vn<-1e-4){const im=-1.02*vn/(1/a.mass+1/b.mass);a.velocity.addScaledVector(cd,-im/a.mass);b.velocity.addScaledVector(cd,im/b.mass)}}}
const xb=vw/2-.2,top=vh/2-.05,fl=-vh/2+.05,rs=.3+.35*dF;
for(const b of balls){const p=b.position,v=b.velocity,r=b.vs;
if(fF<.5){if(p.x<-xb-r){p.x=-xb-r;v.x*=-.3}else if(p.x>xb+r){p.x=xb+r;v.x*=-.3}
if(p.y-r<fl){p.y=fl+r;if(v.y<0)v.y=-v.y*rs;if(dF>.3){v.x*=.86;v.z*=.86}}
if(p.y+r>top){p.y=top-r;if(v.y>0)v.y*=-.3}}
if(fF<.02){if(p.z<-2){p.z=-2;v.z*=-.3}else if(p.z>2){p.z=2;v.z*=-.3}}
dp.copy(p).sub(b.g.position);if(dp.lengthSq()>1e-6){ax.set(dp.y,-dp.x,0).normalize();b.g.rotateOnWorldAxis(ax,dp.length()/b.radius*.95)}b.g.position.copy(p)}};
const clock=new THREE.Clock();let ready=false;
const frame=()=>{R.render(scene,cam);if(!ready){ready=true;window.__fr=1;dispatchEvent(new Event('field-ready'))}};
const loop=()=>{requestAnimationFrame(loop);const t=clock.getElapsedTime();
if(ctl.started&&!ls){ls=true;es=t;far(true)}
if(!ls)return frame();step(t,ctl.progress);frame()};
if(RM){far(false);for(const b of balls)b.position.set((Math.random()-.5)*6,(Math.random()-.5)*2,(Math.random()-.5)*2);ls=true;es=-100;for(let i=0;i<300;i++)step(100,0);frame()}else loop();
new ResizeObserver(()=>{cam.aspect=W()/H();cam.updateProjectionMatrix();R.setSize(W(),H());fr();heart();if(RM)frame()}).observe(D.body);
}catch(e){console.warn('3D background unavailable',e);window.__fr=1;dispatchEvent(new Event('field-ready'))}
