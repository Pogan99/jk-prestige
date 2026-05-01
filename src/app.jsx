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

  return (
    <AppCtx.Provider value={{ route, navigate, audience, setAudience, tweaks, setTweaks }}>
      <Nav/>
      <div key={route} className={transitioning? '' : 'page-enter'} style={{position:'relative'}}>
        {route === '/' && <HomePage/>}
        {route === '/the-jk-way' && <JKWayPage/>}
        {route === '/expertise' && <ExpertisePage/>}
        {route === '/projects' && <ProjectsPage/>}
        {route === '/roofing' && <RoofingPage/>}
        {route === '/contact' && <ContactPage/>}
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

window.App = App;

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
