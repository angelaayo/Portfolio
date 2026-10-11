/* ===== dark scene: the tesseract ===== */
(function(){
  var NS="http://www.w3.org/2000/svg";
  var svg=document.getElementById('tess');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var BOOKS=['#833a2f','#7a4428','#2f3f5c','#3a506b','#d6cbac','#c2a878','#b98f52','#4c5a43','#6d5566','#8a94a0','#9c6b3f','#5a6b74','#cbb98f','#7d8a7a'];
  function pick(a){return a[(Math.random()*a.length)|0];}
  function el(n,at){var e=document.createElementNS(NS,n);for(var k in at)e.setAttribute(k,at[k]);return e;}
  function add(e){svg.appendChild(e);return e;}
  var defs=el('defs',{});
  defs.innerHTML=
    '<filter id="hblur" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="9 0.6"/></filter>'+
    '<filter id="vblur" x="-50%" y="-20%" width="200%" height="140%"><feGaussianBlur stdDeviation="0.6 7"/></filter>'+
    '<filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.2"/></filter>'+
    '<radialGradient id="glow" cx="50%" cy="50%" r="50%">'+
      '<stop offset="0%" stop-color="#FBE9BE" stop-opacity=".9"/>'+
      '<stop offset="34%" stop-color="#C79A4E" stop-opacity=".4"/>'+
      '<stop offset="72%" stop-color="#8A6A2E" stop-opacity=".06"/>'+
      '<stop offset="100%" stop-color="#8A6A2E" stop-opacity="0"/></radialGradient>'+
    '<linearGradient id="ceil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a140c"/><stop offset="1" stop-color="#6b5c34"/></linearGradient>'+
    '<linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5c5030"/><stop offset="1" stop-color="#140f09"/></linearGradient>'+
    '<linearGradient id="wallL" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#140f09"/><stop offset="1" stop-color="#5f5433"/></linearGradient>'+
    '<linearGradient id="wallR" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5f5433"/><stop offset="1" stop-color="#140f09"/></linearGradient>'+
    '<linearGradient id="beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FBE9BE" stop-opacity=".55"/><stop offset="100%" stop-color="#FBE9BE" stop-opacity="0"/></linearGradient>';
  add(defs);
  add(el('rect',{x:0,y:0,width:1440,height:900,fill:'#070604'}));
  function lerp(a,b,t){return a+(b-a)*t;}
  function tunnel(vx,vy,outer,s,layers,alpha){
    function frame(i){var k=Math.pow(s,i);return{x:lerp(vx,outer.x,k),y:lerp(vy,outer.y,k),w:outer.w*k,h:outer.h*k};}
    add(el('circle',{cx:vx,cy:vy,r:outer.w*0.32,fill:'url(#glow)','fill-opacity':alpha}));
    for(var i=layers-1;i>=0;i--){
      var fo=frame(i),fi=frame(i+1),depth=1-(i/layers),op=(0.12+0.72*depth)*alpha;
      function band(pts,grad,o){add(el('polygon',{points:pts,fill:grad,'fill-opacity':o,filter:'url(#soft)'}));}
      band(fo.x+','+fo.y+' '+(fo.x+fo.w)+','+fo.y+' '+(fi.x+fi.w)+','+fi.y+' '+fi.x+','+fi.y,'url(#ceil)',op);
      band(fo.x+','+(fo.y+fo.h)+' '+(fo.x+fo.w)+','+(fo.y+fo.h)+' '+(fi.x+fi.w)+','+(fi.y+fi.h)+' '+fi.x+','+(fi.y+fi.h),'url(#floor)',op);
      band(fo.x+','+fo.y+' '+fi.x+','+fi.y+' '+fi.x+','+(fi.y+fi.h)+' '+fo.x+','+(fo.y+fo.h),'url(#wallL)',op*0.9);
      band((fo.x+fo.w)+','+fo.y+' '+(fi.x+fi.w)+','+fi.y+' '+(fi.x+fi.w)+','+(fi.y+fi.h)+' '+(fo.x+fo.w)+','+(fo.y+fo.h),'url(#wallR)',op*0.9);
      var thick=Math.abs(fi.y-fo.y);
      if(thick>7){var count=Math.max(5,Math.round(fi.w/16));
        for(var c=0;c<count;c++){var t=c/count,bx=lerp(fi.x,fi.x+fi.w,t),bw=Math.max(2,(fi.w/count)*0.7);
          add(el('rect',{x:bx,y:fo.y+thick*0.15,width:bw,height:thick*(0.5+Math.random()*0.4),fill:pick(BOOKS),'fill-opacity':(0.3+0.6*depth)*alpha,filter:'url(#vblur)'}));
          var fh=thick*(0.5+Math.random()*0.4);
          add(el('rect',{x:bx,y:(fi.y+fi.h)-fh-thick*0.1,width:bw,height:fh,fill:pick(BOOKS),'fill-opacity':(0.3+0.6*depth)*alpha,filter:'url(#vblur)'}));}}
      var tw=Math.abs(fi.x-fo.x);
      if(tw>7){var cv=Math.max(4,Math.round(fi.h/18));
        for(var r=0;r<cv;r++){var ty=lerp(fi.y,fi.y+fi.h,r/cv),bh=Math.max(2,(fi.h/cv)*0.7);
          add(el('rect',{x:fo.x+tw*0.15,y:ty,width:tw*(0.5+Math.random()*0.4),height:bh,fill:pick(BOOKS),'fill-opacity':(0.25+0.5*depth)*alpha,filter:'url(#hblur)'}));
          add(el('rect',{x:(fi.x+fi.w)-tw*(0.6),y:ty,width:tw*(0.5),height:bh,fill:pick(BOOKS),'fill-opacity':(0.25+0.5*depth)*alpha,filter:'url(#hblur)'}));}}
      add(el('rect',{x:fi.x,y:fi.y,width:fi.w,height:fi.h,fill:'none',stroke:'#F2D79A','stroke-opacity':(0.04+0.22*depth)*alpha,'stroke-width':1}));
    }
  }
  tunnel(726,404,{x:-220,y:-200,w:1880,h:1300},0.72,9,1);
  tunnel(250,150,{x:-260,y:-300,w:900,h:760},0.70,7,0.5);
  tunnel(1210,170,{x:820,y:-320,w:900,h:780},0.70,7,0.45);
  add(el('polygon',{points:'726,318 536,900 916,900',fill:'url(#beam)','fill-opacity':.55,filter:'url(#soft)'}));
  add(el('polygon',{points:'726,336 648,900 804,900',fill:'url(#beam)','fill-opacity':.5,filter:'url(#soft)'}));
  add(el('ellipse',{cx:726,cy:884,rx:158,ry:26,fill:'url(#glow)','fill-opacity':.5,filter:'url(#soft)'}));
  var streakCols=['#CFC6A8','#8FA0A4','#C79A4E','#B9B2A6','#7E8B8F'];
  for(var k=0;k<9;k++){var y=60+Math.random()*780,h=2+Math.random()*5;
    add(el('rect',{x:-60,y:y,width:1560,height:h,fill:streakCols[k%streakCols.length],'fill-opacity':(0.05+Math.random()*0.1).toFixed(2),filter:'url(#hblur)'}));}
  [690,742,560,905,1015].forEach(function(x,idx){
    add(el('rect',{x:x,y:40,width:idx<2?3:2,height:820,fill:'#EAF0F2','fill-opacity':idx<2?0.5:0.22,filter:'url(#soft)'}));});
  add(el('circle',{cx:726,cy:404,r:120,fill:'url(#glow)'}));
  if(!reduce){
    var hero=document.getElementById('hero');
    hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();
      var dx=((e.clientX-r.left)/r.width-0.5),dy=((e.clientY-r.top)/r.height-0.5);
      svg.style.transform='scale(1.06) translate('+(-dx*14).toFixed(1)+'px,'+(-dy*10).toFixed(1)+'px)';});
    hero.addEventListener('pointerleave',function(){svg.style.transform='';});
  }
})();

/* ===== light scene: the meadow ===== */
(function(){
  var NS="http://www.w3.org/2000/svg";
  var svg=document.getElementById('scene');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function E(n,a){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);return e;}
  function add(e,p){(p||svg).appendChild(e);return e;}
  function rnd(a,b){return a+Math.random()*(b-a);}
  var defs=add(E('defs',{}));
  defs.innerHTML=
    '<radialGradient id="sun" cx="50%" cy="50%" r="50%">'+
      '<stop offset="0%" stop-color="#FFF6DA" stop-opacity=".95"/>'+
      '<stop offset="40%" stop-color="#FDE9B6" stop-opacity=".5"/>'+
      '<stop offset="100%" stop-color="#FDE9B6" stop-opacity="0"/></radialGradient>'+
    '<filter id="cloud" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="14"/></filter>'+
    '<filter id="soft2" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3"/></filter>';
  add(E('circle',{cx:1010,cy:300,r:420,fill:'url(#sun)'}));
  var clouds=add(E('g',{id:'clouds'}));
  function cloud(cx,cy,s,op){
    var g=add(E('g',{opacity:op,filter:'url(#cloud)'}),clouds);
    [[0,0,70,38],[55,8,58,32],[-50,10,54,30],[18,-16,46,28],[100,14,40,24],[-96,16,40,24]].forEach(function(p){
      add(E('ellipse',{cx:cx+p[0]*s,cy:cy+p[1]*s,rx:p[2]*s,ry:p[3]*s,fill:'#FDFBF4'}),g);
    });
  }
  cloud(300,150,1.1,.9);cloud(760,110,1.3,.8);cloud(1180,180,1.0,.85);
  cloud(540,250,0.8,.7);cloud(980,230,0.9,.65);cloud(140,280,0.75,.6);
  var tl=add(E('g',{}));
  add(E('path',{d:'M0 560 Q240 520 480 548 T960 536 T1440 548 L1440 640 L0 640 Z',fill:'#8FAE86',opacity:.7,filter:'url(#soft2)'}),tl);
  [ [180,540,60],[250,548,44],[1150,536,66],[1230,546,46],[640,540,52] ].forEach(function(t){
    add(E('ellipse',{cx:t[0],cy:t[1],rx:t[2],ry:t[2]*0.8,fill:'#6E9064',opacity:.75,filter:'url(#soft2)'}),tl);
  });
  [ [120,540,150],[1300,536,150] ].forEach(function(b){
    add(E('rect',{x:b[0],y:b[1],width:9,height:b[2],fill:'#EDEBDD',opacity:.7}),tl);
    for(var i=0;i<4;i++) add(E('rect',{x:b[0],y:b[1]+20+i*32,width:9,height:3,fill:'#3C4430',opacity:.5}),tl);
  });
  function vgrad(id,top,bot){var lg=add(E('linearGradient',{id:id,x1:'0',y1:'0',x2:'0',y2:'1'}),defs);
    lg.innerHTML='<stop offset="0" stop-color="'+top+'"/><stop offset="1" stop-color="'+bot+'"/>';}
  vgrad('gb','#C6D28C','#86A05C'); vgrad('gm','#95B169','#51703C'); vgrad('gf','#618042','#2F4228');
  var fieldG=add(E('linearGradient',{id:'field',x1:'0',y1:'0',x2:'0',y2:'1'}),defs);
  fieldG.innerHTML='<stop offset="0" stop-color="#ABC077"/><stop offset=".45" stop-color="#7E9A52"/><stop offset="1" stop-color="#435C2E"/>';
  add(E('rect',{x:0,y:556,width:1440,height:360,fill:'url(#field)'}));
  for(var i2=0;i2<16;i2++){ add(E('ellipse',{cx:rnd(0,1440),cy:rnd(600,885),rx:rnd(90,240),ry:rnd(28,66),
    fill:(Math.random()<0.5?'#6B8A44':'#BCCB82'),opacity:rnd(.12,.26),filter:'url(#soft2)'})); }
  var texd=''; for(var tx=-10;tx<=1452;tx+=6){var ty=rnd(600,892),th=rnd(9,24),ss=rnd(-7,7);
    texd+='M'+tx+' '+(ty+th).toFixed(1)+' Q'+(tx+ss*0.4).toFixed(1)+' '+(ty+th*0.4).toFixed(1)+' '+(tx+ss).toFixed(1)+' '+ty.toFixed(1);}
  add(E('path',{d:texd,fill:'none',stroke:'#4F6C39','stroke-width':1.4,opacity:.45,'stroke-linecap':'round'}));
  var texd2=''; for(var tx2=-10;tx2<=1452;tx2+=9){var ty2=rnd(600,890),th2=rnd(8,20),ss2=rnd(-6,6);
    texd2+='M'+tx2+' '+(ty2+th2).toFixed(1)+' Q'+(tx2+ss2*0.4).toFixed(1)+' '+(ty2+th2*0.4).toFixed(1)+' '+(tx2+ss2).toFixed(1)+' '+ty2.toFixed(1);}
  add(E('path',{d:texd2,fill:'none',stroke:'#AEC078','stroke-width':1.2,opacity:.4,'stroke-linecap':'round'}));
  function grassLayer(baseY,fillId,colorHi,density,hMin,hMax,sway){
    var g=add(E('g',{}));
    var d='',df='',dh='';
    for(var x=-24;x<=1464;x+=density){
      var bw=density*rnd(1.2,2.0), h=rnd(hMin,hMax), s=rnd(-sway,sway);
      var x0=x-bw/2, x1=x+bw/2, tipX=x+s, tipY=baseY-h;
      d+='M'+x0.toFixed(1)+' '+baseY+' L'+x1.toFixed(1)+' '+baseY+' L'+tipX.toFixed(1)+' '+tipY.toFixed(1)+'Z';
      var fh=rnd(hMin*0.4,hMin*0.85), fx2=x+density/2;
      df+='M'+(fx2-bw*0.4).toFixed(1)+' '+baseY+' L'+(fx2+bw*0.4).toFixed(1)+' '+baseY+' L'+(fx2+s*0.3).toFixed(1)+' '+(baseY-fh).toFixed(1)+'Z';
      if(Math.random()<0.4){var hh=h*rnd(.6,.95);dh+='M'+(x-bw*0.2).toFixed(1)+' '+baseY+' L'+(x+bw*0.2).toFixed(1)+' '+baseY+' L'+(tipX+2).toFixed(1)+' '+(baseY-hh).toFixed(1)+'Z';}
    }
    add(E('path',{d:df,fill:'url(#'+fillId+')'}),g);
    add(E('path',{d:d,fill:'url(#'+fillId+')'}),g);
    add(E('path',{d:dh,fill:colorHi,opacity:.8}),g);
    return g;
  }
  var gBack=grassLayer(740,'gb','#D4DE9A',6,70,160,22);
  var gMid =grassLayer(820,'gm','#A6BE78',5,110,210,28);
  var flowers=add(E('g',{}));
  var fcol=['#FBF6E6','#F2C84B','#A6472B','#B49AD0'];
  for(var k=0;k<40;k++){
    var fx=rnd(10,1430), stem=rnd(80,180), by=rnd(810,890), col=fcol[(Math.random()*fcol.length)|0];
    add(E('line',{x1:fx,y1:by,x2:fx+rnd(-12,12),y2:by-stem,stroke:'#4E6B3A','stroke-width':2.2,opacity:.85}),flowers);
    var bx=fx, byy=by-stem;
    if(col==='#F2C84B'||col==='#FBF6E6'){
      for(var p=0;p<6;p++){var a=p/6*6.28;add(E('ellipse',{cx:bx+Math.cos(a)*6,cy:byy+Math.sin(a)*6,rx:4.2,ry:2.5,fill:col,transform:'rotate('+(a*57.3)+' '+(bx+Math.cos(a)*6)+' '+(byy+Math.sin(a)*6)+')'}),flowers);}
      add(E('circle',{cx:bx,cy:byy,r:3.6,fill:'#E8A93A'}),flowers);
    } else { add(E('circle',{cx:bx,cy:byy,r:rnd(4,6.5),fill:col}),flowers); }
  }
  var gFront=grassLayer(912,'gf','#5E7A40',4,160,280,32);
  if(!reduce){
    var hero=document.getElementById('hero');
    hero.addEventListener('pointermove',function(e){
      var r=hero.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-0.5;
      gBack.style.transform='translateX('+(-x*10).toFixed(1)+'px)';
      gMid.style.transform='translateX('+(-x*20).toFixed(1)+'px)';
      flowers.style.transform='translateX('+(-x*20).toFixed(1)+'px)';
      gFront.style.transform='translateX('+(-x*34).toFixed(1)+'px)';
      clouds.style.transform='translateX('+(x*16).toFixed(1)+'px)';
    });
    hero.addEventListener('pointerleave',function(){
      [gBack,gMid,flowers,gFront,clouds].forEach(function(l){l.style.transform='';});
    });
    [gBack,gMid,flowers,gFront,clouds].forEach(function(l){l.style.transition='transform .5s ease-out';});
    var hero2=document.getElementById('hero');
    for(var m=0;m<16;m++){
      var dd=document.createElement('span');dd.className='mote';
      var sz=rnd(2,5);dd.style.width=sz+'px';dd.style.height=sz+'px';
      dd.style.left=rnd(0,100)+'%';dd.style.bottom=rnd(10,55)+'%';
      dd.style.animationDuration=rnd(14,26)+'s';dd.style.animationDelay=(-rnd(0,24))+'s';
      hero2.appendChild(dd);
    }
    var st=document.createElement('style');
    st.textContent='#clouds{animation:cloudDrift 70s ease-in-out infinite}@keyframes cloudDrift{0%,100%{transform:translateX(0)}50%{transform:translateX(34px)}}';
    document.head.appendChild(st);
  }
})();

/* mission clock (dark side) */
(function(){var el=document.getElementById('mt'),t=0;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  setInterval(function(){t++;var m=String(Math.floor(t/60)).padStart(2,'0'),s=String(t%60).padStart(2,'0');el.textContent='t+'+m+':'+s;},1000);})();

/* totem = theme toggle, with a quick dip through colour so the swap is smooth */
(function(){
  var b=document.getElementById('totem'),tip=document.getElementById('tip'),flip=document.getElementById('flipper'),timer;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function otherSide(){return document.documentElement.getAttribute('data-theme')==='dark'
    ?'Switch to the Green Gables side.' : 'Switch to the deep-space side.';}
  function setTheme(t){document.documentElement.setAttribute('data-theme',t);
    try{localStorage.setItem('pf-theme',t);}catch(e){}
    b.setAttribute('aria-label',otherSide());}
  function showTip(){tip.textContent=otherSide();tip.classList.add('show');
    clearTimeout(timer);timer=setTimeout(function(){tip.classList.remove('show');},2400);}
  b.setAttribute('aria-label',otherSide());
  b.addEventListener('click',function(){
    var next=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';
    if(reduce){setTheme(next);showTip();return;}
    b.classList.remove('spin');void b.offsetWidth;b.classList.add('spin');
    flip.style.background=(next==='light')?'#F2E9D4':'#0A0A0C';
    flip.classList.add('on');
    setTimeout(function(){
      setTheme(next);showTip();
      requestAnimationFrame(function(){flip.classList.remove('on');});
    },260);
  });
})();
