/* =========================================================
   App root — router, theme state, page switcher
   ========================================================= */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "motion": "full",
  "density": "airy",
  "accentHot": "#B10C2A",
  "displayFont": "'Archivo Black', sans-serif"
}/*EDITMODE-END*/;

function App() {
  const [route, setRoute] = useState(()=> {
    const h = window.location.hash.replace('#','');
    return h || '/';
  });
  const [audience, setAudience] = useState(()=>{
    try { return localStorage.getItem('jk.audience') || 'homeowner'; } catch(e){ return 'homeowner'; }
  });
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(()=>{
    try { localStorage.setItem('jk.audience', audience); } catch(e){}
  },[audience]);

  // Apply tweaks to :root
  useEffect(()=>{
    const r = document.documentElement;
    r.style.setProperty('--accent-hot', tweaks.accentHot);
    r.style.setProperty('--display', tweaks.displayFont);
    r.style.setProperty('--density', tweaks.density==='tight' ? '.7' : '1');
    if (tweaks.motion==='reduced') document.body.classList.add('reduce-motion');
    else document.body.classList.remove('reduce-motion');
  },[tweaks]);

  const navigate = (r)=>{
    if (r === route) return;
    setTransitioning(true);
    setTimeout(()=>{
      setRoute(r);
      window.location.hash = r;
      window.scrollTo(0,0);
      setTimeout(()=> setTransitioning(false), 50);
    }, 260);
  };

  useEffect(()=>{
    const onHash = ()=> setRoute(window.location.hash.replace('#','') || '/');
    window.addEventListener('hashchange', onHash);
    return ()=> window.removeEventListener('hashchange', onHash);
  },[]);

  /* Footer link events (dispatched from sections.jsx footer) */
  useEffect(()=>{
    const handler = (e)=> navigate(e.detail);
    window.addEventListener('jk-navigate', handler);
    return ()=> window.removeEventListener('jk-navigate', handler);
  },[route]);

  return (
    <AppCtx.Provider value={{ route, navigate, audience, setAudience, tweaks, setTweaks }}>
      <Nav/>
      <div key={route} className={transitioning? '' : 'page-enter'} style={{position:'relative'}}>
        {route === '/' && <HomePage/>}
        {route === '/the-jk-way' && <JKWayPage/>}
        {route === '/expertise' && <ExpertisePage/>}
        {route === '/expertise/hospitals' && <HospitalsPage/>}
        {route === '/expertise/homes' && <CustomHomesPage/>}
        {route === '/expertise/warehouses' && <WarehousesPage/>}
        {route === '/expertise/commercial' && <CommercialPage/>}
        {route === '/expertise/renovations' && <RenovationsPage/>}
        {route === '/projects' && <ProjectsPage/>}
        {route === '/roofing' && <RoofingPage/>}
        {route === '/contact' && <ContactPage/>}
        {route === '/terms' && <TermsPage/>}
        {route === '/privacy' && <PrivacyPage/>}
        {route === '/blog' && <BlogPage/>}
      </div>
      <Footer/>

      {/* Page transition overlay */}
      {transitioning && (
        <div style={{
          position:'fixed', inset:0, background:'var(--bg-primary)', zIndex:100,
          animation:'wipeOut .5s cubic-bezier(.7,0,.3,1) forwards'
        }}/>
      )}
      <style>{`
        @keyframes wipeOut {
          0%{clip-path:inset(0 100% 0 0)}
          50%{clip-path:inset(0 0 0 0)}
          100%{clip-path:inset(0 0 0 100%)}
        }
      `}</style>

      <TweaksPanel/>
    </AppCtx.Provider>
  );
}

function HomePage() {
  const { audience } = useApp();
  return (
    <>
      <Hero/>
      <RoofingRibbon/>
      <AudienceSwitcher/>
      <WhoWeAre/>
      <StatsStrip/>
      <ExpertiseGrid/>
      <TurnkeyPromise/>
      <USMap/>
      <SubcontractingBand/>
      <TestimonialBlock/>
      <AffordabilityBand/>
      <NewsStrip/>
    </>
  );
}

function BlogPage() {
  const [posts, setPosts] = React.useState([]);
  const [cat, setCat] = React.useState('all');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(()=>{
    fetch('/blog/index.json', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : Promise.reject())
      .catch(() => fetch('https://jkprestigeconstruction.com/blog/index.json', { cache: 'no-store' }).then(r => r.json()))
      .then(d => { setPosts(d); setLoading(false); })
      .catch(() => setLoading(false));
  },[]);

  const CATS = [
    { id:'all', label:'All Posts' },
    { id:'homeowner', label:'Homeowners' },
    { id:'hospital', label:'Hospital & Medical' },
    { id:'roofing', label:'Roofing' },
    { id:'commercial', label:'Commercial' },
    { id:'gc-partner', label:'GC Partners' },
    { id:'educational', label:'How-To' },
    { id:'renovation', label:'Renovations' },
    { id:'local', label:'Jacksonville' },
  ];

  const filtered = cat === 'all' ? posts : posts.filter(p => p.category === cat);

  return (
    <div style={{minHeight:'60vh'}}>
      <section style={{background:'linear-gradient(135deg,#1e1e28,#30303A)', color:'#fff', padding:'64px 20px 52px'}}>
        <div style={{maxWidth:900, margin:'0 auto'}}>
          <div style={{fontFamily:'var(--mono)', fontSize:11, fontWeight:700, letterSpacing:'.12em', color:'#526FAE', marginBottom:14}}>// FROM THE FIELD</div>
          <h1 style={{fontFamily:'var(--display)', fontSize:'clamp(1.6rem,3.5vw,2.4rem)', fontWeight:800, lineHeight:1.2, marginBottom:14}}>Jobsite Dispatches & Construction Guides</h1>
          <p style={{fontSize:'1.05rem', color:'#9098b0', maxWidth:600}}>Real knowledge from a principal-led GC. Custom homes, hospital construction, roofing, and renovation — written by the people who build it.</p>
        </div>
      </section>

      <div style={{maxWidth:1100, margin:'0 auto', padding:'48px 20px'}}>
        <div style={{display:'flex', flexWrap:'wrap', gap:8, marginBottom:36}}>
          {CATS.map(c => (
            <button key={c.id} onClick={()=>setCat(c.id)}
              style={{padding:'6px 16px', borderRadius:20, fontSize:'0.82rem', fontWeight:600, cursor:'pointer',
                border:'1px solid', borderColor: cat===c.id ? '#30303A' : '#d0d8ec',
                background: cat===c.id ? '#30303A' : '#f4f6fb',
                color: cat===c.id ? '#fff' : '#3a4460'}}>
              {c.label}
            </button>
          ))}
        </div>

        {loading && <p style={{color:'#6b7280', textAlign:'center', padding:60}}>Loading posts…</p>}

        {!loading && filtered.length === 0 && (
          <p style={{color:'#6b7280', textAlign:'center', padding:60}}>No posts in this category yet.</p>
        )}

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:28}}>
          {filtered.map(p => (
            <a key={p.slug} href={`/blog/${p.slug}/`}
              style={{border:'1px solid #e4e8f0', borderRadius:8, overflow:'hidden', background:'#fff',
                display:'flex', flexDirection:'column', color:'inherit', textDecoration:'none',
                transition:'box-shadow .2s,transform .2s'}}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 6px 24px rgba(0,0,0,0.1)'; e.currentTarget.style.transform='translateY(-2px)';}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow=''; e.currentTarget.style.transform='';}}>
              <div style={{padding:'22px 20px 20px', flex:1, display:'flex', flexDirection:'column'}}>
                <span style={{fontSize:'0.72rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', color:'#B10C2A', marginBottom:10}}>
                  {p.category_label || p.category}
                </span>
                <div style={{fontSize:'1rem', fontWeight:700, color:'#1a1a2e', lineHeight:1.35, marginBottom:10}}>{p.title}</div>
                <div style={{fontSize:'0.88rem', color:'#5a6280', lineHeight:1.55, flex:1}}>{p.excerpt}</div>
                <div style={{marginTop:16, fontSize:'0.78rem', color:'#8890a4', display:'flex', gap:12}}>
                  <span>{p.date}</span>
                  {p.read_minutes && <span>· {p.read_minutes} min read</span>}
                </div>
                <div style={{marginTop:14, fontSize:'0.82rem', fontWeight:700, color:'#526FAE', textTransform:'uppercase', letterSpacing:'.06em'}}>Read article →</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

window.App = App;

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
