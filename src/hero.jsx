/* =========================================================
   Hero — video background + scroll-filled title
   Video plays full-bleed behind. The title "JK PRESTIGE
   CORPORATION" sits over it as empty outlines, and fills
   LEFT→RIGHT with a solid white wash as the user scrolls.
   The section is pinned (300vh) so the user cannot scroll
   past until the letters are 100% filled.
   ========================================================= */

const JK_TITLE_MASK_SVG = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet">' +
    '<g font-family="Archivo Black, Inter, sans-serif" font-weight="900" fill="white" text-anchor="middle" dominant-baseline="middle" letter-spacing="-8">' +
      '<text x="800" y="190" font-size="210">JK</text>' +
      '<text x="800" y="450" font-size="210">PRESTIGE</text>' +
      '<text x="800" y="710" font-size="210">CORPORATION</text>' +
    '</g>' +
  '</svg>'
);
const JK_TITLE_MASK_URL = `url("data:image/svg+xml;utf8,${JK_TITLE_MASK_SVG}")`;

function Hero() {
  const { navigate } = useApp();
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(()=>{ const t=setTimeout(()=>setMounted(true),30); return ()=>clearTimeout(t); },[]);

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

  return (
    <section ref={sectionRef} style={{
      position:'relative',
      height:'300vh',
      background:'var(--bg-primary)',
    }}>
      <div style={{
        position:'sticky', top:0, height:'100vh',
        overflow:'hidden', isolation:'isolate',
      }}>
        {/* Full-bleed hero video background */}
        <div aria-hidden style={{position:'absolute', inset:0, zIndex:0, overflow:'hidden'}}>
          <video
            src="assets/videos/hero.mp4"
            autoPlay muted loop playsInline preload="auto"
            style={{
              position:'absolute', inset:0,
              width:'100%', height:'100%',
              objectFit:'cover',
              opacity:.55,
              filter:'saturate(.75) contrast(1.05)',
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
          position:'absolute', left:0, right:0, top:'clamp(24px,5vh,64px)', zIndex:5,
          opacity: mounted? 1:0, transition:'opacity .6s ease .4s',
        }}>
          <Kicker>BUILDING PRESTIGE SINCE 2000</Kicker>
        </div>

        {/* Title: left-aligned, outline + fill layer (L→R by clipPath).
            Uses CSS -webkit-text-stroke for a clean single-line outline.
            Letters intentionally overflow the right edge (Weitz-style). */}
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
                  fontFamily:"'Archivo Black', Inter, sans-serif",
                  fontWeight:900,
                  fontSize:'clamp(48px, 9.5vw, 160px)',
                  lineHeight:.92,
                  letterSpacing:'-.035em',
                  textTransform:'uppercase',
                  margin:0,
                  padding:0,
                };
                return (
                  <>
                    {/* Outline (empty state) */}
                    <h1 style={{
                      ...titleStyle,
                      color:'transparent',
                      WebkitTextStroke:'1px rgba(255,255,255,.55)',
                    }}>
                      JK<br/>PRESTIGE<br/>CORPORATION
                    </h1>
                    {/* Solid white fill, clipped L→R */}
                    <h1 aria-hidden="true" style={{
                      ...titleStyle,
                      position:'absolute', top:0, left:0,
                      color:'#fff',
                      clipPath:`inset(0 ${insetRight}% 0 0)`,
                      WebkitClipPath:`inset(0 ${insetRight}% 0 0)`,
                      willChange:'clip-path',
                    }}>
                      JK<br/>PRESTIGE<br/>CORPORATION
                    </h1>
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Tagline + CTAs */}
        <div className="wrap" style={{
          position:'absolute', left:0, right:0, bottom:'clamp(96px, 14vh, 160px)', zIndex:6,
          opacity: mounted? 1:0, transform: mounted? 'none':'translateY(12px)',
          transition:'opacity .5s ease .6s, transform .5s ease .6s',
        }}>
          <div style={{maxWidth:720}}>
            <p style={{fontSize:'clamp(15px, 1.25vw, 20px)', lineHeight:1.5, color:'var(--fg-muted)'}}>
              <strong style={{color:'#fff'}}>Ground-up or gut-reno. Hospitals to homes. One contract. 100% satisfaction.</strong>
            </p>
            <div style={{display:'flex', gap:12, flexWrap:'wrap', marginTop:22}}>
              <button className="btn btn-primary" onClick={()=>navigate('/contact')}>
                Get a free estimate <Arrow/>
              </button>
              <button className="btn btn-outline" onClick={()=>navigate('/projects')}>
                Explore our work <Arrow/>
              </button>
            </div>
          </div>
        </div>

        {/* Progress bar + trust row */}
        <div className="wrap" style={{
          position:'absolute', left:0, right:0, bottom:'clamp(20px,3.5vh,36px)', zIndex:6,
          display:'flex', justifyContent:'space-between', alignItems:'center',
          flexWrap:'wrap', gap:18,
          opacity: mounted? 1:0, transition:'opacity .6s ease .9s',
        }}>
          <div style={{display:'flex', alignItems:'center', gap:14}}>
            <span className="mono" style={{color:'var(--fg-muted)'}}>SCROLL TO BUILD</span>
            <div style={{width:220, height:2, background:'rgba(255,255,255,.15)', position:'relative'}}>
              <div style={{position:'absolute', left:0, top:0, bottom:0, width:`${pct}%`, background:'var(--accent-hot)', transition:'width .08s linear'}}/>
            </div>
            <span className="mono" style={{color:'#fff', minWidth:42, textAlign:'right'}}>
              {String(pct).padStart(3,'0')}%
            </span>
          </div>
          <div style={{display:'flex', gap:'clamp(10px,1.8vw,28px)', flexWrap:'wrap', alignItems:'center'}}>
            {['Licensed','Bonded','Insured','25 Years','BBB A+','OSHA 30'].map(t=>(
              <span key={t} className="mono" style={{color:'var(--fg-muted)'}}>{t}</span>
            ))}
          </div>
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
    <div style={{
      background:'var(--bg-elev)', color:'#fff',
      borderTop:'1px solid rgba(255,255,255,.08)',
      borderBottom:'1px solid rgba(255,255,255,.08)',
    }}>
      <div className="wrap" style={{display:'grid', gridTemplateColumns:'auto 1fr auto', alignItems:'center', gap:'clamp(16px,3vw,40px)', padding:'18px 24px', minHeight:72}}>
        <div style={{display:'flex', alignItems:'center', gap:14}}>
          <div style={{width:6, height:6, background:'var(--accent-hot)', borderRadius:'50%'}}/>
          <span className="mono" style={{color:'#fff'}}>// ROOFING DIVISION</span>
        </div>
        <div style={{
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
        <button onClick={()=>navigate('/roofing')} className="btn btn-primary" style={{padding:'12px 18px'}}>
          Free roof inspection <Arrow/>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { Hero, RoofingRibbon });
