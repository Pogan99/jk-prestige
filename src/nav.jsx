const NAV_ITEMS = [
  { id:'about', label:'ABOUT', hasMega:true, route:'/about' },
  { id:'jkway', label:'THE JK WAY', hasMega:true, route:'/the-jk-way' },
  { id:'expertise', label:'EXPERTISE', hasMega:true, route:'/expertise' },
  { id:'projects', label:'PROJECTS', hasMega:false, route:'/projects' },
  { id:'roofing', label:'ROOFING', hasMega:true, route:'/roofing' },
  { id:'contact', label:'CONTACT', hasMega:false, route:'/contact' },
];

const MEGA_CONTENT = {
  about: {
    title:'The JK story',
    body:"A family-run general contractor since 2017. Licensed, bonded and insured. Based in Jacksonville, FL.",
    cards:[
      {k:'OUR STORY', t:'Building Prestige Since 2017', slug:'mega-about-story-16x9'},
      {k:'LEADERSHIP', t:'Owner-first Communication', slug:'mega-about-leadership-16x9'},
      {k:'COMMUNITY', t:'Giving Back Where We Build', slug:'mega-about-community-16x9'},
    ],
  },
  jkway: {
    title:'How we deliver',
    body:"One contract. One guarantee. 100% satisfaction. Here's the operating system behind it.",
    cards:[
      {k:'SAFETY', t:'Lead With Safety', slug:'mega-jkway-safety-16x9'},
      {k:'LEAN', t:'Lean Delivery Playbook', slug:'mega-jkway-lean-16x9'},
      {k:'VDC', t:'Virtual Design & Construction', slug:'mega-jkway-vdc-16x9'},
    ],
  },
  expertise: {
    title:'What we build',
    body:"Ground-up or gut-reno. From hospitals to homes — and every trade in between.",
    cards:[
      {k:'GROUND-UP', t:'Hospitals & Medical', slug:'mega-expertise-medical-16x9'},
      {k:'RESIDENTIAL', t:'Custom Homes', slug:'mega-expertise-homes-16x9'},
      {k:'INDUSTRIAL', t:'Warehouses & Logistics', slug:'mega-expertise-warehouses-16x9'},
    ],
  },
  roofing: {
    title:'Roofing division',
    body:"New roofs. Tear-offs. Re-roofs. Storm repair. Residential shingle + commercial flat.",
    cards:[
      {k:'RESIDENTIAL', t:'Shingle & Metal Roofing', slug:'mega-roofing-residential-16x9'},
      {k:'COMMERCIAL', t:'TPO · EPDM · Flat Systems', slug:'mega-roofing-commercial-16x9'},
      {k:'CLAIMS', t:'Storm & Insurance Claims', slug:'mega-roofing-claims-16x9'},
    ],
  },
};

function LogoMark({ small=false }) {
  return (
    <div style={{
      border:'1.5px solid #fff',
      padding: small ? '6px 10px' : '8px 12px',
      borderRadius:6,
      fontFamily:'var(--display)',
      fontSize: small ? 14 : 16,
      letterSpacing:'.02em',
      lineHeight:1,
      display:'inline-flex',
      alignItems:'center',
      gap:8,
    }}>
      <span>JK</span>
      <span style={{width:1,height:14,background:'rgba(255,255,255,.35)'}}/>
      <span style={{fontSize: small? 10:11, letterSpacing:'.18em'}}>PRESTIGE</span>
    </div>
  );
}

function Nav() {
  const { route, navigate } = useApp();
  const [hovered, setHovered] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const hoverTimer = useRef(null);

  useEffect(()=>{
    const onScroll = ()=> setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive:true });
    onScroll();
    return ()=> window.removeEventListener('scroll', onScroll);
  },[]);

  const handleEnter = (id)=>{
    clearTimeout(hoverTimer.current);
    setHovered(id);
  };
  const handleLeave = ()=>{
    hoverTimer.current = setTimeout(()=> setHovered(null), 120);
  };

  const current = hovered && MEGA_CONTENT[hovered];

  return (
    <div
      onMouseLeave={handleLeave}
      style={{
        position:'sticky', top:0, zIndex:50,
        background:'var(--bg-primary)',
        borderBottom: scrolled ? '1px solid var(--hairline)' : '1px solid transparent',
        transition:'border-color .2s',
      }}
    >
      <div style={{height:72, display:'flex', alignItems:'center', padding:'0 clamp(20px,4vw,48px)', gap:24, position:'relative'}}>
        <a href="#/" onClick={(e)=>{e.preventDefault(); navigate('/');}} style={{display:'inline-flex'}}>
          <LogoMark />
        </a>

        <nav style={{display:'flex', gap:2, marginLeft:'auto', alignItems:'center'}} className="desk-nav">
          {NAV_ITEMS.map(item=>{
            const active = route === item.route || (route.startsWith(item.route) && item.route !== '/');
            return (
              <a key={item.id}
                href={'#'+item.route}
                onClick={(e)=>{e.preventDefault(); navigate(item.route); setHovered(null);}}
                onMouseEnter={()=>handleEnter(item.hasMega ? item.id : null)}
                style={{
                  padding:'10px 14px',
                  fontFamily:'var(--mono)', fontSize:11, fontWeight:600,
                  letterSpacing:'.18em',
                  color: active ? '#fff' : 'rgba(255,255,255,.78)',
                  position:'relative',
                  display:'inline-flex', alignItems:'center', gap:6
                }}>
                {item.label}
                {active && <span style={{position:'absolute',left:14,right:14,bottom:4,height:2,background:'var(--accent)'}}/>}
              </a>
            );
          })}
          <button
            onClick={()=>setSearchOpen(v=>!v)}
            aria-label="Search"
            style={{marginLeft:8, padding:10, color:'rgba(255,255,255,.78)'}}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/><path d="m11 11 4 4" stroke="currentColor" strokeWidth="1.5"/></svg>
          </button>
        </nav>

        <button
          className="mobile-only"
          onClick={()=>setMobileOpen(v=>!v)}
          aria-label="Menu"
          style={{display:'none', padding:8}}
        >
          <div style={{width:22, height:2, background:'#fff', margin:'5px 0'}}/>
          <div style={{width:22, height:2, background:'#fff', margin:'5px 0'}}/>
          <div style={{width:16, height:2, background:'#fff', margin:'5px 0', marginLeft:'auto'}}/>
        </button>
      </div>

      {/* Mega panel */}
      <div className={"mega "+(current?'open':'')} onMouseEnter={()=>clearTimeout(hoverTimer.current)}>
        {current && (
          <div style={{padding:'40px clamp(24px,4vw,48px) 48px', display:'grid', gridTemplateColumns:'1.1fr 3fr 1fr', gap:40, maxWidth:1600, margin:'0 auto'}}>
            <div>
              <div className="mono" style={{opacity:.8, marginBottom:12, color:'#fff'}}>// {hovered.toUpperCase()}</div>
              <div className="display" style={{fontSize:36, lineHeight:1, marginBottom:12}}>{current.title}</div>
              <div style={{fontSize:14, lineHeight:1.6, opacity:.9, maxWidth:320}}>{current.body}</div>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:18}}>
              {current.cards.map((c,i)=>(
                <a key={i} href="#" onClick={(e)=>{e.preventDefault(); navigate(NAV_ITEMS.find(n=>n.id===hovered).route); setHovered(null);}}
                  style={{display:'block', color:'#fff', cursor:'pointer'}}>
                  <Placeholder slug={c.slug} w={800} h={450} tag="MEGA CARD" />
                  <div className="mono" style={{fontSize:10, opacity:.8, marginTop:12}}>// {c.k}</div>
                  <div style={{fontFamily:'var(--display)', fontSize:20, letterSpacing:'-.015em', marginTop:6}}>{c.t}</div>
                </a>
              ))}
            </div>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'flex-start'}}>
              <div className="mono" style={{opacity:.8}}>// EXPLORE</div>
              <a href="#" onClick={(e)=>{e.preventDefault(); navigate(NAV_ITEMS.find(n=>n.id===hovered).route); setHovered(null);}}
                style={{display:'inline-flex', alignItems:'center', gap:10, fontFamily:'var(--display)', fontSize:22, letterSpacing:'-.02em', borderBottom:'1px solid rgba(255,255,255,.4)', paddingBottom:6}}>
                LEARN MORE <Arrow size={16}/>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{position:'fixed', inset:0, top:72, background:'var(--bg-primary)', zIndex:60, padding:'40px 24px', overflow:'auto'}}>
          {NAV_ITEMS.map(item=>(
            <a key={item.id} href={'#'+item.route} onClick={(e)=>{e.preventDefault(); navigate(item.route); setMobileOpen(false);}}
              style={{display:'block', padding:'18px 0', borderBottom:'1px solid var(--hairline)', fontFamily:'var(--display)', fontSize:28, letterSpacing:'-.015em'}}>
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* Search palette */}
      {searchOpen && (
        <div onClick={()=>setSearchOpen(false)} style={{position:'fixed', inset:0, background:'rgba(0,0,0,.6)', zIndex:70, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:120}}>
          <div onClick={e=>e.stopPropagation()} style={{background:'var(--bg-primary)', border:'1px solid var(--hairline)', width:'min(640px, 90vw)', padding:24}}>
            <div className="mono" style={{color:'var(--accent)', marginBottom:10}}>// SEARCH THE SITE</div>
            <input autoFocus placeholder="Search projects, services, locations…" className="jk-input" style={{fontSize:16}}/>
            <div style={{marginTop:18, display:'flex', flexWrap:'wrap', gap:8}}>
              {['Hospitals','Custom Homes','Roofing','Subcontracting','Warehouses'].map(t=>(
                <span key={t} style={{padding:'6px 12px', border:'1px solid var(--hairline)', fontFamily:'var(--mono)', fontSize:10, letterSpacing:'.18em', color:'var(--fg-muted)'}}>{t.toUpperCase()}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px){
          .desk-nav{display:none !important}
          .mobile-only{display:block !important}
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { Nav, LogoMark, NAV_ITEMS });
