/* =========================================================
   Hero — video bg + scroll-filled title
   ========================================================= */
function Hero() {
  const { navigate } = useApp();
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(()=> typeof window !== 'undefined' && window.innerWidth <= 720);

  useEffect(()=>{ const t=setTimeout(()=>setMounted(true),30); return ()=>clearTimeout(t); },[]);

  useEffect(()=>{
    const check = ()=> setIsMobile(window.innerWidth <= 720);
    window.addEventListener('resize', check);
    return ()=> window.removeEventListener('resize', check);
  },[]);

  /* ---- Reliable autoplay on every mobile browser ---- */
  useEffect(()=>{
    const v = videoRef.current; if (!v) return;
    // Force muted before any play attempt (required by all mobile browsers)
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');

    const tryPlay = ()=>{
      const p = v.play();
      if (p) p.catch(()=>{});
    };
    tryPlay();

    // Retry on first user gesture (strict autoplay policies)
    const onGesture = ()=>{ tryPlay(); };
    window.addEventListener('touchstart', onGesture, { passive:true, once:true });
    window.addEventListener('click', onGesture, { once:true });
    // Resume when tab becomes visible
    const onVis = ()=>{ if (document.visibilityState==='visible') tryPlay(); };
    document.addEventListener('visibilitychange', onVis);
    return ()=>{
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('touchstart', onGesture);
      window.removeEventListener('click', onGesture);
    };
  },[]);

  /* ---- Scroll progress ---- */
  useEffect(()=>{
    let raf = 0;
    const onScroll = ()=>{
      if (raf) return;
      raf = requestAnimationFrame(()=>{
        raf = 0;
        const el = sectionRef.current; if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        setProgress(Math.max(0, Math.min(1, -rect.top / Math.max(1,total))));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive:true });
    window.addEventListener('resize', onScroll);
    return ()=>{ window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if(raf) cancelAnimationFrame(raf); };
  },[]);

  const pct = Math.round(progress*100);
  const insetRight = (1-progress)*100;
  const sectionHeight = isMobile ? '180vh' : '200vh';

  const titleStyle = {
    fontFamily:"'Big Shoulders Display', 'Bebas Neue', 'Archivo Black', sans-serif",
    fontWeight:900,
    fontSize: isMobile ? 'clamp(52px, 16vw, 96px)' : 'clamp(60px, 10.5vw, 180px)',
    lineHeight:.9,
    letterSpacing:'.02em',
    textTransform:'uppercase',
    margin:0, padding:0,
    whiteSpace:'nowrap',
  };

  return (
    <section ref={sectionRef} style={{ position:'relative', height:sectionHeight, background:'var(--bg-primary)' }}>
      <div style={{ position:'sticky', top:0, height:'100vh', overflow:'hidden', isolation:'isolate' }}>

        {/* Video bg — overlay is flat 20% dark so video shows clearly */}
        <div aria-hidden style={{position:'absolute', inset:0, zIndex:0, overflow:'hidden', background:'#111'}}>
          <video
            ref={videoRef}
            src="assets/videos/hero.mp4"
            poster="assets/images/hf_20260422_074803_534a61f3-bedb-4292-bbf9-ff8a891eaa96.png"
            autoPlay muted loop playsInline preload="auto"
            disablePictureInPicture
            style={{
              position:'absolute', inset:0, width:'100%', height:'100%',
              objectFit:'cover', opacity:.7,
              filter:'saturate(.8) contrast(1.05)',
              pointerEvents:'none',
            }}
          />
          {/* Flat 20% overlay */}
          <div style={{position:'absolute', inset:0, background:'rgba(0,0,0,.20)'}}/>
        </div>

        {/* Vignette edges only */}
        <div aria-hidden style={{
          position:'absolute', inset:0, zIndex:1,
          background:'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,.25) 100%)'
        }}/>

        {/* Kicker */}
        <div className="wrap" style={{
          position:'absolute', left:0, right:0, top:'clamp(20px,5vh,64px)', zIndex:5,
          opacity:mounted?1:0, transition:'opacity .6s ease .4s',
        }}>
          <Kicker>BUILDING PRESTIGE SINCE 2017</Kicker>
        </div>

        {/* Title — outline + L→R fill */}
        <div style={{
          position:'absolute', inset:0, zIndex:3,
          display:'flex', alignItems:'center',
          pointerEvents:'none', overflow:'hidden',
        }}>
          <div className="wrap" style={{width:'100%'}}>
            <div style={{position:'relative', display:'block', marginTop:'-5px'}}>
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
          position:'absolute', left:0, right:0,
          bottom: isMobile ? '100px' : 'clamp(88px,13vh,150px)',
          zIndex:6,
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

        {/* Progress + trust */}
        <div className="wrap" style={{
          position:'absolute', left:0, right:0,
          bottom: isMobile?14:'clamp(18px,3vh,32px)',
          zIndex:6,
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

      {/* Hide native video controls on all browsers */}
      <style>{`
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
