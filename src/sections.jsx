/* =========================================================
   AudienceSwitcher — segmented control + reordering
   ========================================================= */
function AudienceSwitcher() {
  const { audience, setAudience, navigate } = useApp();

  const homePanel = {
    headline: "Your home. Your timeline. Your budget — protected.",
    body: "We work directly with homeowners on custom new builds, full renovations, roofing replacements, and everything in between. No layers of middlemen. You deal with a principal from day one.",
    bullets: [
      "Fixed-price contracts — no surprise change orders",
      "Self-perform framing, drywall, roofing, and finish work",
      "48-hour written estimate turnaround",
      "One supervisor on your jobsite, one number to call",
      "Licensed, bonded, and insured in Florida",
      "Transparent scope documentation before we break ground",
    ],
    cta: "Get a free estimate",
    href: '/contact',
  };

  const devPanel = {
    headline: "Ground-up. On spec. On schedule. One contract.",
    body: "Developers, hospital systems, logistics owners, and GC partners choose JK Prestige Constructor for complex Florida builds where execution risk is not an option. We self-perform, we preconstruct, and we close punch lists.",
    bullets: [
      "Ground-up construction — commercial, medical, industrial",
      "Hospital and medical facility builds (ICRA-compliant)",
      "Self-perform concrete, framing, drywall, roofing",
      "Vetted, insured sub network for every remaining trade",
      "Lean scheduling and owner-direct milestone reporting",
      "Available as a trade partner or full general contractor",
    ],
    cta: "See our expertise",
    href: '/expertise',
  };

  const panel = audience === 'developer' ? devPanel : homePanel;

  return (
    <div style={{background:'var(--bg-primary)', padding:'40px 0'}}>
      <div className="wrap">
        {/* Toggle */}
        <div style={{display:'flex', justifyContent:'center', marginBottom:40}}>
          <div style={{
            display:'inline-flex', border:'1px solid var(--hairline)',
            padding:4, gap:4, background:'rgba(0,0,0,.2)', flexWrap:'wrap', justifyContent:'center'
          }}>
            {[
              {id:'homeowner', label:"Homeowner"},
              {id:'developer', label:"Developer / GC"},
            ].map(o=>{
              const on = audience===o.id;
              return (
                <button key={o.id} onClick={()=>setAudience(o.id)}
                  className="mono"
                  style={{
                    padding:'12px 18px',
                    background: on? 'var(--accent)':'transparent',
                    color: on? '#fff':'var(--fg-muted)',
                    transition:'all .25s ease',
                    whiteSpace:'nowrap',
                  }}>{o.label.toUpperCase()}</button>
              );
            })}
          </div>
        </div>

        {/* Panel */}
        <div style={{
          border:'1px solid var(--hairline)',
          background:'var(--bg-elev)',
          display:'grid',
          gridTemplateColumns:'1.1fr 1fr',
          gap:'clamp(32px,5vw,64px)',
          padding:'clamp(32px,4vw,56px)',
          transition:'opacity .2s ease',
        }} className="audience-panel">
          <div>
            <h3 style={{fontFamily:'var(--display)', fontSize:'clamp(28px,3.2vw,48px)', letterSpacing:'-.02em', lineHeight:1.05, color:'#fff', marginBottom:18}}>
              {panel.headline}
            </h3>
            <p style={{fontSize:16, lineHeight:1.7, color:'var(--fg-muted)', marginBottom:28, maxWidth:520}}>
              {panel.body}
            </p>
            <button className="btn btn-primary" onClick={()=>navigate(panel.href)}>
              {panel.cta} <Arrow/>
            </button>
          </div>
          <div className="jk-audience-bullets" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:'rgba(0,0,0,.25)', alignSelf:'start'}}>
            {panel.bullets.map((b,i)=>(
              <div key={i} style={{background:'var(--bg-elev)', padding:'18px 16px', display:'flex', alignItems:'flex-start', gap:10}}>
                <span style={{width:6, height:6, background:'var(--accent)', marginTop:6, flexShrink:0}}/>
                <span style={{fontSize:13, lineHeight:1.5, color:'#fff', fontFamily:'var(--mono)', letterSpacing:'.04em'}}>{b.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width:860px){ .audience-panel{grid-template-columns:1fr !important} }
      `}</style>
    </div>
  );
}

/* =========================================================
   Who We Are
   ========================================================= */
function WhoWeAre() {
  const { audience } = useApp();
  const homeCopy = (
    <>
      <p>JK Prestige Constructor is a family-operated general contractor headquartered in Jacksonville, FL. Founded in 2017, we've built our reputation on one principle: the person who signs your contract is the person who answers your calls and walks your jobsite.</p>
      <p>We self-perform framing, concrete, drywall, finish carpentry, and roofing — trades most GCs sub out. That means tighter schedules, cleaner handoffs, and one throat to choke if anything falls short. Every specialty trade we bring in is licensed, insured, and personally vetted by our principals.</p>
      <p>Fixed-price contracts available. Honest estimates in 48 hours. Licensed, bonded, and insured across Florida and beyond.</p>
    </>
  );
  const devCopy = (
    <>
      <p>Since 2017, developers, hospital systems, logistics owners, and GC partners across Florida have trusted JK Prestige Constructor for ground-up construction that closes on schedule and on budget. We're not a broker — we build.</p>
      <p>We self-perform the critical-path trades (concrete, framing, drywall, finish carpentry, roofing) and manage a vetted, insured subcontractor network across every remaining discipline. One contract. One schedule. One line of accountability from preconstruction through punch list. Our hospital construction work in Florida is ICRA-compliant and infection-control ready.</p>
      <p>Based in Jacksonville, FL. Licensed, bonded, and insured. Owner-direct communication at every milestone — no account managers, no hand-offs.</p>
    </>
  );
  return (
    <section className="section" style={{background:'var(--bg-primary)'}}>
      <div className="wrap jk-who-we-are" style={{display:'grid', gridTemplateColumns:'1.15fr 1fr', gap:'clamp(40px,6vw,96px)', alignItems:'stretch'}}>
        <Reveal>
          <Kicker>WHO WE ARE</Kicker>
          <h2 className="display" style={{fontSize:'clamp(40px, 5.6vw, 84px)', marginTop:18, marginBottom:28}}>
            Your Trusted Builder,<br/>From Foundation to Finish.
          </h2>
          <div style={{fontSize:17, lineHeight:1.7, color:'var(--fg-muted)', display:'grid', gap:18, maxWidth:600}}>
            {audience==='developer' ? devCopy : homeCopy}
          </div>
          <div style={{display:'flex', gap:28, marginTop:36, flexWrap:'wrap'}}>
            {['Family owned','Self-perform trades','Vetted sub network','One guarantee'].map(t=>(
              <div key={t} style={{display:'flex', alignItems:'center', gap:10}}>
                <span style={{width:6, height:6, background:'var(--accent)'}}/>
                <span className="mono" style={{color:'#fff'}}>{t.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={100}>
          <TopoWatermark/>
        </Reveal>
      </div>
    </section>
  );
}

function TopoWatermark(){
  return (
    <div style={{position:'relative', width:'100%', height:'100%', minHeight:380, border:'1px solid var(--hairline)', overflow:'hidden', background:'var(--bg-primary)'}}>
      <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" viewBox="0 0 600 500" style={{position:'absolute', inset:0, opacity:.6}}>
        {Array.from({length:16}).map((_,i)=>(
          <path key={i}
            d={`M 0 ${80+i*25} C 150 ${60+i*25} 250 ${120+i*25} 400 ${90+i*25} S 600 ${70+i*25} 600 ${70+i*25}`}
            fill="none" stroke="#526FAE" strokeWidth=".6" opacity={.2+i*.03}/>
        ))}
      </svg>
      <div style={{position:'absolute', left:32, top:32, right:32}}>
        <div className="mono" style={{color:'var(--accent)'}}>// EST. 2017 · FAMILY OPERATED</div>
        <div className="jk-topo-headline" style={{fontFamily:'var(--display)', fontSize:'clamp(36px,4vw,56px)', letterSpacing:'-.02em', lineHeight:.95, marginTop:12}}>
          Built in Florida.<br/>One standard.
        </div>
      </div>
      <div className="jk-topo-coords" style={{position:'absolute', left:32, bottom:32, right:32, display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:12}}>
        <div>
          <div className="mono" style={{color:'var(--fg-dim)', fontSize:9}}>LAT</div>
          <div style={{fontFamily:'var(--mono)', fontSize:13, color:'#fff'}}>30°19′N</div>
        </div>
        <div>
          <div className="mono" style={{color:'var(--fg-dim)', fontSize:9}}>LNG</div>
          <div style={{fontFamily:'var(--mono)', fontSize:13, color:'#fff'}}>81°39′W</div>
        </div>
        <div>
          <div className="mono" style={{color:'var(--fg-dim)', fontSize:9}}>FILE</div>
          <div style={{fontFamily:'var(--mono)', fontSize:13, color:'#fff'}}>JKP-2017-2025</div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Stats strip
   ========================================================= */
function StatsStrip(){
  const stats = [
    {n:8, suffix:'', label:'YEARS ESTABLISHED', sub:'Est. 2017'},
    {n:500, suffix:'+', label:'PROJECTS DELIVERED', sub:'Residential · Commercial · Medical'},
    {n:100, suffix:'%', label:'LICENSED & BONDED', sub:'Fully insured on every project we take on'},
    {n:48, suffix:' HRS', label:'AVG ESTIMATE TURNAROUND', sub:'Owner-first communication'},
  ];
  return (
    <section className="section-tight" style={{background:'var(--bg-elev)', borderTop:'1px solid rgba(0,0,0,.25)', borderBottom:'1px solid rgba(0,0,0,.25)'}}>
      <div className="wrap jk-stats-wrap" style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:0}}>
        {stats.map((s,i)=>(
          <Reveal key={i} delay={i*80} className="stat-tile" style={{
            padding:'clamp(28px, 4vw, 48px) clamp(18px, 2.4vw, 36px)',
            borderRight: i<3 ? '1px solid rgba(255,255,255,.12)' : 'none',
            position:'relative'
          }}>
            <div style={{fontFamily:'var(--display)', fontSize:'clamp(56px, 7vw, 120px)', lineHeight:.9, color:'#fff', letterSpacing:'-.03em'}}>
              <CountUp to={s.n} suffix={s.suffix}/>
            </div>
            <div className="mono" style={{marginTop:14, color:'#fff', opacity:.95}}>{s.label}</div>
            <div style={{marginTop:6, fontSize:13, color:'rgba(255,255,255,.75)'}}>{s.sub}</div>
          </Reveal>
        ))}
      </div>
      <style>{`
        @media (max-width:900px){
          .stat-tile{border-right:none !important; border-bottom:1px solid rgba(255,255,255,.12)}
        }
        @media (max-width:900px){
          section .wrap{grid-template-columns:repeat(2,1fr) !important}
        }
      `}</style>
    </section>
  );
}

/* =========================================================
   Expertise grid
   ========================================================= */
const EXPERTISE = [
  { id:'medical', title:'Hospitals & Medical', kicker:'GROUND-UP', blurb:'Infection-control-ready medical facilities with ICRA discipline.', slug:'expertise-medical-4x3', route:'/expertise/hospitals' },
  { id:'homes', title:'Custom Homes', kicker:'RESIDENTIAL', blurb:'From architect-led new builds to multi-generational estates.', slug:'expertise-custom-home-4x3', route:'/expertise/homes' },
  { id:'warehouses', title:'Warehouses & Industrial', kicker:'LOGISTICS', blurb:'Tilt-up shells, clear-span spaces, loading docks and yards.', slug:'expertise-warehouse-4x3', route:'/expertise/warehouses' },
  { id:'commercial', title:'Commercial & Retail', kicker:'TENANT FIT-OUT', blurb:'Multi-tenant, retail, restaurant, and office tenant improvements.', slug:'expertise-commercial-4x3', route:'/expertise/commercial' },
  { id:'reno', title:'Full Renovations', kicker:'GUT-RENO', blurb:'Historic, residential and commercial transformations.', slug:'expertise-renovation-4x3', route:'/expertise/renovations' },
  { id:'roofing', title:'Roofing', kicker:'RESI + COMMERCIAL', blurb:'Shingle, metal, TPO and EPDM. Storm and insurance claims.', slug:'expertise-roofing-4x3', route:'/roofing' },
];

function ExpertiseCard({ item, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <a href="#" onClick={(e)=>{e.preventDefault(); onClick?.();}}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{display:'block', position:'relative', overflow:'hidden', background:'var(--bg-primary)', border:'1px solid var(--hairline)'}}>
      <div style={{aspectRatio:'4/3', position:'relative', overflow:'hidden'}}>
        <div style={{position:'absolute', inset:0, transform: hover? 'scale(1.05)':'scale(1)', transition:'transform .45s ease'}}>
          <Placeholder slug={item.slug} w={800} h={600} tag="EXPERTISE"/>
        </div>
        <div style={{
          position:'absolute', inset:0, background:'var(--accent)',
          opacity: hover? .88 : 0, transition:'opacity .25s ease',
          display:'flex', alignItems:'center', justifyContent:'center'
        }}>
          <div style={{
            width:120, height:120, borderRadius:'50%', background:'#fff', color:'var(--accent)',
            display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column',
            fontFamily:'var(--mono)', fontSize:10, fontWeight:600, letterSpacing:'.2em',
            transform: hover? 'scale(1)':'scale(.8)', transition:'transform .3s ease'
          }}>
            LEARN<br/>MORE
            <div style={{marginTop:6}}><Arrow size={18}/></div>
          </div>
        </div>
      </div>
      <div style={{padding:'24px 28px', display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16}}>
        <div>
          <div className="mono" style={{color:'var(--accent)'}}>// {item.kicker}</div>
          <div style={{fontFamily:'var(--display)', fontSize:26, letterSpacing:'-.015em', marginTop:8, color:'#fff'}}>{item.title}</div>
          <div style={{fontSize:14, color:'var(--fg-muted)', marginTop:10, maxWidth:320}}>{item.blurb}</div>
        </div>
        <div style={{padding:6, border:'1px solid var(--hairline)', color:'var(--fg-muted)'}}>
          <Arrow size={14}/>
        </div>
      </div>
    </a>
  );
}

function ExpertiseGrid() {
  const { navigate } = useApp();
  return (
    <section className="section" style={{background:'var(--bg-primary)'}}>
      <div className="wrap">
        <Reveal>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:24, marginBottom:40}}>
            <div>
              <Kicker>WHAT WE BUILD</Kicker>
              <h2 className="display jk-expertise-h2" style={{fontSize:'clamp(40px, 5.6vw, 84px)', marginTop:16}}>
                Six disciplines.<br/>One standard of prestige.
              </h2>
            </div>
            <button onClick={()=>navigate('/expertise')} className="btn btn-outline">
              All expertise <Arrow/>
            </button>
          </div>
        </Reveal>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:1, background:'var(--hairline)'}} className="exp-grid">
          {EXPERTISE.map((it,i)=>(
            <Reveal key={it.id} delay={i*60}>
              <ExpertiseCard item={it} onClick={()=>navigate(it.route || '/expertise')}/>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width:900px){ .exp-grid{grid-template-columns:repeat(2,1fr) !important} }
        @media (max-width:600px){ .exp-grid{grid-template-columns:1fr !important} }
      `}</style>
    </section>
  );
}

/* =========================================================
   Turnkey Promise 3-step
   ========================================================= */
function TurnkeyPromise() {
  const steps = [
    {
      n:'01',
      t:'Self-Perform Trades.',
      d:'We put our own crews on concrete, framing, drywall, finish carpentry, and roofing — not brokers, not strangers. Owners and GC partners get faster schedules, tighter quality control, and one foreman who reads prints and closes punch lists without drama.',
    },
    {
      n:'02',
      t:'Fixed-Price Contracts.',
      d:'Before we break ground, you have a number and a scope in writing. We don\'t run change-order theater. If scope doesn\'t change, the price doesn\'t change. That commitment is what separates JK Prestige from every other general contractor in Jacksonville, FL.',
    },
    {
      n:'03',
      t:'Owner-Direct Communication.',
      d:'You\'ll never be handed off to a project coordinator you\'ve never met. A JK principal is reachable by phone from first call to final walkthrough. One decision-maker. One line of accountability. One guarantee behind every project we deliver.',
    },
  ];
  return (
    <section className="section" style={{background:'var(--bg-invert)', color:'#fff'}}>
      <div className="wrap">
        <Reveal>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:24, marginBottom:48}}>
            <div>
              <span className="mono" style={{color:'rgba(255,255,255,.8)'}}>// THE TURNKEY PROMISE</span>
              <h2 className="display" style={{fontSize:'clamp(40px, 5.6vw, 84px)', marginTop:16, maxWidth:900}}>
                One contract. One guarantee. 100% satisfaction.
              </h2>
            </div>
          </div>
        </Reveal>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'rgba(255,255,255,.2)'}} className="turnkey-grid">
          {steps.map((s,i)=>(
            <Reveal key={s.n} delay={i*100} style={{background:'var(--bg-invert)', padding:'clamp(28px,4vw,48px)'}}>
              <div style={{fontFamily:'var(--display)', fontSize:96, letterSpacing:'-.03em', color:'rgba(255,255,255,.25)', lineHeight:.9}}>{s.n}</div>
              <div style={{fontFamily:'var(--display)', fontSize:30, letterSpacing:'-.02em', marginTop:16, lineHeight:1.05}}>{s.t}</div>
              <div style={{marginTop:18, fontSize:15, lineHeight:1.65, color:'rgba(255,255,255,.88)', maxWidth:340}}>{s.d}</div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width:900px){ .turnkey-grid{grid-template-columns:1fr !important} }
      `}</style>
    </section>
  );
}

/* =========================================================
   Letter-mask video (BUILT TO LAST)
   — Scroll-pinned. Letters fill progressively LEFT→RIGHT with the
     hero construction video as the user scrubs. User cannot scroll
     past the section until the letters are 100% filled (natural
     consequence of pin + 260vh dwell distance).
   ========================================================= */
const JK_LETTERS_MASK = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 500" preserveAspectRatio="xMidYMid meet">'+
  '<text x="800" y="190" text-anchor="middle" dominant-baseline="middle" '+
  'font-family="Archivo Black, Inter, sans-serif" font-weight="900" font-size="230" letter-spacing="-10" fill="white">BUILT TO</text>'+
  '<text x="800" y="410" text-anchor="middle" dominant-baseline="middle" '+
  'font-family="Archivo Black, Inter, sans-serif" font-weight="900" font-size="230" letter-spacing="-10" fill="white">LAST.</text>'+
  '</svg>'
);
const JK_LETTERS_MASK_URL = `url("data:image/svg+xml;utf8,${JK_LETTERS_MASK}")`;

function LetterMaskVideo() {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [t, setT] = useState(0);

  useEffect(()=>{
    const el = wrapRef.current; if (!el) return;
    let raf = 0;
    const compute = ()=>{
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const prog = Math.max(0, Math.min(1, -rect.top / total));
      setT(prog);
    };
    const onScroll = ()=>{ cancelAnimationFrame(raf); raf = requestAnimationFrame(compute); };
    window.addEventListener('scroll', onScroll, { passive:true });
    window.addEventListener('resize', onScroll);
    compute();
    return ()=>{
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  },[]);

  useEffect(()=>{ const v=videoRef.current; if(v) v.play().catch(()=>{}); },[]);

  const pct = Math.round(t*100);
  const clip = `inset(0 ${(1-t)*100}% 0 0)`;

  return (
    <section ref={wrapRef} style={{height:'260vh', position:'relative', background:'var(--bg-primary)'}}>
      <div style={{position:'sticky', top:0, height:'100vh', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center'}}>
        {/* backdrop */}
        <div style={{position:'absolute', inset:0, background:'var(--bg-primary)'}}/>

        {/* Outlined letters — always visible so the user sees what's filling */}
        <svg viewBox="0 0 1600 500" preserveAspectRatio="xMidYMid meet"
             style={{position:'absolute', width:'95vw', height:'auto', zIndex:1, pointerEvents:'none'}}>
          <text x="800" y="190" textAnchor="middle" dominantBaseline="middle"
                style={{fontFamily:'Archivo Black, Inter, sans-serif', fontWeight:900, fontSize:230, letterSpacing:'-10'}}
                fill="none" stroke="#ffffff" strokeWidth="1.2" opacity=".35">BUILT TO</text>
          <text x="800" y="410" textAnchor="middle" dominantBaseline="middle"
                style={{fontFamily:'Archivo Black, Inter, sans-serif', fontWeight:900, fontSize:230, letterSpacing:'-10'}}
                fill="none" stroke="#ffffff" strokeWidth="1.2" opacity=".35">LAST.</text>
        </svg>

        {/* Filled layer — hero video masked by letter shapes, clipped L→R by scroll progress */}
        <div style={{
          position:'absolute',
          width:'95vw',
          aspectRatio:'1600 / 500',
          zIndex:2,
          WebkitMaskImage: JK_LETTERS_MASK_URL,
          maskImage: JK_LETTERS_MASK_URL,
          WebkitMaskSize:'100% 100%',
          maskSize:'100% 100%',
          WebkitMaskRepeat:'no-repeat',
          maskRepeat:'no-repeat',
          WebkitMaskPosition:'center',
          maskPosition:'center',
          pointerEvents:'none',
        }}>
          <div style={{
            position:'absolute', inset:0,
            clipPath: clip,
            WebkitClipPath: clip,
            willChange:'clip-path',
          }}>
            <div style={{position:'absolute', inset:0, background:'var(--accent)'}}/>
            <video
              ref={videoRef}
              src="assets/videos/hero.mp4"
              autoPlay muted loop playsInline preload="auto"
              style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', mixBlendMode:'screen', opacity:.9}}
            />
            <svg style={{position:'absolute', inset:0, width:'100%', height:'100%', opacity:.18, pointerEvents:'none'}}>
              <defs>
                <pattern id="lmv-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#fff" strokeWidth=".6"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#lmv-grid)"/>
            </svg>
          </div>

          {/* leading edge glow at the fill front */}
          <div style={{
            position:'absolute', top:0, bottom:0,
            left:`calc(${t*100}% - 2px)`,
            width:4,
            background:'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.95) 50%, rgba(255,255,255,0) 100%)',
            opacity: t>0.002 && t<0.998 ? 1 : 0,
            transition:'opacity .2s',
            filter:'blur(.5px)',
          }}/>
        </div>

        {/* top overlay */}
        <div style={{position:'absolute', top:40, left:0, right:0, padding:'0 clamp(20px,4vw,48px)', display:'flex', justifyContent:'space-between', zIndex:3, gap:12, alignItems:'center'}}>
          <span className="mono" style={{color:'var(--fg-muted)'}}>// OUR STANDARD</span>
          <span className="mono jk-lmv-tagline" style={{color:'var(--fg-muted)', textAlign:'right'}}>ONE CONTRACT · ONE GUARANTEE · 100%</span>
        </div>

        {/* bottom overlay — kicker + progress */}
        <div className="jk-lmv-bottom" style={{position:'absolute', bottom:40, left:0, right:0, padding:'0 clamp(20px,4vw,48px)', display:'flex', justifyContent:'space-between', alignItems:'center', gap:16, zIndex:3}}>
          <div className="mono jk-lmv-text" style={{color:'var(--accent)', flexShrink:0}}>// EST. 2017 · BUILT IN FL</div>
          <div style={{display:'flex', alignItems:'center', gap:10, flex:1, justifyContent:'flex-end', minWidth:0}}>
            <span className="mono" style={{color:'#fff', flexShrink:0}}>{String(pct).padStart(3,'0')}%</span>
            <div className="jk-lmv-bar" style={{flex:1, maxWidth:220, height:3, background:'rgba(255,255,255,.15)', position:'relative', overflow:'hidden', minWidth:60}}>
              <div style={{position:'absolute', top:0, left:0, height:'100%', width:(t*100)+'%', background:'var(--accent)'}}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   USMap — Google Maps embed + past project states
   ========================================================= */
const PAST_PROJECT_STATES = ['FL','NJ','PA','MD','VA','NC','NY','GA','TX','CO','AZ','CA','IL','OH','MA'];

function USMap() {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);
  useEffect(()=>{
    const io = new IntersectionObserver(([e])=> { if(e.isIntersecting){ setLoaded(true); io.disconnect(); }}, {threshold:.15});
    if (ref.current) io.observe(ref.current);
    return ()=>io.disconnect();
  },[]);

  return (
    <section className="section" style={{background:'var(--bg-primary)'}} ref={ref}>
      <div className="wrap">
        <Reveal>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:24, marginBottom:32}}>
            <div>
              <Kicker>WHERE WE WORK</Kicker>
              <h2 className="display" style={{fontSize:'clamp(40px,5.6vw,84px)', marginTop:16}}>
                Licensed, bonded, insured —<br/>based in Jacksonville, FL.
              </h2>
            </div>
            <div style={{display:'flex', gap:24, alignItems:'center'}}>
              <Legend dot="var(--accent-hot)" label="Headquarters"/>
              <Legend dot="var(--accent)" label="Past projects"/>
            </div>
          </div>
        </Reveal>

        {/* Google Maps embed */}
        <div style={{position:'relative', background:'#1c1c24', border:'1px solid var(--hairline)', overflow:'hidden'}}>
          <div style={{position:'relative', paddingBottom:'42%', minHeight:320}}>
            {loaded ? (
              <iframe
                title="JK Prestige Constructor — Jacksonville, FL"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500000!2d-81.65565!3d30.33218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5b716f1ceafeb%3A0xc4cd7d3896fcc7aa!2sJacksonville%2C%20FL!5e0!3m2!1sen!2sus!4v1714000000000!5m2!1sen!2sus"
                style={{position:'absolute', inset:0, width:'100%', height:'100%', border:0, filter:'invert(.92) hue-rotate(180deg) saturate(.8) brightness(.9)'}}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center'}}>
                <span className="mono" style={{color:'var(--fg-dim)', fontSize:11}}>// LOADING MAP...</span>
              </div>
            )}
          </div>

          {/* Overlay stats bar */}
          <div className="jk-map-bar" style={{
            position:'absolute', bottom:0, left:0, right:0,
            background:'linear-gradient(transparent, rgba(24,24,30,.97) 40%)',
            padding:'40px clamp(16px,2vw,32px) 20px',
            display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:12, alignItems:'flex-end',
          }}>
            <div>
              <div className="mono" style={{color:'var(--accent-hot)', fontSize:11}}>// HEADQUARTERS</div>
              <div style={{fontFamily:'var(--display)', fontSize:'clamp(14px,1.8vw,22px)', letterSpacing:'-.01em', color:'#fff', marginTop:6}}>
                Jacksonville, FL · M–F 7am–6pm
              </div>
            </div>
            <div className="jk-map-states" style={{display:'flex', gap:'clamp(8px,2vw,24px)', flexWrap:'wrap', alignItems:'center'}}>
              {PAST_PROJECT_STATES.slice(0,8).map(s=>(
                <span key={s} className="mono" style={{color:'rgba(255,255,255,.45)', fontSize:11}}>{s}</span>
              ))}
              <span className="mono" style={{color:'rgba(255,255,255,.45)', fontSize:11}}>+{PAST_PROJECT_STATES.length - 8}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function Legend({dot,label}){
  return (
    <div style={{display:'flex', alignItems:'center', gap:8}}>
      <span style={{width:10, height:10, background:dot, borderRadius:'50%'}}/>
      <span className="mono" style={{color:'var(--fg-muted)'}}>{label}</span>
    </div>
  );
}

/* =========================================================
   Subcontracting band
   ========================================================= */
function SubcontractingBand() {
  const { navigate } = useApp();
  return (
    <section className="section" style={{background:'var(--bg-elev)'}}>
      <div className="wrap jk-sub-band" style={{display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:'clamp(32px,5vw,72px)', alignItems:'center'}}>
        <Reveal>
          <span className="mono" style={{color:'#fff', opacity:.85}}>// FOR GC PARTNERS</span>
          <h2 className="display" style={{fontSize:'clamp(36px,4.8vw,72px)', marginTop:16, color:'#fff'}}>
            A trade partner who performs — not just shows up.
          </h2>
          <p style={{marginTop:22, fontSize:17, lineHeight:1.65, color:'rgba(255,255,255,.9)', maxWidth:620}}>
            JK Prestige Constructor self-performs drywall, framing, and roofing with our own bonded, OSHA-30 crews. We mobilize fast, read prints, and hand off clean. If you're a GC who needs a dependable sub in Florida — or needs to fill a critical-path trade without risk — we're the call to make.
          </p>
          <p style={{marginTop:14, fontSize:15, lineHeight:1.6, color:'rgba(255,255,255,.75)', maxWidth:560}}>
            Request our trade packet for licensing, insurance certificates, scope sheets, and references from GC partners who've worked with us across Florida and beyond.
          </p>
          <div style={{display:'flex', gap:12, marginTop:28, flexWrap:'wrap'}}>
            <button className="btn btn-primary" onClick={()=>navigate('/contact')}>Request our trade packet <Arrow/></button>
            <button className="btn btn-ghost" onClick={()=>navigate('/expertise')}>See self-perform scopes</button>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:1, background:'rgba(0,0,0,.25)'}}>
            {['Framing','Concrete','Drywall','Finish carpentry','Roofing crews','Self-perform trades'].map((t,i)=>(
              <div key={t} style={{background:'var(--bg-elev)', padding:'22px 20px', display:'flex', flexDirection:'column', gap:8}}>
                <span style={{width:16, height:16, border:'1px solid var(--accent)', position:'relative'}}>
                  <span style={{position:'absolute', inset:3, background:'var(--accent)'}}/>
                </span>
                <span className="mono" style={{color:'#fff'}}>{t.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   TestimonialBlock
   ========================================================= */
function StarRating({ count=5 }) {
  return (
    <div style={{display:'flex', gap:4, marginBottom:14}}>
      {Array.from({length:count}).map((_,i)=>(
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625.59-3.44L2 4.635l3.455-.505L7 1z" fill="#526FAE"/>
        </svg>
      ))}
    </div>
  );
}

function TestimonialBlock() {
  const { navigate } = useApp();
  const quotes = [
    {
      body:"JK Prestige walked our family through every decision — scope, budget, material choices. The numbers never moved unless we moved them. They self-performed the framing and drywall themselves, and the quality showed at every stage. The house feels exactly like us, delivered on time.",
      who:"Homeowner · Full custom build, Jacksonville, FL",
      kicker:"HOMEOWNER",
    },
    {
      body:"They delivered our 96-bed medical tower on a compressed schedule without a single ICRA breach. The preconstruction process was the most organized we've worked through — real self-perform, real schedule accountability, and a principal who answered his phone every time. We've already awarded them our next phase.",
      who:"Director of Capital Projects · Regional hospital system, Florida",
      kicker:"HEALTHCARE DEVELOPER",
    },
    {
      body:"JK's framing crew pulled a 38,000 sqft mixed-use shell out of the mud and handed it to us ready for MEP rough-in in seven weeks. Clean site, no punch-list surprises, no insurance headaches. That kind of trade partner is rare. We put them on our preferred list immediately.",
      who:"GC Partner · Southeast division",
      kicker:"FELLOW GC",
    },
  ];
  return (
    <section style={{background:'var(--bg-invert)', color:'#fff'}}>
      <div className="wrap jk-testimonial-grid" style={{padding:'clamp(64px,8vw,128px) clamp(20px,4vw,64px)', display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:'clamp(32px,5vw,80px)'}}>
        <Reveal>
          <span className="mono" style={{color:'rgba(255,255,255,.8)'}}>// WHAT PEOPLE SAY</span>
          <h2 className="jk-testimonial-h2" style={{color:'#000', fontFamily:'var(--display)', fontSize:'clamp(48px,7vw,112px)', letterSpacing:'-.025em', lineHeight:.9, marginTop:20}}>
            Prestige Is In The&nbsp;Details.
          </h2>
          <div style={{marginTop:24, color:'rgba(255,255,255,.9)', fontSize:16, maxWidth:420, lineHeight:1.65}}>
            Homeowners, developers, and GC partners. One operating standard since 2017. Every referral we've earned has come from delivering exactly what we promised.
          </div>
          <div style={{marginTop:28}}>
            <button className="btn btn-outline" onClick={()=>navigate('/contact')}
              style={{color:'rgba(255,255,255,.9)', borderColor:'rgba(255,255,255,.3)'}}>
              Read more reviews <Arrow/>
            </button>
          </div>
        </Reveal>
        <div style={{display:'grid', gap:1, background:'rgba(255,255,255,.3)', alignSelf:'start'}}>
          {quotes.map((q,i)=>(
            <Reveal key={i} delay={i*100} style={{background:'var(--bg-invert)', padding:'28px 28px'}}>
              <StarRating/>
              <span className="mono" style={{color:'rgba(255,255,255,.85)'}}>// {q.kicker}</span>
              <p style={{fontFamily:'var(--display)', fontSize:'clamp(18px,1.8vw,24px)', letterSpacing:'-.015em', lineHeight:1.3, marginTop:14, color:'#fff'}}>
                &ldquo;{q.body}&rdquo;
              </p>
              <div style={{marginTop:16, fontSize:12, letterSpacing:'.15em', textTransform:'uppercase', color:'rgba(255,255,255,.8)', fontFamily:'var(--mono)'}}>{q.who}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Affordability Band
   ========================================================= */
function AffordabilityBand() {
  const { navigate } = useApp();
  return (
    <section className="section-tight" style={{background:'var(--bg-primary)', borderTop:'1px solid var(--hairline)', borderBottom:'1px solid var(--hairline)'}}>
      <div className="wrap" style={{display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:24}}>
        <div style={{display:'flex', alignItems:'center', gap:'clamp(14px,2.4vw,40px)', flexWrap:'wrap'}}>
          <span className="mono" style={{color:'var(--accent)'}}>// TRANSPARENT PRICING</span>
          <div style={{fontFamily:'var(--display)', fontSize:'clamp(22px, 2.4vw, 32px)', letterSpacing:'-.015em', color:'#fff', maxWidth:820, lineHeight:1.2}}>
            Transparent pricing. No surprises. Fixed-price contracts available — so you build with confidence, not anxiety.
          </div>
        </div>
        <button className="btn btn-outline" onClick={()=>navigate('/contact')}>Talk to a principal <Arrow/></button>
      </div>
    </section>
  );
}

/* =========================================================
   News strip
   ========================================================= */
const NEWS = [
  { cat:'ON THE JOBSITE', date:'04.18.26', title:'Topping out the Meridian Medical Tower — 14 weeks ahead of schedule', teaser:'Our Florida hospital construction crew hit structural completion on a compressed ICRA-compliant schedule, handing over a clean shell ready for MEP rough-in.', slug:'news-meridian-topping-16x9' },
  { cat:'HOMEOWNER TIPS', date:'04.02.26', title:'Five questions every homeowner should ask before signing a renovation contract', teaser:'Before you hand over a deposit, make sure you understand who\'s actually on your jobsite, what\'s in the fixed-price scope, and who answers the phone when something goes wrong.', slug:'news-homeowner-questions-16x9' },
  { cat:'FROM THE FIELD', date:'03.22.26', title:'JK Prestige crosses 500 delivered projects — still going strong since 2017', teaser:'Eight years after opening our doors in Jacksonville, FL, our team has completed over 500 projects across residential, commercial, and medical sectors — with the same principals leading every one.', slug:'news-500-projects-16x9' },
];
function NewsStrip() {
  const { navigate } = useApp();
  return (
    <section className="section" style={{background:'var(--bg-primary)'}}>
      <div className="wrap">
        <Reveal>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:24, marginBottom:32}}>
            <div>
              <Kicker>FROM THE FIELD</Kicker>
              <h2 className="display" style={{fontSize:'clamp(36px,4.8vw,72px)', marginTop:14}}>Jobsite dispatches. Real projects. Straight talk.</h2>
            </div>
            <button className="btn btn-outline" onClick={()=>navigate('/contact')}>Work with us <Arrow/></button>
          </div>
        </Reveal>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'var(--hairline)'}} className="news-grid">
          {NEWS.map((n,i)=>(
            <Reveal key={i} delay={i*80}>
              <a href="#" onClick={(e)=>{e.preventDefault(); navigate('/contact');}} style={{display:'block', background:'var(--bg-primary)', height:'100%'}}>
                <Placeholder slug={n.slug} w={800} h={500} tag="NEWS HERO"/>
                <div style={{padding:'22px 24px'}}>
                  <div style={{display:'flex', justifyContent:'space-between', color:'var(--fg-dim)'}} className="mono">
                    <span>// {n.cat}</span><span>{n.date}</span>
                  </div>
                  <div style={{fontFamily:'var(--display)', fontSize:22, letterSpacing:'-.015em', color:'#fff', marginTop:14, lineHeight:1.15}}>{n.title}</div>
                  <div style={{marginTop:12, fontSize:14, lineHeight:1.65, color:'var(--fg-muted)'}}>{n.teaser}</div>
                  <div style={{marginTop:18, display:'inline-flex', alignItems:'center', gap:8, color:'var(--accent)'}} className="mono">READ &nbsp;<Arrow size={12}/></div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width:900px){ .news-grid{grid-template-columns:1fr !important} }
      `}</style>
    </section>
  );
}

/* =========================================================
   Free Estimate Form
   ========================================================= */
const PROJECT_TYPES = ['New Home','Home Renovation','Roofing','Commercial New Build','Warehouse','Hospital/Medical','Subcontracting Inquiry','Other'];
const CONTACT_API = 'https://3hzgy43jwgdzkv47j7qmwxrck40mdmnr.lambda-url.us-east-1.on.aws/';

function FreeEstimateForm({ compact=false }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', zip:'', type:'New Home', message:'', consent:false });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const update = (k,v)=> setForm(f=>({...f, [k]:v}));

  const submit = async (e)=>{
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Valid email required';
    if (form.phone.replace(/\D/g,'').length < 7) errs.phone = 'Valid phone required';
    if (!form.consent) errs.consent = 'Please consent';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSending(true);
    setSendError('');
    try {
      const res = await fetch(CONTACT_API, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Server error');
      setSubmitted(true);
    } catch(err) {
      setSendError('Something went wrong — please call us at (904) 944-0278.');
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div style={{padding:'48px', border:'1px solid var(--accent)', background:'rgba(82,111,174,.08)'}}>
        <span className="mono" style={{color:'var(--accent)'}}>// REQUEST RECEIVED</span>
        <h3 className="display" style={{fontSize:'clamp(28px, 3.2vw, 44px)', marginTop:14, color:'#fff'}}>We'll be in touch within 48 hours.</h3>
        <p style={{marginTop:14, color:'var(--fg-muted)', maxWidth:520}}>A principal will review your project brief and reach out directly. For anything urgent, call us at <a href="tel:9049440278" style={{color:'#fff'}}>(904) 944-0278</a> or email <a href="mailto:jerekaine@hotmail.com" style={{color:'#fff'}}>jerekaine@hotmail.com</a>.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{display:'grid', gap:18}}>
      <div className="jk-form-row" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
        <Field label="Full name" error={errors.name}>
          <input className="jk-input" placeholder="Your name" value={form.name} onChange={e=>update('name', e.target.value)}/>
        </Field>
        <Field label="Email" error={errors.email}>
          <input className="jk-input" placeholder="you@domain.com" value={form.email} onChange={e=>update('email', e.target.value)}/>
        </Field>
      </div>
      <div className="jk-form-row" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
        <Field label="Phone" error={errors.phone}>
          <input className="jk-input" placeholder="(555) 555-5555" value={form.phone} onChange={e=>update('phone', e.target.value)}/>
        </Field>
        <Field label="Zip" error={errors.zip}>
          <input className="jk-input" placeholder="12345" value={form.zip} onChange={e=>update('zip', e.target.value)}/>
        </Field>
      </div>
      <Field label="Project type">
        <select className="jk-input" value={form.type} onChange={e=>update('type', e.target.value)}>
          {PROJECT_TYPES.map(t=> <option key={t} value={t} style={{background:'var(--bg-primary)'}}>{t}</option>)}
        </select>
      </Field>
      <Field label="Tell us about your project">
        <textarea className="jk-input" rows={compact? 3:5} placeholder="Scope, timing, site, anything else we should know…" value={form.message} onChange={e=>update('message', e.target.value)}/>
      </Field>
      <label style={{display:'flex', alignItems:'flex-start', gap:12, cursor:'pointer'}}>
        <span className={"cbx "+(form.consent?'on':'')} onClick={()=>update('consent', !form.consent)}>
          {form.consent && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 5 L4 8 L9 2" stroke="#fff" strokeWidth="1.6" fill="none"/></svg>}
        </span>
        <span style={{fontSize:13, color:'var(--fg-muted)', lineHeight:1.5}}>
          I authorize JK Prestige Constructor to contact me about my inquiry. No spam. We don't sell data.
        </span>
      </label>
      {errors.consent && <div style={{color:'#ff7a8c', fontSize:12}} className="mono">{errors.consent}</div>}
      {sendError && <div style={{color:'#ff7a8c', fontSize:13, padding:'12px', background:'rgba(255,0,0,.08)', border:'1px solid rgba(255,0,0,.2)'}}>{sendError}</div>}
      <div>
        <button type="submit" className="btn btn-primary" style={{padding:'18px 28px', opacity:sending?.6:1}} disabled={sending}>
          {sending ? 'Sending…' : <> Request free estimate <Arrow/> </>}
        </button>
      </div>
    </form>
  );
}
function Field({ label, error, children }) {
  return (
    <label style={{display:'block'}}>
      <span className="field-label">{label}{error && <span style={{color:'#ff7a8c', marginLeft:8, textTransform:'none', letterSpacing:0}}>· {error}</span>}</span>
      {children}
    </label>
  );
}

/* =========================================================
   Footer
   ========================================================= */
function Footer() {
  const { navigate } = useApp();
  return (
    <footer style={{background:'var(--bg-primary)', borderTop:'1px solid var(--hairline)'}}>
      {/* Form band */}
      <div className="wrap jk-footer-top" style={{padding:'clamp(48px,7vw,96px) clamp(20px,4vw,64px)', display:'grid', gridTemplateColumns:'1fr 1.1fr', gap:'clamp(40px,6vw,80px)'}} id="estimate">
        <div>
          <Kicker>FREE 48-HOUR ESTIMATE</Kicker>
          <h2 className="display" style={{fontSize:'clamp(36px,4.6vw,68px)', marginTop:16, maxWidth:560}}>
            Tell us what you're building. A principal will reply.
          </h2>
          <div style={{marginTop:22, color:'var(--fg-muted)', maxWidth:480, lineHeight:1.6}}>
            No call center. No gated salesperson. Owner-first communication from the first reply to the final walkthrough.
          </div>
          <div style={{marginTop:28, display:'grid', gap:14, maxWidth:420}}>
            <FooterRow k="PHONE" v="(904) 944-0278"/>
            <FooterRow k="EMAIL" v="jerekaine@hotmail.com"/>
            <FooterRow k="HQ" v="Jacksonville, FL · M–F 7a–6p"/>
          </div>
        </div>
        <div>
          <FreeEstimateForm compact/>
        </div>
      </div>

      <div className="hairline"/>

      {/* Main footer */}
      <div className="wrap jk-footer-main" style={{padding:'48px clamp(20px,4vw,64px)', display:'grid', gridTemplateColumns:'1.2fr 2.5fr 1fr', gap:48}}>
        <div>
          <LogoMark/>
          <div style={{marginTop:22, color:'var(--fg-muted)', fontSize:13, lineHeight:1.65, maxWidth:280}}>
            JK Prestige Constructor. Family-operated general contractor since 2017. Headquartered in Jacksonville, FL. Licensed, bonded and insured.
          </div>
          <div style={{marginTop:28, display:'flex', flexWrap:'wrap', gap:10}}>
            {['NAHB','AGC','ABC','OSHA 30'].map(t=>(
              <div key={t} style={{padding:'8px 12px', border:'1px solid var(--hairline)', fontFamily:'var(--mono)', fontSize:10, letterSpacing:'.2em', color:'var(--fg-muted)'}}>{t}</div>
            ))}
          </div>
        </div>

        <div className="jk-footer-cols" style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:32}}>
          <FooterCol title="COMPANY" items={[
            ['The JK Way','/the-jk-way'],['Expertise','/expertise'],['Projects','/projects'],['Contact','/contact']
          ]} navigate={navigate}/>
          <FooterCol title="EXPERTISE" items={[
            ['Hospitals','/expertise/hospitals'],['Custom Homes','/expertise/homes'],['Warehouses','/expertise/warehouses'],['Renovations','/expertise/renovations']
          ]} navigate={navigate}/>
          <FooterCol title="SERVICES" items={[
            ['Ground-up','/expertise'],['Roofing','/roofing'],['Subcontracting','/expertise'],['Preconstruction','/the-jk-way']
          ]} navigate={navigate}/>
          <FooterCol title="CONNECT" items={[
            ['Contact','/contact'],['Free estimate','/contact'],['Trade packet','/contact'],['Projects','/projects']
          ]} navigate={navigate}/>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:14, alignItems:'flex-end'}}>
          <FooterRow k="PHONE" v="(904) 944-0278"/>
          <FooterRow k="EMAIL" v="jerekaine@hotmail.com"/>
        </div>
      </div>

      <div className="hairline"/>

      {/* Promise + legal */}
      <div className="wrap" style={{padding:'28px clamp(20px,4vw,64px)', display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', gap:20}}>
        <div className="mono" style={{color:'var(--fg-muted)'}}>
          GROUND-UP OR GUT-RENO · HOSPITALS TO HOMES · ONE CONTRACT · 100% SATISFACTION
        </div>
        <div style={{display:'flex', gap:20, color:'var(--fg-dim)'}} className="mono">
          <span>© 2017–2025 JK PRESTIGE CONSTRUCTOR CORP</span>
          <a href="#/privacy" onClick={(e)=>{e.preventDefault(); window.dispatchEvent(new CustomEvent('jk-navigate',{detail:'/privacy'}));}} style={{color:'inherit', textDecoration:'none'}}>PRIVACY</a>
          <a href="#/terms" onClick={(e)=>{e.preventDefault(); window.dispatchEvent(new CustomEvent('jk-navigate',{detail:'/terms'}));}} style={{color:'inherit', textDecoration:'none'}}>TERMS</a>
          <span>ACCESSIBILITY</span>
        </div>
      </div>
    </footer>
  );
}
function FooterRow({k,v}){
  return (
    <div style={{display:'flex', justifyContent:'space-between', gap:16, paddingBottom:12, borderBottom:'1px solid var(--hairline)'}}>
      <span className="mono" style={{color:'var(--fg-dim)'}}>{k}</span>
      <span style={{color:'#fff', fontSize:14}}>{v}</span>
    </div>
  );
}
function FooterCol({ title, items, navigate }) {
  return (
    <div>
      <div className="mono" style={{color:'var(--fg-muted)', marginBottom:16}}>// {title}</div>
      <div style={{display:'grid', gap:10}}>
        {items.map(([l,href])=>(
          <a key={l} href={'#'+href} onClick={(e)=>{e.preventDefault(); navigate(href);}} style={{color:'#fff', fontSize:14}}>{l}</a>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  AudienceSwitcher, WhoWeAre, StatsStrip, ExpertiseGrid, TurnkeyPromise,
  LetterMaskVideo, USMap, SubcontractingBand, TestimonialBlock, AffordabilityBand,
  NewsStrip, FreeEstimateForm, Footer, EXPERTISE, NEWS, StarRating
});
