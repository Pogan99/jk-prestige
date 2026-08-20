/* =========================================================
   Hero — video bg + scroll-filled title

   Both mobile and desktop:
     - Virtual scroll lock — wheel/touch events drive progress directly.
     - Page scroll is blocked until letters reach 100% fill.
     - Section is exactly 100vh → zero dead zone below.
     - On complete: lock releases, browser scroll takes over naturally.
   ========================================================= */
function Hero() {
  const { navigate } = useApp();
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(()=> typeof window !== 'undefined' && window.innerWidth <= 720);

  const progressRef   = useRef(0);
  const virtualScroll = useRef(0);
  const touchStartY   = useRef(0);
  const lockedRef     = useRef(true);  /* mobile scroll lock */

  useEffect(()=>{ const t=setTimeout(()=>setMounted(true),30); return ()=>clearTimeout(t); },[]);

  useEffect(()=>{
    const check = ()=> setIsMobile(window.innerWidth <= 720);
    window.addEventListener('resize', check);
    return ()=> window.removeEventListener('resize', check);
  },[]);

  /* ---- Nav is sticky and sits in flow above the hero, so it eats viewport
     height. Measure it instead of hardcoding — hero fills exactly what's left. ---- */
  const [navH, setNavH] = useState(72);
  useEffect(()=>{
    const measure = ()=>{
      const nav = document.querySelector('.jk-nav');
      if (nav) setNavH(Math.round(nav.getBoundingClientRect().height));
    };
    measure();
    window.addEventListener('resize', measure);
    return ()=> window.removeEventListener('resize', measure);
  },[]);

  /* ---- Defer the video source until after load+idle ----
     autoplay forces a full download at high priority, which made the 932KB
     video compete with first paint. The poster paints immediately instead and
     the video attaches once the page is done loading. ---- */
  const [videoOn, setVideoOn] = useState(false);
  useEffect(()=>{
    let cancelled = false;
    const arm = ()=>{
      if (cancelled) return;
      const idle = window.requestIdleCallback || ((fn)=>setTimeout(fn,200));
      idle(()=>{ if(!cancelled) setVideoOn(true); });
    };
    if (document.readyState === 'complete') arm();
    else window.addEventListener('load', arm, { once:true });
    return ()=>{ cancelled = true; window.removeEventListener('load', arm); };
  },[]);

  /* ---- Reliable video autoplay ---- */
  useEffect(()=>{
    const v = videoRef.current; if (!v || !videoOn) return;
    v.muted = true; v.defaultMuted = true;
    v.setAttribute('muted',''); v.setAttribute('playsinline',''); v.setAttribute('webkit-playsinline','');
    const tryPlay = ()=>{ const p=v.play(); if(p) p.catch(()=>{}); };
    tryPlay();
    const onGesture = ()=>{ tryPlay(); };
    window.addEventListener('touchstart', onGesture, { passive:true, once:true });
    window.addEventListener('click', onGesture, { once:true });
    const onVis = ()=>{ if(document.visibilityState==='visible') tryPlay(); };
    document.addEventListener('visibilitychange', onVis);
    return ()=>{
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('touchstart', onGesture);
      window.removeEventListener('click', onGesture);
    };
  },[videoOn]);

  /* ---- Virtual scroll lock — blocks page scroll until letters fully filled (all screen sizes) ---- */
  useEffect(()=>{
    /* 0.8× vh matches the old sticky feel on mobile; on desktop a mouse-wheel
       user fills it in ~7 notches, trackpad feels smooth. Read live rather than
       captured at mount, so a resize or rotation retargets it — and so a 0-height
       viewport can't divide by zero and render the counter as NaN%. */
    const dragMax = ()=> Math.max(320, window.innerHeight * 0.8);

    const advance = (dy)=>{
      if (!lockedRef.current) return;
      const DRAG_MAX = dragMax();
      virtualScroll.current = Math.max(0, Math.min(DRAG_MAX, virtualScroll.current + dy));
      const p = virtualScroll.current / DRAG_MAX;
      progressRef.current = p;
      setProgress(p);
      if (p >= 1) lockedRef.current = false; /* release — browser scroll takes over naturally */
    };

    const onWheel = (e)=>{
      if (!lockedRef.current) return;
      e.preventDefault();
      advance(e.deltaY);
    };

    const onTouchStart = (e)=>{ touchStartY.current = e.touches[0].clientY; };

    const onTouchMove = (e)=>{
      if (!lockedRef.current) return;
      e.preventDefault();
      const dy = touchStartY.current - e.touches[0].clientY;
      touchStartY.current = e.touches[0].clientY;
      advance(dy);
    };

    window.addEventListener('wheel', onWheel, { passive:false });
    window.addEventListener('touchstart', onTouchStart, { passive:true });
    window.addEventListener('touchmove', onTouchMove, { passive:false });

    return ()=>{
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  },[]);

  const pct = Math.round(progress*100);
  const insetRight = (1-progress)*100;

  const titleStyle = {
    fontFamily:"'Big Shoulders Display', 'Bebas Neue', 'Archivo Black', sans-serif",
    fontWeight:900,
    /* font-size lives in CSS (.jk-hero h1) so it can be capped by height as well
       as width, with a vh fallback for browsers without svh. */
    lineHeight:.9,
    letterSpacing:'.02em',
    textTransform:'uppercase',
    margin:0, padding:0,
    whiteSpace:'nowrap',
  };

  /* Flow layout, not absolute anchoring: kicker / title / tagline+CTA / progress
     are stacked flex rows. The title row is the only flexible one, so the rows
     below it can never be overlapped or pushed under the fold. */
  const innerStyle = {
    position:'absolute', inset:0, overflow:'hidden', isolation:'isolate',
    display:'flex', flexDirection:'column',
    /* clear the nav bar the hero now runs underneath */
    paddingTop:`calc(${navH}px + clamp(16px,3vh,40px))`,
    /* no bottom padding — the status rail is flush to the hero's bottom edge
       and carries its own padding instead. */
    paddingBottom:0,
  };
  const rowGap = 'clamp(12px,2.4vh,28px)';

  return (
    <section ref={sectionRef} className="jk-hero" style={{ position:'relative', background:'var(--bg-primary)', '--jk-nav-h': navH+'px' }}>
      <div style={innerStyle}>

        {/* Video bg */}
        <div aria-hidden style={{position:'absolute', inset:0, zIndex:0, overflow:'hidden', background:'#111'}}>
          <video
            ref={videoRef}
            {...(videoOn ? { src:"assets/videos/hero.mp4" } : {})}
            poster="assets/images/hf_20260422_074803_534a61f3-bedb-4292-bbf9-ff8a891eaa96.webp"
            autoPlay muted loop playsInline preload="metadata"
            disablePictureInPicture
            style={{
              position:'absolute', inset:0, width:'100%', height:'100%',
              objectFit:'cover', opacity:.7,
              filter:'saturate(.8) contrast(1.05)',
              pointerEvents:'none',
            }}
          />
          <div style={{position:'absolute', inset:0, background:'rgba(0,0,0,.20)'}}/>
        </div>

        {/* Vignette */}
        <div aria-hidden style={{
          position:'absolute', inset:0, zIndex:1,
          background:'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,.25) 100%)'
        }}/>

        {/* Kicker */}
        {/* width:100% on every .wrap row — .wrap uses margin:0 auto, and an auto
            cross-axis margin in a flex column suppresses stretch and shrink-wraps. */}
        <div className="wrap" style={{
          flex:'0 0 auto', width:'100%', position:'relative', zIndex:5,
          opacity:mounted?1:0, transition:'opacity .6s ease .4s',
        }}>
          <Kicker>BUILDING PRESTIGE SINCE 2017</Kicker>
        </div>

        {/* Title — outline + L→R fill. Only flexible row: absorbs leftover height. */}
        <div style={{
          flex:'1 1 auto', minHeight:0, position:'relative', zIndex:3,
          display:'flex', alignItems:'center',
          pointerEvents:'none', overflow:'hidden',
        }}>
          <div className="wrap" style={{width:'100%'}}>
            <div style={{position:'relative', display:'block'}}>
              <h1 style={{...titleStyle, color:'transparent', WebkitTextStroke:'1.5px rgba(255,255,255,.6)'}}>
                JK<br/>PRESTIGE<br/>CONSTRUCTOR
              </h1>
              <h1 aria-hidden="true" style={{
                ...titleStyle,
                position:'absolute', top:0, left:0,
                color:'#fff',
                clipPath:`inset(0 ${insetRight}% 0 0)`,
                WebkitClipPath:`inset(0 ${insetRight}% 0 0)`,
                willChange:'clip-path',
              }}>
                JK<br/>PRESTIGE<br/>CONSTRUCTOR
              </h1>
            </div>
          </div>
        </div>

        {/* Tagline + CTAs */}
        <div className="wrap" style={{
          flex:'0 0 auto', width:'100%', position:'relative', zIndex:6, marginTop:rowGap,
          opacity:mounted?1:0, transform:mounted?'none':'translateY(12px)',
          transition:'opacity .5s ease .6s, transform .5s ease .6s',
        }}>
          <p style={{fontSize:isMobile?13:'clamp(15px,1.2vw,19px)', lineHeight:1.5, color:'rgba(255,255,255,.85)', maxWidth:600}}>
            <strong style={{color:'#fff'}}>Ground-up or gut-reno. Hospitals to homes. One contract. 100% satisfaction.</strong>
          </p>
          <div style={{display:'flex', gap:10, flexWrap:'wrap', marginTop:16}}>
            <button className="btn btn-primary" onClick={()=>navigate('/contact')} style={isMobile?{padding:'13px 16px',fontSize:10.5}:undefined}>
              Get a free estimate <Arrow/>
            </button>
            <button className="btn btn-outline" onClick={()=>navigate('/projects')} style={isMobile?{padding:'13px 16px',fontSize:10.5}:undefined}>
              Explore our work <Arrow/>
            </button>
          </div>
        </div>

        {/* Progress bar + trust badges */}
        <div className="wrap jk-hero-rail" style={{
          flex:'0 0 auto', width:'100%', position:'relative', zIndex:6, marginTop:rowGap,
          paddingTop:'clamp(10px,1.6vh,18px)', paddingBottom:'clamp(12px,2vh,22px)',
          display:'flex', justifyContent:'space-between', alignItems:'center',
          flexWrap:'wrap', gap:10,
          opacity:mounted?1:0, transition:'opacity .6s ease .9s',
        }}>
          <div style={{display:'flex', alignItems:'center', gap:10, flex:isMobile?'1 1 100%':'0 0 auto'}}>
            {!isMobile && <span className="mono" style={{color:'rgba(255,255,255,.5)'}}>SCROLL TO BUILD</span>}
            <div style={{flex:isMobile?1:'0 0 auto', width:isMobile?'auto':200, height:2, background:'rgba(255,255,255,.15)', position:'relative'}}>
              <div style={{position:'absolute', left:0, top:0, bottom:0, width:`${pct}%`, background:'var(--accent-hot)', transition:'width .08s linear'}}/>
            </div>
            <span className="mono" style={{color:'#fff', minWidth:38}}>{String(pct).padStart(3,'0')}%</span>
          </div>
          <div style={{display:'flex', gap:isMobile?12:'clamp(10px,1.8vw,26px)', flexWrap:'wrap', alignItems:'center', flex:isMobile?'1 1 100%':'0 0 auto'}}>
            {(isMobile?['Licensed','Bonded','Est. 2017']:['Licensed','Bonded','Insured','Est. 2017','OSHA 30']).map(t=>(
              <span key={t} className="mono" style={{color:'rgba(255,255,255,.5)', fontSize:isMobile?9:undefined}}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Hero box + hide native video controls on all browsers */}
      <style>{`
        /* The sticky nav sits in flow above the hero and would consume viewport
           height, pushing the hero's bottom row under the fold. Pull the hero up
           under the bar by its own height instead: the hero becomes a true
           full-viewport pane (and the glass bar gets the video behind it), while
           the flow height it contributes is unchanged, so nothing below shifts.
           --jk-nav-h is measured at runtime; 72px is only the pre-hydration guess.
           svh (not vh) keeps mobile from jumping when the URL bar hides. */
        .jk-hero{height:100vh; min-height:360px; margin-top:calc(-1 * var(--jk-nav-h,72px))}
        @supports (height:100svh){ .jk-hero{height:100svh} }

        /* Title is capped by BOTH width and leftover height. The 3-line block is
           2.7em tall; dividing by 3 leaves ~0.3em of breathing room above the
           tagline. The subtracted constant is the fixed chrome: nav + padding +
           kicker + gaps + tagline/CTA block + progress row. max(480px,...) keeps
           it in step with the hero's own min-height on very short viewports. */
        .jk-hero h1{font-size:clamp(52px, min(10.5vw, calc((max(480px, 100vh) - 330px) / 3)), 180px)}
        @supports (height:100svh){
          .jk-hero h1{font-size:clamp(52px, min(10.5vw, calc((max(480px, 100svh) - 330px) / 3)), 180px)}
        }
        @media (max-width:720px){
          .jk-hero h1{font-size:clamp(44px, min(16vw, calc((max(480px, 100vh) - 320px) / 3)), 96px)}
        }
        @media (max-width:720px){
          @supports (height:100svh){
            .jk-hero h1{font-size:clamp(44px, min(16vw, calc((max(480px, 100svh) - 320px) / 3)), 96px)}
          }
        }

        /* Very short viewports — phone landscape, small laptops. The fixed chrome
           (nav + tagline + CTAs + rail) leaves ~119px for the title at 390px tall,
           so the 52px floor above is what would push the rail off-screen. Drop the
           floor here; below this height a smaller title beats a cropped one. */
        @media (max-height:560px){
          .jk-hero h1{font-size:clamp(40px, min(10.5vw, calc((100vh - 300px) / 3)), 180px)}
        }
        @media (max-height:560px){
          @supports (height:100svh){
            .jk-hero h1{font-size:clamp(40px, min(10.5vw, calc((100svh - 300px) / 3)), 180px)}
          }
        }

        video::-webkit-media-controls,
        video::-webkit-media-controls-enclosure,
        video::-webkit-media-controls-panel,
        video::-webkit-media-controls-play-button,
        video::-webkit-media-controls-start-playback-button {
          display:none !important;
          -webkit-appearance:none;
        }
      `}</style>
    </section>
  );
}

/* =========================================================
   Roofing ribbon
   ========================================================= */
function RoofingRibbon() {
  const { navigate } = useApp();
  return (
    <div style={{
      background:'var(--bg-elev)', color:'#fff',
      borderTop:'1px solid rgba(255,255,255,.08)',
      borderBottom:'1px solid rgba(255,255,255,.08)',
    }}>
      <div className="wrap jk-roof-grid" style={{display:'grid', gridTemplateColumns:'auto 1fr auto', alignItems:'center', gap:'clamp(12px,3vw,40px)', padding:'18px 24px', minHeight:72}}>
        <div style={{display:'flex', alignItems:'center', gap:14}}>
          <div style={{width:6, height:6, background:'var(--accent-hot)', borderRadius:'50%'}}/>
          <span className="mono" style={{color:'#fff'}}>// ROOFING DIVISION</span>
        </div>
        <div className="jk-roof-list" style={{display:'flex', flexWrap:'wrap', gap:'clamp(8px,1.4vw,22px)', fontSize:14, color:'rgba(255,255,255,.92)'}}>
          {['New roofs','Tear-offs','Re-roofs','Storm repair','Residential & commercial'].map((t,i)=>(
            <span key={t} style={{display:'inline-flex', alignItems:'center', gap:'clamp(8px,1.4vw,22px)'}}>
              {t}{i<4 && <span style={{opacity:.4}}>·</span>}
            </span>
          ))}
        </div>
        <button onClick={()=>{ navigate('/roofing'); setTimeout(()=>{ const el=document.getElementById('inspection'); if(el) el.scrollIntoView({behavior:'smooth'}); },400); }} className="btn btn-primary jk-roof-cta" style={{padding:'12px 18px'}}>
          Free roof inspection <Arrow/>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { Hero, RoofingRibbon });
