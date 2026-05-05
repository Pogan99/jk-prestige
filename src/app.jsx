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
  // If Cloudflare Pages SPA mode serves index.html for /blog, handle it here
  const pathname = window.location.pathname;
  if (pathname === '/blog' || pathname === '/blog/') return <><Nav/><BlogPage/><Footer/></>;

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
  const [featured, ...rest] = filtered;

  const Avatar = () => (
    <div style={{width:36, height:36, borderRadius:'50%', background:'rgba(177,12,42,0.12)',
      border:'1px solid rgba(177,12,42,0.25)', color:'#B10C2A', fontSize:12, fontWeight:800,
      display:'grid', placeItems:'center', flexShrink:0}}>JK</div>
  );

  const AuthorRow = ({p, size='sm'}) => (
    <div style={{display:'flex', alignItems:'center', gap:10}}>
      <Avatar/>
      <div>
        <div style={{fontSize: size==='lg' ? 14 : 13, fontWeight:700, color:'#1a1a2e'}}>JK Prestige Team</div>
        <div style={{fontSize:12, color:'#8890a4'}}>{p.date}{p.read_minutes ? ` · ${p.read_minutes} min read` : ''}</div>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:'60vh', background:'#f8f9fc'}}>
      <style>{`
        .jk-blog-card { transition: transform .2s, box-shadow .2s; cursor: pointer; }
        .jk-blog-card:hover { transform: translateY(-3px); box-shadow: 0 10px 36px rgba(48,48,58,0.13); }
        .jk-featured-grid { display: grid; grid-template-columns: 1fr; }
        @media (min-width: 860px) {
          .jk-featured-grid { grid-template-columns: 1fr 1fr; min-height: 320px; }
        }
      `}</style>

      {/* Hero header */}
      <section style={{background:'linear-gradient(135deg,#1e1e28 0%,#30303A 100%)', color:'#fff', padding:'64px 24px 56px'}}>
        <div style={{maxWidth:1120, margin:'0 auto'}}>
          <div style={{fontFamily:'var(--mono)', fontSize:10, fontWeight:700, letterSpacing:'.18em', color:'#526FAE', textTransform:'uppercase', marginBottom:12}}>// From the Field</div>
          <h1 style={{fontFamily:'var(--display)', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:800, lineHeight:1.1, letterSpacing:'-.02em', marginBottom:14}}>
            Jobsite Dispatches &amp; Construction Guides
          </h1>
          <p style={{fontSize:'1.05rem', color:'#9098b0', maxWidth:560, lineHeight:1.7}}>
            Real knowledge from a principal-led GC. Custom homes, hospital construction, roofing, and renovation — written by the people who build it.
          </p>
        </div>
      </section>

      <div style={{maxWidth:1120, margin:'0 auto', padding:'48px 24px 96px'}}>

        {/* Category filters */}
        <div style={{display:'flex', flexWrap:'wrap', gap:8, marginBottom:40}}>
          {CATS.map(c => (
            <button key={c.id} onClick={()=>setCat(c.id)}
              style={{padding:'5px 16px', borderRadius:20, fontSize:'0.78rem', fontWeight:700,
                letterSpacing:'.08em', textTransform:'uppercase', cursor:'pointer',
                border:'1px solid', borderColor: cat===c.id ? '#30303A' : 'rgba(48,48,58,.2)',
                background: cat===c.id ? '#30303A' : 'rgba(48,48,58,.05)',
                color: cat===c.id ? '#fff' : '#5a6280',
                transition:'all .15s'}}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:20}}>
            {[0,1,2].map(i => (
              <div key={i} style={{background:'#fff', borderRadius:16, height:280, border:'1px solid #e4e8f0', opacity:.5}}/>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p style={{color:'#6b7280', textAlign:'center', padding:'80px 0', fontSize:16}}>No posts in this category yet.</p>
        )}

        {/* Featured post */}
        {!loading && featured && (
          <a href={`/blog/${featured.slug}/`} className="jk-blog-card jk-featured-grid"
            style={{background:'#fff', border:'1px solid #e4e8f0', borderRadius:20, overflow:'hidden',
              marginBottom:32, boxShadow:'0 2px 16px rgba(48,48,58,0.07)',
              display:'grid', textDecoration:'none', color:'inherit'}}>
            {/* Color accent panel */}
            <div style={{background:'linear-gradient(135deg,#1e1e28,#30303A)', display:'flex', alignItems:'center', justifyContent:'center', minHeight:220, padding:40}}>
              <div style={{textAlign:'center'}}>
                <div style={{fontFamily:'var(--mono)', fontSize:9, fontWeight:700, letterSpacing:'.18em', color:'#526FAE', textTransform:'uppercase', marginBottom:12}}>// Latest Post</div>
                <div style={{fontFamily:'var(--display)', fontSize:'clamp(1.6rem,3vw,2.4rem)', fontWeight:800, color:'#fff', lineHeight:1.1, letterSpacing:'-.02em'}}>
                  {featured.category_label || featured.category}
                </div>
                <div style={{width:48, height:3, background:'#B10C2A', margin:'16px auto 0'}}/>
              </div>
            </div>
            {/* Content */}
            <div style={{padding:'32px 32px 28px', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <div>
                <span style={{fontSize:10, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:'#B10C2A', display:'block', marginBottom:12}}>Featured</span>
                <h2 style={{fontFamily:'var(--display)', fontSize:'clamp(1.3rem,2.5vw,1.8rem)', fontWeight:800, color:'#1a1a2e', lineHeight:1.2, marginBottom:14, letterSpacing:'-.015em'}}>
                  {featured.title}
                </h2>
                <p style={{fontSize:'0.92rem', color:'#5a6280', lineHeight:1.65, marginBottom:20}}>{featured.excerpt}</p>
                <AuthorRow p={featured} size="lg"/>
              </div>
              <div style={{marginTop:24}}>
                <span style={{display:'inline-flex', alignItems:'center', gap:8, fontFamily:'var(--mono)', fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'#526FAE'}}>
                  Read full article →
                </span>
              </div>
            </div>
          </a>
        )}

        {/* Post grid */}
        {!loading && rest.length > 0 && (
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:22}}>
            {rest.map(p => (
              <a key={p.slug} href={`/blog/${p.slug}/`} className="jk-blog-card"
                style={{background:'#fff', border:'1px solid #e4e8f0', borderRadius:16, overflow:'hidden',
                  display:'flex', flexDirection:'column', textDecoration:'none', color:'inherit',
                  boxShadow:'0 2px 8px rgba(48,48,58,0.05)'}}>
                {/* Top accent bar by category */}
                <div style={{height:4, background: p.category==='roofing' ? '#B10C2A' : p.category==='hospital' ? '#526FAE' : p.category==='homeowner' ? '#2d7a4f' : '#30303A'}}/>
                <div style={{padding:'20px 20px 22px', flex:1, display:'flex', flexDirection:'column'}}>
                  <span style={{fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'.12em', color:'#B10C2A', marginBottom:10}}>
                    {p.category_label || p.category}
                  </span>
                  <h3 style={{fontSize:'1rem', fontWeight:700, color:'#1a1a2e', lineHeight:1.3, marginBottom:12, letterSpacing:'-.01em'}}>
                    {p.title}
                  </h3>
                  <div style={{marginBottom:16, flex:1}}>
                    <AuthorRow p={p}/>
                  </div>
                  <div style={{marginTop:'auto'}}>
                    <span style={{fontFamily:'var(--mono)', fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'#526FAE'}}>
                      Read article →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

window.App = App;

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
