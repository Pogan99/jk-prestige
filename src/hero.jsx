/* =========================================================
   Hero — video background + scroll-filled title
   ========================================================= */

function Hero() {
  const { navigate } = useApp();
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(()=> typeof window !== 'undefined' && window.matchMedia('(max-width: 720px)').matches);

  useEffect(()=>{ const t=setTimeout(()=>setMounted(true),30); return ()=>clearTimeout(t); },[]);

  // Track viewport
  useEffect(()=>{
    const mq = window.matchMedia('(max-width: 720px)');
    const onChange = ()=> setIsMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return ()=> mq.removeEventListener('change', onChange);
  },[]);

  // Force iOS / mobile autoplay: muted + playsInline + manual play()
  useEffect(()=>{
    const v = videoRef.current; if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute('muted','');
    v.setAttribute('playsinline','');
    v.setAttribute('webkit-playsinline','');
    const tryPlay = ()=> {
      const p = v.play();
      if (p && typeof p.catch === 'function') p.catch(()=>{ /* swallow */ });
    };
    tryPlay();
    // Retry on first user interaction (covers strict autoplay policies)
    const onTouch = ()=>{ tryPlay(); window.removeEventListener('touchstart', onTouch); window.removeEventListener('click', onTouch); };
    window.addEventListener('touchstart', onTouch, { passive:true, once:true });
    window.addEventListener('click', onTouch, { once:true });
    // Re-attempt on visibility change
    const onVis = ()=>{ if (document.visibilityState === 'visible') tryPlay(); };
    document.addEventListener('visibilitychange', onVis);
    return ()=>{
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('click', onTouch);
    };
  },[]);

  // Scroll progress (pin-and-fill)
  useEffect(()=>{
    let raf = 0;
    const onScroll = ()=>{
      if (raf) return;
      raf = requestAnimationFrame(()=>{
        raf = 0;
        const el = sectionRef.current; if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = Math.max(0, Math.min(1, -rect.top / Math.max(1,total)));
        setProgress(p);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive:true });
    window.addEventListener('resize', onScroll);
    return ()=>{
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  },[]);

  const pct = Math.round(progress*100);
  const insetRight = (1 - progress) * 100;
  const sectionHeight = isMobile ? '180vh' : '200vh';

  return (
    <section ref={sectionRef} style={{
      position:'relative',
      height: sectionHeight,
      background:'var(--bg-primary)',
    }}>
      <div style={{
        position:'sticky', top:0, height:'100vh',
        overflow:'hidden', isolation:'isolate',
      }}>
        {/* Hero video background */}
        <div aria-hidden style={{position:'absolute', inset:0, zIndex:0, overflow:'hidden', background:'#1a1a22'}}>
          <video
            ref={videoRef}
            src="assets/videos/hero.mp4"
            poster="assets/images/hf_20260422_074803_534a61f3-bedb-4292-bbf9-ff8a891eaa96.png"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            x5-playsinline=""
            x5-video-player-type="h5"
            controls={false}
            style={{
              position:'absolute', inset:0,
              width:'100%', height:'100%',
              objectFit:'cover',
              opacity:.55,
              filter:'saturate(.75) contrast(1.05)',
              pointerEvents:'none',
            }}
          />
          <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(18,18,26,.35) 0%, rgba(18,18,26,.75) 100%)'}}/>
        </div>

        {/* Vignette */}
        <div aria-hidden style={{
          position:'absolute', inset:0, zIndex:1,
          background:'radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,.55) 100%)'
        }}/>

        {/* Top kicker */}
        <div className="wrap" style={{
          position:'absolute', left:0, right:0, top:'clamp(20px,5vh,64px)', zIndex:5,
          opacity: mounted? 1:0, transition:'opacity .6s ease .4s',
        }}>
          <Kicker>BUILDING PRESTIGE SINCE 2000</Kicker>
        </div>

        {/* Title — left-aligned, outline + L→R fill */}
        <div style={{
          position:'absolute', inset:0, zIndex:3,
          display:'flex', alignItems:'center',
          pointerEvents:'none',
          overflow:'hidden',
        }}>
          <div className="wrap" style={{width:'100%'}}>
            <div style={{position:'relative', display:'inline-block', whiteSpace:'nowrap'}}>
              {(()=>{
                const titleStyle = {
                  fontFamily:"'Bebas Neue', 'Archivo Black', Inter, sans-serif",
                  fontWeight:900,
                  fontSize: isMobile ? 'clamp(40px, 13vw, 84px)' : 'clamp(80px, 15vw, 240px)',
                  lineHeight:.92,
                  letterSpacing:'.02em',
                  textTransform:'uppercase',
                  margin:0, padding:0,
                };
                return (
                  <>
                    <h1 style={{...titleStyle, color:'transparent', WebkitTextStroke:'1px rgba(255,255,255,.55)'}}>
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
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Tagline + CTAs */}
        <div className="wrap" style={{
          position:'absolute', left:0, right:0,
          bottom: isMobile ? '110px' : 'clamp(96px, 14vh, 160px)',
          zIndex:6,
          opacity: mounted? 1:0, transform: mounted? 'none':'translateY(12px)',
          transition:'opacity .5s ease .6s, transform .5s ease .6s',
        }}>
          <div style={{maxWidth:720}}>
            <p style={{fontSize: isMobile ? 14 : 'clamp(15px, 1.25vw, 20px)', lineHeight:1.5, color:'var(--fg-muted)'}}>
              <strong style={{color:'#fff'}}>Ground-up or gut-reno. Hospitals to homes. One contract. 100% satisfaction.</strong>
            </p>
            <div style={{display:'flex', gap:10, flexWrap:'wrap', marginTop:18}}>
              <button className="btn btn-primary" onClick={()=>navigate('/contact')} style={isMobile ? {padding:'14px 18px', fontSize:11} : undefined}>
                Get a free estimate <Arrow/>
              </button>
              <button className="btn btn-outline" onClick={()=>navigate('/projects')} style={isMobile ? {padding:'14px 18px', fontSize:11} : undefined}>
                Explore our work <Arrow/>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom progress + trust row */}
        <div className="wrap" style={{
          position:'absolute', left:0, right:0,
          bottom: isMobile ? 16 : 'clamp(20px,3.5vh,36px)',
          zIndex:6,
          display:'flex',
          justifyContent:'space-between',
          alignItems:'center',
          flexWrap:'wrap', gap:12,
          opacity: mounted? 1:0, transition:'opacity .6s ease .9s',
        }}>
          <div style={{display:'flex', alignItems:'center', gap:10, flex: isMobile ? '1 1 100%' : '0 0 auto'}}>
            {!isMobile && <span className="mono" style={{color:'var(--fg-muted)'}}>SCROLL TO BUILD</span>}
            <div style={{flex:isMobile?1:'0 0 auto', width: isMobile ? 'auto' : 220, height:2, background:'rgba(255,255,255,.15)', position:'relative'}}>
              <div style={{position:'absolute', left:0, top:0, bottom:0, width:`${pct}%`, background:'var(--accent-hot)', transition:'width .08s linear'}}/>
            </div>
            <span className="mono" style={{color:'#fff', minWidth:42, textAlign:'right'}}>
              {String(pct).padStart(3,'0')}%
            </span>
          </div>
          {!isMobile && (
            <div style={{display:'flex', gap:'clamp(10px,1.8vw,28px)', flexWrap:'wrap', alignItems:'center'}}>
              {['Licensed','Bonded','Insured','25 Years','BBB A+','OSHA 30'].map(t=>(
                <span key={t} className="mono" style={{color:'var(--fg-muted)'}}>{t}</span>
              ))}
            </div>
          )}
          {isMobile && (
            <div style={{display:'flex', gap:14, flexWrap:'wrap', alignItems:'center', flex:'1 1 100%'}}>
              {['Licensed','Bonded','Insured','25 Years'].map(t=>(
                <span key={t} className="mono" style={{color:'var(--fg-muted)', fontSize:10}}>{t}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Roofing ribbon — directly under hero
   ========================================================= */
function RoofingRibbon() {
  const { navigate } = useApp();
  return (
    <div className="jk-roof-ribbon" style={{
      background:'var(--bg-elev)', color:'#fff',
      borderTop:'1px solid rgba(255,255,255,.08)',
      borderBottom:'1px solid rgba(255,255,255,.08)',
    }}>
      <div className="wrap jk-roof-grid" style={{display:'grid', gridTemplateColumns:'auto 1fr auto', alignItems:'center', gap:'clamp(12px,3vw,40px)', padding:'18px 24px', minHeight:72}}>
        <div style={{display:'flex', alignItems:'center', gap:14}}>
          <div style={{width:6, height:6, background:'var(--accent-hot)', borderRadius:'50%'}}/>
          <span className="mono" style={{color:'#fff'}}>// ROOFING DIVISION</span>
        </div>
        <div className="jk-roof-list" style={{
          display:'flex', flexWrap:'wrap', gap:'clamp(8px,1.4vw,22px)',
          fontSize:14, color:'rgba(255,255,255,.92)'
        }}>
          {['New roofs','Tear-offs','Re-roofs','Storm repair','Residential & commercial'].map((t,i)=>(
            <span key={t} style={{display:'inline-flex', alignItems:'center', gap:'clamp(8px,1.4vw,22px)'}}>
              {t}
              {i<4 && <span style={{opacity:.4}}>·</span>}
            </span>
          ))}
        </div>
        <button onClick={()=>navigate('/roofing')} className="btn btn-primary jk-roof-cta" style={{padding:'12px 18px'}}>
          Free roof inspection <Arrow/>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { Hero, RoofingRibbon });
