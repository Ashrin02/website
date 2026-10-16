(function(){
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches,root=document.documentElement;
try{var s=localStorage.getItem('theme');if(s)root.setAttribute('data-theme',s)}catch(e){}
document.getElementById('theme').addEventListener('click',function(){
  var c=root.getAttribute('data-theme'),dark=c?c==='dark':matchMedia('(prefers-color-scheme:dark)').matches;
  var n=dark?'light':'dark';root.setAttribute('data-theme',n);try{localStorage.setItem('theme',n)}catch(e){}
});
var menu=document.getElementById('menu'),burger=document.getElementById('burger');
burger.addEventListener('click',function(){var o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
menu.addEventListener('click',function(){menu.classList.remove('open')});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});
var so=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;
  e.target.querySelectorAll('[data-n]').forEach(function(el){var n=+el.dataset.n,s=el.dataset.s,v=0;
    if(rm){el.textContent=n+s;return}
    var t=setInterval(function(){v++;el.textContent=v+(v>=n?s:'');if(v>=n)clearInterval(t)},Math.max(60,900/n))});
  so.unobserve(e.target)})},{threshold:.4});
var st=document.querySelector('.stats');if(st)so.observe(st);
var links=[].slice.call(menu.querySelectorAll('a')),secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))});
function onScroll(){var h=root.scrollHeight-root.clientHeight;document.getElementById('progress').style.width=(h>0?root.scrollTop/h*100:0)+'%';
  var y=root.scrollTop+120,cur=-1;secs.forEach(function(s,i){if(s&&s.offsetTop<=y)cur=i});
  links.forEach(function(a,i){a.classList.toggle('active',i===cur)})}
addEventListener('scroll',onScroll,{passive:true});onScroll();
document.getElementById('yr').textContent=new Date().getFullYear();
})();

/* ---- extra animation ---- */
(function(){
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
// rotating role text
var roles=['Bioinformatician','Variant Curator','Genome Analyst','PGx & Nutrigenomics Specialist'],ri=0,ci=0,del=false,el=document.getElementById('role');
if(el){if(rm){el.textContent=roles[0]}else(function tick(){var w=roles[ri];ci+=del?-1:1;el.textContent=w.slice(0,ci);var d=del?35:75;
  if(!del&&ci===w.length){del=true;d=1500}else if(del&&ci===0){del=false;ri=(ri+1)%roles.length;d=350}setTimeout(tick,d)})()}
// stagger chips
document.querySelectorAll('.chips').forEach(function(c){[].forEach.call(c.children,function(s,i){s.style.animationDelay=(i*35)+'ms'})});
// timeline line draw
var tl=document.querySelector('.timeline');
function tlp(){if(!tl||rm)return;var r=tl.getBoundingClientRect(),p=(innerHeight*.7-r.top)/r.height;tl.style.setProperty('--p',Math.max(0,Math.min(1,p)))}
addEventListener('scroll',tlp,{passive:true});tlp();
// card tilt
if(!rm&&matchMedia('(hover:hover)').matches){document.querySelectorAll('.card').forEach(function(c){
  c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    c.style.transform='perspective(800px) rotateY('+(x*7)+'deg) rotateX('+(-y*7)+'deg) translateY(-4px)'});
  c.addEventListener('mouseleave',function(){c.style.transform=''})})}
// floating nucleotide background
var cv=document.getElementById('bases');if(!cv||rm)return;var cx=cv.getContext('2d'),W,H,P=[],L='ATGC';
function rs(){var r=devicePixelRatio||1;W=innerWidth;H=innerHeight;cv.width=W*r;cv.height=H*r;cx.setTransform(r,0,0,r,0,0);
  P=[];for(var i=0;i<Math.min(46,W/28);i++)P.push({x:Math.random()*W,y:Math.random()*H,s:11+Math.random()*14,v:.15+Math.random()*.4,d:(Math.random()-.5)*.25,l:L[i%4],a:.07+Math.random()*.12,k:i%2})}
rs();addEventListener('resize',rs);
function draw(){cx.clearRect(0,0,W,H);var cs=getComputedStyle(document.documentElement),c1=cs.getPropertyValue('--ac').trim(),c2=cs.getPropertyValue('--ac2').trim();
  P.forEach(function(p){p.y-=p.v;p.x+=p.d;if(p.y<-20){p.y=H+20;p.x=Math.random()*W}
    cx.globalAlpha=p.a;cx.fillStyle=p.k?c1:c2;cx.font='600 '+p.s+'px ui-monospace,Menlo,monospace';cx.fillText(p.l,p.x,p.y)});
  requestAnimationFrame(draw)}
draw();
})();
