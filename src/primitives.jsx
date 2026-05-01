const { useState, useEffect, useRef, useMemo, useLayoutEffect, createContext, useContext } = React;

/* =========================================================
   Global styles injected once — avoids repetition in every file
   ========================================================= */
(function injectGlobalCSS(){
  if (document.getElementById('jk-global-css')) return;
  const css = document.createElement('style');
  css.id = 'jk-global-css';
  css.textContent = `
    .mono{font-family:var(--mono);font-weight:500;font-size:12px;letter-spacing:.15em;text-transform:uppercase}
    .display{font-family:var(--display);letter-spacing:-.025em;text-transform:uppercase;line-height:.9;font-weight:900}
    .hairline{background:var(--hairline);height:1px;width:100%}
    .v-hairline{background:var(--hairline);width:1px;height:100%}

    .kicker{color:var(--accent);font-family:var(--mono);font-weight:600;font-size:12px;letter-spacing:.2em;text-transform:uppercase;display:inline-block}
    .kicker::before{content:'// '}

    .btn{display:inline-flex;align-items:center;gap:.7em;padding:calc(18px * var(--density)) 26px;font-family:var(--mono);font-weight:600;font-size:12px;letter-spacing:.2em;text-transform:uppercase;transition:all .2s ease;cursor:pointer;border:1px solid transparent;white-space:nowrap}
    .btn-primary{background:var(--accent-hot);color:#fff}
    .btn-primary:hover{background:#8f081f}
    .btn-outline{border-color:var(--accent);color:#fff}
    .btn-outline:hover{background:var(--accent);color:#fff}
    .btn-ghost{color:#fff;border-color:rgba(255,255,255,.25)}
    .btn-ghost:hover{border-color:#fff}

    /* Placeholder boxes per spec */
    .ph{position:relative;background:var(--bg-primary);border:1px dashed var(--accent);overflow:hidden;display:flex;align-items:center;justify-content:center}
    .ph::before{
      content:'';position:absolute;inset:0;
      background-image:linear-gradient(45deg, rgba(82,111,174,.06) 25%, transparent 25%, transparent 50%, rgba(82,111,174,.06) 50%, rgba(82,111,174,.06) 75%, transparent 75%);
      background-size:16px 16px;
    }
    .ph-label{position:relative;z-index:1;font-family:var(--mono);font-size:10px;letter-spacing:.18em;color:var(--accent);text-transform:uppercase;text-align:center;padding:14px 18px;max-width:90%;line-height:1.55}
    .ph-label .tag{display:block;color:var(--fg-dim);font-size:9px;margin-top:6px}

    /* Reveal on view */
    .reveal{opacity:0;transform:translateY(20px);transition:opacity .6s ease, transform .6s cubic-bezier(.2,.7,.2,1)}
    .reveal.in{opacity:1;transform:none}

    /* utility */
    .wrap{max-width:1440px;margin:0 auto;padding:0 clamp(20px,4vw,64px)}
    .section{padding:calc(96px * var(--density)) 0}
    .section-tight{padding:calc(56px * var(--density)) 0}

    /* Hero letter wipe */
    @keyframes jk-wipe {
      0%{clip-path:inset(0 100% 0 0)}
      100%{clip-path:inset(0 0 0 0)}
    }
    .wipe-line{display:block;position:relative;color:#fff;clip-path:inset(0 100% 0 0);animation:jk-wipe .65s cubic-bezier(.2,.8,.2,1) forwards}
    .wipe-line.l2{animation-delay:.15s}
    .wipe-line.l3{animation-delay:.3s}

    /* ring pulse for map pin */
    @keyframes pinPulse {
      0%{transform:scale(1);opacity:.9}
      70%{transform:scale(2.6);opacity:0}
      100%{transform:scale(2.6);opacity:0}
    }
    @keyframes pinDrop {
      0%{transform:translateY(-24px);opacity:0}
      100%{transform:translateY(0);opacity:1}
    }

    /* mega menu */
    .mega{position:absolute;left:0;right:0;top:100%;background:var(--accent);color:#fff;overflow:hidden;max-height:0;transition:max-height .28s ease, opacity .28s ease;opacity:0;pointer-events:none}
    .mega.open{max-height:520px;opacity:1;pointer-events:auto}

    /* page transitions */
    @keyframes pageEnter {
      0%{clip-path:inset(0 0 0 100%)}
      100%{clip-path:inset(0 0 0 0)}
    }
    .page-enter{animation:pageEnter .5s cubic-bezier(.7,0,.3,1) forwards}

    /* checkbox */
    .cbx{width:16px;height:16px;border:1px solid var(--fg-muted);background:transparent;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}
    .cbx.on{background:var(--accent);border-color:var(--accent)}

    /* Form */
    input.jk-input, select.jk-input, textarea.jk-input {
      width:100%;background:rgba(255,255,255,.04);border:1px solid var(--hairline);color:#fff;padding:14px 16px;font-family:var(--body);font-size:14px;border-radius:2px;outline:none;transition:border .2s
    }
    input.jk-input:focus, select.jk-input:focus, textarea.jk-input:focus{border-color:var(--accent)}
    .jk-input::placeholder{color:var(--fg-dim)}
    .field-label{font-family:var(--mono);font-size:10px;letter-spacing:.2em;color:var(--fg-muted);text-transform:uppercase;margin-bottom:8px;display:block}

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      *{animation-duration:.001s !important;transition-duration:.001s !important}
    }
    .reduce-motion *{animation-duration:.001s !important;transition-duration:.001s !important}

    /* ============ MOBILE ============ */
    @media (max-width: 720px) {
      .wrap{padding:0 18px}
      .section{padding:56px 0}
      .section-tight{padding:36px 0}
      .btn{padding:13px 18px;font-size:11px;letter-spacing:.16em}
      .kicker{font-size:10px;letter-spacing:.18em}
      .mono{font-size:10px}

      /* Roofing ribbon stacks vertically */
      .jk-roof-grid{grid-template-columns:1fr !important;gap:14px !important;padding:18px !important}
      .jk-roof-list{font-size:13px !important;gap:10px !important}
      .jk-roof-cta{justify-self:start}

      /* Footer: full-width single column */
      .jk-footer-top{grid-template-columns:1fr !important}
      .jk-footer-main{grid-template-columns:1fr !important}
      .jk-footer-cols{grid-template-columns:1fr 1fr !important;gap:24px !important}
      .jk-footer-contact{align-items:flex-start !important}

      /* Form 2-col → 1-col */
      .jk-form-row{grid-template-columns:1fr !important}

      /* Generic grids */
      .jk-grid-3,.jk-grid-2,.jk-grid-4{grid-template-columns:1fr !important}

      h1,h2,h3{word-break:break-word}
    }
    @media (max-width: 480px) {
      .wrap{padding:0 14px}
      .btn{padding:12px 14px;font-size:10.5px}
    }
  `;
  document.head.appendChild(css);
})();

/* =========================================================
   Theme / App Context
   ========================================================= */
const AppCtx = createContext(null);
function useApp(){ return useContext(AppCtx); }

/* =========================================================
   Kicker
   ========================================================= */
function Kicker({ children, className='', style }) {
  return <span className={"kicker "+className} style={style}>{children}</span>;
}

/* =========================================================
   Placeholder — brand-spec compliant
   ========================================================= */
const JK_ASSET_MAP = {
  'expertise-custom-home-4x3':   'assets/images/hf_20260422_074618_3c7e330a-766a-4edb-ac46-c312d4678c02.png',
  'expertise-medical-4x3':       'assets/images/hf_20260422_074637_b2e0630e-99f9-4eef-a8b1-5be0a42b4ac4.png',
  'stat-tile-48hrs':             'assets/images/hf_20260422_074644_b83b6bfb-414c-44d8-a330-f29822e7876f.png',
  'stat-tile-licensed':          'assets/images/hf_20260422_074649_e959b41c-c6ac-429c-b4aa-94c855bfaeff.png',
  'stat-tile-500-projects':      'assets/images/hf_20260422_074659_f11cd3e6-2c7d-426a-89d3-f05d2dded4ad.png',
  'expertise-renovation-4x3':    'assets/images/hf_20260422_074745_2f8c1856-7dc3-4e57-8464-5c91d76f2353.png',
  'expertise-roofing-4x3':       'assets/images/hf_20260422_074751_429e0c7d-115e-45ec-a295-1d2e6a6cd643.png',
  'expertise-warehouse-4x3':     'assets/images/hf_20260422_074757_84eb700d-7200-4c76-82f0-04a6fa0dd744.png',
  'news-meridian-topping-16x9':  'assets/images/hf_20260422_074803_534a61f3-bedb-4292-bbf9-ff8a891eaa96.png',
  'testimonial-homeowner':       'assets/images/hf_20260422_074841_8f7047c1-3a8f-4111-b467-f875c1ee3535.png',
  'testimonial-developer':       'assets/images/hf_20260422_074848_24ddd171-35c1-4083-af5b-408c336f235e.png',
  'testimonial-gc-partner':      'assets/images/hf_20260422_074854_2fc8c351-68f0-4310-825c-fd7910f41853.png',
  'leadership-row':              'assets/images/hf_20260422_074902_d3ce2069-8022-4129-a2fb-c2298a4c18f2.png',
  'news-homeowner-questions-16x9':'assets/images/hf_20260422_074914_c26bc416-1f91-4c7d-a222-0e150f34343d.png',
  'expertise-commercial-4x3':    'assets/images/hf_20260422_074925_07b9ea0d-f6c2-4d7e-b9b5-f8f77eb67595.png',
  'news-500-projects-16x9':      'assets/images/hf_20260422_074936_ee416caf-3cc2-41e4-a84e-833005b7bf6c.png',
  'hero-poster':                 'assets/images/hf_20260422_074803_534a61f3-bedb-4292-bbf9-ff8a891eaa96.png',
};

function Placeholder({ slug, w, h, duration, ratio, tag='JK PRESTIGE ASSET', style, className='' }) {
  const aspect = ratio || (w && h ? `${w}/${h}` : '16/9');
  const src = JK_ASSET_MAP[slug];
  if (src) {
    return (
      <div className={className} style={{aspectRatio:aspect, width:'100%', overflow:'hidden', background:'var(--bg-primary)', ...style}}>
        <img src={src} alt={slug} loading="lazy"
             style={{width:'100%', height:'100%', objectFit:'cover', display:'block',
                     filter:'saturate(.88) contrast(1.02)'}}/>
      </div>
    );
  }
  return (
    <div className={"ph "+className} style={{aspectRatio:aspect, width:'100%', ...style}}>
      <div className="ph-label">
        [ {slug}<br/>
        <span className="tag">{(w && h ? `${w}×${h} · ` : '') + (duration? duration+' · ':'') + tag}</span>
        ]
      </div>
    </div>
  );
}
window.JK_ASSET_MAP = JK_ASSET_MAP;

/* =========================================================
   Reveal — IntersectionObserver wrapper
   ========================================================= */
function Reveal({ children, delay=0, as='div', className='', ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    const io = new IntersectionObserver(([e])=>{
      if (e.isIntersecting){ setSeen(true); io.disconnect(); }
    },{threshold:.2});
    io.observe(el);
    return ()=>io.disconnect();
  },[]);
  const Tag = as;
  return <Tag ref={ref} className={"reveal "+(seen?'in ':'')+className} style={{transitionDelay: delay+'ms'}} {...rest}>{children}</Tag>;
}

/* =========================================================
   Count-up stat
   ========================================================= */
function CountUp({ to, duration=1400, suffix='', prefix='' }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(()=>{
    const el = ref.current; if (!el) return;
    let started = false, raf;
    const io = new IntersectionObserver(([e])=>{
      if (!e.isIntersecting || started) return;
      started = true;
      const start = performance.now();
      const step = (now)=>{
        const p = Math.min(1, (now-start)/duration);
        const eased = 1 - Math.pow(1-p, 3);
        setVal(Math.round(to*eased));
        if (p<1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    },{threshold:.4});
    io.observe(el);
    return ()=>{ io.disconnect(); cancelAnimationFrame(raf); };
  },[to,duration]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

/* =========================================================
   Arrow icon
   ========================================================= */
function Arrow({ size=14, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" style={style}>
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

/* =========================================================
   Export
   ========================================================= */
Object.assign(window, { Kicker, Placeholder, Reveal, CountUp, Arrow, AppCtx, useApp });
