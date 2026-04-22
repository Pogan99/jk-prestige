function TweaksPanel() {
  const { tweaks, setTweaks, audience, setAudience } = useApp();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(()=>{
    const onMsg = (e)=>{
      const t = e.data && e.data.type;
      if (t === '__activate_edit_mode') setActive(true);
      if (t === '__deactivate_edit_mode') setActive(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({type:'__edit_mode_available'}, '*');
    return ()=> window.removeEventListener('message', onMsg);
  },[]);

  if (!active) return null;

  const update = (k,v)=>{
    setTweaks(prev=>{
      const next = {...prev, [k]: v};
      window.parent.postMessage({type:'__edit_mode_set_keys', edits:{[k]:v}}, '*');
      return next;
    });
  };

  return (
    <div style={{
      position:'fixed', right:20, bottom:20, zIndex:200,
      background:'#1b1b23', border:'1px solid var(--accent)',
      width: open ? 300 : 52, transition:'width .25s ease', overflow:'hidden'
    }}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 14px', background:'var(--accent)', color:'#fff'}}>
        <span className="mono">TWEAKS</span>
        <button onClick={()=>setOpen(v=>!v)} style={{color:'#fff', fontFamily:'var(--mono)', fontSize:14}}>{open?'–':'+'}</button>
      </div>
      {open && (
        <div style={{padding:16, display:'grid', gap:18}}>
          <Seg label="AUDIENCE" value={audience} options={[['homeowner','Homeowner'],['developer','Developer/GC']]} onChange={setAudience}/>
          <Seg label="MOTION" value={tweaks.motion} options={[['full','Full'],['reduced','Reduced']]} onChange={v=>update('motion',v)}/>
          <Seg label="DENSITY" value={tweaks.density} options={[['airy','Airy'],['tight','Tight']]} onChange={v=>update('density',v)}/>
          <Seg label="ACCENT HOT" value={tweaks.accentHot} options={[['#B10C2A','Tango'],['#C2410C','Amber'],['#0F766E','Teal']]} onChange={v=>update('accentHot',v)} swatches/>
          <Seg label="DISPLAY FONT" value={tweaks.displayFont} options={[["'Archivo Black', sans-serif",'Archivo'],["'Inter Tight', sans-serif",'Inter T.']]} onChange={v=>update('displayFont',v)}/>
        </div>
      )}
    </div>
  );
}
function Seg({label, value, options, onChange, swatches}){
  return (
    <div>
      <div className="mono" style={{color:'var(--fg-muted)', marginBottom:8, fontSize:10}}>// {label}</div>
      <div style={{display:'flex', gap:4, flexWrap:'wrap'}}>
        {options.map(([v,l])=>{
          const on = value===v;
          return (
            <button key={v} onClick={()=>onChange(v)}
              style={{
                padding: swatches? '4px' : '8px 10px',
                border:'1px solid '+(on?'var(--accent)':'var(--hairline)'),
                background: on? 'rgba(82,111,174,.2)':'transparent',
                color:'#fff', fontFamily:'var(--mono)', fontSize:10, letterSpacing:'.12em',
                display:'inline-flex', alignItems:'center', gap:6
              }}>
              {swatches && <span style={{width:14, height:14, background:v, display:'inline-block'}}/>}
              {l.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { TweaksPanel });
