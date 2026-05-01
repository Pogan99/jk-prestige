/* =========================================================
   Interior pages — About, Expertise, Roofing, Projects, Contact, Newsroom, Careers, JK Way
   Each rendered inside the main app based on route
   ========================================================= */

function PageShell({ kicker, title, sub, children }) {
  return (
    <div className="page-enter" style={{minHeight:'60vh'}}>
      <section className="section" style={{background:'var(--bg-primary)', borderBottom:'1px solid var(--hairline)'}}>
        <div className="wrap">
          <Kicker>{kicker}</Kicker>
          <h1 className="display" style={{fontSize:'clamp(48px, 8vw, 140px)', marginTop:18, lineHeight:.9}}>{title}</h1>
          {sub && <p style={{marginTop:24, maxWidth:720, color:'var(--fg-muted)', fontSize:18, lineHeight:1.6}}>{sub}</p>}
        </div>
      </section>
      {children}
    </div>
  );
}

/* ---------- ABOUT ---------- */
function AboutPage() {
  const values = [
    {k:'SAFETY', d:'Zero-compromise jobsites. OSHA 30 across leadership. Daily toolbox talks.'},
    {k:'INTEGRITY', d:'Honest numbers. No hidden change orders. The price you sign is the price we honor.'},
    {k:'CRAFTSMANSHIP', d:'Finish-first thinking from framing day. Details visible and invisible.'},
    {k:'OWNERSHIP', d:'A principal on every project. You talk to a name, not a ticket.'},
    {k:'COMMUNITY', d:'Local hiring, local trades, local giving. We build where we live.'},
  ];
  const timeline = [
    {y:'2017', t:'Founded in Jacksonville, FL — residential crew with a commitment to quality.'},
    {y:'2018', t:'First commercial tenant improvement. Self-perform trades expand.'},
    {y:'2019', t:'Roofing division formally launches. First multi-family delivery.'},
    {y:'2021', t:'First ground-up medical facility delivered on schedule.'},
    {y:'2022', t:'Cross 250 projects. Lean delivery playbook codified.'},
    {y:'2023', t:'Hospital tower program. Subcontracting packet opened to fellow GCs.'},
    {y:'2025', t:'500+ projects delivered. Operations across the US. Still family-run.'},
  ];
  return (
    <PageShell kicker="ABOUT JK PRESTIGE" title={<>A family business,<br/>built to last.</>} sub="Started in 2017 with a truck, two framers, and a handshake. Still family-operated — still on the jobsite.">
      <section className="section" style={{background:'var(--bg-primary)'}}>
        <div className="wrap" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(32px,5vw,72px)'}}>
          <div>
            <Placeholder slug="about-founders-jobsite-4x3" w={1200} h={900} tag="FOUNDERS ON JOBSITE"/>
          </div>
          <div>
            <span className="mono" style={{color:'var(--accent)'}}>// OUR STORY</span>
            <h2 className="display" style={{fontSize:'clamp(32px,4vw,54px)', marginTop:16}}>Built the way we'd want our own homes built.</h2>
            <div style={{color:'var(--fg-muted)', fontSize:16, lineHeight:1.7, marginTop:20, display:'grid', gap:16}}>
              <p>JK Prestige was founded in 2017 around a simple promise: show up, do the work right, and stand behind it. Still the whole playbook.</p>
              <p>We self-perform the critical trades, vet and manage every specialty sub, and run a single contract so you have one principal responsible for the outcome — not a carousel of companies pointing at each other.</p>
              <p>We've grown from one crew into a licensed, bonded and insured operation delivering hospitals, homes, warehouses, and everything in between — based in Jacksonville, FL.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{background:'var(--bg-elev)'}}>
        <div className="wrap">
          <Kicker>CORE VALUES</Kicker>
          <h2 className="display" style={{fontSize:'clamp(36px,5vw,72px)', marginTop:14, color:'#fff'}}>Five principles. Zero exceptions.</h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:1, background:'rgba(0,0,0,.3)', marginTop:40}} className="values-grid">
            {values.map((v,i)=>(
              <Reveal key={v.k} delay={i*70} style={{background:'var(--bg-elev)', padding:'28px 24px', minHeight:260}}>
                <div style={{fontFamily:'var(--display)', fontSize:48, letterSpacing:'-.02em', color:'var(--accent)'}}>0{i+1}</div>
                <div className="mono" style={{color:'#fff', marginTop:14}}>{v.k}</div>
                <div style={{fontSize:14, color:'rgba(255,255,255,.85)', marginTop:10, lineHeight:1.6}}>{v.d}</div>
              </Reveal>
            ))}
          </div>
          <style>{`@media(max-width:900px){.values-grid{grid-template-columns:repeat(2,1fr) !important}}`}</style>
        </div>
      </section>

      {/* Leadership */}
      <section className="section" style={{background:'var(--bg-primary)'}}>
        <div className="wrap">
          <Kicker>LEADERSHIP</Kicker>
          <h2 className="display" style={{fontSize:'clamp(36px,5vw,72px)', marginTop:14}}>A principal on every project.</h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:24, marginTop:40}} className="lead-grid">
            {['J. Karras · Founder & CEO','M. Karras · President','A. Vasquez · VP Preconstruction','R. Okafor · Director of Roofing','T. Chen · Director of Safety'].map((name,i)=>(
              <Reveal key={name} delay={i*70}>
                <Placeholder slug={`leader-${i+1}-3x4`} w={900} h={1200} ratio="3/4" tag="HEADSHOT"/>
                <div className="mono" style={{color:'#fff', marginTop:14}}>{name}</div>
              </Reveal>
            ))}
          </div>
          <style>{`@media(max-width:900px){.lead-grid{grid-template-columns:repeat(2,1fr) !important}}`}</style>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{background:'var(--bg-invert)'}}>
        <div className="wrap">
          <span className="mono" style={{color:'rgba(255,255,255,.8)'}}>// TIMELINE</span>
          <h2 className="display" style={{fontSize:'clamp(36px,5vw,72px)', color:'#fff', marginTop:14}}>2017 → today.</h2>
          <div style={{marginTop:40, position:'relative'}}>
            <div style={{position:'absolute', left:0, right:0, top:22, height:1, background:'rgba(255,255,255,.35)'}}/>
            <div style={{display:'grid', gridTemplateColumns:`repeat(${timeline.length},1fr)`, gap:16}} className="tl-grid">
              {timeline.map((m,i)=>(
                <Reveal key={m.y} delay={i*80}>
                  <div style={{width:14, height:14, borderRadius:'50%', background:'#fff', border:'3px solid var(--accent-hot)', marginBottom:24, marginTop:14}}/>
                  <div style={{fontFamily:'var(--display)', fontSize:26, color:'#fff'}}>{m.y}</div>
                  <div style={{fontSize:13, color:'rgba(255,255,255,.9)', marginTop:8, lineHeight:1.5}}>{m.t}</div>
                </Reveal>
              ))}
            </div>
            <style>{`@media(max-width:1100px){.tl-grid{grid-template-columns:repeat(2,1fr) !important}}`}</style>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

/* ---------- EXPERTISE ---------- */
const VERTICALS = [
  {
    id: 'custom-homes',
    kicker: 'CUSTOM HOMES',
    headline: 'Built around your vision, not a catalog.',
    copy: "JK Prestige is Jacksonville's custom home builder of choice for clients who want a principal on site and a single point of accountability from lot to CO. We self-perform framing, finish carpentry, and critical MEP rough-ins — meaning fewer hands touching your home and zero finger-pointing when a detail matters. Every home carries a full one-year workmanship warranty and a named superintendent from day one.",
    slug: 'expertise-custom-homes-16x9',
    tag: 'CUSTOM HOME BUILD',
    route: '/expertise/homes',
  },
  {
    id: 'medical',
    kicker: 'MEDICAL & HOSPITAL',
    headline: 'Hospital-grade delivery, Florida-wide.',
    copy: 'From ground-up hospital towers to ambulatory surgery centers and medical office fit-outs, JK Prestige has delivered infection-control-compliant construction across Florida and the Southeast. Our teams are trained in ICRA protocols, NFPA 99 life-safety requirements, and phased construction inside live facilities — so patient care never stops. We coordinate directly with owners, AOR, and commissioning agents under a single GMP contract.',
    slug: 'expertise-medical-hospital-16x9',
    tag: 'HOSPITAL CONSTRUCTION',
    route: '/expertise/hospitals',
  },
  {
    id: 'warehouse',
    kicker: 'WAREHOUSES & INDUSTRIAL',
    headline: 'Tilt-up to turn-key. Fast.',
    copy: 'Distribution centers, cold storage, manufacturing facilities, and flex industrial — JK Prestige delivers clear-span structures on aggressive schedules across Florida and beyond. We self-perform concrete, tilt-up panel erection, and dock equipment installation. Our preconstruction team optimizes column grids, floor flatness specs, and trailer court geometry before a shovel breaks ground, keeping change-order risk at zero.',
    slug: 'expertise-warehouse-industrial-16x9',
    tag: 'WAREHOUSE CONSTRUCTION',
    route: '/expertise/warehouses',
  },
  {
    id: 'commercial',
    kicker: 'COMMERCIAL',
    headline: 'Retail, office, and mixed-use — delivered.',
    copy: 'Tenant improvements, ground-up retail shells, restaurant build-outs, and corporate interiors: JK Prestige has the licensing, bonding, and vetted subcontractor network to deliver commercial projects from $500K to $50M. We run a single contract, produce weekly owner reports, and hit the turnover dates that protect your lease commencement. Our commercial team operates across Jacksonville, FL and nationally.',
    slug: 'expertise-commercial-16x9',
    tag: 'COMMERCIAL CONSTRUCTION',
    route: '/expertise/commercial',
  },
  {
    id: 'renovations',
    kicker: 'RENOVATIONS',
    headline: 'Every renovation starts with honest scope.',
    copy: "Whole-home remodels, kitchen and bath renovations, historic restorations, and occupied-building phasing — JK Prestige has been Jacksonville's renovation contractor since 2017. We open walls with a plan: pre-demo documentation, asbestos/lead clearance where required, and a fully sequenced schedule so you're not living in a construction zone longer than necessary. Our renovation clients get the same licensed principal accountability as our commercial clients.",
    slug: 'expertise-renovations-16x9',
    tag: 'RENOVATION CONTRACTOR',
    route: '/expertise/renovations',
  },
  {
    id: 'roofing',
    kicker: 'ROOFING',
    headline: 'New roofs. Re-roofs. Storms. All of it.',
    copy: "JK Prestige's roofing division covers residential shingle, standing-seam metal, slate, and cedar shake alongside commercial flat systems — TPO, EPDM, modified bitumen, and PVC. We are a manufacturer-certified installer with a 24-point free inspection program, 24-hour emergency tarp response, and a dedicated storm and insurance-adjuster liaison team. One call covers the inspection, the claim, and the installation.",
    slug: 'expertise-roofing-16x9',
    tag: 'ROOFING CONTRACTOR',
    route: '/roofing',
  },
];

function VerticalSection({vertical, flip, i}) {
  const {navigate} = useApp();
  return (
    <section
      className="section"
      style={{background: i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-elev)', borderBottom:'1px solid var(--hairline)'}}
    >
      <div className="wrap">
        <div
          style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(32px,5vw,72px)', direction: flip ? 'rtl' : 'ltr'}}
          className="vert-inner"
        >
          <div style={{direction:'ltr'}}>
            <Placeholder slug={vertical.slug} w={1200} h={700} tag={vertical.tag}/>
          </div>
          <div style={{direction:'ltr', display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <Kicker>{vertical.kicker}</Kicker>
            <h2 className="display" style={{fontSize:'clamp(28px,3.6vw,52px)', marginTop:14, lineHeight:1.0}}>
              {vertical.headline}
            </h2>
            <p style={{color:'var(--fg-muted)', fontSize:16, lineHeight:1.75, marginTop:20}}>
              {vertical.copy}
            </p>
            <div style={{marginTop:28, display:'flex', gap:12, flexWrap:'wrap'}}>
              {vertical.route && vertical.route !== '/roofing' && (
                <button
                  className="btn btn-primary"
                  onClick={()=>navigate(vertical.route)}
                  style={{display:'inline-flex', alignItems:'center', gap:8}}
                >
                  See full scope <Arrow/>
                </button>
              )}
              <button
                className="btn btn-outline"
                onClick={()=>navigate('/contact')}
                style={{display:'inline-flex', alignItems:'center', gap:8}}
              >
                Start a conversation <Arrow/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.vert-inner{grid-template-columns:1fr !important; direction:ltr !important}}`}</style>
    </section>
  );
}

function ExpertisePage() {
  const {navigate} = useApp();
  const faqItems = [
    [
      'Do you work with homeowners and commercial developers?',
      'Yes — both audiences are core to what we do. Homeowners get the same licensed principal-led process as our commercial and hospital clients. No project is too small for real accountability.',
    ],
    [
      'How fast can JK Prestige turn a preliminary estimate?',
      'We deliver a line-item preliminary estimate within 48 hours of a site walk or set of documents. For complex ground-up projects we provide a full GMP at the end of preconstruction — typically two to three weeks.',
    ],
    [
      'Are you licensed and insured in Florida?',
      "JK Prestige Constructor holds a Florida General Contractor license, is fully bonded, and carries $2M general liability plus workers' compensation. Certificates available on request.",
    ],
    [
      'What makes JK Prestige different from other general contractors in Jacksonville?',
      'Family-operated since 2017 — a named principal on every project, not a rotating project manager. We self-perform the critical trades (framing, concrete, finish carpentry) to maintain quality control and schedule reliability that a purely subcontracted GC cannot match.',
    ],
  ];

  return (
    <PageShell
      kicker="EXPERTISE"
      title={<>Ground-up or gut-reno.<br/>Hospitals to homes.</>}
      sub="Six disciplines under one roof, delivered by a principal-led team with self-perform trades and a vetted subcontractor network. Based in Jacksonville, FL. Operating nationwide."
    >
      {/* Vertical overview strip */}
      <section className="section" style={{background:'var(--bg-elev)', borderBottom:'1px solid var(--hairline)'}}>
        <div className="wrap">
          <div
            style={{display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:1, background:'rgba(0,0,0,.3)'}}
            className="exp-strip"
          >
            {VERTICALS.map((v, i) => (
              <Reveal key={v.id} delay={i*55} style={{background:'var(--bg-elev)', padding:'28px 20px', textAlign:'center'}}>
                <div style={{fontFamily:'var(--display)', fontSize:36, color:'var(--accent)', letterSpacing:'-.025em'}}>0{i+1}</div>
                <div className="mono" style={{color:'#fff', marginTop:12, fontSize:11}}>{v.kicker}</div>
              </Reveal>
            ))}
          </div>
          <style>{`@media(max-width:1100px){.exp-strip{grid-template-columns:repeat(3,1fr) !important}} @media(max-width:600px){.exp-strip{grid-template-columns:repeat(2,1fr) !important}}`}</style>
        </div>
      </section>

      {/* One full section per vertical, alternating image/text layout */}
      {VERTICALS.map((v, i) => (
        <VerticalSection key={v.id} vertical={v} flip={i % 2 !== 0} i={i}/>
      ))}

      {/* Process band */}
      <section className="section" style={{background:'var(--bg-invert)', borderBottom:'1px solid rgba(255,255,255,.1)'}}>
        <div className="wrap">
          <Kicker>OUR PROCESS</Kicker>
          <h2 className="display" style={{fontSize:'clamp(36px,5vw,72px)', marginTop:14, color:'#fff'}}>Four steps. Every project.</h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, background:'rgba(255,255,255,.1)', marginTop:40}} className="proc-grid">
            {[
              ['01','SCOPE & PRICE','Site walk, written scope, line-item pricing in 48 hours. No vague ranges.'],
              ['02','PRECONSTRUCTION','VDC model, permits pulled, schedule locked, long-lead items ordered.'],
              ['03','BUILD','Self-perform critical trades. A superintendent on site every day. Weekly owner reports.'],
              ['04','CLOSE OUT','Punch list completed, warranty document signed, handover keys in hand.'],
            ].map(([n,t,d])=>(
              <div key={n} style={{background:'var(--bg-invert)', padding:'36px 28px', minHeight:260}}>
                <div style={{fontFamily:'var(--display)', fontSize:64, letterSpacing:'-.03em', color:'var(--accent)', lineHeight:.9}}>{n}</div>
                <div className="mono" style={{color:'#fff', marginTop:18}}>{t}</div>
                <div style={{fontSize:14, color:'rgba(255,255,255,.8)', marginTop:10, lineHeight:1.65}}>{d}</div>
              </div>
            ))}
          </div>
          <style>{`@media(max-width:900px){.proc-grid{grid-template-columns:repeat(2,1fr) !important}}`}</style>
          <div style={{marginTop:40, textAlign:'center'}}>
            <button className="btn btn-primary" onClick={()=>navigate('/contact')}>
              Get a free 48-hour estimate <Arrow/>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{background:'var(--bg-primary)', borderBottom:'1px solid var(--hairline)'}}>
        <div className="wrap">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:'clamp(32px,5vw,72px)', alignItems:'start'}} className="faq-layout">
            <div>
              <Kicker>FAQ</Kicker>
              <h2 className="display" style={{fontSize:'clamp(32px,4.5vw,60px)', marginTop:14}}>
                Common questions about hiring JK Prestige.
              </h2>
              <p style={{color:'var(--fg-muted)', marginTop:18, lineHeight:1.7, maxWidth:380}}>
                {"Don't see your question? Call us at "}
                <a href="tel:9049440278" style={{color:'#fff'}}>(904) 944-0278</a>
                {" or send a message — a principal replies within one business day."}
              </p>
              <div style={{marginTop:28}}>
                <button className="btn btn-outline" onClick={()=>navigate('/contact')}>
                  Contact us <Arrow/>
                </button>
              </div>
            </div>
            <div>
              {faqItems.map(([q,a],i)=>(<FAQ key={i} q={q} a={a}/>))}
            </div>
          </div>
          <style>{`@media(max-width:900px){.faq-layout{grid-template-columns:1fr !important}}`}</style>
        </div>
      </section>

      {/* Final CTA band */}
      <section style={{background:'var(--bg-invert)', padding:'clamp(56px,8vw,100px) clamp(20px,4vw,64px)', textAlign:'center'}}>
        <div style={{maxWidth:780, margin:'0 auto'}}>
          <Kicker>READY TO BUILD?</Kicker>
          <h2 className="display" style={{fontSize:'clamp(40px,6vw,88px)', marginTop:18, color:'#fff', lineHeight:.92}}>
            One call. One team.<br/>One guarantee.
          </h2>
          <p style={{color:'rgba(255,255,255,.75)', marginTop:24, fontSize:17, lineHeight:1.65, maxWidth:600, margin:'24px auto 0'}}>
            Whether you're breaking ground on a hospital, building your forever home in Jacksonville, or re-roofing 50 units across Florida — JK Prestige Constructor delivers on time, on budget, and under a single contract.
          </p>
          <div style={{display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap', marginTop:36}}>
            <button className="btn btn-primary" onClick={()=>navigate('/contact')} style={{padding:'18px 32px', fontSize:15}}>
              Start your project <Arrow/>
            </button>
            <a href="tel:9049440278" className="btn btn-outline" style={{padding:'18px 32px', fontSize:15}}>
              Call (904) 944-0278
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

/* ---------- ROOFING ---------- */
function RoofingInspectionForm() {
  const ROOF_TYPES = ['Asphalt Shingle','Metal','Tile','Flat / TPO','Flat / EPDM','Modified Bitumen','Cedar Shake','Slate','Not sure'];
  const ISSUES    = ['Annual inspection','Storm damage','Active leak','Replacement quote','New construction','Other'];
  const [form, setForm]       = useState({ name:'', email:'', phone:'', address:'', roofType:'Asphalt Shingle', issue:'Annual inspection', message:'', consent:false });
  const [errors, setErrors]   = useState({});
  const [sending, setSending] = useState(false);
  const [done, setDone]       = useState(false);
  const [sendErr, setSendErr] = useState('');
  const update = (k,v)=> setForm(f=>({...f,[k]:v}));

  const submit = async (e)=>{
    e.preventDefault();
    const errs = {};
    if (!form.name.trim())  errs.name  = 'Required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Valid email required';
    if (form.phone.replace(/\D/g,'').length < 7) errs.phone = 'Required';
    if (!form.address.trim()) errs.address = 'Required';
    if (!form.consent) errs.consent = 'Please consent';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSending(true); setSendErr('');
    try {
      const res = await fetch('https://3hzgy43jwgdzkv47j7qmwxrck40mdmnr.lambda-url.us-east-1.on.aws/', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ ...form, type:`ROOFING INSPECTION — ${form.issue}` }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch { setSendErr('Something went wrong — call us at (904) 944-0278.'); }
    finally { setSending(false); }
  };

  if (done) return (
    <div style={{padding:'48px 40px', border:'1px solid var(--accent)', background:'rgba(82,111,174,.08)', textAlign:'center'}}>
      <span className="mono" style={{color:'var(--accent)'}}>// INSPECTION BOOKED</span>
      <h3 className="display" style={{fontSize:'clamp(28px,3.5vw,48px)', marginTop:14, color:'#fff'}}>We'll call you within 24 hours.</h3>
      <p style={{marginTop:14, color:'var(--fg-muted)'}}>Our roofing team will confirm your appointment and walk you through what to expect during the 24-point inspection.</p>
    </div>
  );

  return (
    <form onSubmit={submit} style={{display:'grid', gap:18}}>
      <div className="jk-form-row" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
        <label style={{display:'block'}}>
          <span className="field-label">Full name{errors.name && <span style={{color:'#ff7a8c', marginLeft:8, textTransform:'none', letterSpacing:0}}>· {errors.name}</span>}</span>
          <input className="jk-input" placeholder="Your name" value={form.name} onChange={e=>update('name',e.target.value)}/>
        </label>
        <label style={{display:'block'}}>
          <span className="field-label">Phone{errors.phone && <span style={{color:'#ff7a8c', marginLeft:8, textTransform:'none', letterSpacing:0}}>· {errors.phone}</span>}</span>
          <input className="jk-input" placeholder="(904) 000-0000" value={form.phone} onChange={e=>update('phone',e.target.value)}/>
        </label>
      </div>
      <div className="jk-form-row" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
        <label style={{display:'block'}}>
          <span className="field-label">Email{errors.email && <span style={{color:'#ff7a8c', marginLeft:8, textTransform:'none', letterSpacing:0}}>· {errors.email}</span>}</span>
          <input className="jk-input" placeholder="you@email.com" value={form.email} onChange={e=>update('email',e.target.value)}/>
        </label>
        <label style={{display:'block'}}>
          <span className="field-label">Property address{errors.address && <span style={{color:'#ff7a8c', marginLeft:8, textTransform:'none', letterSpacing:0}}>· {errors.address}</span>}</span>
          <input className="jk-input" placeholder="123 Main St, Jacksonville FL" value={form.address} onChange={e=>update('address',e.target.value)}/>
        </label>
      </div>
      <div className="jk-form-row" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
        <label style={{display:'block'}}>
          <span className="field-label">Roof type</span>
          <select className="jk-input" value={form.roofType} onChange={e=>update('roofType',e.target.value)}>
            {ROOF_TYPES.map(t=><option key={t} value={t} style={{background:'var(--bg-primary)'}}>{t}</option>)}
          </select>
        </label>
        <label style={{display:'block'}}>
          <span className="field-label">Reason for inspection</span>
          <select className="jk-input" value={form.issue} onChange={e=>update('issue',e.target.value)}>
            {ISSUES.map(t=><option key={t} value={t} style={{background:'var(--bg-primary)'}}>{t}</option>)}
          </select>
        </label>
      </div>
      <label style={{display:'block'}}>
        <span className="field-label">Additional details (optional)</span>
        <textarea className="jk-input" rows={3} placeholder="Describe any visible damage, leaks, age of roof, or anything else that helps…" value={form.message} onChange={e=>update('message',e.target.value)}/>
      </label>
      <label style={{display:'flex', alignItems:'flex-start', gap:12, cursor:'pointer'}}>
        <span className={"cbx "+(form.consent?'on':'')} onClick={()=>update('consent',!form.consent)}>
          {form.consent && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 5 L4 8 L9 2" stroke="#fff" strokeWidth="1.6" fill="none"/></svg>}
        </span>
        <span style={{fontSize:13, color:'var(--fg-muted)', lineHeight:1.5}}>
          I authorize JK Prestige Constructor to contact me about my roofing inspection request. No spam.
        </span>
      </label>
      {errors.consent && <div className="mono" style={{color:'#ff7a8c', fontSize:12}}>{errors.consent}</div>}
      {sendErr && <div style={{color:'#ff7a8c', fontSize:13, padding:12, background:'rgba(255,0,0,.08)', border:'1px solid rgba(255,0,0,.2)'}}>{sendErr}</div>}
      <div>
        <button type="submit" className="btn btn-primary" style={{padding:'18px 28px', opacity:sending?.6:1}} disabled={sending}>
          {sending ? 'Sending…' : <> Book free inspection <Arrow/> </>}
        </button>
      </div>
    </form>
  );
}

function RoofingPage() {
  const { navigate } = useApp();
  const formRef = useRef(null);
  const scrollToForm = ()=>{
    if (formRef.current) formRef.current.scrollIntoView({ behavior:'smooth', block:'start' });
  };
  return (
    <div className="page-enter">
      <section style={{position:'relative', minHeight:'70vh', background:'var(--bg-primary)', overflow:'hidden'}}>
        <div style={{position:'absolute', inset:0, opacity:.4}}>
          <Placeholder slug="roofing-hero-residential-gable-16x9" w={1920} h={1080} duration="12s loop" tag="HERO VIDEO"/>
        </div>
        <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,.2), rgba(0,0,0,.7))'}}/>
        <div className="wrap" style={{position:'relative', padding:'clamp(64px,8vw,120px) clamp(20px,4vw,64px)'}}>
          <Kicker>ROOFING DIVISION</Kicker>
          <h1 className="display" style={{fontSize:'clamp(56px, 9vw, 160px)', marginTop:20, lineHeight:.88}}>
            A roof is where<br/>prestige begins.
          </h1>
          <p style={{marginTop:26, maxWidth:620, color:'var(--fg-muted)', fontSize:17}}>
            New roofs. Tear-offs. Re-roofs. Storm & insurance claims. Residential shingle and commercial flat systems — TPO, EPDM, modified bitumen, standing seam.
          </p>
          <div style={{display:'flex', gap:12, marginTop:28, flexWrap:'wrap'}}>
            <button className="btn btn-primary" onClick={scrollToForm}>Book a free inspection <Arrow/></button>
            <a href="tel:9049440278" className="btn btn-outline">Call us: (904) 944-0278</a>
          </div>
        </div>
      </section>

      <section className="section" style={{background:'var(--bg-primary)'}}>
        <div className="wrap">
          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, background:'var(--hairline)'}} className="roof-grid">
            {[
              ['RESIDENTIAL','Shingle · metal · slate · cedar shake.','roofing-residential-1x1'],
              ['COMMERCIAL','TPO · EPDM · modified bitumen · PVC.','roofing-commercial-1x1'],
              ['STORM & CLAIMS','Insurance-adjuster liaison. Tarp within 24 hrs.','roofing-storm-1x1'],
              ['INSPECTIONS','24-point free inspection & report.','roofing-inspection-1x1'],
            ].map(([t,d,slug],i)=>(
              <Reveal key={t} delay={i*60} style={{background:'var(--bg-primary)'}}>
                <Placeholder slug={slug} w={600} h={600} tag="ROOFING"/>
                <div style={{padding:'22px 24px'}}>
                  <div className="mono" style={{color:'var(--accent)'}}>// {t}</div>
                  <div style={{fontSize:14, color:'var(--fg-muted)', marginTop:10}}>{d}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <style>{`@media(max-width:900px){.roof-grid{grid-template-columns:repeat(2,1fr) !important}}`}</style>
        </div>
      </section>

      <section className="section" style={{background:'var(--bg-elev)'}}>
        <div className="wrap" style={{display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:24}}>
          <div className="mono" style={{color:'#fff', opacity:.85}}>// MANUFACTURER CERTIFICATIONS</div>
          <div style={{display:'flex', gap:'clamp(12px,2vw,32px)', flexWrap:'wrap'}}>
            {['GAF MASTER ELITE','CERTAINTEED SELECT','OWENS CORNING','CARLISLE SYNTEC','FIRESTONE'].map(t=>(
              <div key={t} style={{padding:'14px 20px', border:'1px solid rgba(255,255,255,.3)', fontFamily:'var(--mono)', fontSize:11, letterSpacing:'.18em', color:'#fff'}}>{t}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{background:'var(--bg-primary)'}}>
        <div className="wrap" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(32px,5vw,72px)'}}>
          <div>
            <Kicker>FAQ</Kicker>
            <h2 className="display" style={{fontSize:'clamp(36px,5vw,64px)', marginTop:14}}>Common roofing questions.</h2>
            <p style={{color:'var(--fg-muted)', marginTop:18, maxWidth:420}}>Need something specific? Call us or book a free inspection below.</p>
          </div>
          <div>
            {[
              ['How fast can you tarp an emergency leak?','Within 24 hours, 7 days a week, across Florida and beyond.'],
              ['How long does a full tear-off and re-roof take?','Typical single-family: 1–3 days. Commercial flat: days to weeks depending on system.'],
              ['What warranty do I get?','Manufacturer warranty plus JK Prestige\'s workmanship guarantee — one signed document.'],
              ['Do you serve areas outside Jacksonville?','Yes — we operate across Florida and have delivered projects in 14+ states. Call (904) 944-0278 to discuss your location.'],
            ].map(([q,a],i)=> <FAQ key={i} q={q} a={a}/>)}
          </div>
        </div>
      </section>

      {/* ---- FREE INSPECTION FORM ---- */}
      <section ref={formRef} className="section" style={{background:'var(--bg-elev)'}} id="inspection">
        <div className="wrap jk-footer-top" style={{display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:'clamp(40px,6vw,80px)', alignItems:'start'}}>
          <div>
            <Kicker>FREE INSPECTION</Kicker>
            <h2 className="display" style={{fontSize:'clamp(36px,4.8vw,72px)', marginTop:16, lineHeight:.92}}>
              Book your 24-point roof inspection.
            </h2>
            <p style={{marginTop:20, color:'var(--fg-muted)', lineHeight:1.7, maxWidth:420}}>
              No pressure. No invoice. A certified JK Prestige technician visits your property, documents every issue, and hands you a full written report — free of charge.
            </p>
            <div style={{marginTop:32, display:'grid', gap:14, maxWidth:360}}>
              {[
                ['RESPONSE TIME','We call within 24 hours to confirm.'],
                ['ZERO OBLIGATION','Inspection is free, report is yours to keep.'],
                ['INSURANCE READY','We document damage in adjuster-ready format.'],
              ].map(([k,v])=>(
                <div key={k} style={{display:'flex', gap:16, alignItems:'flex-start'}}>
                  <div style={{width:6, height:6, background:'var(--accent-hot)', borderRadius:'50%', marginTop:6, flexShrink:0}}/>
                  <div>
                    <div className="mono" style={{color:'#fff', fontSize:10}}>{k}</div>
                    <div style={{fontSize:13, color:'var(--fg-muted)', marginTop:4}}>{v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{background:'var(--bg-primary)', padding:'clamp(24px,4vw,48px)', border:'1px solid var(--hairline)'}}>
            <RoofingInspectionForm/>
          </div>
        </div>
      </section>
    </div>
  );
}
function FAQ({q,a}){
  const [open,setOpen] = useState(false);
  return (
    <div style={{borderTop:'1px solid var(--hairline)', padding:'22px 0'}}>
      <button onClick={()=>setOpen(v=>!v)} style={{display:'flex', width:'100%', justifyContent:'space-between', alignItems:'center', gap:12, textAlign:'left'}}>
        <span style={{fontFamily:'var(--display)', fontSize:22, letterSpacing:'-.01em'}}>{q}</span>
        <span style={{fontFamily:'var(--mono)', color:'var(--accent)', fontSize:18}}>{open?'—':'+'}</span>
      </button>
      <div style={{maxHeight: open?200:0, overflow:'hidden', transition:'max-height .3s ease', color:'var(--fg-muted)', lineHeight:1.6}}>
        <div style={{paddingTop:14}}>{a}</div>
      </div>
    </div>
  );
}

/* ---------- PROJECTS ---------- */
const PROJECTS = [
  {
    id:'p1', title:'Meridian Medical Tower', cat:'Hospital', state:'NC', year:2025, size:'320,000 sqft', slug:'proj-meridian-medical-16x9',
    tagline:'Ground-up eight-story acute-care hospital with a dedicated surgical suite and Level II trauma bay.',
    description:'JK Prestige delivered this 320,000-sqft medical tower from slab to certificate of occupancy in 22 months, self-performing concrete, framing, and all rough MEP under a single GMP contract. The facility opened ahead of its physician-recruitment milestone with zero punch-list deficiencies at handover.',
  },
  {
    id:'p2', title:'Cedar Ridge Pediatric Center', cat:'Hospital', state:'VA', year:2024, size:'64,000 sqft', slug:'proj-cedar-pediatric-16x9',
    tagline:'New two-story pediatric outpatient clinic with imaging, infusion, and specialty-care suites.',
    description:'This 64,000-sqft specialty facility required coordination of lead-lined radiology rooms, medical gas systems, and NICU-grade HVAC — all delivered within a constrained 18-month design-build window. The project achieved LEED Silver certification and came in 3% under the owner\'s budget.',
  },
  {
    id:'p3', title:'Hollowbrook Estate', cat:'Custom Home', state:'NY', year:2024, size:'11,200 sqft', slug:'proj-hollowbrook-16x9',
    tagline:'Five-bedroom, seven-bath Hamptons estate with a pool house, geothermal HVAC, and smart-home integration.',
    description:'JK Prestige managed every trade from site excavation through finish millwork on this 11,200-sqft estate, delivering custom walnut paneling, radiant-floor heating, and a Crestron whole-home AV system. The project was completed two weeks ahead of the owners\' summer occupancy target.',
  },
  {
    id:'p4', title:'Silvergrove Residence', cat:'Custom Home', state:'CT', year:2023, size:'8,400 sqft', slug:'proj-silvergrove-16x9',
    tagline:'Contemporary new build on a wooded hillside lot with a cantilevered primary suite and infinity-edge pool.',
    description:'Designed around a challenging grade change, this 8,400-sqft home required engineered retaining walls and a cantilevered floor system before a single stud was set. Interior finishes include hand-troweled lime plaster, wide-plank white oak, and custom steel-and-glass interior doors — all sourced and managed by JK Prestige.',
  },
  {
    id:'p5', title:'Oak Hill Farmhouse', cat:'Custom Home', state:'NC', year:2025, size:'6,900 sqft', slug:'proj-oakhill-16x9',
    tagline:'Modern farmhouse on ten rural acres with board-and-batten exterior, wraparound porch, and a detached barn studio.',
    description:'This 6,900-sqft primary residence and 1,200-sqft studio were built simultaneously on a single fast-track schedule, sharing a construction management team and a unified subcontractor package. Reclaimed-timber beams, a standing-seam metal roof, and a geothermal loop system define the build.',
  },
  {
    id:'p6', title:'PortLogix Distribution Center', cat:'Warehouse', state:'TX', year:2024, size:'480,000 sqft', slug:'proj-portlogix-16x9',
    tagline:'Cross-dock logistics facility with 40-foot clear heights, 96 dock doors, and a 185-foot truck court.',
    description:'JK Prestige delivered this 480,000-sqft tilt-up concrete distribution center in 14 months, coordinating steel erection, dock equipment, and ESFR fire suppression concurrently to compress the schedule. The facility was fully leased before certificate of occupancy.',
  },
  {
    id:'p7', title:'Northbeam Industrial Campus', cat:'Warehouse', state:'PA', year:2023, size:'275,000 sqft', slug:'proj-northbeam-16x9',
    tagline:'Two-building manufacturing and storage campus with rail access, a 10,000-sqft office core, and heavy-power service.',
    description:'The two-phase build included a 200,000-sqft production hall with 480V/3-phase heavy power and a 75,000-sqft climate-controlled storage wing, completed on consecutive milestones 30 days apart. JK Prestige self-performed the concrete tilt panels and coordinated rail spur tie-in with the regional railroad authority.',
  },
  {
    id:'p8', title:'Promenade Retail Row', cat:'Commercial', state:'FL', year:2025, size:'52,000 sqft', slug:'proj-promenade-16x9',
    tagline:'Eight-tenant open-air retail strip with anchor pad, covered paseo, and structured parking for 340 vehicles.',
    description:'Built on a former brownfield site in Northeast Florida, this 52,000-sqft lifestyle center required environmental remediation, two rounds of permit revisions, and a phased-opening delivery that got the anchor tenant trading six weeks before full project completion. JK Prestige managed landlord work across all eight tenant spaces.',
  },
  {
    id:'p9', title:'Ironworks Kitchen & Taproom', cat:'Commercial', state:'IL', year:2024, size:'9,200 sqft', slug:'proj-ironworks-16x9',
    tagline:'Full-service brewery and restaurant in a converted industrial building with a mezzanine event loft.',
    description:'The adaptive reuse of a 1940s manufacturing shell involved structural steel reinforcement, a commercial kitchen and walk-in refrigeration build-out, and a second-floor mezzanine addition supporting 120 event guests. The project was delivered in 11 months from permit issuance to first-pour opening night.',
  },
  {
    id:'p10', title:'Harbor Street Historic Renovation', cat:'Renovation', state:'MA', year:2024, size:'4,800 sqft', slug:'proj-harbor-reno-16x9',
    tagline:'Full gut-renovation of a 19th-century Federal-style row house, preserving the historic facade while fully modernizing interiors.',
    description:'Working within Boston\'s historic-district requirements, JK Prestige stripped and rebuilt the interior structure while retaining the original brick facade, hand-carved cornices, and staircase newels per SHPO review. The project delivered five updated units with new MEP, spray-foam insulation, and restored period windows.',
  },
  {
    id:'p11', title:'Linden Grove Whole-House Remodel', cat:'Renovation', state:'NY', year:2025, size:'5,600 sqft', slug:'proj-linden-reno-16x9',
    tagline:'Complete interior transformation of a 1970s colonial — new layout, kitchen, two primary suites, and pool-house addition.',
    description:'JK Prestige removed three load-bearing walls to open the floor plan, added a 1,200-sqft pool-house wing, and refinished every interior surface in a single mobilization — keeping the project on one building permit and one schedule. The family was back in their home in under seven months.',
  },
  {
    id:'p12', title:'Parkside Roofing Program', cat:'Roofing', state:'NJ', year:2025, size:'44 roofs', slug:'proj-parkside-roofing-16x9',
    tagline:'Master-planned re-roofing of a 44-unit HOA community — asphalt tearoff, ice-and-water barrier, and GAF Timberline HDZ installation.',
    description:'JK Prestige executed all 44 roofs under a single program contract, sequencing two crews through the community over eight weeks to minimize resident disruption. Every roof received a GAF Golden Pledge warranty, and the final insurance closeout was completed without a single disputed claim.',
  },
];

function ProjectsPage() {
  const { navigate } = useApp();
  const [filters, setFilters] = useState({cat:[], state:[], year:[]});
  const [filterDrawer, setFilterDrawer] = useState(false);
  const [active, setActive] = useState(null);

  const toggle = (k, v)=> setFilters(f=>({...f, [k]: f[k].includes(v) ? f[k].filter(x=>x!==v) : [...f[k], v]}));
  const clearAll = ()=> setFilters({cat:[],state:[],year:[]});
  const activeFilterCount = filters.cat.length + filters.state.length + filters.year.length;

  const filtered = PROJECTS.filter(p=>
    (filters.cat.length===0 || filters.cat.includes(p.cat)) &&
    (filters.state.length===0 || filters.state.includes(p.state)) &&
    (filters.year.length===0 || filters.year.includes(p.year))
  );
  const cats = [...new Set(PROJECTS.map(p=>p.cat))];
  const states = [...new Set(PROJECTS.map(p=>p.state))].sort();
  const years = [...new Set(PROJECTS.map(p=>p.year))].sort((a,b)=>b-a);

  /* JSON-LD for the page */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'JK Prestige Constructor — Project Portfolio',
    description: 'General contractor project portfolio: hospitals, custom homes, warehouses, commercial builds, renovations, and roofing across Florida and the US.',
    url: 'https://jkprestigeconstructor.com/projects',
    numberOfItems: PROJECTS.length,
    itemListElement: PROJECTS.map((p,i)=>({
      '@type': 'ListItem',
      position: i+1,
      name: p.title,
      description: p.tagline,
    })),
  };

  return (
    <div className="page-enter" style={{minHeight:'60vh'}}>
      {/* JSON-LD structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>

      {/* SEO intro hero */}
      <section className="section" style={{background:'var(--bg-primary)', borderBottom:'1px solid var(--hairline)'}}>
        <div className="wrap">
          <Kicker>CONSTRUCTION PROJECTS — JACKSONVILLE FL &amp; BEYOND</Kicker>
          <h1 className="display" style={{fontSize:'clamp(48px, 8vw, 140px)', marginTop:18, lineHeight:.9}}>
            500+ projects.<br/>One guarantee.
          </h1>
          <p style={{marginTop:24, maxWidth:760, color:'var(--fg-muted)', fontSize:18, lineHeight:1.6}}>
            From ground-up hospitals and custom estates to industrial warehouses and whole-home renovations — JK Prestige Constructor has delivered over 500 projects across Florida and the US since 2017. Every project. One principal. One contract.
          </p>
          <div style={{marginTop:32, display:'flex', gap:32, flexWrap:'wrap'}}>
            {[['500+','Projects delivered'],['7','States active'],['2017','Founded Jacksonville, FL'],['0','Change-order disputes']].map(([n,l])=>(
              <div key={l}>
                <div style={{fontFamily:'var(--display)', fontSize:'clamp(32px,4vw,56px)', letterSpacing:'-.025em', color:'var(--accent)'}}>{n}</div>
                <div className="mono" style={{color:'var(--fg-muted)', fontSize:11, marginTop:4}}>{l.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter bar + grid */}
      <section className="section" style={{background:'var(--bg-primary)'}}>
        <div className="wrap">

          {/* Inline filter pills — always visible */}
          <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:28, flexWrap:'wrap'}}>
            <span className="mono" style={{color:'var(--fg-dim)', fontSize:11}}>TYPE</span>
            {cats.map(c=>(
              <button key={c} onClick={()=>toggle('cat',c)} className="mono"
                style={{padding:'8px 14px', fontSize:11, border:'1px solid '+(filters.cat.includes(c)?'var(--accent)':'var(--hairline)'),
                  color: filters.cat.includes(c)?'#fff':'var(--fg-muted)',
                  background: filters.cat.includes(c)?'rgba(82,111,174,.18)':'transparent',
                  cursor:'pointer'}}>
                {c.toUpperCase()}
              </button>
            ))}
            <span className="mono" style={{color:'var(--fg-dim)', fontSize:11, marginLeft:8}}>STATE</span>
            {states.map(s=>(
              <button key={s} onClick={()=>toggle('state',s)} className="mono"
                style={{padding:'8px 14px', fontSize:11, border:'1px solid '+(filters.state.includes(s)?'var(--accent)':'var(--hairline)'),
                  color: filters.state.includes(s)?'#fff':'var(--fg-muted)',
                  background: filters.state.includes(s)?'rgba(82,111,174,.18)':'transparent',
                  cursor:'pointer'}}>
                {s}
              </button>
            ))}
            <span className="mono" style={{color:'var(--fg-dim)', fontSize:11, marginLeft:8}}>YEAR</span>
            {years.map(y=>(
              <button key={y} onClick={()=>toggle('year',y)} className="mono"
                style={{padding:'8px 14px', fontSize:11, border:'1px solid '+(filters.year.includes(y)?'var(--accent)':'var(--hairline)'),
                  color: filters.year.includes(y)?'#fff':'var(--fg-muted)',
                  background: filters.year.includes(y)?'rgba(82,111,174,.18)':'transparent',
                  cursor:'pointer'}}>
                {y}
              </button>
            ))}
            {activeFilterCount > 0 && (
              <button onClick={clearAll} className="mono"
                style={{padding:'8px 14px', fontSize:11, border:'1px solid var(--accent-hot)', color:'var(--accent-hot)', background:'transparent', cursor:'pointer', marginLeft:8}}>
                CLEAR ({activeFilterCount})
              </button>
            )}
            <span style={{marginLeft:'auto', color:'var(--fg-muted)'}} className="mono">{filtered.length} / {PROJECTS.length} SHOWN</span>
          </div>

          {/* Project grid */}
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24}} className="proj-grid">
            {filtered.length === 0 ? (
              <div style={{gridColumn:'1 / -1', padding:'64px 0', textAlign:'center'}}>
                <div className="mono" style={{color:'var(--fg-muted)'}}>No projects match the selected filters.</div>
                <button onClick={clearAll} className="btn btn-outline" style={{marginTop:20}}>Clear filters</button>
              </div>
            ) : filtered.map((p,i)=>(
              <Reveal key={p.id} delay={(i%6)*50}>
                <a href="#" onClick={(e)=>{e.preventDefault(); setActive(p);}} style={{display:'block'}}>
                  <Placeholder slug={p.slug} w={1200} h={700} tag="PROJECT"/>
                  <div style={{padding:'16px 0'}}>
                    <div className="mono" style={{color:'var(--accent)', fontSize:10}}>// {p.cat.toUpperCase()} · {p.state} · {p.year}</div>
                    <div style={{fontFamily:'var(--display)', fontSize:22, letterSpacing:'-.015em', marginTop:8}}>{p.title}</div>
                    <div style={{fontSize:13, color:'var(--fg-muted)', marginTop:6, lineHeight:1.5}}>{p.tagline}</div>
                    <div style={{fontSize:11, color:'var(--fg-dim)', marginTop:8}} className="mono">{p.size}</div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <style>{`@media(max-width:900px){.proj-grid{grid-template-columns:1fr !important}}`}</style>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section" style={{background:'var(--bg-invert)'}}>
        <div className="wrap cta-bottom-grid" style={{display:'grid', gridTemplateColumns:'1fr auto', gap:32, alignItems:'center', flexWrap:'wrap'}}>
          <div>
            <Kicker>START YOUR PROJECT</Kicker>
            <h2 className="display" style={{fontSize:'clamp(36px,5vw,72px)', color:'#fff', marginTop:12, lineHeight:.92}}>
              Don't see your project type?<br/>We build it.
            </h2>
            <p style={{marginTop:18, color:'rgba(255,255,255,.75)', fontSize:16, maxWidth:520, lineHeight:1.6}}>
              JK Prestige Constructor takes on projects other GCs turn away. If you have a scope, a site, or just an idea — tell us. We'll give you a straight number in 48 hours.
            </p>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:14, flexShrink:0}}>
            <button className="btn btn-primary" style={{whiteSpace:'nowrap'}} onClick={()=>navigate('/contact')}>
              Get a free estimate <Arrow/>
            </button>
            <a href="tel:9049440278" className="btn btn-outline" style={{whiteSpace:'nowrap', textAlign:'center'}}>
              Call (904) 944-0278
            </a>
          </div>
        </div>
        <style>{`@media(max-width:700px){.cta-bottom-grid{grid-template-columns:1fr !important}}`}</style>
      </section>

      {/* Project detail drawer */}
      {active && <ProjectDrawer project={active} onClose={()=>setActive(null)} navigate={navigate}/>}
    </div>
  );
}
function FilterGroup({title,items,on,onToggle}){
  return (
    <div style={{marginBottom:28}}>
      <div className="mono" style={{color:'var(--fg-muted)', marginBottom:12}}>{title.toUpperCase()}</div>
      <div style={{display:'grid', gap:8}}>
        {items.map(it=>(
          <label key={it} style={{display:'flex', alignItems:'center', gap:10, cursor:'pointer', padding:'6px 0'}}>
            <span className={"cbx "+(on.includes(it)?'on':'')} onClick={()=>onToggle(it)}>
              {on.includes(it) && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 5 L4 8 L9 2" stroke="#fff" strokeWidth="1.6" fill="none"/></svg>}
            </span>
            <span style={{color:'#fff', fontSize:14}}>{it}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
function ProjectDrawer({project, onClose, navigate}){
  /* Close on Escape */
  React.useEffect(()=>{
    const handler = e=>{ if(e.key==='Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return ()=> window.removeEventListener('keydown', handler);
  },[onClose]);

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{position:'fixed', inset:0, background:'rgba(0,0,0,.65)', zIndex:90}}/>
      {/* Drawer panel — slides in from right */}
      <div style={{
        position:'fixed', top:0, right:0, bottom:0,
        width:'min(580px, 96vw)',
        background:'var(--bg-primary)',
        borderLeft:'1px solid var(--hairline)',
        zIndex:91,
        overflowY:'auto',
        display:'flex',
        flexDirection:'column',
      }}>
        {/* Sticky header */}
        <div style={{
          position:'sticky', top:0,
          background:'var(--bg-primary)',
          borderBottom:'1px solid var(--hairline)',
          padding:'20px 28px',
          display:'flex', justifyContent:'space-between', alignItems:'center',
          zIndex:2,
        }}>
          <span className="mono" style={{color:'var(--accent)', fontSize:11}}>// PROJECT DETAIL</span>
          <button onClick={onClose} style={{color:'var(--fg-muted)', fontSize:22, lineHeight:1, background:'none', border:'none', cursor:'pointer'}}>×</button>
        </div>

        {/* Hero image */}
        <div style={{flexShrink:0}}>
          <Placeholder slug={project.slug} w={1160} h={654} tag="PROJECT"/>
        </div>

        {/* Body */}
        <div style={{padding:'32px 28px', flex:1}}>
          {/* Category / state / year chips */}
          <div style={{display:'flex', gap:8, flexWrap:'wrap', marginBottom:16}}>
            {[project.cat, project.state, String(project.year)].map(chip=>(
              <span key={chip} className="mono" style={{
                fontSize:10, padding:'5px 10px',
                border:'1px solid var(--hairline)',
                color:'var(--fg-muted)',
              }}>{chip.toUpperCase()}</span>
            ))}
          </div>

          {/* Project name */}
          <h2 className="display" style={{fontSize:'clamp(28px,4vw,44px)', letterSpacing:'-.02em', lineHeight:.95, marginBottom:10}}>
            {project.title}
          </h2>

          {/* Size */}
          <div className="mono" style={{color:'var(--fg-dim)', fontSize:11, marginBottom:24}}>{project.size}</div>

          {/* Description */}
          <p style={{color:'var(--fg-muted)', fontSize:15, lineHeight:1.7, marginBottom:28}}>
            {project.description}
          </p>

          {/* Key stats */}
          <div style={{border:'1px solid var(--hairline)', padding:'20px 22px', marginBottom:32}}>
            <div className="mono" style={{color:'var(--accent)', fontSize:10, marginBottom:14}}>// PROJECT FACTS</div>
            <div style={{display:'grid', gap:10}}>
              <StatRow k="Category" v={project.cat}/>
              <StatRow k="State" v={project.state}/>
              <StatRow k="Year completed" v={String(project.year)}/>
              <StatRow k="Size" v={project.size}/>
            </div>
          </div>

          {/* CTA */}
          <div style={{borderTop:'1px solid var(--hairline)', paddingTop:24}}>
            <div className="mono" style={{color:'var(--fg-dim)', fontSize:11, marginBottom:12}}>READY TO BUILD?</div>
            <button
              className="btn btn-primary"
              style={{width:'100%', justifyContent:'center'}}
              onClick={()=>{ onClose(); navigate('/contact'); }}>
              Start your project <Arrow/>
            </button>
            <a href="tel:9049440278" style={{display:'block', textAlign:'center', marginTop:12, fontSize:13, color:'var(--fg-muted)'}}>
              Or call (904) 944-0278
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
function StatRow({k,v}){
  return (
    <div style={{display:'flex', justifyContent:'space-between', paddingBottom:10, borderBottom:'1px solid var(--hairline)'}}>
      <span className="mono" style={{color:'var(--fg-dim)'}}>{k}</span>
      <span style={{color:'#fff', fontSize:14, textAlign:'right'}}>{v}</span>
    </div>
  );
}

/* ---------- CONTACT ---------- */
function ContactPage() {
  const { navigate } = useApp();

  useEffect(()=>{
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "JK Prestige Constructor",
      "description": "Family-operated general contractor in Jacksonville, FL. Residential, commercial, roofing, and ground-up construction since 2017.",
      "url": "https://jkprestigeconstructor.com",
      "telephone": "+19049440278",
      "email": "jerekaine@hotmail.com",
      "foundingDate": "2017",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Jacksonville",
        "addressRegion": "FL",
        "addressCountry": "US"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        "opens": "07:00",
        "closes": "18:00"
      },
      "areaServed": { "@type": "State", "name": "Florida" }
    };
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'jk-contact-schema';
    el.textContent = JSON.stringify(schema);
    document.head.appendChild(el);
    return ()=>{ const s = document.getElementById('jk-contact-schema'); if(s) s.remove(); };
  }, []);

  const INFO_CARDS = [
    {
      kicker: '// HEADQUARTERS',
      head: 'Jacksonville, FL',
      lines: ['Jacksonville, Florida', 'M–F · 7:00 AM – 6:00 PM'],
      link: null,
    },
    {
      kicker: '// PHONE',
      head: '(904) 944-0278',
      lines: ['Owner-direct. No call center.', 'Roofing emergencies answered 24/7.'],
      link: { href:'tel:9049440278', label:'Call now' },
    },
    {
      kicker: '// EMAIL',
      head: 'jerekaine@hotmail.com',
      lines: ['We respond within 48 hours.', 'Attach plans, photos, or a brief.'],
      link: { href:'mailto:jerekaine@hotmail.com', label:'Send email' },
    },
  ];

  const AUDIENCE_CARDS = [
    {
      tag: 'HOMEOWNER?',
      body: 'New builds, whole-home remodels, additions, and roofs. One principal on your project from day one.',
      cta: 'See expertise',
      route: '/expertise',
      color: 'var(--accent)',
    },
    {
      tag: 'DEVELOPER OR GC?',
      body: 'Ground-up delivery, trade partnership, and subcontracting packets for fellow GCs. Multi-state coverage.',
      cta: 'See our work',
      route: '/projects',
      color: 'var(--accent)',
    },
    {
      tag: 'ROOFING EMERGENCY?',
      body: 'Active leak or storm damage — call (904) 944-0278 now. Emergency tarp response within 24 hours, 7 days a week.',
      cta: 'Roofing division',
      route: '/roofing',
      color: 'var(--accent-hot)',
    },
  ];

  return (
    <div className="page-enter" style={{minHeight:'60vh'}}>

      {/* ── HERO ── */}
      <section className="section" style={{background:'var(--bg-primary)', borderBottom:'1px solid var(--hairline)'}}>
        <div className="wrap">
          <Kicker>CONTACT</Kicker>
          <h1 className="display" style={{fontSize:'clamp(42px,7vw,118px)', marginTop:18, lineHeight:.9}}>
            Contact general contractor<br/>Jacksonville, FL.
          </h1>
          <p style={{marginTop:24, maxWidth:700, color:'var(--fg-muted)', fontSize:18, lineHeight:1.6}}>
            Free 48-hour estimate. Talk directly to an owner — not a call center or coordinator. JK Prestige Constructor has delivered 500+ projects since 2017, from Jacksonville homes to hospital towers across the US.
          </p>
          <div style={{display:'flex', gap:12, marginTop:28, flexWrap:'wrap'}}>
            <a href="tel:9049440278" className="btn btn-primary">Call (904) 944-0278 <Arrow/></a>
            <a href="mailto:jerekaine@hotmail.com" className="btn btn-outline">Email us</a>
          </div>
        </div>
      </section>

      {/* ── INFO CARDS ── */}
      <section className="section" style={{background:'var(--bg-elev)', paddingTop:'clamp(40px,5vw,64px)', paddingBottom:'clamp(40px,5vw,64px)'}}>
        <div className="wrap">
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'rgba(0,0,0,.3)'}} className="contact-info-grid">
            {INFO_CARDS.map((c,i)=>(
              <Reveal key={c.kicker} delay={i*70} style={{background:'var(--bg-elev)', padding:'32px 28px', minHeight:200}}>
                <div className="mono" style={{color:'var(--accent)', fontSize:11}}>{c.kicker}</div>
                <div style={{fontFamily:'var(--display)', fontSize:'clamp(17px,1.9vw,24px)', letterSpacing:'-.015em', marginTop:14, color:'#fff', lineHeight:1.1, wordBreak:'break-word'}}>{c.head}</div>
                {c.lines.map((l,j)=>(
                  <div key={j} style={{fontSize:13, color:'var(--fg-muted)', marginTop: j===0?12:6, lineHeight:1.5}}>{l}</div>
                ))}
                {c.link && (
                  <a href={c.link.href} style={{display:'inline-flex', alignItems:'center', gap:6, marginTop:20, color:'var(--accent-hot)', fontFamily:'var(--mono)', fontSize:11, letterSpacing:'.12em', textDecoration:'none'}}>
                    {c.link.label} <Arrow size={10}/>
                  </a>
                )}
              </Reveal>
            ))}
          </div>
          <style>{`@media(max-width:760px){.contact-info-grid{grid-template-columns:1fr !important}}`}</style>
        </div>
      </section>

      {/* ── ESTIMATE FORM ── */}
      <section className="section" style={{background:'var(--bg-primary)'}}>
        <div className="wrap contact-form-grid" style={{display:'grid', gridTemplateColumns:'1fr 1.3fr', gap:'clamp(40px,6vw,80px)', alignItems:'start'}}>
          <div>
            <Kicker>FREE ESTIMATE</Kicker>
            <h2 className="display" style={{fontSize:'clamp(32px,4.2vw,60px)', marginTop:16, lineHeight:.92}}>
              Tell us what you're building.
            </h2>
            <p style={{marginTop:20, color:'var(--fg-muted)', lineHeight:1.7, maxWidth:400}}>
              Fill out the form and a principal will respond within 48 hours — personally, not through a coordinator.
            </p>
            <div style={{marginTop:32, display:'grid', gap:16, maxWidth:360}}>
              {[
                ['48-HOUR RESPONSE', 'A principal reviews every inquiry directly.'],
                ['NO HIDDEN FEES', 'Detailed line-item estimate, no surprises.'],
                ['ONE POINT OF CONTACT', 'Owner-direct from first call to final walkthrough.'],
              ].map(([k,v])=>(
                <div key={k} style={{display:'flex', gap:14, alignItems:'flex-start'}}>
                  <div style={{width:6, height:6, background:'var(--accent-hot)', borderRadius:'50%', marginTop:6, flexShrink:0}}/>
                  <div>
                    <div className="mono" style={{color:'#fff', fontSize:10}}>{k}</div>
                    <div style={{fontSize:13, color:'var(--fg-muted)', marginTop:4, lineHeight:1.5}}>{v}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop:36, padding:'20px 24px', border:'1px solid var(--hairline)', background:'var(--bg-elev)'}}>
              <div className="mono" style={{color:'var(--fg-dim)', fontSize:10, marginBottom:12}}>// PREFER PHONE OR EMAIL?</div>
              <a href="tel:9049440278" style={{display:'block', fontFamily:'var(--display)', fontSize:22, color:'#fff', textDecoration:'none', letterSpacing:'-.01em'}}>(904) 944-0278</a>
              <a href="mailto:jerekaine@hotmail.com" style={{display:'block', fontSize:13, color:'var(--fg-muted)', marginTop:6, textDecoration:'none'}}>jerekaine@hotmail.com</a>
            </div>
          </div>
          <div style={{background:'var(--bg-elev)', padding:'clamp(24px,4vw,48px)', border:'1px solid var(--hairline)'}}>
            <FreeEstimateForm/>
          </div>
        </div>
        <style>{`@media(max-width:860px){.contact-form-grid{grid-template-columns:1fr !important}}`}</style>
      </section>

      {/* ── AUDIENCE CARDS ── */}
      <section className="section" style={{background:'var(--bg-invert)'}}>
        <div className="wrap">
          <span className="mono" style={{color:'rgba(255,255,255,.7)'}}>// WHO ARE YOU?</span>
          <h2 className="display" style={{fontSize:'clamp(32px,4.5vw,60px)', color:'#fff', marginTop:14}}>Start in the right place.</h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'rgba(255,255,255,.08)', marginTop:36}} className="audience-grid">
            {AUDIENCE_CARDS.map((a,i)=>(
              <Reveal key={a.tag} delay={i*80} style={{background:'var(--bg-invert)', padding:'36px 28px', minHeight:240}}>
                <div className="mono" style={{color:a.color, fontSize:11}}>// {a.tag}</div>
                <p style={{fontSize:15, color:'rgba(255,255,255,.85)', marginTop:16, lineHeight:1.65}}>{a.body}</p>
                <button
                  onClick={()=>navigate(a.route)}
                  style={{display:'inline-flex', alignItems:'center', gap:8, marginTop:24, background:'transparent', border:'none', padding:0, cursor:'pointer', color:a.color, fontFamily:'var(--mono)', fontSize:11, letterSpacing:'.12em'}}
                >
                  {a.cta.toUpperCase()} <Arrow size={10}/>
                </button>
              </Reveal>
            ))}
          </div>
          <style>{`@media(max-width:760px){.audience-grid{grid-template-columns:1fr !important}}`}</style>
        </div>
      </section>

    </div>
  );
}

/* ---------- NEWSROOM ---------- */
function NewsroomPage() {
  const [cat, setCat] = useState('All');
  const cats = ['All', 'Company News', 'On The Jobsite', 'Industry Insight', 'Homeowner Tips'];
  const posts = [
    ...NEWS,
    { cat:'INDUSTRY INSIGHT', date:'03.10.26', title:'Why tilt-up concrete shells are outpacing steel for mid-size warehouses', slug:'news-tiltup-16x9'},
    { cat:'HOMEOWNER TIPS', date:'02.28.26', title:'Budgeting a whole-home renovation: contingencies done right', slug:'news-budget-reno-16x9'},
    { cat:'ON THE JOBSITE', date:'02.14.26', title:'A week with the JK roofing crew: winter re-roofs in the Northeast', slug:'news-roofing-winter-16x9'},
  ];
  return (
    <PageShell kicker="NEWSROOM" title={<>News, insight,<br/>jobsite dispatches.</>}>
      <section className="section" style={{background:'var(--bg-primary)'}}>
        <div className="wrap">
          <div style={{display:'flex', gap:8, flexWrap:'wrap', marginBottom:32}}>
            {cats.map(c=>(
              <button key={c} onClick={()=>setCat(c)} className="mono" style={{padding:'10px 16px', border:'1px solid '+(cat===c?'var(--accent)':'var(--hairline)'), color: cat===c?'#fff':'var(--fg-muted)', background: cat===c?'rgba(82,111,174,.15)':'transparent'}}>{c.toUpperCase()}</button>
            ))}
          </div>
          <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:24}} className="news-layout">
            <Placeholder slug="newsroom-feature-16x9" w={1600} h={900} tag="FEATURED"/>
            <div style={{display:'grid', gap:24}}>
              {posts.slice(0,3).map((p,i)=>(
                <div key={i} style={{display:'grid', gridTemplateColumns:'120px 1fr', gap:16, alignItems:'start'}}>
                  <Placeholder slug={p.slug} w={400} h={300} ratio="4/3" tag="POST"/>
                  <div>
                    <div className="mono" style={{color:'var(--fg-dim)'}}>// {p.cat} · {p.date}</div>
                    <div style={{fontFamily:'var(--display)', fontSize:16, marginTop:8, letterSpacing:'-.01em'}}>{p.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{marginTop:48, display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24}} className="news-grid2">
            {posts.map((p,i)=>(
              <Reveal key={i} delay={i*50}>
                <Placeholder slug={p.slug} w={800} h={500} tag="POST"/>
                <div style={{padding:'16px 0'}}>
                  <div className="mono" style={{color:'var(--fg-dim)'}}>// {p.cat} · {p.date}</div>
                  <div style={{fontFamily:'var(--display)', fontSize:20, marginTop:8}}>{p.title}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <style>{`
            @media(max-width:900px){
              .news-layout, .news-grid2{grid-template-columns:1fr !important}
            }
          `}</style>
        </div>
      </section>
    </PageShell>
  );
}

/* ---------- CAREERS ---------- */
function CareersPage() {
  const roles = [
    ['Superintendent', 'Full-time · Multiple states'],
    ['Project Manager', 'Full-time · NY / NC / TX'],
    ['Estimator', 'Full-time · HQ'],
    ['Foreman', 'Full-time · Jobsite'],
    ['Carpenter', 'Full-time · Self-perform crew'],
    ['Roofer', 'Full-time · Residential & commercial'],
    ['Laborer', 'Full-time · All regions'],
    ['Safety Coordinator', 'Full-time · Multi-state'],
  ];
  return (
    <PageShell kicker="CAREERS" title={<>Build your career<br/>where you build.</>} sub="We hire people who want to own the outcome. JK University, benefits, and a principal who knows your name.">
      <section className="section" style={{background:'var(--bg-primary)'}}>
        <div className="wrap">
          <Placeholder slug="careers-culture-16x9" w={1600} h={900} duration="18s loop" tag="CULTURE VIDEO"/>
        </div>
      </section>

      <section className="section" style={{background:'var(--bg-elev)'}}>
        <div className="wrap">
          <Kicker>BENEFITS</Kicker>
          <h2 className="display" style={{fontSize:'clamp(36px,5vw,64px)', marginTop:14, color:'#fff'}}>Show up. Grow up.</h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, background:'rgba(0,0,0,.25)', marginTop:32}} className="ben-grid">
            {['Health · dental · vision','401(k) w/ match','JK University training','OSHA 30 paid','Per-diem travel','PTO + holidays','Boot & tool stipend','Principal-open door'].map((t,i)=>(
              <div key={i} style={{background:'var(--bg-elev)', padding:24}}>
                <div style={{fontFamily:'var(--display)', fontSize:36, letterSpacing:'-.025em', color:'var(--accent)'}}>0{i+1}</div>
                <div className="mono" style={{color:'#fff', marginTop:14}}>{t.toUpperCase()}</div>
              </div>
            ))}
          </div>
          <style>{`@media(max-width:900px){.ben-grid{grid-template-columns:repeat(2,1fr) !important}}`}</style>
        </div>
      </section>

      <section className="section" style={{background:'var(--bg-primary)'}}>
        <div className="wrap">
          <Kicker>OPEN ROLES</Kicker>
          <h2 className="display" style={{fontSize:'clamp(36px,5vw,64px)', marginTop:14}}>We're hiring.</h2>
          <div style={{marginTop:32, border:'1px solid var(--hairline)'}}>
            {roles.map(([r,d],i)=>(
              <div key={r} style={{display:'grid', gridTemplateColumns:'2fr 2fr auto', alignItems:'center', padding:'22px 28px', borderTop: i?'1px solid var(--hairline)':'none', gap:16}}>
                <div style={{fontFamily:'var(--display)', fontSize:22, letterSpacing:'-.015em'}}>{r}</div>
                <div style={{color:'var(--fg-muted)', fontSize:14}}>{d}</div>
                <div style={{display:'inline-flex', alignItems:'center', gap:8, color:'var(--accent)'}} className="mono">APPLY <Arrow size={12}/></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

/* ---------- JK WAY ---------- */
function JKWayPage() {
  const { navigate } = useApp();

  useEffect(()=>{
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["Organization", "LocalBusiness", "GeneralContractor"],
          "@id": "https://www.jkprestigeconstructor.com/#organization",
          "name": "JK Prestige Constructor",
          "url": "https://www.jkprestigeconstructor.com",
          "logo": "https://www.jkprestigeconstructor.com/logo.png",
          "foundingDate": "2017",
          "description": "Family-operated general contractor headquartered in Jacksonville, FL. Ground-up construction, design-build, self-perform trades, roofing, and tenant improvement across the US.",
          "telephone": "+19049440278",
          "email": "jerekaine@hotmail.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Jacksonville",
            "addressRegion": "FL",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 30.3322,
            "longitude": -81.6557
          },
          "areaServed": [
            {"@type": "State", "name": "Florida"},
            {"@type": "Country", "name": "United States"}
          ],
          "knowsAbout": [
            "General Contracting",
            "Ground-Up Construction",
            "Design-Build",
            "Virtual Design and Construction",
            "OSHA Safety",
            "Lean Construction",
            "Roofing",
            "Hospital Construction",
            "Warehouse Construction",
            "Custom Home Building"
          ],
          "hasCredential": [
            {"@type": "EducationalOccupationalCredential", "credentialCategory": "OSHA 30"},
            {"@type": "EducationalOccupationalCredential", "credentialCategory": "Licensed General Contractor — Florida"}
          ],
          "sameAs": []
        },
        {
          "@type": "WebPage",
          "name": "The JK Way — General Contractor Jacksonville FL | JK Prestige Constructor",
          "description": "How JK Prestige Constructor delivers ground-up construction, design-build, and self-perform trades across Florida and the US. Our process: Preconstruction, Design-Build, VDC/BIM, Self-Perform, Closeout.",
          "url": "https://www.jkprestigeconstructor.com/jk-way",
          "inLanguage": "en-US",
          "isPartOf": {"@id": "https://www.jkprestigeconstructor.com/#organization"}
        }
      ]
    };
    const existing = document.getElementById('jkway-schema');
    if (existing) existing.remove();
    const tag = document.createElement('script');
    tag.id = 'jkway-schema';
    tag.type = 'application/ld+json';
    tag.textContent = JSON.stringify(schema);
    document.head.appendChild(tag);
    return ()=>{ const el = document.getElementById('jkway-schema'); if(el) el.remove(); };
  }, []);

  const process = [
    {
      n:'01',
      k:'PRECONSTRUCTION',
      h:'Start sharp, stay on budget.',
      d:'Before a shovel touches dirt, our preconstruction team produces a full scope document, line-item GMP estimate, and permit-ready package. We walk every site, validate subsurface conditions, identify long-lead materials, and lock the schedule baseline — so your groundbreaking is not the beginning of the surprises. It is the end of them.',
    },
    {
      n:'02',
      k:'DESIGN-BUILD',
      h:'One contract. One team. Zero handoff risk.',
      d:'When design and construction sit under the same roof, cost decisions happen in real time. Our design-build model integrates architects, engineers, and field supers into a single delivery team working from a shared model. The result: fewer RFIs, no adversarial change-order arguments, and a building that looks exactly like what you approved in schematic.',
    },
    {
      n:'03',
      k:'VDC / BIM',
      h:'Build it virtually. Build it right the first time.',
      d:'Every ground-up project runs through Virtual Design & Construction before steel is ordered. We model full MEP coordination, clash detection, and 4D schedule simulation — then push that model directly to field tablets. Crews arrive knowing exactly what goes where. Rework drops. Speed climbs. The model-to-field workflow is not an add-on; it is the standard.',
    },
    {
      n:'04',
      k:'SELF-PERFORM',
      h:'Critical trades stay in-house.',
      d:'Concrete, framing, drywall, and finish carpentry are JK crews — not subs. Self-performing the critical path gives us direct control of quality, schedule, and cost at the moments that matter most. When we do bring in specialty trades, they work under our superintendent on our schedule, not the other way around.',
    },
    {
      n:'05',
      k:'CLOSEOUT',
      h:'Handover is not the end. It is the handshake.',
      d:'Closeout begins on day one, not the last week. Punchlist items are logged in real time throughout construction, not discovered at the final walkthrough. At turnover you receive a complete commissioning report, O&M documentation, warranty binder, and a direct line to a JK principal — not a call center — for the first year of occupancy.',
    },
  ];

  const safetyStats = [
    ['OSHA 30', 'All supervisory staff certified OSHA 30 — not just front-line foremen.'],
    ['ZERO-INCIDENT GOAL', 'We target zero recordable incidents on every project, every year. Not a rate. Zero.'],
    ['DAILY TOOLBOX TALKS', 'Crew-led hazard identification at the start of every shift. Documented. Logged.'],
    ['PRE-TASK PLANNING', 'Written JSAs for every non-routine task before work begins. No exceptions.'],
    ['INCIDENT RATE', 'Our TRIR runs below one-third of the industry average for commercial GCs.'],
    ['THIRD-PARTY AUDIT', 'Annual third-party safety audit against OSHA 1926 Subpart C through Z.'],
  ];

  return (
    <PageShell
      kicker="THE JK WAY"
      title={<>The operating system<br/>behind the guarantee.</>}
      sub="How JK Prestige Constructor — Jacksonville, FL's principal-led general contractor — delivers ground-up construction, design-build, and self-perform trades on time and on budget across Florida and the US."
    >
      {/* ---- SEO intro ---- */}
      <section className="section" style={{background:'var(--bg-elev)'}}>
        <div className="wrap" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(32px,5vw,72px)', alignItems:'start'}}>
          <div>
            <span className="mono" style={{color:'var(--accent)'}}>// GENERAL CONTRACTOR JACKSONVILLE FL</span>
            <h2 className="display" style={{fontSize:'clamp(28px,3.5vw,48px)', marginTop:16, color:'#fff', lineHeight:1.05}}>
              Family-run since 2017. Principal on every project.
            </h2>
            <p style={{color:'rgba(255,255,255,.75)', marginTop:20, lineHeight:1.7, fontSize:16}}>
              JK Prestige Constructor is a licensed, bonded, and insured general contractor headquartered in Jacksonville, Florida. We deliver ground-up construction, design-build, hospital programs, custom homes, warehouses, and roofing across the US — with a principal's name on every contract and a direct number that reaches a decision-maker, not a coordinator.
            </p>
            <p style={{color:'rgba(255,255,255,.75)', marginTop:16, lineHeight:1.7, fontSize:16}}>
              "The JK Way" is not a marketing phrase. It is the written delivery playbook our supers, PMs, and principals execute on every project — from preconstruction through year-one warranty.
            </p>
          </div>
          <div style={{display:'grid', gap:1, background:'rgba(0,0,0,.25)'}}>
            {[
              ['500+', 'Projects delivered since 2017'],
              ['OSHA 30', 'Across all supervisory staff'],
              ['48 HRS', 'Estimate turnaround from site walk'],
              ['1 CONTRACT', 'One principal. One guarantee.'],
            ].map(([stat, label])=>(
              <div key={stat} style={{background:'var(--bg-elev)', padding:'24px 28px', display:'flex', alignItems:'center', gap:24}}>
                <div style={{fontFamily:'var(--display)', fontSize:'clamp(28px,3vw,42px)', color:'var(--accent)', letterSpacing:'-.025em', flexShrink:0, minWidth:120}}>{stat}</div>
                <div style={{fontSize:14, color:'rgba(255,255,255,.75)', lineHeight:1.5}}>{label}</div>
              </div>
            ))}
          </div>
          <style>{`@media(max-width:900px){.jkway-intro-grid{grid-template-columns:1fr !important}}`}</style>
        </div>
      </section>

      {/* ---- Our Process ---- */}
      <section className="section" style={{background:'var(--bg-primary)'}}>
        <div className="wrap">
          <Kicker>OUR PROCESS</Kicker>
          <h2 className="display" style={{fontSize:'clamp(36px,5vw,72px)', marginTop:14}}>
            Five phases. Every project, without exception.
          </h2>
          <p style={{marginTop:20, maxWidth:680, color:'var(--fg-muted)', fontSize:16, lineHeight:1.7}}>
            Whether we are delivering a 400,000-square-foot hospital tower in Jacksonville or a custom estate in the Florida panhandle, the same sequenced delivery model applies. Consistency is how you get predictable outcomes.
          </p>
          <div style={{marginTop:48, display:'grid', gap:1, background:'var(--hairline)'}}>
            {process.map((step, i)=>(
              <Reveal key={step.n} delay={i*60} style={{background:'var(--bg-primary)', padding:'clamp(28px,4vw,48px)', display:'grid', gridTemplateColumns:'80px 1fr', gap:32, alignItems:'start'}}>
                <div style={{fontFamily:'var(--display)', fontSize:'clamp(40px,5vw,72px)', color:'var(--accent)', letterSpacing:'-.03em', lineHeight:1}}>{step.n}</div>
                <div>
                  <div className="mono" style={{color:'var(--fg-muted)'}}>{step.k}</div>
                  <h3 style={{fontFamily:'var(--display)', fontSize:'clamp(22px,2.5vw,34px)', letterSpacing:'-.015em', marginTop:10}}>{step.h}</h3>
                  <p style={{color:'var(--fg-muted)', marginTop:14, lineHeight:1.7, maxWidth:680, fontSize:15}}>{step.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Safety Culture ---- */}
      <section className="section" style={{background:'var(--bg-invert)'}}>
        <div className="wrap">
          <Kicker>SAFETY CULTURE</Kicker>
          <h2 className="display" style={{fontSize:'clamp(36px,5vw,72px)', marginTop:14, color:'#fff'}}>
            OSHA 30. Zero-incident goal. No shortcuts.
          </h2>
          <p style={{marginTop:20, maxWidth:720, color:'rgba(255,255,255,.75)', fontSize:16, lineHeight:1.7}}>
            Safety is not a compliance exercise at JK Prestige. It is an operating standard enforced by principals, not pushed down from a corporate safety office. Every supervisory employee holds OSHA 30 certification. Every shift starts with a crew-led toolbox talk. Every non-routine task requires a written Job Safety Analysis before work begins.
          </p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'rgba(255,255,255,.08)', marginTop:40}} className="safety-grid">
            {safetyStats.map(([k, d], i)=>(
              <Reveal key={k} delay={i*60} style={{background:'var(--bg-invert)', padding:'32px 28px', minHeight:200}}>
                <div className="mono" style={{color:'rgba(255,255,255,.5)', fontSize:10}}>// {String(i+1).padStart(2,'0')}</div>
                <div className="mono" style={{color:'#fff', marginTop:14, fontSize:11, letterSpacing:'.14em'}}>{k}</div>
                <p style={{fontSize:14, color:'rgba(255,255,255,.7)', marginTop:12, lineHeight:1.6}}>{d}</p>
              </Reveal>
            ))}
          </div>
          <style>{`@media(max-width:900px){.safety-grid{grid-template-columns:repeat(2,1fr) !important}} @media(max-width:600px){.safety-grid{grid-template-columns:1fr !important}}`}</style>
        </div>
      </section>

      {/* ---- Lean Scheduling ---- */}
      <section className="section" style={{background:'var(--bg-primary)'}}>
        <div className="wrap" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(32px,5vw,72px)', alignItems:'center'}} className="lean-grid">
          <div>
            <Kicker>LEAN SCHEDULING</Kicker>
            <h2 className="display" style={{fontSize:'clamp(32px,4vw,56px)', marginTop:14, lineHeight:1.05}}>
              Pull planning. Last Planner. Weeks recovered.
            </h2>
            <p style={{color:'var(--fg-muted)', marginTop:20, lineHeight:1.7, fontSize:16}}>
              Traditional push schedules tell crews what they should have finished. Lean pull schedules commit to what they will finish — with the people doing the work setting the plan. JK runs Last Planner System on all projects over $2M: weekly work planning, look-ahead schedules, and constraint log reviews every Friday.
            </p>
            <p style={{color:'var(--fg-muted)', marginTop:16, lineHeight:1.7, fontSize:16}}>
              The result is not faster work. It is less waiting, less rework, and fewer back-charges — which translates directly into schedule days recovered and dollars returned to contingency. Our clients keep contingency. That is the point.
            </p>
          </div>
          <div style={{display:'grid', gap:16}}>
            {[
              ['PULL PLANNING', 'Work packages planned backward from milestones. Commitment-driven, not estimate-driven.'],
              ['LOOK-AHEAD SCHEDULES', '3-week rolling window. Constraints identified and removed before they hit the critical path.'],
              ['PERCENT PLAN COMPLETE', 'PPC tracked weekly. Variance analyzed. Root cause corrected — not buried in a report.'],
              ['WASTE ELIMINATION', 'Motion, waiting, over-processing — identified daily. Every saved minute is a recoverable dollar.'],
            ].map(([k,d])=>(
              <div key={k} style={{padding:'20px 24px', border:'1px solid var(--hairline)', display:'grid', gap:8}}>
                <div className="mono" style={{color:'var(--accent)', fontSize:10}}>{k}</div>
                <div style={{fontSize:14, color:'var(--fg-muted)', lineHeight:1.6}}>{d}</div>
              </div>
            ))}
          </div>
          <style>{`@media(max-width:900px){.lean-grid{grid-template-columns:1fr !important}}`}</style>
        </div>
      </section>

      {/* ---- Owner-First Communication ---- */}
      <section className="section" style={{background:'var(--bg-elev)'}}>
        <div className="wrap">
          <Kicker>OWNER-FIRST COMMUNICATION</Kicker>
          <h2 className="display" style={{fontSize:'clamp(36px,5vw,72px)', marginTop:14, color:'#fff'}}>
            You talk to a name, not a ticket number.
          </h2>
          <p style={{marginTop:20, maxWidth:720, color:'rgba(255,255,255,.75)', fontSize:16, lineHeight:1.7}}>
            Every JK Prestige project has a named principal assigned from day one through year-one warranty. That principal's direct number is in your contract. Not their admin. Not a project hotline. Them. They know your budget, your schedule, your finish preferences, and the name of your facilities manager.
          </p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'rgba(0,0,0,.3)', marginTop:40}} className="comm-grid">
            {[
              ['WEEKLY OWNER REPORT','Written. On time. Every week. Budget variance, schedule status, open RFIs, next-week look-ahead — one page, not a novel.'],
              ['48-HOUR RESPONSE GUARANTEE','Any owner question answered within 48 business hours. In writing. With a decision, not a follow-up loop.'],
              ['CHANGE ORDER TRANSPARENCY','Every potential cost event disclosed within 24 hours of identification. No surprises at month-end billing.'],
              ['REAL-TIME SCHEDULE ACCESS','Owner portal with live schedule, RFI log, submittal tracker, and photo documentation. Available 24/7.'],
              ['PRINCIPAL WALKTHROUGH','Monthly site walk with the project principal and owner. Not a superintendent hand-off walk. A principal walk.'],
              ['YEAR-ONE WARRANTY PROGRAM','12 months of post-occupancy support. Single point of contact. Logged and tracked to resolution.'],
            ].map(([k,d],i)=>(
              <Reveal key={k} delay={i*60} style={{background:'var(--bg-elev)', padding:'32px 28px', minHeight:220}}>
                <div style={{fontFamily:'var(--display)', fontSize:40, color:'var(--accent)', letterSpacing:'-.025em', lineHeight:1}}>{String(i+1).padStart(2,'0')}</div>
                <div className="mono" style={{color:'#fff', marginTop:16, fontSize:10}}>{k}</div>
                <p style={{fontSize:14, color:'rgba(255,255,255,.7)', marginTop:12, lineHeight:1.6}}>{d}</p>
              </Reveal>
            ))}
          </div>
          <style>{`@media(max-width:900px){.comm-grid{grid-template-columns:repeat(2,1fr) !important}} @media(max-width:600px){.comm-grid{grid-template-columns:1fr !important}}`}</style>
        </div>
      </section>

      {/* ---- Proof bar ---- */}
      <section className="section" style={{background:'var(--bg-primary)', borderTop:'1px solid var(--hairline)', borderBottom:'1px solid var(--hairline)'}}>
        <div className="wrap">
          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, background:'var(--hairline)'}} className="proof-grid">
            {[
              ['500+', 'Projects completed across the US'],
              ['$2B+', 'Construction value delivered'],
              ['2017', 'Founding year — still family-run'],
              ['#1 PRIORITY', 'Safety. Then schedule. Then cost.'],
            ].map(([stat,label])=>(
              <div key={stat} style={{background:'var(--bg-primary)', padding:'32px 28px', textAlign:'center'}}>
                <div style={{fontFamily:'var(--display)', fontSize:'clamp(28px,3.5vw,48px)', letterSpacing:'-.03em', color:'#fff'}}>{stat}</div>
                <div style={{fontSize:13, color:'var(--fg-muted)', marginTop:10, lineHeight:1.5}}>{label}</div>
              </div>
            ))}
          </div>
          <style>{`@media(max-width:700px){.proof-grid{grid-template-columns:repeat(2,1fr) !important}}`}</style>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="section" style={{background:'var(--bg-invert)'}}>
        <div className="wrap" style={{textAlign:'center', maxWidth:780, margin:'0 auto'}}>
          <Kicker>START YOUR PROJECT</Kicker>
          <h2 className="display" style={{fontSize:'clamp(36px,5.5vw,80px)', marginTop:18, color:'#fff', lineHeight:.95}}>
            Ready to build with Jacksonville's most accountable general contractor?
          </h2>
          <p style={{marginTop:24, color:'rgba(255,255,255,.7)', fontSize:17, lineHeight:1.65, maxWidth:640, margin:'24px auto 0'}}>
            Ground-up construction, design-build, self-perform trades, and roofing — delivered by a principal-led team based in Jacksonville, FL. Tell us what you're building and we'll have a real number back to you in 48 hours.
          </p>
          <div style={{display:'flex', justifyContent:'center', gap:14, marginTop:36, flexWrap:'wrap'}}>
            <button className="btn btn-primary" onClick={()=>navigate('/contact')} style={{padding:'20px 32px', fontSize:15}}>
              Get a free estimate <Arrow/>
            </button>
            <a href="tel:9049440278" className="btn btn-outline" style={{padding:'20px 32px', fontSize:15, color:'#fff', borderColor:'rgba(255,255,255,.35)'}}>
              Call (904) 944-0278
            </a>
          </div>
          <div style={{marginTop:28, color:'rgba(255,255,255,.4)', fontSize:12, fontFamily:'var(--mono)', letterSpacing:'.1em'}}>
            JACKSONVILLE, FL · LICENSED & INSURED · SINCE 2017
          </div>
        </div>
      </section>
    </PageShell>
  );
}

/* =========================================================
   TERMS OF SERVICE
   ========================================================= */
function TermsPage() {
  const { navigate } = useApp();
  useEffect(()=>{
    window.scrollTo(0,0);
    document.title = 'Terms of Service — JK Prestige Constructor Corp';
    return ()=>{ document.title = 'JK Prestige Constructor | General Contractor Jacksonville FL'; };
  },[]);
  return (
    <div style={{minHeight:'80vh', background:'var(--bg-primary)', padding:'clamp(48px,8vw,96px) 0'}}>
      <div className="wrap" style={{maxWidth:860}}>
        <Kicker>LEGAL</Kicker>
        <h1 className="display" style={{fontSize:'clamp(36px,5vw,72px)', marginTop:16, lineHeight:.92}}>Terms of Service</h1>
        <p className="mono" style={{color:'var(--fg-muted)', marginTop:14}}>Effective: January 1, 2024 · Last updated: May 1, 2025</p>
        <p style={{color:'var(--fg-muted)', marginTop:6, fontSize:13}}>JK Prestige Constructor Corp · Jacksonville, FL 32202 · (904) 944-0278 · jerekaine@hotmail.com</p>

        <div style={{marginTop:48, borderTop:'1px solid var(--hairline)', paddingTop:40, display:'grid', gap:40}}>

          <LegalSection title="1. Agreement to Terms">
            <p>These Terms of Service ("Terms") govern your access to and use of the website <strong>jkprestigeconstruction.com</strong> (the "Site") operated by <strong>JK Prestige Constructor Corp</strong>, a Florida corporation ("Company," "we," "us," or "our") headquartered in Jacksonville, Florida.</p>
            <p style={{marginTop:12}}>By accessing or using the Site, submitting an inquiry form, requesting a quote, or entering into any construction agreement with JK Prestige Constructor Corp, you agree to be bound by these Terms. If you do not agree, please do not use the Site or our services.</p>
          </LegalSection>

          <LegalSection title="2. Company Information">
            <p><strong>JK Prestige Constructor Corp</strong> is a licensed, bonded, and insured general contracting corporation incorporated under the laws of the State of Florida. We have provided construction, renovation, and roofing services since 2017 and operate principally from Jacksonville, Florida, with project experience across the United States.</p>
            <p style={{marginTop:12}}>Florida Contractor License: Available upon request. General Liability and Workers' Compensation certificates provided to all clients at project inception.</p>
          </LegalSection>

          <LegalSection title="3. Services Described">
            <p>JK Prestige Constructor Corp provides the following categories of services:</p>
            <ul style={{marginTop:12, paddingLeft:20, display:'grid', gap:6}}>
              {[
                'Ground-up construction (commercial, medical, residential, industrial)',
                'Custom home design-build',
                'Whole-home and commercial renovations',
                'Roofing — residential and commercial (installation, repair, storm response)',
                'Preconstruction and estimating services',
                'Subcontracting and trade services to other general contractors',
              ].map(s=><li key={s} style={{color:'var(--fg-muted)', fontSize:15, lineHeight:1.6}}>{s}</li>)}
            </ul>
            <p style={{marginTop:12}}>All construction services are governed by a separate written contract executed between the Company and each client. These Terms apply to use of this Site and the submission of inquiry forms. They do not constitute a construction agreement.</p>
          </LegalSection>

          <LegalSection title="4. Estimates and Quotes">
            <p>Any estimate or budget range provided through this Site, by phone, or by email is preliminary and non-binding. A formal written proposal or contract is required to initiate any project. All pricing is subject to field verification, plan review, and market conditions at the time of contract execution. JK Prestige Constructor Corp is not liable for any reliance on preliminary estimates.</p>
          </LegalSection>

          <LegalSection title="5. Construction Contracts">
            <p>All construction work is performed under a separate written construction agreement that includes:</p>
            <ul style={{marginTop:12, paddingLeft:20, display:'grid', gap:6}}>
              {[
                'Defined scope of work and project schedule',
                'Payment schedule and draw structure',
                'Change order procedures (all changes in writing, signed by both parties)',
                'Dispute resolution and warranty terms',
                'Subcontractor and materials disclosure',
                'Insurance and lien-waiver requirements',
              ].map(s=><li key={s} style={{color:'var(--fg-muted)', fontSize:15, lineHeight:1.6}}>{s}</li>)}
            </ul>
            <p style={{marginTop:12}}>Any written construction contract signed by an authorized representative of JK Prestige Constructor Corp supersedes these Terms with respect to the specific project governed by that contract.</p>
          </LegalSection>

          <LegalSection title="6. Payment Terms">
            <p>Unless otherwise specified in a written construction contract:</p>
            <ul style={{marginTop:12, paddingLeft:20, display:'grid', gap:6}}>
              {[
                'A deposit (typically 10–25% depending on project type) is required to reserve scheduling.',
                'Progress draws are invoiced at agreed milestones.',
                'Final payment is due upon substantial completion and punch-list sign-off.',
                'Overdue invoices accrue interest at 1.5% per month (18% per annum) after 30 days.',
                'Client is responsible for all costs of collection, including reasonable attorney\'s fees.',
              ].map(s=><li key={s} style={{color:'var(--fg-muted)', fontSize:15, lineHeight:1.6}}>{s}</li>)}
            </ul>
          </LegalSection>

          <LegalSection title="7. Warranties">
            <p><strong>Workmanship Warranty:</strong> JK Prestige Constructor Corp warrants all labor and workmanship for a period of one (1) year from the date of substantial completion, unless a longer period is specified in the written contract.</p>
            <p style={{marginTop:12}}><strong>Manufacturer Warranties:</strong> Materials and products are subject to their respective manufacturer warranties, which are passed through to the client in full. JK Prestige Constructor Corp will assist clients in registering and processing valid warranty claims.</p>
            <p style={{marginTop:12}}><strong>Roofing Warranties:</strong> GAF Master Elite certified work may qualify for extended manufacturer warranty programs (e.g., GAF Golden Pledge). Specific warranty terms are provided in writing at project closeout.</p>
            <p style={{marginTop:12}}>Warranties are void if modifications are made to completed work by parties other than JK Prestige Constructor Corp without prior written consent.</p>
          </LegalSection>

          <LegalSection title="8. Limitation of Liability">
            <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, JK PRESTIGE CONSTRUCTOR CORP SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, LOSS OF USE, OR LOSS OF DATA, ARISING FROM OR RELATED TO THESE TERMS OR USE OF THIS SITE.</p>
            <p style={{marginTop:12}}>The Company's total aggregate liability for any claim arising under these Terms shall not exceed the greater of (a) $500 or (b) the amount paid by the client to JK Prestige Constructor Corp in the three (3) months preceding the claim.</p>
          </LegalSection>

          <LegalSection title="9. Intellectual Property">
            <p>All content on this Site — including text, images, graphics, logos, and design — is the property of JK Prestige Constructor Corp or its licensors and is protected by United States copyright and trademark law. You may not reproduce, distribute, or create derivative works from Site content without our prior written permission.</p>
          </LegalSection>

          <LegalSection title="10. Acceptable Use">
            <p>You agree not to:</p>
            <ul style={{marginTop:12, paddingLeft:20, display:'grid', gap:6}}>
              {[
                'Use the Site for any unlawful purpose',
                'Submit false, misleading, or fraudulent information through inquiry forms',
                'Attempt to access systems or data not intended for you',
                'Use automated tools to scrape or harvest content from this Site',
                'Transmit viruses, malware, or other harmful code',
              ].map(s=><li key={s} style={{color:'var(--fg-muted)', fontSize:15, lineHeight:1.6}}>{s}</li>)}
            </ul>
          </LegalSection>

          <LegalSection title="11. Dispute Resolution">
            <p><strong>Informal Resolution:</strong> Before initiating formal proceedings, the parties agree to attempt to resolve disputes informally by contacting us at (904) 944-0278 or jerekaine@hotmail.com. We will respond within 10 business days.</p>
            <p style={{marginTop:12}}><strong>Governing Law:</strong> These Terms are governed by the laws of the State of Florida, without regard to conflict-of-law principles. Any legal action shall be brought exclusively in the state or federal courts located in Duval County, Florida.</p>
            <p style={{marginTop:12}}><strong>Construction Disputes:</strong> Disputes arising from construction contracts may be subject to Florida's contractor licensing statutes (Chapter 489, Florida Statutes) and may be brought before the Florida Department of Business and Professional Regulation (DBPR).</p>
          </LegalSection>

          <LegalSection title="12. Changes to These Terms">
            <p>We reserve the right to modify these Terms at any time. Changes are effective when posted to this Site with an updated "Last updated" date. Continued use of the Site after changes constitutes acceptance of the revised Terms. We will make reasonable efforts to notify clients of material changes via email when a project is ongoing.</p>
          </LegalSection>

          <LegalSection title="13. Contact">
            <p>For questions about these Terms, please contact:</p>
            <div style={{marginTop:14, background:'var(--bg-elev)', padding:'20px 24px', borderLeft:'3px solid var(--accent)'}}>
              <div style={{fontFamily:'var(--display)', fontSize:18, color:'#fff'}}>JK Prestige Constructor Corp</div>
              <div style={{color:'var(--fg-muted)', marginTop:8, lineHeight:1.7}}>
                Jacksonville, Florida 32202<br/>
                Phone: (904) 944-0278<br/>
                Email: jerekaine@hotmail.com<br/>
                Hours: Monday–Friday, 7:00 AM – 6:00 PM ET
              </div>
            </div>
          </LegalSection>
        </div>

        <div style={{marginTop:48, paddingTop:32, borderTop:'1px solid var(--hairline)', display:'flex', gap:20, flexWrap:'wrap'}}>
          <button onClick={()=>navigate('/privacy')} className="btn btn-outline" style={{fontSize:11}}>Privacy Policy</button>
          <button onClick={()=>navigate('/')} className="btn btn-ghost" style={{fontSize:11}}>Back to home</button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PRIVACY POLICY
   ========================================================= */
function PrivacyPage() {
  const { navigate } = useApp();
  useEffect(()=>{
    window.scrollTo(0,0);
    document.title = 'Privacy Policy — JK Prestige Constructor Corp';
    return ()=>{ document.title = 'JK Prestige Constructor | General Contractor Jacksonville FL'; };
  },[]);
  return (
    <div style={{minHeight:'80vh', background:'var(--bg-primary)', padding:'clamp(48px,8vw,96px) 0'}}>
      <div className="wrap" style={{maxWidth:860}}>
        <Kicker>LEGAL</Kicker>
        <h1 className="display" style={{fontSize:'clamp(36px,5vw,72px)', marginTop:16, lineHeight:.92}}>Privacy Policy</h1>
        <p className="mono" style={{color:'var(--fg-muted)', marginTop:14}}>Effective: January 1, 2024 · Last updated: May 1, 2025</p>
        <p style={{color:'var(--fg-muted)', marginTop:6, fontSize:13}}>JK Prestige Constructor Corp · Jacksonville, FL 32202 · (904) 944-0278 · jerekaine@hotmail.com</p>

        <div style={{marginTop:48, borderTop:'1px solid var(--hairline)', paddingTop:40, display:'grid', gap:40}}>

          <LegalSection title="1. Introduction">
            <p>JK Prestige Constructor Corp ("we," "us," "our") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit <strong>jkprestigeconstruction.com</strong> (the "Site") or contact us to request construction, renovation, or roofing services.</p>
            <p style={{marginTop:12}}>Please read this policy carefully. If you disagree with its terms, please discontinue use of the Site.</p>
          </LegalSection>

          <LegalSection title="2. Information We Collect">
            <p><strong>Information you provide directly:</strong></p>
            <ul style={{marginTop:10, paddingLeft:20, display:'grid', gap:6}}>
              {[
                'Contact details: name, email address, phone number',
                'Property information: address, property type, project description',
                'Project details: scope, budget range, timeline',
                'Any additional information submitted through forms, email, or phone calls',
              ].map(s=><li key={s} style={{color:'var(--fg-muted)', fontSize:15, lineHeight:1.6}}>{s}</li>)}
            </ul>
            <p style={{marginTop:14}}><strong>Information collected automatically:</strong></p>
            <ul style={{marginTop:10, paddingLeft:20, display:'grid', gap:6}}>
              {[
                'IP address and approximate geographic location',
                'Browser type and version',
                'Pages visited and time spent on each page',
                'Referring URL (how you found our Site)',
                'Device type (desktop, mobile, tablet)',
              ].map(s=><li key={s} style={{color:'var(--fg-muted)', fontSize:15, lineHeight:1.6}}>{s}</li>)}
            </ul>
            <p style={{marginTop:14}}><strong>We do not collect:</strong> payment card numbers, Social Security numbers, or other sensitive financial data through this Site. Project payment is handled separately via invoicing.</p>
          </LegalSection>

          <LegalSection title="3. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul style={{marginTop:12, paddingLeft:20, display:'grid', gap:6}}>
              {[
                'Respond to your inquiry, estimate request, or inspection booking',
                'Prepare and deliver construction proposals and contracts',
                'Schedule site visits, inspections, and project work',
                'Communicate project updates, change orders, and billing',
                'Improve the Site and our service offerings',
                'Comply with legal obligations and protect our legal rights',
                'Send service-related communications (not marketing without consent)',
              ].map(s=><li key={s} style={{color:'var(--fg-muted)', fontSize:15, lineHeight:1.6}}>{s}</li>)}
            </ul>
            <p style={{marginTop:12}}>We do not sell, rent, or share your personal information with third parties for their marketing purposes.</p>
          </LegalSection>

          <LegalSection title="4. Legal Basis for Processing (GDPR)">
            <p>If you are located in the European Economic Area, our legal basis for collecting and using your personal information depends on the information concerned and the context:</p>
            <ul style={{marginTop:12, paddingLeft:20, display:'grid', gap:6}}>
              {[
                'Contract performance: to respond to your inquiry and perform any agreement between us',
                'Legitimate interests: to operate and improve our business (where not overridden by your rights)',
                'Consent: where you have specifically consented (e.g., checking the authorization box on our forms)',
                'Legal obligation: where required by applicable law',
              ].map(s=><li key={s} style={{color:'var(--fg-muted)', fontSize:15, lineHeight:1.6}}>{s}</li>)}
            </ul>
          </LegalSection>

          <LegalSection title="5. Information Sharing and Disclosure">
            <p>We may share your information with:</p>
            <ul style={{marginTop:12, paddingLeft:20, display:'grid', gap:6}}>
              {[
                'Subcontractors and trade partners: to the extent necessary to perform contracted work (e.g., roofing crew needing your address)',
                'Service providers: AWS (email delivery via SES), web hosting (Cloudflare, Amazon S3) — all bound by data processing agreements',
                'Insurance carriers and bonding companies: when required to issue certificates or process claims',
                'Legal authorities: when required by law, court order, or to protect our legal rights',
                'Business successors: in connection with a merger, acquisition, or sale of assets (with notice to you)',
              ].map(s=><li key={s} style={{color:'var(--fg-muted)', fontSize:15, lineHeight:1.6}}>{s}</li>)}
            </ul>
          </LegalSection>

          <LegalSection title="6. Data Retention">
            <p>We retain your personal information for as long as necessary to:</p>
            <ul style={{marginTop:12, paddingLeft:20, display:'grid', gap:6}}>
              {[
                'Maintain an active business relationship with you',
                'Comply with legal, tax, and accounting obligations (typically 7 years for financial records)',
                'Resolve disputes and enforce our agreements',
                'Respond to warranty claims (up to the warranty period plus 2 years)',
              ].map(s=><li key={s} style={{color:'var(--fg-muted)', fontSize:15, lineHeight:1.6}}>{s}</li>)}
            </ul>
            <p style={{marginTop:12}}>Inquiry submissions from non-clients are retained for up to 12 months and then deleted unless you have entered into a project agreement.</p>
          </LegalSection>

          <LegalSection title="7. Cookies and Tracking">
            <p>This Site uses minimal tracking. Specifically:</p>
            <ul style={{marginTop:12, paddingLeft:20, display:'grid', gap:6}}>
              {[
                'No advertising or retargeting cookies are used.',
                'No third-party analytics platforms (Google Analytics, Facebook Pixel, etc.) are currently deployed.',
                'The embedded Google Maps iframe may load Google\'s own cookies subject to Google\'s Privacy Policy.',
                'Session state is maintained via browser localStorage (audience preference only — no personal data).',
              ].map(s=><li key={s} style={{color:'var(--fg-muted)', fontSize:15, lineHeight:1.6}}>{s}</li>)}
            </ul>
          </LegalSection>

          <LegalSection title="8. Your Privacy Rights">
            <p>Depending on your location, you may have the right to:</p>
            <ul style={{marginTop:12, paddingLeft:20, display:'grid', gap:6}}>
              {[
                'Access the personal information we hold about you',
                'Correct inaccurate or incomplete information',
                'Request deletion of your personal information ("right to be forgotten")',
                'Object to or restrict our processing of your information',
                'Data portability — receive your data in a structured, machine-readable format',
                'Withdraw consent at any time (where processing is based on consent)',
                'Lodge a complaint with a supervisory authority (EU/EEA residents)',
              ].map(s=><li key={s} style={{color:'var(--fg-muted)', fontSize:15, lineHeight:1.6}}>{s}</li>)}
            </ul>
            <p style={{marginTop:12}}><strong>Florida residents (FIPA):</strong> You have the right to know what categories of personal information we collect and to request deletion, subject to certain exceptions.</p>
            <p style={{marginTop:10}}>To exercise any of these rights, contact us at jerekaine@hotmail.com or (904) 944-0278. We will respond within 30 days.</p>
          </LegalSection>

          <LegalSection title="9. Data Security">
            <p>We implement commercially reasonable technical and organizational measures to protect your personal information, including:</p>
            <ul style={{marginTop:12, paddingLeft:20, display:'grid', gap:6}}>
              {[
                'HTTPS/TLS encryption for all data transmitted through the Site',
                'AWS SES for secure transactional email delivery',
                'Access controls limiting internal access to personal data on a need-to-know basis',
                'Regular review of data handling practices',
              ].map(s=><li key={s} style={{color:'var(--fg-muted)', fontSize:15, lineHeight:1.6}}>{s}</li>)}
            </ul>
            <p style={{marginTop:12}}>No method of transmission over the internet is 100% secure. We cannot guarantee absolute security but will notify affected individuals promptly in the event of a data breach as required by Florida law (FIPA) and applicable regulations.</p>
          </LegalSection>

          <LegalSection title="10. Children's Privacy">
            <p>This Site is not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will promptly delete it.</p>
          </LegalSection>

          <LegalSection title="11. Third-Party Links">
            <p>This Site may contain links to third-party websites (e.g., Google Maps, supplier sites). We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies before providing any personal information.</p>
          </LegalSection>

          <LegalSection title="12. Changes to This Policy">
            <p>We may update this Privacy Policy periodically. Changes are effective when posted with an updated "Last updated" date. We will make reasonable efforts to notify you of material changes by posting a notice on the Site or by direct communication for active project clients.</p>
          </LegalSection>

          <LegalSection title="13. Contact Us">
            <p>For privacy-related questions, requests, or complaints, please contact our privacy point of contact:</p>
            <div style={{marginTop:14, background:'var(--bg-elev)', padding:'20px 24px', borderLeft:'3px solid var(--accent)'}}>
              <div style={{fontFamily:'var(--display)', fontSize:18, color:'#fff'}}>JK Prestige Constructor Corp — Privacy</div>
              <div style={{color:'var(--fg-muted)', marginTop:8, lineHeight:1.7}}>
                Jacksonville, Florida 32202<br/>
                Phone: (904) 944-0278<br/>
                Email: jerekaine@hotmail.com<br/>
                Response time: within 30 days of receipt
              </div>
            </div>
          </LegalSection>
        </div>

        <div style={{marginTop:48, paddingTop:32, borderTop:'1px solid var(--hairline)', display:'flex', gap:20, flexWrap:'wrap'}}>
          <button onClick={()=>navigate('/terms')} className="btn btn-outline" style={{fontSize:11}}>Terms of Service</button>
          <button onClick={()=>navigate('/')} className="btn btn-ghost" style={{fontSize:11}}>Back to home</button>
        </div>
      </div>
    </div>
  );
}

/* Helper for legal sections */
function LegalSection({ title, children }) {
  return (
    <div>
      <h2 style={{fontFamily:'var(--display)', fontSize:'clamp(18px,2.2vw,26px)', letterSpacing:'-.01em', color:'#fff', marginBottom:16, paddingBottom:12, borderBottom:'1px solid var(--hairline)'}}>{title}</h2>
      <div style={{color:'var(--fg-muted)', fontSize:15, lineHeight:1.75}}>{children}</div>
    </div>
  );
}

/* =========================================================
   EXPERTISE SUB-PAGES
   Reusable shell + 5 vertical pages
   ========================================================= */

function ExpertiseSubPage({ schemaId, schema, kicker, h1, description, ctaScrollId, services, stats, projectHighlights, faqs, children }) {
  const { navigate } = useApp();

  useEffect(()=>{
    const existing = document.getElementById(schemaId);
    if (existing) existing.remove();
    const tag = document.createElement('script');
    tag.id = schemaId;
    tag.type = 'application/ld+json';
    tag.textContent = JSON.stringify(schema);
    document.head.appendChild(tag);
    return ()=>{ const el = document.getElementById(schemaId); if (el) el.remove(); };
  }, []);

  return (
    <div className="page-enter" style={{minHeight:'60vh'}}>

      {/* SEO Hero */}
      <section className="section" style={{background:'var(--bg-primary)', borderBottom:'1px solid var(--hairline)'}}>
        <div className="wrap">
          <Kicker>{kicker}</Kicker>
          <h1 className="display" style={{fontSize:'clamp(40px,7vw,120px)', marginTop:18, lineHeight:.9}}>{h1}</h1>
          <p style={{marginTop:24, maxWidth:760, color:'var(--fg-muted)', fontSize:18, lineHeight:1.6}}>{description}</p>
          <div style={{display:'flex', gap:12, marginTop:32, flexWrap:'wrap'}}>
            <button className="btn btn-primary" onClick={()=>document.getElementById(ctaScrollId)?.scrollIntoView({behavior:'smooth', block:'start'})}>
              Get a free estimate <Arrow/>
            </button>
            <a href="tel:9049440278" className="btn btn-outline">Call (904) 944-0278</a>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{background:'var(--bg-elev)', borderBottom:'1px solid rgba(0,0,0,.25)'}}>
        <div className="wrap" style={{display:'grid', gridTemplateColumns:`repeat(${stats.length},1fr)`, gap:1, background:'rgba(0,0,0,.3)'}} className="sub-stats-grid">
          {stats.map(([num, label], i)=>(
            <Reveal key={label} delay={i*70} style={{background:'var(--bg-elev)', padding:'32px 24px', textAlign:'center'}}>
              <div style={{fontFamily:'var(--display)', fontSize:'clamp(32px,3.5vw,52px)', letterSpacing:'-.025em', color:'var(--accent)'}}>{num}</div>
              <div className="mono" style={{color:'rgba(255,255,255,.7)', fontSize:11, marginTop:8}}>{label.toUpperCase()}</div>
            </Reveal>
          ))}
        </div>
        <style>{`.sub-stats-grid{} @media(max-width:700px){.sub-stats-grid{grid-template-columns:repeat(2,1fr) !important}}`}</style>
      </section>

      {/* Services detail */}
      <section className="section" style={{background:'var(--bg-primary)'}}>
        <div className="wrap">
          <Kicker>CAPABILITIES</Kicker>
          <h2 className="display" style={{fontSize:'clamp(32px,4.5vw,64px)', marginTop:14}}>What we deliver.</h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:1, background:'var(--hairline)', marginTop:40}} className="sub-svc-grid">
            {services.map(([title, detail], i)=>(
              <Reveal key={title} delay={i*60} style={{background:'var(--bg-primary)', padding:'36px 32px'}}>
                <div style={{fontFamily:'var(--display)', fontSize:40, color:'var(--accent)', letterSpacing:'-.025em', lineHeight:1}}>{String(i+1).padStart(2,'0')}</div>
                <div className="mono" style={{color:'#fff', marginTop:16, fontSize:11, letterSpacing:'.14em'}}>{title.toUpperCase()}</div>
                <p style={{fontSize:15, color:'var(--fg-muted)', marginTop:12, lineHeight:1.7}}>{detail}</p>
              </Reveal>
            ))}
          </div>
          <style>{`@media(max-width:760px){.sub-svc-grid{grid-template-columns:1fr !important}}`}</style>
        </div>
      </section>

      {/* Project highlights */}
      <section className="section" style={{background:'var(--bg-elev)'}}>
        <div className="wrap">
          <Kicker>PROJECT HIGHLIGHTS</Kicker>
          <h2 className="display" style={{fontSize:'clamp(32px,4.5vw,64px)', marginTop:14, color:'#fff'}}>Work from the field.</h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:24, marginTop:40}} className="sub-proj-grid">
            {projectHighlights.map((p, i)=>(
              <Reveal key={p.id} delay={i*80} style={{background:'var(--bg-primary)', border:'1px solid rgba(255,255,255,.08)'}}>
                <Placeholder slug={p.slug} w={1200} h={700} tag="PROJECT"/>
                <div style={{padding:'24px 28px'}}>
                  <div className="mono" style={{color:'var(--accent)', fontSize:10}}>// {p.cat.toUpperCase()} · {p.state} · {p.year} · {p.size}</div>
                  <div style={{fontFamily:'var(--display)', fontSize:'clamp(20px,2.5vw,30px)', letterSpacing:'-.015em', marginTop:10, color:'#fff'}}>{p.title}</div>
                  <p style={{fontSize:14, color:'var(--fg-muted)', marginTop:12, lineHeight:1.65}}>{p.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <style>{`@media(max-width:760px){.sub-proj-grid{grid-template-columns:1fr !important}}`}</style>
          <div style={{marginTop:32, textAlign:'center'}}>
            <button className="btn btn-outline" onClick={()=>navigate('/projects')}>See all projects <Arrow/></button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{background:'var(--bg-primary)'}}>
        <div className="wrap">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:'clamp(32px,5vw,72px)', alignItems:'start'}} className="sub-faq-grid">
            <div>
              <Kicker>FAQ</Kicker>
              <h2 className="display" style={{fontSize:'clamp(28px,3.5vw,52px)', marginTop:14}}>
                Common questions.
              </h2>
              <p style={{color:'var(--fg-muted)', marginTop:18, lineHeight:1.7, maxWidth:380}}>
                {"Don't see yours? Call "}
                <a href="tel:9049440278" style={{color:'#fff'}}>(904) 944-0278</a>
                {" — a principal answers."}
              </p>
            </div>
            <div>
              {faqs.map(([q,a], i)=>(<FAQ key={i} q={q} a={a}/>))}
            </div>
          </div>
          <style>{`@media(max-width:860px){.sub-faq-grid{grid-template-columns:1fr !important}}`}</style>
        </div>
      </section>

      {/* CTA */}
      <section id={ctaScrollId} className="section" style={{background:'var(--bg-invert)'}}>
        <div className="wrap" style={{display:'grid', gridTemplateColumns:'1fr 1.3fr', gap:'clamp(40px,6vw,80px)', alignItems:'start'}} className="sub-cta-grid">
          <div>
            <Kicker>FREE ESTIMATE</Kicker>
            <h2 className="display" style={{fontSize:'clamp(32px,4.2vw,60px)', marginTop:16, lineHeight:.92, color:'#fff'}}>
              Get a line-item estimate in 48 hours.
            </h2>
            <p style={{marginTop:20, color:'rgba(255,255,255,.7)', lineHeight:1.7, maxWidth:400}}>
              A principal reviews every inquiry. No coordinator, no call center. Tell us the project type, size, and timeline — we'll get back to you with a real number.
            </p>
            <div style={{marginTop:28}}>
              <a href="tel:9049440278" style={{display:'block', fontFamily:'var(--display)', fontSize:28, color:'#fff', textDecoration:'none', letterSpacing:'-.01em', marginTop:24}}>(904) 944-0278</a>
              <a href="mailto:jerekaine@hotmail.com" style={{display:'block', fontSize:14, color:'rgba(255,255,255,.6)', marginTop:8, textDecoration:'none'}}>jerekaine@hotmail.com</a>
            </div>
          </div>
          <div style={{background:'var(--bg-primary)', padding:'clamp(24px,4vw,48px)', border:'1px solid rgba(255,255,255,.1)'}}>
            <FreeEstimateForm/>
          </div>
        </div>
        <style>{`@media(max-width:860px){.sub-cta-grid{grid-template-columns:1fr !important}}`}</style>
      </section>

      {children}
    </div>
  );
}

/* --------- HOSPITALS PAGE --------- */
function HospitalsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "GeneralContractor"],
        "@id": "https://www.jkprestigeconstructor.com/#organization",
        "name": "JK Prestige Constructor",
        "telephone": "+19049440278",
        "email": "jerekaine@hotmail.com",
        "url": "https://www.jkprestigeconstructor.com",
        "foundingDate": "2017",
        "address": { "@type": "PostalAddress", "addressLocality": "Jacksonville", "addressRegion": "FL", "addressCountry": "US" },
        "areaServed": { "@type": "Country", "name": "United States" }
      },
      {
        "@type": "Service",
        "name": "Hospital Construction Jacksonville FL",
        "provider": { "@id": "https://www.jkprestigeconstructor.com/#organization" },
        "serviceType": "Healthcare Facility Construction",
        "description": "Ground-up hospital construction, ambulatory surgery centers, medical office build-outs, and phased occupied-facility renovations. ICRA-trained crews, NFPA 99 compliance, GMP delivery.",
        "areaServed": { "@type": "Country", "name": "United States" },
        "url": "https://www.jkprestigeconstructor.com/expertise/hospitals"
      }
    ]
  };

  const services = [
    ["Ground-Up Hospital & Tower Programs", "JK Prestige has delivered multi-story acute-care facilities from slab to certificate of occupancy under a single GMP contract. Our preconstruction team integrates with the AOR and clinical programming team early to lock the bed count, departmental adjacencies, and MEP routing before a single shovel breaks ground — protecting the schedule from day one."],
    ["Ambulatory Surgery Centers & Outpatient Clinics", "ASC and outpatient delivery requires surgical suite classifications, medical gas manifolds, laminar-flow HVAC, and lead-lined radiology rooms — all within a compressed design-build window. JK self-performs the critical rough-ins and coordinates specialty contractors directly under our superintendent, not through a management layer."],
    ["ICRA-Compliant Phased Construction in Live Facilities", "Occupied hospital renovations require Infection Control Risk Assessment planning, negative-pressure enclosures, anteroom construction, and 24/7 dust monitoring. Our ICRA-trained superintendents have sequenced phased work inside ICUs, emergency departments, and sterile processing areas without a single patient-care disruption."],
    ["Medical Office Building & MOB Fit-Out", "From Class A shell to physician-ready interiors, JK Prestige delivers medical office buildings with the same NFPA 101 life-safety rigor as hospital work. We coordinate nurse-call rough-ins, medical gas stub-outs, and exam-room accessibility compliance under one package — and deliver a commissioning report at turnover, not a list of punch items."],
  ];

  const stats = [
    ["320K sqft", "Largest hospital delivered"],
    ["ICRA Trained", "All supers on medical projects"],
    ["NFPA 99", "Life-safety code compliance"],
    ["22 months", "Avg tower program duration"],
  ];

  const highlights = PROJECTS.filter(p => ['p1','p2'].includes(p.id));

  const faqs = [
    ["What is ICRA and why does it matter for hospital construction?", "ICRA — Infection Control Risk Assessment — is a planning and monitoring protocol required by The Joint Commission and CMS for any construction activity in or adjacent to occupied healthcare facilities. JK Prestige superintendents are ICRA-trained, meaning we build and inspect negative-pressure containment barriers, monitor particulate counts, and maintain a documented ICRA log throughout construction. Failure to comply can result in patient harm and hospital accreditation risk — we treat it as a non-negotiable."],
    ["Can JK Prestige work inside a live hospital without shutting down departments?", "Yes. We have sequenced construction inside active ICUs, OR suites, and emergency departments using phased corridor closures, swing-space fit-outs, and off-hours structural work. Every phase is coordinated with the hospital's infection control officer and facilities director before mobilization."],
    ["What contract type do you use for hospital projects?", "We prefer Guaranteed Maximum Price (GMP) with an open-book cost ledger accessible to the owner throughout construction. For design-build hospital programs we include a preconstruction services agreement that converts to GMP at design development — so you have a firm number before construction documents are complete."],
  ];

  return (
    <ExpertiseSubPage
      schemaId="jk-hospitals-schema"
      schema={schema}
      kicker="HOSPITAL CONSTRUCTION — JACKSONVILLE FL & NATIONWIDE"
      h1={<>Hospital Construction<br/>Jacksonville FL.</>}
      description="JK Prestige Constructor delivers ground-up hospital towers, ambulatory surgery centers, and phased occupied-facility renovations. ICRA-trained crews, NFPA 99 life-safety compliance, and a single GMP contract from slab to certificate of occupancy. Operating across Florida and the US since 2017."
      ctaScrollId="hospitals-cta"
      services={services}
      stats={stats}
      projectHighlights={highlights}
      faqs={faqs}
    />
  );
}

/* --------- CUSTOM HOMES PAGE --------- */
function CustomHomesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "GeneralContractor"],
        "@id": "https://www.jkprestigeconstructor.com/#organization",
        "name": "JK Prestige Constructor",
        "telephone": "+19049440278",
        "email": "jerekaine@hotmail.com",
        "url": "https://www.jkprestigeconstructor.com",
        "foundingDate": "2017",
        "address": { "@type": "PostalAddress", "addressLocality": "Jacksonville", "addressRegion": "FL", "addressCountry": "US" },
        "areaServed": { "@type": "Country", "name": "United States" }
      },
      {
        "@type": "Service",
        "name": "Custom Home Builder Jacksonville FL",
        "provider": { "@id": "https://www.jkprestigeconstructor.com/#organization" },
        "serviceType": "Custom Home Construction",
        "description": "Custom home building in Jacksonville, FL and nationwide. Principal-led process, self-perform framing and finish carpentry, one-year workmanship warranty.",
        "areaServed": { "@type": "Country", "name": "United States" },
        "url": "https://www.jkprestigeconstructor.com/expertise/homes"
      }
    ]
  };

  const services = [
    ["Architect-Integrated Design-Build", "JK Prestige works directly with your architect of record from schematic design through construction documents, sitting in on design reviews to flag constructability issues, material lead times, and budget drift before the drawings are final. For clients who do not yet have an architect, we maintain relationships with residential design firms in Jacksonville and across the US who share our commitment to finish quality."],
    ["Self-Perform Framing & Finish Carpentry", "The critical trade work — framing, drywall, finish carpentry, and trim — is performed by our own crews, not brokered out. This means the same foreman who frames the wall installs the casing and reports to a JK superintendent, not a separate sub foreman. The result is tighter tolerances, faster punch-list close-out, and one person accountable for every visible finish."],
    ["Smart Home & Systems Integration", "We coordinate audio-visual, lighting control, security, and geothermal or solar systems as part of the construction package — not as afterthoughts handed off to the homeowner post-close. Rough-in for every system is documented in our BIM model, conduit runs are future-proofed, and the commissioning walkthrough covers every device before keys are handed over."],
    ["One-Year Workmanship Warranty", "Every JK Prestige custom home ships with a signed one-year workmanship warranty document at closing — covering structural, MEP, and finish work. The warranty contact is a named principal, not a call center. Issues are logged, assigned, and closed in writing within 30 days of notification. No run-arounds."],
  ];

  const stats = [
    ["11,200 sqft", "Largest custom home delivered"],
    ["1-year", "Workmanship warranty, standard"],
    ["Self-perform", "Framing, finish carpentry & millwork"],
    ["48 hrs", "Preliminary estimate turnaround"],
  ];

  const highlights = PROJECTS.filter(p => ['p3','p4','p5'].includes(p.id));

  const faqs = [
    ["How involved is JK Prestige during the design phase?", "We join the design process as early as schematic design — before any documents are sent for pricing. We review each design milestone for constructability, identify long-lead items (windows, cabinetry, structural steel), and provide a running cost model so you are never surprised by a number at the end of design development. Our pre-construction fee is credited against the construction contract at signing."],
    ["Do you build custom homes outside Jacksonville, FL?", "Yes. We have delivered custom homes in New York, Connecticut, and North Carolina, among other states. Our project management model travels with us — a JK superintendent and named principal on every project regardless of geography. We manage local trade packages and perform critical self-perform scopes with our own crew."],
    ["What is included in the one-year workmanship warranty?", "The warranty covers defects in workmanship for all JK-performed trades: framing, drywall, finish carpentry, painting, and roofing. Manufacturer warranties on windows, appliances, mechanical equipment, and roofing materials are passed through to you at closing with documentation. Warranty claims are handled by a named JK principal — not a general inbox."],
  ];

  return (
    <ExpertiseSubPage
      schemaId="jk-homes-schema"
      schema={schema}
      kicker="CUSTOM HOME BUILDER — JACKSONVILLE FL"
      h1={<>Custom Home Builder<br/>Jacksonville FL.</>}
      description="JK Prestige Constructor builds principal-led custom homes in Jacksonville, FL and across the US. Self-perform framing and finish carpentry, architect-integrated design-build, smart home systems coordination, and a signed one-year workmanship warranty on every project. Licensed, bonded, and insured since 2017."
      ctaScrollId="homes-cta"
      services={services}
      stats={stats}
      projectHighlights={highlights}
      faqs={faqs}
    />
  );
}

/* --------- WAREHOUSES PAGE --------- */
function WarehousesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "GeneralContractor"],
        "@id": "https://www.jkprestigeconstructor.com/#organization",
        "name": "JK Prestige Constructor",
        "telephone": "+19049440278",
        "email": "jerekaine@hotmail.com",
        "url": "https://www.jkprestigeconstructor.com",
        "foundingDate": "2017",
        "address": { "@type": "PostalAddress", "addressLocality": "Jacksonville", "addressRegion": "FL", "addressCountry": "US" },
        "areaServed": { "@type": "Country", "name": "United States" }
      },
      {
        "@type": "Service",
        "name": "Warehouse Construction Jacksonville FL",
        "provider": { "@id": "https://www.jkprestigeconstructor.com/#organization" },
        "serviceType": "Industrial & Warehouse Construction",
        "description": "Tilt-up concrete warehouse and industrial facility construction. Distribution centers, cold storage, manufacturing halls, and flex industrial. Self-perform concrete and tilt-up panel erection. GMP delivery.",
        "areaServed": { "@type": "Country", "name": "United States" },
        "url": "https://www.jkprestigeconstructor.com/expertise/warehouses"
      }
    ]
  };

  const services = [
    ["Tilt-Up Concrete Construction", "JK Prestige self-performs tilt-up concrete panel design coordination, slab casting, and panel erection — the fastest and most cost-efficient structural system for distribution and manufacturing facilities above 50,000 square feet. We optimize panel thickness, embed layout, and lift sequence during preconstruction to compress the structural milestone and get the shell enclosed weeks ahead of steel-frame alternatives."],
    ["Distribution Center & Cross-Dock Design-Build", "Logistics facility design demands column-free clear spans, optimized truck court geometry, dock door counts matched to trailer volume, and floor flatness specifications tied to lift equipment. Our preconstruction team runs a logistics simulation before the site plan is finalized, locking the trailer apron, maneuvering radius, and ESFR fire suppression layout simultaneously — so the building works for operations on day one."],
    ["Cold Storage & Temperature-Controlled Facilities", "Cold storage construction adds insulated panel systems, refrigeration equipment coordination, vapor barriers, and concrete floor heating to the standard warehouse scope. JK Prestige has coordinated refrigeration system rough-ins, blast-freeze room construction, and dock leveler specifications with refrigeration engineers and food-safety consultants on occupied and new-build facilities."],
    ["Heavy-Power & Manufacturing Fit-Out", "Manufacturing facilities require 480V/3-phase power distribution, compressed air mains, process-cooling loops, and overhead crane runway design — all coordinated before the slab is poured. We integrate with the owner's equipment vendor and civil engineer during preconstruction to confirm anchor bolt locations, slab thicknesses, and utility stub-out points, eliminating field-coordination failures that blow manufacturing project schedules."],
  ];

  const stats = [
    ["480K sqft", "Largest warehouse delivered"],
    ["40 ft", "Max clear height achieved"],
    ["14 months", "PortLogix — slab to CO"],
    ["96 doors", "Dock doors on single project"],
  ];

  const highlights = PROJECTS.filter(p => ['p6','p7'].includes(p.id));

  const faqs = [
    ["What is tilt-up construction and why is it faster?", "Tilt-up is a construction method where concrete panels are cast flat on the building slab, then lifted into position with a crane. It eliminates the off-site fabrication and delivery lead time of precast panels and the multi-week erection schedule of structural steel framing. For buildings above 50,000 sqft in the Southeast, tilt-up typically saves four to eight weeks on the structural milestone and reduces material cost by 15–25% versus comparable steel systems."],
    ["Can you handle the civil and site work as well as the building?", "Yes. JK Prestige manages civil and sitework as part of the GMP — grading, underground utilities, paving, trailer court, and storm drainage are included in our scope. We have established relationships with civil engineers in Jacksonville and across Florida who work from our project templates, which reduces the coordination gap between site and building that causes most logistics facility change orders."],
    ["Do you build cold storage or food-grade facilities?", "Yes. Cold storage and food-grade facility construction require USDA/FDA finish standards, insulated metal panel systems, epoxy or resinous flooring, floor drains designed for sanitation, and specific door hardware. We coordinate with the refrigeration engineer and health department plan reviewers during preconstruction to ensure permit-ready documents and a compliant handover."],
  ];

  return (
    <ExpertiseSubPage
      schemaId="jk-warehouses-schema"
      schema={schema}
      kicker="WAREHOUSE & INDUSTRIAL CONSTRUCTION — JACKSONVILLE FL"
      h1={<>Warehouse Construction<br/>Jacksonville FL.</>}
      description="JK Prestige Constructor delivers tilt-up concrete warehouses, distribution centers, cold storage facilities, and manufacturing halls across Florida and the US. We self-perform concrete and tilt-up panel erection — compressing structural milestones and eliminating change-order risk from day one. GMP contracts, 14-month average schedule on 400K+ sqft projects."
      ctaScrollId="warehouses-cta"
      services={services}
      stats={stats}
      projectHighlights={highlights}
      faqs={faqs}
    />
  );
}

/* --------- COMMERCIAL PAGE --------- */
function CommercialPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "GeneralContractor"],
        "@id": "https://www.jkprestigeconstructor.com/#organization",
        "name": "JK Prestige Constructor",
        "telephone": "+19049440278",
        "email": "jerekaine@hotmail.com",
        "url": "https://www.jkprestigeconstructor.com",
        "foundingDate": "2017",
        "address": { "@type": "PostalAddress", "addressLocality": "Jacksonville", "addressRegion": "FL", "addressCountry": "US" },
        "areaServed": { "@type": "Country", "name": "United States" }
      },
      {
        "@type": "Service",
        "name": "Commercial Construction Jacksonville FL",
        "provider": { "@id": "https://www.jkprestigeconstructor.com/#organization" },
        "serviceType": "Commercial General Contracting",
        "description": "Ground-up retail, tenant improvement, restaurant build-out, office fit-out, and mixed-use commercial construction in Jacksonville, FL and nationwide. Single-contract delivery, weekly owner reports, lease-commencement-date accountability.",
        "areaServed": { "@type": "Country", "name": "United States" },
        "url": "https://www.jkprestigeconstructor.com/expertise/commercial"
      }
    ]
  };

  const services = [
    ["Retail Shell & Anchor Pad Construction", "Ground-up retail shells, lifestyle centers, and big-box anchor pads from permit to turnover. JK Prestige manages landlord work across multi-tenant developments, coordinating phased openings that get anchor tenants trading before full-site completion — protecting the developer's lease commencement and anchor co-tenancy clauses simultaneously."],
    ["Tenant Improvement & Interior Build-Out", "From vanilla-box white-tagging to full gut-and-rebuild tenant improvements, JK Prestige delivers on the turnover dates written into your lease. We read your lease exhibits, scope directly from the tenant improvement allowance document, and produce a punch-list-free handover that triggers your rent-free period — not a re-inspection cycle."],
    ["Restaurant & Food-Service Construction", "Restaurant construction is one of the most complex tenant improvement types — commercial kitchen MEP, Type I hood coordination, walk-in refrigeration, fire suppression, grease trap installation, and health department plan review all run concurrently. JK Prestige has a standard pre-opening restaurant package that sequences these scopes to hit the liquor license inspection window and opening night without rework."],
    ["Office Fit-Out & Corporate Interior", "Class A and creative office fit-outs, including raised-access flooring, structured cabling rough-in, full-height demountable partitions, and acoustic ceiling systems. JK manages the IT infrastructure coordination with your technology vendor, keeps the Certificate of Occupancy on the critical path, and delivers a commissioning walkthrough covering every system before your staff moves in."],
  ];

  const stats = [
    ["$500K–$50M", "Commercial project range"],
    ["52K sqft", "Largest retail center delivered"],
    ["8 tenants", "Multi-tenant phased delivery"],
    ["48 hrs", "Prelim estimate from documents"],
  ];

  const highlights = PROJECTS.filter(p => ['p8','p9'].includes(p.id));

  const faqs = [
    ["How do you protect our lease commencement date?", "We schedule backward from the lease commencement date on day one of preconstruction. Long-lead items — storefront systems, specialty flooring, kitchen equipment — are identified and ordered in the preconstruction phase, before the building permit is issued. We maintain a weekly look-ahead schedule and flag every constraint before it hits the critical path, not after."],
    ["Can you handle multi-tenant projects where tenants have different architects?", "Yes. Multi-tenant commercial projects are a core competency for JK Prestige. We maintain a landlord work scope and coordinate each tenant's architect and their TI scope under a single master schedule. We run weekly coordination meetings with each tenant's team and document every interface decision — protecting the landlord from change-order exposure caused by tenant scope conflicts."],
    ["Do you build outside Jacksonville, FL?", "Yes. JK Prestige operates nationally. We have delivered commercial projects in Florida, Illinois, Texas, and the Northeast. Our project management model — weekly owner reporting, principal accountability, GMP contracts — travels with us. We source local trade partners through our established subcontractor network and vet them against our standard safety and quality requirements."],
  ];

  return (
    <ExpertiseSubPage
      schemaId="jk-commercial-schema"
      schema={schema}
      kicker="COMMERCIAL CONSTRUCTION — JACKSONVILLE FL"
      h1={<>Commercial Construction<br/>Jacksonville FL.</>}
      description="JK Prestige Constructor delivers retail shell construction, tenant improvements, restaurant build-outs, and corporate office fit-outs across Jacksonville, FL and the US. Single GMP contract, weekly owner reports, and a named principal accountable to your lease commencement date. Projects from $500K to $50M."
      ctaScrollId="commercial-cta"
      services={services}
      stats={stats}
      projectHighlights={highlights}
      faqs={faqs}
    />
  );
}

/* --------- RENOVATIONS PAGE --------- */
function RenovationsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "GeneralContractor"],
        "@id": "https://www.jkprestigeconstructor.com/#organization",
        "name": "JK Prestige Constructor",
        "telephone": "+19049440278",
        "email": "jerekaine@hotmail.com",
        "url": "https://www.jkprestigeconstructor.com",
        "foundingDate": "2017",
        "address": { "@type": "PostalAddress", "addressLocality": "Jacksonville", "addressRegion": "FL", "addressCountry": "US" },
        "areaServed": { "@type": "Country", "name": "United States" }
      },
      {
        "@type": "Service",
        "name": "Renovation Contractor Jacksonville FL",
        "provider": { "@id": "https://www.jkprestigeconstructor.com/#organization" },
        "serviceType": "Renovation & Remodeling Contractor",
        "description": "Whole-home renovations, kitchen and bath remodels, historic restorations, and occupied-building phased construction in Jacksonville, FL and nationwide. Pre-demo documentation, licensed principal accountability, single mobilization.",
        "areaServed": { "@type": "Country", "name": "United States" },
        "url": "https://www.jkprestigeconstructor.com/expertise/renovations"
      }
    ]
  };

  const services = [
    ["Whole-Home Gut Renovation", "A full gut renovation — where every surface, system, and structural element is addressed in a single mobilization — is the most efficient way to modernize a home and reset its systems life cycle. JK Prestige pre-documents every wall cavity before demo begins, coordinates the permit package for structural, electrical, and plumbing simultaneously, and sequences the work so the home is water-tight and mechanically complete before finish trades begin. One contract. One schedule. One principal."],
    ["Kitchen & Bath Renovation", "Kitchen and bath renovations live and die on subcontractor coordination. JK Prestige self-performs the rough carpentry and finish millwork and manages the plumber, electrician, tile setter, and appliance installer as a sequenced package — not individual subs you have to chase. We produce a cabinet and fixture shop drawing review before a single item ships, so field conflicts are resolved on paper, not in your kitchen."],
    ["Historic Restoration & Adaptive Reuse", "Historic renovation adds a layer of regulatory complexity — SHPO review, Secretary of the Interior's Standards compliance, existing material documentation, and mortar analysis for masonry repointing. JK Prestige has navigated historic-district requirements in Boston and New York, delivering gut-renovated interiors within fully preserved facades without a single historic-district variance denial."],
    ["Occupied-Building Phased Construction", "When the building cannot go dark during renovation — whether a commercial tenant, multi-family building, or occupied residence — construction must be sequenced in phases around the occupants' schedule. JK Prestige produces a phasing plan before mobilization, including temporary partitions, dust containment barriers, utility swing connections, and a room-by-room completion sequence that minimizes disruption while maintaining a buildable critical path."],
  ];

  const stats = [
    ["5,600 sqft", "Largest whole-home remodel"],
    ["7 months", "Avg occupied renovation duration"],
    ["1 permit", "Single mobilization, one package"],
    ["SHPO", "Historic-district compliant experience"],
  ];

  const highlights = PROJECTS.filter(p => ['p10','p11'].includes(p.id));

  const faqs = [
    ["How do you price a whole-home renovation before walls are open?", "We start with an allowance-based preliminary budget based on the visible scope and finish level — then we build in a pre-construction line item for selective demolition and an investigative scope to open targeted walls and assess MEP condition before the full contract is signed. This eliminates the most common renovation surprise: unknown conditions discovered mid-project. You have a firm number before the majority of work begins."],
    ["Can we live in the house during renovation?", "In most cases, yes — with conditions. JK Prestige specializes in occupied-building phasing, which means we isolate active work areas with HEPA-filtered dust barriers, maintain one functioning bathroom and kitchen at all times during the sequence, and schedule noisy or disruptive work (demo, structural) during agreed daytime hours. The phasing plan is presented to you before mobilization and updated weekly."],
    ["Do you handle asbestos and lead abatement?", "We conduct a pre-demo hazardous material assessment on all renovation projects built before 1980. If asbestos-containing materials or lead paint are identified, we engage a licensed abatement contractor — coordinated under our permit and schedule — before any demolition begins. All abatement work is documented with clearance reports provided to the owner at project close."],
  ];

  return (
    <ExpertiseSubPage
      schemaId="jk-renovations-schema"
      schema={schema}
      kicker="RENOVATION CONTRACTOR — JACKSONVILLE FL"
      h1={<>Renovation Contractor<br/>Jacksonville FL.</>}
      description="JK Prestige Constructor has been Jacksonville's renovation contractor since 2017 — whole-home gut renovations, kitchen and bath remodels, historic restorations, and occupied-building phased construction. Pre-demo documentation, hazardous material assessment, and a licensed principal accountable from the first site walk through the final punch list."
      ctaScrollId="renovations-cta"
      services={services}
      stats={stats}
      projectHighlights={highlights}
      faqs={faqs}
    />
  );
}

Object.assign(window, { AboutPage, ExpertisePage, RoofingPage, ProjectsPage, ContactPage, NewsroomPage, CareersPage, JKWayPage, TermsPage, PrivacyPage, PROJECTS, HospitalsPage, CustomHomesPage, WarehousesPage, CommercialPage, RenovationsPage });
