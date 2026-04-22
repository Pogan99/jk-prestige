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
    {y:'2000', t:'Founded as a 3-person residential crew on Long Island.'},
    {y:'2005', t:'First commercial tenant improvement. Self-perform drywall begins.'},
    {y:'2010', t:'Licensed in 5 states. Roofing division formally launches.'},
    {y:'2015', t:'First ground-up medical facility delivered on schedule.'},
    {y:'2019', t:'Cross 250 projects. VDC and lean delivery playbook codified.'},
    {y:'2023', t:'Hospital tower program. Subcontracting packet opened to fellow GCs.'},
    {y:'2025', t:'25 years. 500+ projects. Licensed in 15 states and counting.'},
  ];
  return (
    <PageShell kicker="ABOUT JK PRESTIGE" title={<>A family business,<br/>built to last.</>} sub="Started in 2000 with a truck, two framers, and a handshake. Twenty-five years later, still family-operated — still on the jobsite.">
      <section className="section" style={{background:'var(--bg-primary)'}}>
        <div className="wrap" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(32px,5vw,72px)'}}>
          <div>
            <Placeholder slug="about-founders-jobsite-4x3" w={1200} h={900} tag="FOUNDERS ON JOBSITE"/>
          </div>
          <div>
            <span className="mono" style={{color:'var(--accent)'}}>// OUR STORY</span>
            <h2 className="display" style={{fontSize:'clamp(32px,4vw,54px)', marginTop:16}}>Built the way we'd want our own homes built.</h2>
            <div style={{color:'var(--fg-muted)', fontSize:16, lineHeight:1.7, marginTop:20, display:'grid', gap:16}}>
              <p>JK Prestige was founded in 2000 around a simple promise: show up, do the work right, and stand behind it. A quarter-century later, that's still the whole playbook.</p>
              <p>We self-perform the critical trades, vet and manage every specialty sub, and run a single contract so you have one principal responsible for the outcome — not a carousel of companies pointing at each other.</p>
              <p>We've grown from one crew into a licensed, bonded and insured multi-state operation delivering hospitals, homes, warehouses, and everything in between.</p>
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
          <h2 className="display" style={{fontSize:'clamp(36px,5vw,72px)', color:'#fff', marginTop:14}}>2000 → today.</h2>
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
function ExpertisePage() {
  return (
    <PageShell kicker="EXPERTISE" title={<>Ground-up or gut-reno.<br/>Hospitals to homes.</>} sub="Six disciplines under one roof, delivered by a principal-led team with self-perform trades and a vetted sub network.">
      <section className="section" style={{background:'var(--bg-primary)'}}>
        <div className="wrap">
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'var(--hairline)'}} className="exp-grid">
            {EXPERTISE.map((it,i)=>(
              <Reveal key={it.id} delay={i*60}>
                <ExpertiseCard item={it}/>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{background:'var(--bg-elev)'}}>
        <div className="wrap">
          <Kicker>OUR PROCESS</Kicker>
          <h2 className="display" style={{fontSize:'clamp(36px,5vw,72px)', marginTop:14, color:'#fff'}}>Four steps. Every project.</h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, background:'rgba(0,0,0,.3)', marginTop:40}} className="proc-grid">
            {[
              ['01','SCOPE & PRICE','Site walk, scope doc, line-item pricing in 48 hours.'],
              ['02','PRECONSTRUCTION','VDC model, permits, schedule, long-lead items.'],
              ['03','BUILD','Self-perform critical trades; supervise every sub daily.'],
              ['04','CLOSE OUT','Punch list, warranty, handover — one guarantee.']
            ].map(([n,t,d],i)=>(
              <div key={n} style={{background:'var(--bg-elev)', padding:'32px 24px', minHeight:240}}>
                <div style={{fontFamily:'var(--display)', fontSize:64, letterSpacing:'-.03em', color:'var(--accent)', lineHeight:.9}}>{n}</div>
                <div className="mono" style={{color:'#fff', marginTop:16}}>{t}</div>
                <div style={{fontSize:14, color:'rgba(255,255,255,.85)', marginTop:10}}>{d}</div>
              </div>
            ))}
          </div>
          <style>{`@media(max-width:900px){.proc-grid{grid-template-columns:repeat(2,1fr) !important}}`}</style>
        </div>
      </section>
    </PageShell>
  );
}

/* ---------- ROOFING ---------- */
function RoofingPage() {
  const { navigate } = useApp();
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
            <button className="btn btn-primary">Book a free inspection <Arrow/></button>
            <a href="tel:18005576637" className="btn btn-outline">Emergency hotline: 1-800-JK-ROOFS</a>
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
            <p style={{color:'var(--fg-muted)', marginTop:18, maxWidth:420}}>Need something specific? Call our hotline or submit a free inspection request.</p>
          </div>
          <div>
            {[
              ['How fast can you tarp an emergency leak?','Within 24 hours, 7 days a week, across every state we operate.'],
              ['Do you bill insurance directly?','Yes — our storm team coordinates directly with adjusters.'],
              ['How long does a full tear-off and re-roof take?','Typical single-family: 1–3 days. Commercial flat: days to weeks depending on system.'],
              ['What warranty do I get?','Manufacturer warranty plus JK Prestige\'s workmanship guarantee — one signed document.'],
            ].map(([q,a],i)=> <FAQ key={i} q={q} a={a}/>)}
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
  {id:'p1', title:'Meridian Medical Tower', cat:'Hospital', state:'NC', year:2025, size:'320,000 sqft', slug:'proj-meridian-medical-16x9'},
  {id:'p2', title:'Cedar Ridge Pediatric Center', cat:'Hospital', state:'VA', year:2024, size:'64,000 sqft', slug:'proj-cedar-pediatric-16x9'},
  {id:'p3', title:'Hollowbrook Estate', cat:'Custom Home', state:'NY', year:2024, size:'11,200 sqft', slug:'proj-hollowbrook-16x9'},
  {id:'p4', title:'Silvergrove Residence', cat:'Custom Home', state:'CT', year:2023, size:'8,400 sqft', slug:'proj-silvergrove-16x9'},
  {id:'p5', title:'Oak Hill Farmhouse', cat:'Custom Home', state:'NC', year:2025, size:'6,900 sqft', slug:'proj-oakhill-16x9'},
  {id:'p6', title:'PortLogix Distribution Center', cat:'Warehouse', state:'TX', year:2024, size:'480,000 sqft', slug:'proj-portlogix-16x9'},
  {id:'p7', title:'Northbeam Industrial Campus', cat:'Warehouse', state:'PA', year:2023, size:'275,000 sqft', slug:'proj-northbeam-16x9'},
  {id:'p8', title:'Promenade Retail Row', cat:'Commercial', state:'FL', year:2025, size:'52,000 sqft', slug:'proj-promenade-16x9'},
  {id:'p9', title:'Ironworks Kitchen & Taproom', cat:'Commercial', state:'IL', year:2024, size:'9,200 sqft', slug:'proj-ironworks-16x9'},
  {id:'p10', title:'Harbor Street Historic Renovation', cat:'Renovation', state:'MA', year:2024, size:'4,800 sqft', slug:'proj-harbor-reno-16x9'},
  {id:'p11', title:'Linden Grove Whole-House Remodel', cat:'Renovation', state:'NY', year:2025, size:'5,600 sqft', slug:'proj-linden-reno-16x9'},
  {id:'p12', title:'Parkside Roofing Program', cat:'Roofing', state:'NJ', year:2025, size:'44 roofs', slug:'proj-parkside-roofing-16x9'},
];

function ProjectsPage() {
  const [filters, setFilters] = useState({cat:[], state:[], year:[]});
  const [drawer, setDrawer] = useState(false);
  const [active, setActive] = useState(null);

  const toggle = (k, v)=> setFilters(f=>({...f, [k]: f[k].includes(v) ? f[k].filter(x=>x!==v) : [...f[k], v]}));
  const filtered = PROJECTS.filter(p=>
    (filters.cat.length===0 || filters.cat.includes(p.cat)) &&
    (filters.state.length===0 || filters.state.includes(p.state)) &&
    (filters.year.length===0 || filters.year.includes(p.year))
  );
  const cats = [...new Set(PROJECTS.map(p=>p.cat))];
  const states = [...new Set(PROJECTS.map(p=>p.state))].sort();
  const years = [...new Set(PROJECTS.map(p=>p.year))].sort((a,b)=>b-a);

  return (
    <PageShell kicker="PROJECTS" title={<>Twenty-five years.<br/>500+ projects delivered.</>} sub="Filter by type, state, or year. Click a tile for the case study.">
      <section className="section" style={{background:'var(--bg-primary)'}}>
        <div className="wrap">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, flexWrap:'wrap', gap:16}}>
            <div className="mono" style={{color:'var(--fg-muted)'}}>{filtered.length} PROJECTS SHOWN</div>
            <button onClick={()=>setDrawer(true)} className="btn btn-outline">Filter <Arrow/></button>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24}} className="proj-grid">
            {filtered.map((p,i)=>(
              <Reveal key={p.id} delay={(i%6)*50}>
                <a href="#" onClick={(e)=>{e.preventDefault(); setActive(p);}} style={{display:'block'}}>
                  <Placeholder slug={p.slug} w={1200} h={700} tag="PROJECT"/>
                  <div style={{padding:'16px 0'}}>
                    <div className="mono" style={{color:'var(--accent)'}}>// {p.cat.toUpperCase()} · {p.state} · {p.year}</div>
                    <div style={{fontFamily:'var(--display)', fontSize:22, letterSpacing:'-.015em', marginTop:8}}>{p.title}</div>
                    <div style={{fontSize:13, color:'var(--fg-dim)', marginTop:4}}>{p.size}</div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <style>{`@media(max-width:900px){.proj-grid{grid-template-columns:1fr !important}}`}</style>
        </div>
      </section>

      {/* Filter drawer */}
      {drawer && (
        <div onClick={()=>setDrawer(false)} style={{position:'fixed', inset:0, background:'rgba(0,0,0,.6)', zIndex:80, display:'flex', justifyContent:'flex-end'}}>
          <div onClick={e=>e.stopPropagation()} style={{width:'min(420px, 92vw)', background:'var(--bg-primary)', height:'100%', borderLeft:'1px solid var(--hairline)', padding:32, overflow:'auto'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24}}>
              <Kicker>FILTERS</Kicker>
              <button onClick={()=>setDrawer(false)} style={{color:'#fff', fontSize:24}}>×</button>
            </div>
            <FilterGroup title="Type" items={cats} on={filters.cat} onToggle={v=>toggle('cat',v)}/>
            <FilterGroup title="State" items={states} on={filters.state} onToggle={v=>toggle('state',v)}/>
            <FilterGroup title="Year" items={years} on={filters.year} onToggle={v=>toggle('year',v)}/>
            <button className="btn btn-primary" onClick={()=>{setFilters({cat:[],state:[],year:[]});}} style={{marginTop:24}}>Clear all</button>
          </div>
        </div>
      )}

      {/* Case study modal */}
      {active && <CaseStudy project={active} onClose={()=>setActive(null)}/>}
    </PageShell>
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
function CaseStudy({project, onClose}){
  const [slider, setSlider] = useState(50);
  const isReno = project.cat==='Renovation';
  return (
    <div style={{position:'fixed', inset:0, background:'var(--bg-primary)', zIndex:90, overflow:'auto'}}>
      <div style={{position:'sticky', top:0, background:'var(--bg-primary)', borderBottom:'1px solid var(--hairline)', padding:'20px clamp(20px,4vw,48px)', display:'flex', justifyContent:'space-between', alignItems:'center', zIndex:2}}>
        <div className="mono" style={{color:'var(--accent)'}}>// CASE STUDY</div>
        <button onClick={onClose} className="btn btn-outline">Close ×</button>
      </div>
      <div style={{padding:'clamp(40px,6vw,80px) clamp(20px,4vw,48px)'}}>
        <Kicker>{project.cat.toUpperCase()} · {project.state} · {project.year}</Kicker>
        <h1 className="display" style={{fontSize:'clamp(40px,6vw,88px)', marginTop:16}}>{project.title}</h1>
        <div style={{marginTop:40}}>
          {isReno ? (
            <div style={{position:'relative', aspectRatio:'16/9', overflow:'hidden', border:'1px solid var(--hairline)'}}
              onMouseMove={e=>{
                const r = e.currentTarget.getBoundingClientRect();
                setSlider(((e.clientX - r.left)/r.width)*100);
              }}>
              <div style={{position:'absolute', inset:0}}>
                <Placeholder slug={project.slug+'-after'} w={1600} h={900} tag="AFTER"/>
              </div>
              <div style={{position:'absolute', inset:0, width:slider+'%', overflow:'hidden', borderRight:'2px solid var(--accent-hot)'}}>
                <div style={{width:`${100/(slider/100)}%`, height:'100%'}}>
                  <Placeholder slug={project.slug+'-before'} w={1600} h={900} tag="BEFORE"/>
                </div>
              </div>
              <div style={{position:'absolute', left:slider+'%', top:0, bottom:0, width:2, background:'var(--accent-hot)', transform:'translateX(-50%)', pointerEvents:'none'}}>
                <div style={{position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', width:48, height:48, background:'var(--accent-hot)', borderRadius:'50%', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--mono)', fontSize:10}}>↔</div>
              </div>
              <div style={{position:'absolute', left:16, top:16}} className="mono"><span style={{background:'rgba(0,0,0,.6)', padding:'6px 10px', color:'#fff'}}>BEFORE</span></div>
              <div style={{position:'absolute', right:16, top:16}} className="mono"><span style={{background:'rgba(0,0,0,.6)', padding:'6px 10px', color:'#fff'}}>AFTER</span></div>
            </div>
          ) : (
            <Placeholder slug={project.slug} w={1600} h={900} tag="HERO"/>
          )}
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(32px,5vw,72px)', marginTop:48}}>
          <div>
            <Kicker>SCOPE</Kicker>
            <p style={{marginTop:14, color:'var(--fg-muted)', fontSize:16, lineHeight:1.7}}>Ground-up delivery with full self-perform of critical trades. Turnkey scope: preconstruction, permits, site, shell, MEP, finishes, and commissioning. One contract, one schedule, one guarantee.</p>
          </div>
          <div>
            <Kicker>KEY STATS</Kicker>
            <div style={{marginTop:14, display:'grid', gap:10}}>
              <StatRow k="Size" v={project.size}/>
              <StatRow k="Duration" v="18 months"/>
              <StatRow k="Budget range" v="$24M – $32M"/>
              <StatRow k="Self-performed" v="Concrete · Framing · Drywall · Finish"/>
              <StatRow k="Delivery" v="On schedule · Under GMP"/>
            </div>
          </div>
        </div>
        <div style={{marginTop:48, padding:32, background:'var(--bg-invert)'}}>
          <div className="mono" style={{color:'rgba(255,255,255,.85)'}}>// CLIENT</div>
          <p style={{fontFamily:'var(--display)', fontSize:'clamp(22px,2.6vw,34px)', letterSpacing:'-.015em', lineHeight:1.2, marginTop:14, color:'#fff'}}>
            "They ran the job like it was their own money. We signed one contract and got one answer every time we picked up the phone."
          </p>
        </div>
      </div>
    </div>
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
  return (
    <PageShell kicker="CONTACT" title={<>Tell us what<br/>you're building.</>} sub="Free 48-hour estimate. Talk to a principal — not a call center.">
      <section className="section" style={{background:'var(--bg-primary)'}}>
        <div className="wrap" style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:'clamp(32px,5vw,72px)'}}>
          <div>
            <FreeEstimateForm/>
          </div>
          <div style={{display:'grid', gap:20, alignContent:'start'}}>
            <div style={{border:'1px solid var(--hairline)', padding:28}}>
              <div className="mono" style={{color:'var(--accent)'}}>// HEADQUARTERS</div>
              <div style={{fontFamily:'var(--display)', fontSize:22, marginTop:10}}>Long Island, NY</div>
              <div style={{fontSize:14, color:'var(--fg-muted)', marginTop:8, lineHeight:1.6}}>2400 Industrial Blvd, Suite 300<br/>Melville, NY 11747</div>
              <div style={{fontSize:14, color:'#fff', marginTop:14}}>M–F · 7:00a–6:00p</div>
            </div>
            <div style={{border:'1px solid var(--hairline)', padding:28}}>
              <div className="mono" style={{color:'var(--accent-hot)'}}>// 24/7 EMERGENCY</div>
              <div style={{fontFamily:'var(--display)', fontSize:22, marginTop:10}}>Roofing hotline</div>
              <a href="tel:18005576637" style={{fontSize:18, color:'#fff', marginTop:12, display:'block'}}>1-800-JK-ROOFS</a>
            </div>
            <Placeholder slug="contact-map-embed-16x9" w={800} h={500} tag="MAP EMBED"/>
          </div>
        </div>
      </section>
      <section className="section" style={{background:'var(--bg-elev)'}}>
        <div className="wrap">
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24}} className="cards-grid">
            {[
              ['HOMEOWNER?','Start here — full home builds, remodels, roofs.','/expertise'],
              ['DEVELOPER OR GC?','Start here — ground-up, trade partner, subcontracting.','/expertise'],
              ['NEED ROOFING NOW?','Call 1-800-JK-ROOFS, 24/7 emergency response.','/roofing'],
            ].map(([k,d,r],i)=>(
              <Reveal key={k} delay={i*80} style={{background:'var(--bg-primary)', padding:32, border:'1px solid rgba(255,255,255,.1)'}}>
                <div className="mono" style={{color:'var(--accent)'}}>// {k}</div>
                <div style={{fontFamily:'var(--display)', fontSize:22, marginTop:14, color:'#fff'}}>{d}</div>
                <div style={{marginTop:20, color:'var(--accent)'}} className="mono">LEARN MORE →</div>
              </Reveal>
            ))}
          </div>
          <style>{`@media(max-width:900px){.cards-grid{grid-template-columns:1fr !important}}`}</style>
        </div>
      </section>
    </PageShell>
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
  const pillars = [
    ['LEAD WITH SAFETY','Zero-compromise jobsites. Daily toolbox talks, OSHA 30 across leadership, and an incident rate a third of industry average.'],
    ['CUSTOMER ADVOCACY','A principal on every project. Owner-first communication from first reply through year-one warranty.'],
    ['LEAN DELIVERY','Pull planning, last-planner scheduling, and waste-free sequencing that shaves weeks off typical timelines.'],
    ['VDC TECHNOLOGY','Virtual Design & Construction — clash detection, 4D schedule, and model-to-field workflows on every ground-up build.'],
  ];
  return (
    <PageShell kicker="THE JK WAY" title={<>The operating system<br/>behind the guarantee.</>} sub="Four pillars. One outcome: hospitals and homes that show up on time, on budget, and on standard.">
      <section className="section" style={{background:'var(--bg-primary)'}}>
        <div className="wrap" style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:32}} className="pillars">
          {pillars.map(([k,d],i)=>(
            <Reveal key={k} delay={i*80} style={{border:'1px solid var(--hairline)', padding:'36px', minHeight:260}}>
              <div style={{fontFamily:'var(--display)', fontSize:56, color:'var(--accent)', letterSpacing:'-.025em'}}>0{i+1}</div>
              <div className="mono" style={{color:'#fff', marginTop:16}}>{k}</div>
              <p style={{color:'var(--fg-muted)', marginTop:14, lineHeight:1.65}}>{d}</p>
            </Reveal>
          ))}
          <style>{`@media(max-width:900px){.pillars{grid-template-columns:1fr !important}}`}</style>
        </div>
      </section>
    </PageShell>
  );
}

Object.assign(window, { AboutPage, ExpertisePage, RoofingPage, ProjectsPage, ContactPage, NewsroomPage, CareersPage, JKWayPage, PROJECTS });
