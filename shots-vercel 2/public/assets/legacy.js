{


const burger = document.getElementById('burgerBtn');

const overlay = document.getElementById('menuOverlay');

function toggleMenu(){

    burger.classList.toggle('open');

    overlay.classList.toggle('open');
    document.querySelector('header').classList.toggle('menu-is-open', overlay.classList.contains('open'));
    burger.setAttribute('aria-expanded', String(overlay.classList.contains('open')));

    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';

  }

  burger.addEventListener('click', toggleMenu);

  overlay.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', toggleMenu));

const formOverlay = document.getElementById('formOverlay');

const formClose = document.getElementById('formClose');

const orcamentoForm = document.getElementById('orcamentoForm');
const serviceSelect = document.getElementById('f-servico');
const serviceChips = [...document.querySelectorAll('.form-chip[data-service]')];

function syncServiceChips(value){
  serviceChips.forEach(chip=>chip.classList.toggle('is-active', chip.dataset.service===value));
}
serviceChips.forEach(chip=>{
  chip.addEventListener('click',()=>{
    if(serviceSelect){
      serviceSelect.value = chip.dataset.service;
      syncServiceChips(serviceSelect.value);
      serviceSelect.dispatchEvent(new Event('change', {bubbles:true}));
      serviceSelect.focus({preventScroll:true});
    }
  });
});
if(serviceSelect){
  serviceSelect.addEventListener('change',()=>syncServiceChips(serviceSelect.value));
}

let quoteReturnFocus = null;
function openForm(){
    quoteReturnFocus = document.activeElement;

    if(overlay.classList.contains('open')) toggleMenu();

    formOverlay.classList.add('open');
    syncServiceChips(serviceSelect?.value || '');
    formClose.focus({ preventScroll: true });

    document.body.style.overflow = 'hidden';

  }

function closeForm(){

    formOverlay.classList.remove('open');
    if (quoteReturnFocus) quoteReturnFocus.focus({ preventScroll: true });

    document.body.style.overflow = '';

  }

  document.querySelectorAll('[data-open-form]').forEach(el => {

    el.addEventListener('click', function(e){

      e.preventDefault();

      openForm();

    });

  });

  formClose.addEventListener('click', closeForm);

  formOverlay.addEventListener('click', function(e){

    if(e.target === formOverlay) closeForm();

  });

  orcamentoForm.addEventListener('submit', function(e){

    e.preventDefault();

const d = new FormData(orcamentoForm);

const msg =

`Olá! Quero pedir um orçamento:

Nome: ${d.get('nome')}

Email: ${d.get('email')}

Zona: ${d.get('zona')}

Serviço: ${d.get('servico')}

Tipo de sessão: ${d.get('tipo')}

Mensagem: ${d.get('mensagem')}`;

    window.open('https://wa.me/'+(window.shotsWhatsApp||'351962254223')+'?text=' + encodeURIComponent(msg), '_blank');

    closeForm();

    orcamentoForm.reset();

  });


// Atualização leve: sem alterar dimensões ou posição do cabeçalho.
const siteHeader = document.querySelector('header');
let headerFramePending = false;
function updateHeaderScroll(){
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 20);
  headerFramePending = false;
}
window.addEventListener('scroll', () => {
  if (!headerFramePending) {
    headerFramePending = true;
    requestAnimationFrame(updateHeaderScroll);
  }
}, { passive: true });
window.addEventListener('pageshow', updateHeaderScroll);
updateHeaderScroll();
document.querySelector('.header-logo').addEventListener('click', () => {
  if (overlay.classList.contains('open')) toggleMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (formOverlay.classList.contains('open')) closeForm();
  else if (overlay.classList.contains('open')) toggleMenu();
});


}
{

(()=>{
 const dialog=document.getElementById('reelCinema'), player=document.getElementById('reelPlayer');
 const cards=[...document.querySelectorAll('.reel-card')];
 let previousFocus,previousOverflow,active=null;
 function stop(card){const v=card.querySelector('video');v.pause();v.currentTime=0;card.classList.remove('is-playing');if(active===card)active=null;}
 function stopAll(){cards.forEach(stop);}
 cards.forEach(card=>{
  const preview=card.querySelector('.reel-preview'),image=preview.querySelector('img'),button=card.querySelector('.reel-open');
  const video=document.createElement('video');
  video.muted=true;video.loop=true;video.playsInline=true;video.preload='none';video.poster=image.src;
  preview.append(video);
  const src='videos/'+button.dataset.reel+'.mp4';
  card.addEventListener('pointerenter',async event=>{
   if(event.pointerType!=='mouse'||dialog.open)return;
   stopAll();active=card;
   if(!video.getAttribute('src'))video.src=src;
   try{await video.play();if(active===card&&!dialog.open)card.classList.add('is-playing');else video.pause();}catch{card.classList.remove('is-playing');}
  });
  card.addEventListener('pointerleave',()=>stop(card));
  button.addEventListener('click',()=>{
   stopAll();previousFocus=button;previousOverflow=document.body.style.overflow;
   document.getElementById('reelCinemaLink').href='https://www.instagram.com/reel/'+button.dataset.reel+'/';
   const full=document.createElement('video');full.controls=true;full.playsInline=true;full.poster=image.src;full.src=src;
   const message=document.createElement('p');message.className='reel-status';message.hidden=true;message.textContent='Vídeo indisponível. Podes vê-lo no Instagram.';
   full.addEventListener('error',()=>{message.hidden=false;});
   player.replaceChildren(full,message);dialog.showModal();document.body.style.overflow='hidden';
   full.play().catch(()=>{});
  });
 });
 dialog.querySelector('.reel-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{player.querySelector('video')?.pause();player.replaceChildren();document.body.style.overflow=previousOverflow||'';previousFocus?.focus();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){stopAll();player.querySelector('video')?.pause();}});
 window.addEventListener('blur',stopAll);
})();

}
{

(()=>{
  const heroVideo=document.querySelector('.hero-video');
  const soundBtn=document.querySelector('.hero-sound');
  if(heroVideo && soundBtn){
    const label=soundBtn.querySelector('.hero-sound-label');
    function syncSound(){
      const on=!heroVideo.muted && heroVideo.volume>0;
      soundBtn.setAttribute('aria-pressed',String(on));
      soundBtn.setAttribute('aria-label',on?'Desativar som do vídeo':'Ativar som do vídeo');
      label.textContent=on?'Som ligado':'Som desligado';
    }
    soundBtn.addEventListener('click',()=>{
      if(heroVideo.muted || heroVideo.volume===0){heroVideo.volume=1;heroVideo.muted=false;}
      else heroVideo.muted=true;
      syncSound();
      if(heroVideo.paused) heroVideo.play().catch(()=>{});
    });
    heroVideo.addEventListener('volumechange',syncSound);
    syncSound();
  }

  const revealTargets=[
    ...document.querySelectorAll('.creative-strip,#servicos .section-label,#servicos h2,#servicos .services-note,#servicos .svc,#trabalhos .section-label,#trabalhos h2,#trabalhos .section-intro,#trabalhos .feature-film,#trabalhos .work-grid-label,#trabalhos .work-card,#trabalhos .work-more,#sobre .section-label,#sobre h2,#sobre .sobre-copy,#sobre .about-visual,#contacto .contact-film-inner')
  ];
  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    revealTargets.forEach((el,i)=>{el.classList.add('reveal-item');el.style.transitionDelay=(i%4)*45+'ms';});
    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target);}
    }),{threshold:.1,rootMargin:'0px 0px -7% 0px'});
    revealTargets.forEach(el=>io.observe(el));
  }
})();

}
{

(()=>{
 const v=document.getElementById('heroVideo');
 if(!v) return;
 v.defaultMuted=true;
 v.muted=true;
 v.autoplay=true;
 v.loop=true;
 v.playsInline=true;
 v.controls=false;
 async function start(){
   if(document.hidden || !v.paused) return;
   try{await v.play();}
   catch(e){console.info('Hero autoplay:',e.name);}
 }
 v.addEventListener('loadeddata',start);
 v.addEventListener('canplay',start);
 window.addEventListener('pageshow',start);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden) start();});
 v.src=v.dataset.src;
 v.load();
 start();
})();

}
{

(()=>{
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const root=document.documentElement;
  const hero=null; // V7 directs hero
  const heroMedia=document.querySelector('.hero-media');
  const heroTop=document.querySelector('.hero-topline');
  const heroContent=document.querySelector('.hero-content');
  const feature=null; // V7 replaced feature film
  const about=null; // V7 directs about
  const contact=null; // V7 directs contact
  const services=[]; // V7 directs services
  const exitSceneBtn=document.querySelector('.spatial-exit');
  let ticking=false;
  const clamp=(v,min,max)=>Math.min(max,Math.max(min,v));
  const local=(el)=>{
    if(!el) return 0;
    const r=el.getBoundingClientRect();
    return clamp((innerHeight*.5-(r.top+r.height*.5))/(innerHeight+r.height),-.5,.5)*2;
  };
  const px=(n)=>`${n.toFixed(2)}px`;
  function draw(){
    ticking=false;
    const y=scrollY||pageYOffset||0;
    const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
    root.style.setProperty('--page-progress',clamp(y/max,0,1).toFixed(4));

    if(hero && heroMedia && heroContent){
      const hp=clamp(y/Math.max(1,hero.offsetHeight),0,1);
      hero.style.setProperty('--hero-media-y',px(hp*54));
      hero.style.setProperty('--hero-media-scale',(1.03+hp*.045).toFixed(4));
      hero.style.setProperty('--hero-top-y',px(-hp*18));
      hero.style.setProperty('--hero-top-opacity',(1-hp*.72).toFixed(3));
      hero.style.setProperty('--hero-content-y',px(-hp*34));
      hero.style.setProperty('--hero-small-x',px(-hp*44));
      hero.style.setProperty('--hero-big-x',px(hp*66));
      hero.style.setProperty('--hero-bottom-y',px(-hp*16));
      hero.style.setProperty('--hero-bottom-opacity',(1-hp*.62).toFixed(3));
    }

    services.forEach((svc,i)=>{
      const p=local(svc);
      const direction=i%2===0?1:-1;
      svc.style.setProperty('--svc-img-y',px(p*18*direction));
      svc.style.setProperty('--svc-copy-y',px(p*-7));
    });

    if(feature){
      const p=local(feature);
      feature.style.setProperty('--film-media-y',px(p*34));
      feature.style.setProperty('--film-copy-y',px(p*-18));
      feature.style.setProperty('--film-title-x',px(p*-24));
      feature.style.setProperty('--film-accent-x',px(p*44));
      feature.style.setProperty('--film-top-y',px(p*-10));
    }

    if(about){
      const p=local(about);
      about.style.setProperty('--about-visual-y',px(p*22));
      about.style.setProperty('--about-copy-y',px(p*-14));
      about.style.setProperty('--about-signature-x',px(p*-28));
      about.style.setProperty('--about-signature-y',px(p*16));
      about.style.setProperty('--about-photo-scale',(1.015+Math.abs(p)*.012).toFixed(4));
    }

    if(contact){
      const p=local(contact);
      contact.style.setProperty('--contact-media-y',px(p*36));
      contact.style.setProperty('--contact-media-scale',(1.08+Math.abs(p)*.018).toFixed(4));
      contact.style.setProperty('--contact-title-x',px(p*-34));
      contact.style.setProperty('--contact-accent-x',px(p*62));
      contact.style.setProperty('--contact-copy-y',px(p*-16));
      contact.style.setProperty('--contact-eye-x',px(p*-18));
    }
  }
  let lastLoopIntent='down';
  let lastKnownScrollY=window.scrollY;
  const syncExitDestination=()=>{
    if(!exitSceneBtn) return;
    const up=lastLoopIntent==='up';
    exitSceneBtn.setAttribute('href',up?'#servicos':'#sobre');
    exitSceneBtn.setAttribute('aria-label',up?'Sair da experiência e voltar aos serviços':'Sair da experiência e continuar para sobre mim');
  };
  const setLoopIntent=dir=>{
    if(dir!=='up'&&dir!=='down') return;
    lastLoopIntent=dir;
    syncExitDestination();
  };
  window.addEventListener('wheel',e=>{if(Math.abs(e.deltaY)>3)setLoopIntent(e.deltaY<0?'up':'down');},{passive:true,capture:true});
  window.addEventListener('scroll',()=>{
    const currentY=window.scrollY;
    const diff=currentY-lastKnownScrollY;
    if(Math.abs(diff)>4)setLoopIntent(diff<0?'up':'down');
    lastKnownScrollY=currentY;
  },{passive:true});
  let exitTouchY=null;
  window.addEventListener('touchstart',e=>{exitTouchY=e.touches?.[0]?.clientY??null;},{passive:true});
  window.addEventListener('touchmove',e=>{
    const y=e.touches?.[0]?.clientY;
    if(exitTouchY==null||y==null)return;
    const d=y-exitTouchY;
    if(Math.abs(d)>8){setLoopIntent(d>0?'up':'down');exitTouchY=y;}
  },{passive:true});
  syncExitDestination();


  const request=()=>{if(!ticking){ticking=true;requestAnimationFrame(draw);}};
  addEventListener('scroll',request,{passive:true});
  addEventListener('resize',request,{passive:true});
  addEventListener('pageshow',request);
  request();
})();

}
{

(()=>{
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
  const lerp=(a,b,t)=>a+(b-a)*t;
  const hero=document.querySelector('.hero-film');
  const scene=document.getElementById('spatialShowcase');
  const sticky=scene?.querySelector('.spatial-sticky');
  const cards=scene?[...scene.querySelectorAll('.spatial-card')]:[];
  const steps=scene?[...scene.querySelectorAll('.spatial-steps i')]:[];
  const nowIndex=scene?.querySelector('.spatial-now-index');
  const nowTitle=scene?.querySelector('.spatial-now-title');
  const navCount=scene?.querySelector('.spatial-nav-count b');
  const prevBtn=scene?.querySelector('.spatial-prev');
  const nextBtn=scene?.querySelector('.spatial-next');
  const sidePrevBtn=scene?.querySelector('.spatial-side-left');
  const sideNextBtn=scene?.querySelector('.spatial-side-right');
  const exitSceneBtn=scene?.querySelector('.spatial-exit');
  const services=[...document.querySelectorAll('#servicos .svc')];
  const about=document.getElementById('sobre');
  const contact=document.querySelector('#contacto.contact-film');
  let ticking=false;

  /* Manual interaction state. The deck previews the drag in 3D, then the
     page scroll position is synchronised to the selected project so every
     input method always feeds the same timeline. */
  let dragActive=false;
  let pointerId=null;
  let dragStartX=0;
  let dragLastX=0;
  let dragLastT=0;
  let dragVelocity=0;
  let dragBasePos=0;
  let dragOffset=0;
  let lastScenePos=0;
  let lastActive=0;
  let wheelLock=false;
  let manualClassTimer=0;
  let keyLock=false;

  function elementProgress(el,start=.85,end=.15){
    const r=el.getBoundingClientRect();
    const a=innerHeight*start, b=innerHeight*end;
    return clamp((a-r.top)/(a-b+r.height*.1),0,1);
  }

  function sceneMetrics(){
    if(!scene) return {progress:0,pos:0,total:1,top:0};
    const r=scene.getBoundingClientRect();
    const total=Math.max(1,scene.offsetHeight-innerHeight);
    const progress=clamp(-r.top/total,0,1);
    return {
      progress,
      pos:progress*Math.max(0,cards.length-1),
      total,
      top:(scrollY||pageYOffset||0)+r.top
    };
  }

  function pulseManual(){
    if(!scene) return;
    scene.classList.add('manual-nav');
    clearTimeout(manualClassTimer);
    manualClassTimer=setTimeout(()=>scene.classList.remove('manual-nav'),900);
  }

  function scrollToProject(index,behavior='smooth'){
    if(!scene || cards.length<2) return;
    const i=clamp(index,0,cards.length-1);
    const m=sceneMetrics();
    const target=m.top+(i/(cards.length-1))*m.total;
    pulseManual();
    window.scrollTo({top:target,behavior:reduceMotion?'auto':behavior});
  }

  function updateUI(active){
    steps.forEach((step,i)=>step.classList.toggle('is-active',i===active));
    const n=String(active+1).padStart(2,'0');
    if(nowIndex) nowIndex.textContent=n;
    if(nowTitle) nowTitle.textContent=cards[active]?.dataset.title||'';
    if(navCount) navCount.textContent=n;
    if(prevBtn) prevBtn.disabled=active<=0;
    if(nextBtn) nextBtn.disabled=active>=cards.length-1;
    if(sidePrevBtn) sidePrevBtn.disabled=active<=0;
    if(sideNextBtn) sideNextBtn.disabled=active>=cards.length-1;
    cards.forEach((card,i)=>{
      card.classList.toggle('is-prevpeek',i===active-1);
      card.classList.toggle('is-nextpeek',i===active+1);
      card.setAttribute('aria-current',i===active?'true':'false');
    });
  }

  function renderDeck(pos){
    if(!scene || !cards.length) return;
    const p=cards.length>1?clamp(pos/(cards.length-1),0,1):0;
    const active=clamp(Math.round(pos),0,cards.length-1);
    lastScenePos=pos;
    lastActive=active;
    scene.style.setProperty('--ghost-a-x',(-p*115).toFixed(1)+'px');
    scene.style.setProperty('--ghost-b-x',(p*145).toFixed(1)+'px');

    cards.forEach((card,i)=>{
      const d=i-pos;
      const ad=Math.abs(d);
      const past=d<0;
      const x=d*38;
      const z=-ad*650;
      const ry=-d*32;
      const rx=ad*2.8;
      const rz=d*1.3;
      const yy=ad*26+(past?-7:7);
      const sc=1-Math.min(ad,1.6)*.115;
      const op=clamp(1-Math.max(0,ad-.35)*.6,.08,1);
      card.style.transform=`translate3d(calc(-50% + ${x.toFixed(2)}vw),calc(-50% + ${yy.toFixed(1)}px),${z.toFixed(1)}px) rotateY(${ry.toFixed(2)}deg) rotateX(${rx.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg) scale(${sc.toFixed(4)})`;
      card.style.opacity=op.toFixed(3);
      const on=ad<.42;
      card.classList.toggle('is-active',on);
      const video=card.querySelector('video');
      if(video){
        if(on){video.play().catch(()=>{});}else{video.pause();}
      }
    });
    updateUI(active);
  }

  function draw(){
    ticking=false;
    const y=scrollY||pageYOffset||0;

    if(hero && !reduceMotion){
      const hp=clamp(y/Math.max(1,innerHeight*.92),0,1);
      const frame=lerp(22,0,hp);
      hero.style.setProperty('--hero-frame',frame.toFixed(1)+'px');
      hero.style.setProperty('--hero-media-z',(-120*hp).toFixed(1)+'px');
      hero.style.setProperty('--hero-content-z',(95-340*hp).toFixed(1)+'px');
      hero.style.setProperty('--hero-content-rx',(-7*hp).toFixed(2)+'deg');
      hero.style.setProperty('--hero-small-x',(-72*hp).toFixed(1)+'px');
      hero.style.setProperty('--hero-big-x',(110*hp).toFixed(1)+'px');
    }

    if(!reduceMotion){
      services.forEach((svc,i)=>{
        const p=elementProgress(svc,.9,.22);
        const centered=(p-.5)*2;
        svc.style.setProperty('--svc-copy-y',(-centered*9).toFixed(1)+'px');
        svc.style.setProperty('--svc-img-y',(centered*22*(i%2?-1:1)).toFixed(1)+'px');
      });
    }

    if(scene && cards.length){
      const m=sceneMetrics();
      if(exitSceneBtn){
        const stickyRect=sticky?.getBoundingClientRect();
        const loopIsLive=!!stickyRect && m.progress>.008 && m.progress<.992 && stickyRect.top<=2;
        exitSceneBtn.classList.toggle('is-visible',loopIsLive);
      }
      let pos=m.pos;
      if(dragActive) pos=clamp(dragBasePos+dragOffset,0,cards.length-1);
      renderDeck(pos);
    }

    if(about && !reduceMotion){
      const p=elementProgress(about,.92,.12);
      const q=(p-.5)*2;
      about.style.setProperty('--about-z',(q*-65).toFixed(1)+'px');
      about.style.setProperty('--about-ry',(q*2.8).toFixed(2)+'deg');
      about.style.setProperty('--about-copy-z',(q*38).toFixed(1)+'px');
    }

    if(contact && !reduceMotion){
      const p=elementProgress(contact,.95,.15);
      contact.style.setProperty('--contact-title-z',(lerp(-260,80,p)).toFixed(1)+'px');
      contact.style.setProperty('--contact-title-rx',(lerp(13,0,p)).toFixed(2)+'deg');
    }
  }

  const request=()=>{if(!ticking){ticking=true;requestAnimationFrame(draw);}};

  if(prevBtn) prevBtn.addEventListener('click',()=>scrollToProject(lastActive-1));
  if(nextBtn) nextBtn.addEventListener('click',()=>scrollToProject(lastActive+1));
  if(sidePrevBtn) sidePrevBtn.addEventListener('click',()=>scrollToProject(lastActive-1));
  if(sideNextBtn) sideNextBtn.addEventListener('click',()=>scrollToProject(lastActive+1));


  cards.forEach((card,index)=>{
    card.addEventListener('click',e=>{
      if(e.target.closest('a,button')) return;
      if(index===lastActive) return;
      e.preventDefault();
      pulseManual();
      scrollToProject(index);
    });
  });

  if(sticky && cards.length){
    sticky.addEventListener('pointerdown',e=>{
      if(e.button!==undefined && e.button!==0) return;
      if(e.target.closest('a,button')) return;
      dragActive=true;
      pointerId=e.pointerId;
      dragStartX=dragLastX=e.clientX;
      dragLastT=performance.now();
      dragVelocity=0;
      dragBasePos=sceneMetrics().pos;
      dragOffset=0;
      sticky.classList.add('is-dragging');
      sticky.setPointerCapture?.(e.pointerId);
      pulseManual();
      request();
    });

    sticky.addEventListener('pointermove',e=>{
      if(!dragActive || e.pointerId!==pointerId) return;
      const now=performance.now();
      const dx=e.clientX-dragStartX;
      const dt=Math.max(1,now-dragLastT);
      dragVelocity=(e.clientX-dragLastX)/dt;
      dragLastX=e.clientX; dragLastT=now;
      const pxPerCard=Math.max(180,Math.min(340,innerWidth*.22));
      dragOffset=-dx/pxPerCard;
      const preview=clamp(dragBasePos+dragOffset,0,cards.length-1);
      const amount=Math.min(1,Math.abs(dx)/pxPerCard);
      sticky.style.setProperty('--drag-pulse',amount.toFixed(3));
      renderDeck(preview);
    });

    const finishDrag=e=>{
      if(!dragActive || (e?.pointerId!=null && e.pointerId!==pointerId)) return;
      const preview=clamp(dragBasePos+dragOffset,0,cards.length-1);
      /* Fast flick gets a small directional nudge so swipe feels intentional. */
      const flick=Math.abs(dragVelocity)>.35 ? (dragVelocity<0?.28:-.28) : 0;
      const target=clamp(Math.round(preview+flick),0,cards.length-1);
      dragActive=false;
      sticky.classList.remove('is-dragging');
      sticky.style.setProperty('--drag-pulse','0');
      try{sticky.releasePointerCapture?.(pointerId);}catch(_){ }
      pointerId=null;

      /* Synchronise scroll to the exact preview first. The sticky viewport does
         not visibly jump; then glide to the snapped card. */
      if(cards.length>1){
        const m=sceneMetrics();
        const previewY=m.top+(preview/(cards.length-1))*m.total;
        window.scrollTo({top:previewY,behavior:'auto'});
      }
      dragOffset=0;
      dragBasePos=preview;
      requestAnimationFrame(()=>scrollToProject(target));
    };
    sticky.addEventListener('pointerup',finishDrag);
    sticky.addEventListener('pointercancel',finishDrag);
    sticky.addEventListener('lostpointercapture',e=>{ if(dragActive) finishDrag(e); });

    /* Horizontal trackpads / Shift+wheel navigate the deck. Plain vertical
       wheel is deliberately left untouched so normal page scroll still works. */
    sticky.addEventListener('wheel',e=>{
      const horizontal=Math.abs(e.deltaX)>Math.abs(e.deltaY)*.72 || e.shiftKey;
      if(!horizontal || Math.max(Math.abs(e.deltaX),Math.abs(e.deltaY))<8) return;
      e.preventDefault();
      if(wheelLock) return;
      const delta=e.shiftKey&&Math.abs(e.deltaX)<1?e.deltaY:e.deltaX;
      if(Math.abs(delta)<8) return;
      wheelLock=true;
      scrollToProject(lastActive+(delta>0?1:-1));
      setTimeout(()=>wheelLock=false,430);
    },{passive:false});
  }

  /* Arrow keys work whenever the 3D scene occupies a meaningful part of the viewport. */
  addEventListener('keydown',e=>{
    if(!scene || keyLock || /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||'')) return;
    const r=scene.getBoundingClientRect();
    const visible=r.top<innerHeight*.7 && r.bottom>innerHeight*.3;
    if(!visible) return;
    if(e.key==='ArrowLeft' || e.key==='ArrowRight'){
      e.preventDefault();
      keyLock=true;
      scrollToProject(lastActive+(e.key==='ArrowRight'?1:-1));
      setTimeout(()=>keyLock=false,360);
    }
  });

  addEventListener('scroll',request,{passive:true});
  addEventListener('resize',request,{passive:true});
  addEventListener('pageshow',request);
  request();
})();

}
{

(()=>{
  const track=document.querySelector('.creative-strip-track');
  const first=track?.querySelector('.creative-strip-group');
  if(!track||!first)return;
  const measure=()=>{
    const w=first.getBoundingClientRect().width;
    if(w>0) track.style.setProperty('--ticker-shift',(-w)+'px');
  };
  measure();
  addEventListener('resize',measure,{passive:true});
  if(document.fonts?.ready) document.fonts.ready.then(measure);
})();

}
{

(()=>{
  const section=document.getElementById('servicos');
  if(!section) return;
  const cards=[...section.querySelectorAll('.svc')];
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));

  /* Entrance: one clean reveal per row. */
  if('IntersectionObserver' in window && !reduceMotion){
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('svc-entered');
          io.unobserve(entry.target);
        }
      });
    },{threshold:.16,rootMargin:'0px 0px -8% 0px'});
    cards.forEach(card=>io.observe(card));
  }else{
    cards.forEach(card=>card.classList.add('svc-entered'));
  }

  if(!fine || reduceMotion) return;

  cards.forEach((card,index)=>{
    let raf=0;
    let tx=0,ty=0,cx=0,cy=0;

    const render=()=>{
      raf=0;
      cx+=(tx-cx)*.18;
      cy+=(ty-cy)*.18;

      /* Small values on purpose: depth is visible without making the row wobble. */
      const ry=cx*4.2;
      const rx=-cy*2.2;
      const dir=index%2===0?1:-1;

      card.style.setProperty('--svc-rx',rx.toFixed(2)+'deg');
      card.style.setProperty('--svc-ry',(ry*dir).toFixed(2)+'deg');
      card.style.setProperty('--svc-photo-x',(cx*9*dir).toFixed(1)+'px');
      card.style.setProperty('--svc-photo-y',(cy*5).toFixed(1)+'px');
      card.style.setProperty('--svc-photo-inner-y',(cy*-5).toFixed(1)+'px');
      card.style.setProperty('--svc-img-x',(cx*7*dir).toFixed(1)+'px');
      card.style.setProperty('--svc-copy-x',(cx*-5*dir).toFixed(1)+'px');
      card.style.setProperty('--svc-ghost-x',(cx*-14*dir).toFixed(1)+'px');

      if(Math.abs(tx-cx)>.002 || Math.abs(ty-cy)>.002) raf=requestAnimationFrame(render);
    };

    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect();
      const px=clamp((e.clientX-r.left)/r.width,0,1);
      const py=clamp((e.clientY-r.top)/r.height,0,1);
      tx=(px-.5)*2;
      ty=(py-.5)*2;
      card.style.setProperty('--svc-mouse-x',(px*100).toFixed(1)+'%');
      card.style.setProperty('--svc-mouse-y',(py*100).toFixed(1)+'%');
      if(!raf) raf=requestAnimationFrame(render);
    },{passive:true});

    card.addEventListener('pointerleave',()=>{
      tx=0;ty=0;
      card.style.setProperty('--svc-mouse-x','50%');
      card.style.setProperty('--svc-mouse-y','50%');
      if(!raf) raf=requestAnimationFrame(render);
    },{passive:true});
  });
})();

}