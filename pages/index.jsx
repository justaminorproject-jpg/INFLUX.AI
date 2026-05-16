import { useState, useEffect } from "react";
import Head from "next/head";

// ─── STYLES ──────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=Playfair+Display:ital,wght@0,700;1,600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#080810;--s1:#0f0f1a;--s2:#161626;--b:rgba(255,255,255,.07);--gold:#d4a853;--coral:#ff6b6b;--teal:#06b6d4;--purple:#7c3aed;--text:#f0eee8;--muted:#7a7890;--r:14px}
body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif}
.app{min-height:100vh;background:var(--bg);background-image:radial-gradient(ellipse 80% 50% at 50% -20%,rgba(124,58,237,.12),transparent)}
.hdr{padding:18px 32px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--b);position:sticky;top:0;z-index:100;background:rgba(8,8,16,.88);backdrop-filter:blur(16px)}
.logo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:3px;background:linear-gradient(135deg,var(--gold),var(--coral));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.badge{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);border:1px solid rgba(212,168,83,.3);padding:4px 10px;border-radius:20px}
.nav{display:flex;gap:2px;padding:16px 32px 0;border-bottom:1px solid var(--b);overflow-x:auto}
.nb{padding:10px 16px;background:none;border:none;border-bottom:2px solid transparent;color:var(--muted);cursor:pointer;font-family:'DM Sans',sans-serif;font-size:12px;transition:all .2s;white-space:nowrap;display:flex;align-items:center;gap:6px}
.nb:hover{color:var(--text)}.nb.on{color:var(--gold);border-bottom-color:var(--gold)}
.main{padding:28px 32px;max-width:1200px;margin:0 auto}
.card{background:var(--s1);border:1px solid var(--b);border-radius:var(--r);padding:22px;margin-bottom:14px}
.ct{font-size:11px;text-transform:uppercase;letter-spacing:2px;color:var(--gold);margin-bottom:14px}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}
label{display:block;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin-bottom:7px}
input,textarea,select{width:100%;background:var(--s2);border:1px solid var(--b);border-radius:10px;padding:11px 14px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:13px;outline:none;transition:border-color .2s;margin-bottom:14px}
input:focus,textarea:focus,select:focus{border-color:rgba(212,168,83,.4)}
textarea{resize:vertical;min-height:76px}select option{background:var(--s2)}
.btn{display:inline-flex;align-items:center;gap:7px;padding:11px 20px;border-radius:10px;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;transition:all .2s;white-space:nowrap}
.bp{background:linear-gradient(135deg,var(--gold),#c8932a);color:#0a0805}.bp:hover{opacity:.9;transform:translateY(-1px)}.bp:disabled{opacity:.5;cursor:not-allowed;transform:none}
.bo{background:transparent;border:1px solid var(--b);color:var(--text)}.bo:hover{border-color:rgba(212,168,83,.3);color:var(--gold)}
.bg2{background:rgba(255,255,255,.05);color:var(--text)}.bg2:hover{background:rgba(255,255,255,.09)}
.sm{padding:7px 13px;font-size:11px}
.tag{display:inline-flex;padding:4px 11px;border-radius:20px;font-size:11px;cursor:pointer;border:1px solid var(--b);color:var(--muted);background:transparent;font-family:'DM Sans',sans-serif;margin:3px;transition:all .15s}
.tag.on{background:rgba(212,168,83,.1);border-color:rgba(212,168,83,.4);color:var(--gold)}
.pp{display:inline-flex;align-items:center;gap:6px;padding:6px 13px;border-radius:20px;font-size:12px;cursor:pointer;border:1px solid var(--b);background:var(--s2);color:var(--muted);font-family:'DM Sans',sans-serif;margin:3px;transition:all .15s}
.pp.on{background:rgba(124,58,237,.15);border-color:rgba(124,58,237,.4);color:#a78bfa}
.out{background:var(--s2);border:1px solid var(--b);border-radius:12px;padding:44px 18px 18px;font-size:13px;line-height:1.75;color:var(--text);white-space:pre-wrap;position:relative;margin-top:14px}
.out.ctr{display:flex;align-items:center;justify-content:center;min-height:120px;padding:18px}
.acbar{position:absolute;top:10px;right:10px;display:flex;gap:6px}
.acbtn{padding:5px 11px;background:rgba(255,255,255,.05);border:1px solid var(--b);border-radius:6px;color:var(--muted);font-size:11px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s}
.acbtn:hover{color:var(--text)}.acbtn.ok{color:#4ade80}
.stat{background:var(--s1);border:1px solid var(--b);border-radius:var(--r);padding:18px;text-align:center}
.snum{font-family:'Bebas Neue',sans-serif;font-size:30px;letter-spacing:2px;background:linear-gradient(135deg,var(--gold),var(--coral));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.slbl{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1.5px;margin-top:3px}
.nbd{display:inline-block;padding:3px 9px;border-radius:12px;font-size:10px;text-transform:uppercase;letter-spacing:1px;font-weight:500}
.pb{height:4px;border-radius:4px;background:var(--s2);overflow:hidden;margin-top:7px}
.pf{height:100%;border-radius:4px;background:linear-gradient(90deg,var(--gold),var(--coral));transition:width .5s ease}
.av{width:90px;height:90px;border-radius:50%;background:linear-gradient(135deg,var(--purple),var(--coral),var(--gold));display:flex;align-items:center;justify-content:center;font-size:38px;margin:0 auto 14px;position:relative;box-shadow:0 0 36px rgba(124,58,237,.25)}
.avr{position:absolute;inset:-4px;border-radius:50%;border:2px solid transparent;background:linear-gradient(var(--bg),var(--bg)) padding-box,linear-gradient(135deg,var(--gold),var(--coral)) border-box;animation:spin 8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fu{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.fu{animation:fu .35s ease forwards}
.ld{display:flex;gap:5px;align-items:center}
.ld span{width:7px;height:7px;border-radius:50%;display:inline-block;background:var(--gold);animation:bk 1.2s infinite}
.ld span:nth-child(2){animation-delay:.2s;background:var(--coral)}
.ld span:nth-child(3){animation-delay:.4s;background:var(--teal)}
@keyframes bk{0%,80%,100%{transform:scale(.6);opacity:.5}40%{transform:scale(1);opacity:1}}
.tog{width:40px;height:22px;border-radius:11px;cursor:pointer;position:relative;transition:background .2s;flex-shrink:0;display:inline-block}
.togk{position:absolute;top:3px;width:16px;height:16px;border-radius:50%;background:white;transition:left .2s}
.row{display:flex;gap:9px;align-items:center;flex-wrap:wrap}
.sectitle{font-family:'Playfair Display',serif;font-size:32px;font-style:italic}
.subsub{color:var(--muted);font-size:13px;margin-top:4px;margin-bottom:24px}
@media(max-width:768px){.main{padding:16px}.hdr{padding:14px 16px}.nav{padding:10px 16px 0}.g2,.g3{grid-template-columns:1fr}}
`;

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const TABS = [
  {id:"persona",  label:"Persona Builder",   icon:"✦"},
  {id:"content",  label:"Content Studio",    icon:"◈"},
  {id:"visual",   label:"Visual Generator",  icon:"◉"},
  {id:"diy",      label:"DIY Studio",        icon:"🔨"},
  {id:"scheduler",label:"Auto Scheduler",    icon:"📅"},
  {id:"ads",      label:"Ad Creator",        icon:"🎬"},
  {id:"brands",   label:"Brand Deals",       icon:"◆"},
  {id:"money",    label:"Monetization",      icon:"◎"},
  {id:"library",  label:"Saved Library",     icon:"💾"},
];

const NICHES = ["Fashion","Beauty","Fitness","Travel","Food","Tech","Gaming","Lifestyle","Finance","Art","Music","Wellness","Sustainability","DIY"];
const VIBES  = ["Luxury","Edgy","Minimalist","Playful","Authentic","Dark Academia","Cottagecore","Futuristic","Vintage","Streetwear","Rustic","Upcycled","Handmade"];
const PLATS  = [
  {id:"instagram",label:"Instagram",icon:"📸"},
  {id:"facebook", label:"Facebook", icon:"📘"},
  {id:"tiktok",   label:"TikTok",   icon:"🎵"},
  {id:"youtube",  label:"YouTube",  icon:"▶️"},
  {id:"twitter",  label:"X/Twitter",icon:"🐦"},
  {id:"linkedin", label:"LinkedIn", icon:"💼"},
  {id:"pinterest",label:"Pinterest",icon:"📌"},
];
const PCOLORS = {instagram:"#E1306C",facebook:"#1877F2",tiktok:"#69C9D0",youtube:"#FF0000",twitter:"#1DA1F2",pinterest:"#E60023",linkedin:"#0A66C2"};
const PICONS  = {instagram:"📸",facebook:"📘",tiktok:"🎵",youtube:"▶️",twitter:"🐦",pinterest:"📌",linkedin:"💼"};

const CTYPES = ["Viral Caption","Reel Script","Carousel Story","Brand Unboxing","Morning Routine","Day in My Life","Trend Hook","Opinion Post","DIY Tutorial","Before & After","Tools Haul","Facebook Post","Facebook Story","Facebook Reel","Facebook Group Post","Facebook Live Script","Facebook Event Post","Viral Share Post"];

const DIY_CATS = ["Budget Renovation","Bathroom Refresh","Kitchen Upgrade","Flooring & Tiling","Painting & Walls","Deck & Patio Build","Furniture Flip","Thrift Transforms","Home Decor","Wall Art","Shelving & Storage","Woodworking","Upcycling","Concrete & Cement","Candle & Soap Making","Resin Art","Sewing & Embroidery","Paper Crafts","Seasonal Crafts","Garden & Outdoor","Raised Bed Garden","Outdoor Furniture Build"];
const DIY_LVL  = ["Beginner (No tools)","Intermediate (Basic tools)","Advanced (Power tools)","Expert (Trade skills)"];
const DIY_BUD  = ["Under $10","$10-$30","$30-$75","$75-$150","$150+"];
const DIY_FMT  = ["Step-by-Step Tutorial","Time-Lapse Reel","Before & After Reveal","Supplies Haul","Thrift Flip Challenge","Tool Review","Room Makeover Series"];
const DIY_SMP  = [
  {e:"🪑",t:"Thrifted Chair Glow-Up",   tag:"Furniture Flip",s:"92.4K",c:"$18"},
  {e:"🖼️",t:"Abstract Canvas Wall Art",  tag:"Home Decor",   s:"67.1K",c:"$12"},
  {e:"🪴",t:"Cement Planter DIY",        tag:"Garden",        s:"114K", c:"$8"},
  {e:"🪵",t:"Floating Wood Shelf Build", tag:"Woodworking",   s:"88.3K",c:"$35"},
  {e:"🧵",t:"Boho Macrame Wall Hanging", tag:"Textiles",      s:"73.6K",c:"$22"},
  {e:"🛁",t:"$40 Bathroom Refresh",      tag:"Budget Reno",   s:"201K", c:"$40"},
];

const WDAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const TIMES = ["5:00 AM","6:00 AM","7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM","8:00 PM","9:00 PM","10:00 PM","11:00 PM"];
const defDays = () => ({
  Mon:{on:true, slots:[{t:"7:00 PM", p:"auto"}]},
  Tue:{on:true, slots:[{t:"12:00 PM",p:"auto"}]},
  Wed:{on:true, slots:[{t:"7:00 PM", p:"auto"}]},
  Thu:{on:false,slots:[{t:"6:00 PM", p:"auto"}]},
  Fri:{on:true, slots:[{t:"6:00 PM", p:"auto"}]},
  Sat:{on:true, slots:[{t:"10:00 AM",p:"auto"}]},
  Sun:{on:false,slots:[{t:"11:00 AM",p:"auto"}]},
});

const AD_PLATS = [
  {id:"tiktok",   label:"TikTok Ads",          icon:"🎵",color:"#69C9D0",fmts:["In-Feed Ad","TopView","Spark Ad","Branded Hashtag","Shopping Ad"]},
  {id:"snapchat", label:"Snapchat Ads",         icon:"👻",color:"#FFD700",fmts:["Snap Ad","Story Ad","Collection Ad","Dynamic Ad"]},
  {id:"reels",    label:"Instagram Reels Ad",   icon:"📸",color:"#E1306C",fmts:["Reels Ad","Stories Ad","Feed Ad","Explore Ad"]},
  {id:"youtube",  label:"YouTube Shorts Ad",    icon:"▶️",color:"#FF0000",fmts:["Skippable In-Stream","Non-Skippable","Bumper 6s","Shorts Ad"]},
  {id:"facebook", label:"Facebook Reel Ad",     icon:"📘",color:"#1877F2",fmts:["Reels Ad","In-Stream Video","Story Ad"]},
];
const AD_GOALS = ["Brand Awareness","Drive Traffic","Product Sales","App Installs","Lead Generation","Event Promotion","Grow Following","Launch Announcement"];
const AD_DUR   = ["6 seconds","15 seconds","30 seconds","60 seconds","90 seconds"];
const AD_TONE  = ["Energetic & Hype","Calm & Trustworthy","Funny & Relatable","Aspirational & Luxury","Urgent & FOMO","Tutorial & Educational","Emotional Storytelling","Bold & Provocative"];

const BRANDS = [
  {e:"💄",n:"Fenty Beauty",c:"Beauty & Skincare",      r:"$8,500/post"},
  {e:"👟",n:"Nike",        c:"Sportswear",             r:"$12,000/post"},
  {e:"✈️",n:"Emirates",    c:"Travel & Luxury",        r:"$15,000/campaign"},
  {e:"💻",n:"Apple",       c:"Tech & Gadgets",         r:"$20,000/campaign"},
  {e:"☕",n:"Starbucks",   c:"Food & Beverage",        r:"$5,000/post"},
  {e:"🌿",n:"Allbirds",    c:"Sustainable Fashion",    r:"$7,200/post"},
  {e:"🔨",n:"Home Depot",  c:"DIY & Home Improvement", r:"$6,500/post"},
  {e:"🪚",n:"Ryobi Tools", c:"Power Tools & Hardware", r:"$4,800/post"},
  {e:"🎨",n:"Krylon",      c:"Paints & Finishes",      r:"$3,200/post"},
  {e:"🛋️",n:"IKEA",        c:"Furniture & Decor",      r:"$9,000/campaign"},
];

const TMETA = {
  persona: {icon:"✦",color:"#d4a853",label:"Persona"},
  content: {icon:"◈",color:"#06b6d4",label:"Content"},
  visual:  {icon:"◉",color:"#a78bfa",label:"Visual"},
  diy:     {icon:"🔨",color:"#fb923c",label:"DIY"},
  schedule:{icon:"📅",color:"#d4a853",label:"Schedule"},
  ad:      {icon:"🎬",color:"#ff6b6b",label:"Ad Script"},
  brand:   {icon:"◆",color:"#4ade80",label:"Brand Deal"},
  money:   {icon:"◎",color:"#d4a853",label:"Revenue"},
};
const STYLEOPTS = ["Casual & conversational","Motivational & bold","Humorous & sarcastic","Educational & informative","Storytelling & emotional","Short & punchy","Aesthetic & poetic"];
const SKEY = "influx-v2";

// ─── API ─────────────────────────────────────────────────────────────────────
async function callAI(prompt, sys) {
  const r = await fetch("/api/claude", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ prompt, system: sys }),
  });
  const d = await r.json();
  if (d.error) throw new Error(d.error);
  return d.text || "Error generating content.";
}

// ─── STORAGE (localStorage for Vercel) ───────────────────────────────────────
async function libLoad() {
  try {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(SKEY);
    return raw ? JSON.parse(raw) : [];
  } catch(err) { return []; }
}
async function libSave(items) {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(SKEY, JSON.stringify(items));
  } catch(err) { /* silent */ }
}
async function addItem(type, label, content, meta) {
  const items = await libLoad();
  const item  = {id: Date.now() + "", type, label, content, meta: meta || {}, at: new Date().toISOString()};
  await libSave([item, ...items].slice(0, 200));
}
async function delItem(id) {
  const items = await libLoad();
  await libSave(items.filter(i => i.id !== id));
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function Dots() {
  return (
    <div className="ld">
      <span/><span/><span/>
      <span style={{marginLeft:8, fontSize:12, color:"var(--muted)"}}>Generating...</span>
    </div>
  );
}

function CopyBtn({text}) {
  const [ok, setOk] = useState(false);
  function handle() { navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500); }
  return <button className={"acbtn" + (ok ? " ok" : "")} onClick={handle}>{ok ? "✓ Copied" : "Copy"}</button>;
}

function SaveBtn({content, type, label, meta}) {
  const [st, setSt] = useState("idle");
  async function handle() {
    setSt("saving");
    try { await addItem(type, label, content, meta); setSt("saved"); setTimeout(() => setSt("idle"), 2000); }
    catch(err) { setSt("err"); setTimeout(() => setSt("idle"), 2000); }
  }
  const txt = st === "saving" ? "..." : st === "saved" ? "✓ Saved!" : st === "err" ? "✗ Error" : "💾 Save";
  return <button className={"acbtn" + (st === "saved" ? " ok" : "")} onClick={handle} disabled={st === "saving"}>{txt}</button>;
}

function Out({text, type, label, meta, loading}) {
  if (!loading && !text) return null;
  return (
    <div className={"out" + (loading ? " ctr" : "")}>
      {loading ? <Dots /> : (
        <>
          <div className="acbar">
            <CopyBtn text={text} />
            <SaveBtn content={text} type={type || "content"} label={label || "Output"} meta={meta || {}} />
          </div>
          {text}
        </>
      )}
    </div>
  );
}

function Toggle({on, set}) {
  return (
    <div className="tog" style={{background: on ? "var(--gold)" : "rgba(255,255,255,.1)"}} onClick={() => set(!on)}>
      <div className="togk" style={{left: on ? 20 : 3}} />
    </div>
  );
}

// ─── PERSONA TAB ──────────────────────────────────────────────────────────────
function PersonaTab({persona, setPersona}) {
  const [mode, setMode]       = useState("me");
  const [step, setStep]       = useState(1);
  const [loading, setLoading] = useState(false);
  const [output, setOutput]   = useState("");
  const [parsed, setParsed]   = useState(null);

  // Model Me form
  const [me, setMe] = useState({name:"",age:"",loc:"",bio:"",personality:"",topics:"",pstyle:"",values:"",goals:"",plats:[],sample:"",aesthetic:"",handle:""});
  const setMeF = (k,v) => setMe(m => ({...m, [k]:v}));
  const togPlat = id => setMe(m => ({...m, plats: m.plats.includes(id) ? m.plats.filter(x=>x!==id) : [...m.plats, id]}));

  // Scratch form
  const [sc, setSc] = useState({name:"",age:"24",niche:[],vibe:[],back:""});
  const togSc = (k,v) => setSc(f => ({...f, [k]: f[k].includes(v) ? f[k].filter(x=>x!==v) : [...f[k],v]}));

  const emos = ["✨","🌙","⚡","🔥","💫","🌸","🦋","👁️"];
  const emo  = emos[(mode==="me" ? me.name : sc.name).length % 8] || "✨";

  async function doAnalyse() {
    setLoading(true); setOutput(""); setParsed(null);
    const prompt = `Analyse this person's social profile and output ONLY valid JSON (no markdown, no backticks):
NAME:${me.name} AGE:${me.age} LOCATION:${me.loc}
BIO:${me.bio}
PERSONALITY:${me.personality}
TOPICS:${me.topics}
STYLE:${me.pstyle}
VALUES:${me.values}
GOALS:${me.goals}
PLATFORMS:${me.plats.join(",")}
SAMPLE POST:${me.sample}
AESTHETIC:${me.aesthetic}

Return exactly this JSON shape:
{"suggestedName":"","niche":["","",""],"vibe":["","",""],"voiceTraits":["","",""],"contentPillars":["","","",""],"targetAudience":"","viralHook":"","topPlatform":"","monetizationAngle":"","colorPalette":["#aaa","#bbb","#ccc"]}`;
    const raw = await callAI(prompt, "Output ONLY raw JSON. No markdown, no explanation, no backticks.");
    try {
      const clean = raw.replace(/```json|```/g, "").trim();
      setParsed(JSON.parse(clean));
      setStep(2);
    } catch(err) {
      setOutput("Could not parse the analysis — please add more detail to your bio and personality, then try again.");
    }
    setLoading(false);
  }

  async function doGenMe() {
    setLoading(true); setOutput("");
    const a = parsed;
    const name = me.handle || a.suggestedName || me.name;
    const prompt = `Build a complete AI influencer identity for: ${me.name}, ${me.age}, ${me.loc}.
Bio: ${me.bio}. Personality: ${me.personality}. Topics: ${me.topics}. Style: ${me.pstyle}. Values: ${me.values}. Sample post: "${me.sample}". Aesthetic: ${me.aesthetic}.
Analysis — Name:${name} Niche:${(a.niche||[]).join(",")} Vibe:${(a.vibe||[]).join(",")} Voice:${(a.voiceTraits||[]).join(",")} Hook:${a.viralHook}

Generate:
**NAME & HANDLE** — name + @handle per platform
**PLATFORM BIOS** — Instagram (150 chars), TikTok (80 chars), X (160 chars), Facebook (200 chars)
**VOICE & TONE GUIDE** — 5 specific rules with real examples from their writing
**4 CONTENT PILLARS** — each: name, what it covers, 3 post ideas, best format
**VISUAL IDENTITY** — color palette, filter style, grid aesthetic
**FIRST 7 POSTS** — exact topics, format, platform for launch week
**TOP MONETIZATION MOVE** — most natural income stream + first action step
**3 READY-TO-POST CAPTIONS** — written fully in their authentic voice

Sound exactly like THEM.`;
    const result = await callAI(prompt, "You are an elite personal brand coach. Mirror the person's authentic voice and amplify it.");
    setOutput(result);
    setPersona({name, age:me.age, niche:a.niche||[], vibe:a.vibe||[], defined:true});
    setStep(3);
    setLoading(false);
  }

  async function doGenScratch() {
    setLoading(true); setOutput("");
    const prompt = `Create a complete AI influencer persona:
Name:${sc.name||"Nova Reyes"}, Age:${sc.age}, Niches:${sc.niche.join(",") || "Lifestyle"}, Vibe:${sc.vibe.join(",") || "Luxury"}, Backstory:${sc.back || "mysterious world traveler"}

1. Full Backstory (3-4 sentences, compelling)
2. Voice & Tone (3 traits + example phrase)
3. Content Pillars (4 signature themes)
4. Brand Identity (color palette, aesthetic, visual style)
5. Target Audience (demographics + psychographics)
6. Viral Hook (signature one-liner)`;
    const result = await callAI(prompt);
    setOutput(result);
    setPersona({...sc, defined:true});
    setLoading(false);
  }

  return (
    <div className="fu">
      <div className="row" style={{justifyContent:"space-between", marginBottom:22, gap:10}}>
        <div>
          <h2 className="sectitle">{mode==="me" ? "🪞 Model Me" : "✦ Build from Scratch"}</h2>
          <p className="subsub" style={{marginBottom:0}}>{mode==="me" ? "Paste your profile info — AI builds your creator identity" : "Design a fictional influencer persona from scratch"}</p>
        </div>
        <div style={{display:"flex", background:"var(--s1)", border:"1px solid var(--b)", borderRadius:12, padding:4, gap:4}}>
          <button className={"btn sm " + (mode==="me" ? "bp" : "bg2")} onClick={() => {setMode("me"); setOutput(""); setStep(1); setParsed(null);}}>🪞 Model Me</button>
          <button className={"btn sm " + (mode==="sc" ? "bp" : "bg2")} onClick={() => {setMode("sc"); setOutput("");}}>✦ From Scratch</button>
        </div>
      </div>

      {/* ── MODEL ME ── */}
      {mode==="me" && (
        <div>
          {/* Step bar */}
          <div className="row" style={{marginBottom:22, gap:8}}>
            {["1. Your Profile","2. Review Analysis","3. Your AI Identity"].map((s,i) => (
              <div key={i} className="row" style={{gap:6}}>
                <div style={{width:26,height:26,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,
                  background: step>i+1?"var(--gold)":step===i+1?"rgba(212,168,83,.15)":"var(--s2)",
                  border: step===i+1?"1px solid var(--gold)":"1px solid var(--b)",
                  color: step>i+1?"#0a0805":step===i+1?"var(--gold)":"var(--muted)"}}>
                  {step>i+1?"✓":i+1}
                </div>
                <span style={{fontSize:11,color:step===i+1?"var(--text)":"var(--muted)",whiteSpace:"nowrap"}}>{s}</span>
                {i<2 && <div style={{width:18,height:1,background:"var(--b)"}}/>}
              </div>
            ))}
          </div>

          {step===1 && (
            <div className="g2" style={{gap:18}}>
              <div>
                <div style={{padding:"12px 16px",background:"rgba(6,182,212,.06)",border:"1px solid rgba(6,182,212,.2)",borderRadius:12,marginBottom:14,fontSize:13,color:"var(--muted)",lineHeight:1.6}}>
                  <span style={{color:"var(--teal)"}}>💡 </span>Copy your Facebook About section or Instagram bio below. The AI reads your real personality and builds a creator identity that sounds like <em style={{color:"var(--text)"}}>you</em>.
                </div>
                <div className="card">
                  <div className="ct">Basic Info</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 12px"}}>
                    <div><label>Your Name</label><input value={me.name} onChange={e=>setMeF("name",e.target.value)} placeholder="Your real name"/></div>
                    <div><label>Age</label><input value={me.age} onChange={e=>setMeF("age",e.target.value)} placeholder="e.g. 28"/></div>
                  </div>
                  <label>Location</label>
                  <input value={me.loc} onChange={e=>setMeF("loc",e.target.value)} placeholder="e.g. Austin TX, London, Lagos..."/>
                </div>
                <div className="card">
                  <div className="ct">Paste Your Bio</div>
                  <textarea value={me.bio} onChange={e=>setMeF("bio",e.target.value)} style={{minHeight:100}} placeholder="Paste from Facebook About, Instagram bio, or write a few sentences about yourself..."/>
                </div>
                <div className="card">
                  <div className="ct">Your Personality</div>
                  <label>Describe yourself in your own words</label>
                  <textarea value={me.personality} onChange={e=>setMeF("personality",e.target.value)} style={{minHeight:75}} placeholder="e.g. I'm loud, funny, say it how it is. Love making things with my hands..."/>
                  <label>What you care about / stand for</label>
                  <textarea value={me.values} onChange={e=>setMeF("values",e.target.value)} style={{minHeight:60}} placeholder="e.g. family, financial freedom, building things, keeping it real..."/>
                </div>
              </div>
              <div>
                <div className="card">
                  <div className="ct">What You Post About</div>
                  <label>Topics & interests</label>
                  <textarea value={me.topics} onChange={e=>setMeF("topics",e.target.value)} style={{minHeight:75}} placeholder="e.g. DIY furniture flips, budget home makeovers, cooking, money tips..."/>
                  <label>Your posting style</label>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:14}}>
                    {STYLEOPTS.map(s => <button key={s} className={"tag" + (me.pstyle===s?" on":"")} onClick={()=>setMeF("pstyle",me.pstyle===s?"":s)}>{s}</button>)}
                  </div>
                </div>
                <div className="card">
                  <div className="ct">Sample Content</div>
                  <label>Paste a real post or caption you wrote</label>
                  <textarea value={me.sample} onChange={e=>setMeF("sample",e.target.value)} style={{minHeight:90}} placeholder="Paste any caption, Facebook status, or text you've written. The more natural the better!"/>
                  <label>Your visual aesthetic</label>
                  <textarea value={me.aesthetic} onChange={e=>setMeF("aesthetic",e.target.value)} style={{minHeight:55}} placeholder="e.g. cozy home photos, before/after DIY shots, no heavy filters, raw and real..."/>
                </div>
                <div className="card">
                  <div className="ct">Platforms & Goals</div>
                  <label>Where you want to grow</label>
                  <div style={{marginBottom:12}}>
                    {PLATS.map(p => <button key={p.id} className={"pp"+(me.plats.includes(p.id)?" on":"")} onClick={()=>togPlat(p.id)}>{p.icon} {p.label}</button>)}
                  </div>
                  <label>Your creator goals</label>
                  <textarea value={me.goals} onChange={e=>setMeF("goals",e.target.value)} style={{minHeight:55}} placeholder="e.g. grow to 10K followers, land brand deals, sell a DIY course..."/>
                </div>
                <button className="btn bp" style={{width:"100%",justifyContent:"center",fontSize:14}} onClick={doAnalyse} disabled={loading || (!me.bio && !me.personality && !me.topics)}>
                  {loading ? "🔍 Analysing..." : "🔍 Analyse My Profile"}
                </button>
                {loading && <div className="out ctr"><Dots/></div>}
                {output && !parsed && <div className="out" style={{paddingTop:18}}>{output}</div>}
              </div>
            </div>
          )}

          {step===2 && parsed && (
            <div className="fu">
              <div style={{padding:"12px 16px",background:"rgba(74,222,128,.06)",border:"1px solid rgba(74,222,128,.25)",borderRadius:12,marginBottom:18,fontSize:13,color:"#4ade80"}}>
                Profile analysed! Review below, adjust your handle, then generate your full identity.
              </div>
              <div className="g2" style={{gap:16,marginBottom:18}}>
                <div className="card" style={{textAlign:"center"}}>
                  <div className="av"><div className="avr"/><span style={{position:"relative",zIndex:1}}>{emo}</span></div>
                  <label style={{textAlign:"center"}}>Your Influencer Name</label>
                  <input value={me.handle||parsed.suggestedName||""} onChange={e=>setMeF("handle",e.target.value)} style={{textAlign:"center",fontSize:16,fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}/>
                  <div style={{fontSize:11,color:"var(--muted)",marginBottom:10}}>
                    @{(me.handle||parsed.suggestedName||"").toLowerCase().replace(/\s+/g,".")}
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5,justifyContent:"center",marginBottom:6}}>
                    {(parsed.niche||[]).map(n => <span key={n} className="nbd" style={{background:"rgba(212,168,83,.1)",color:"var(--gold)",border:"1px solid rgba(212,168,83,.2)"}}>{n}</span>)}
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5,justifyContent:"center",marginBottom:10}}>
                    {(parsed.vibe||[]).map(v => <span key={v} className="nbd" style={{background:"rgba(6,182,212,.08)",color:"var(--teal)",border:"1px solid rgba(6,182,212,.2)"}}>{v}</span>)}
                  </div>
                  <div style={{display:"flex",gap:6,justifyContent:"center"}}>
                    {(parsed.colorPalette||[]).map((c,i) => <div key={i} title={c} style={{width:22,height:22,borderRadius:"50%",background:c,border:"2px solid rgba(255,255,255,.15)"}}/>)}
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {[["🎙️ Voice Traits",(parsed.voiceTraits||[]).join(" · ")],["📌 Content Pillars",(parsed.contentPillars||[]).join(", ")],["👥 Target Audience",parsed.targetAudience],["🚀 Viral Hook",parsed.viralHook],["🏆 Best Platform",parsed.topPlatform],["💰 Monetization",parsed.monetizationAngle]].map(([l,v]) => (
                    <div key={l} style={{background:"var(--s2)",border:"1px solid var(--b)",borderRadius:10,padding:"10px 14px"}}>
                      <div style={{fontSize:10,color:"var(--gold)",textTransform:"uppercase",letterSpacing:1,marginBottom:3}}>{l}</div>
                      <div style={{fontSize:13,color:"var(--text)",lineHeight:1.5}}>{v||"—"}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="row">
                <button className="btn bo" onClick={()=>{setStep(1);setParsed(null);}}>← Edit Profile</button>
                <button className="btn bp" style={{flex:1,justifyContent:"center"}} onClick={doGenMe} disabled={loading}>
                  {loading ? "✦ Building..." : "✦ Generate My Full AI Identity"}
                </button>
              </div>
              {loading && <div className="out ctr" style={{marginTop:12}}><Dots/></div>}
            </div>
          )}

          {step===3 && output && (
            <div className="fu">
              <div className="row" style={{marginBottom:14,gap:8}}>
                <div style={{padding:"7px 14px",background:"rgba(74,222,128,.08)",border:"1px solid rgba(74,222,128,.25)",borderRadius:10,fontSize:13,color:"#4ade80"}}>Your AI creator identity is ready</div>
                <button className="btn bo sm" onClick={()=>{setStep(1);setOutput("");setParsed(null);}}>Start Over</button>
                <button className="btn bo sm" onClick={()=>setStep(2)}>Back to Analysis</button>
              </div>
              <Out text={output} type="persona" label={"Persona — "+(me.handle||me.name||"AI Influencer")} meta={{mode:"model-me",name:me.name}}/>
            </div>
          )}
        </div>
      )}

      {/* ── FROM SCRATCH ── */}
      {mode==="sc" && (
        <div className="g2" style={{gap:22}}>
          <div>
            <div className="card">
              <div className="ct">Identity</div>
              <label>Influencer Name</label><input value={sc.name} onChange={e=>setSc(f=>({...f,name:e.target.value}))} placeholder="e.g. Nova Reyes, Luna Black..."/>
              <label>Age</label><input value={sc.age} onChange={e=>setSc(f=>({...f,age:e.target.value}))} placeholder="24"/>
              <label>Backstory Hint</label><textarea value={sc.back} onChange={e=>setSc(f=>({...f,back:e.target.value}))} placeholder="e.g. former model who left LA, now travels SE Asia..."/>
            </div>
            <div className="card">
              <div className="ct">Niche</div>
              <div>{NICHES.map(n => <button key={n} className={"tag"+(sc.niche.includes(n)?" on":"")} onClick={()=>togSc("niche",n)}>{n}</button>)}</div>
            </div>
            <div className="card">
              <div className="ct">Aesthetic Vibe</div>
              <div>{VIBES.map(v => <button key={v} className={"tag"+(sc.vibe.includes(v)?" on":"")} onClick={()=>togSc("vibe",v)}>{v}</button>)}</div>
            </div>
            <button className="btn bp" style={{width:"100%",justifyContent:"center"}} onClick={doGenScratch} disabled={loading}>
              {loading ? "Creating..." : "✦ Generate Full Persona"}
            </button>
          </div>
          <div>
            <div className="card" style={{textAlign:"center"}}>
              <div className="av"><div className="avr"/><span style={{position:"relative",zIndex:1}}>{emo}</span></div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontStyle:"italic"}}>{sc.name||"Your Influencer"}</div>
              <div style={{color:"var(--muted)",fontSize:12,marginTop:3}}>Age {sc.age} · AI Creator</div>
              <div style={{marginTop:10,display:"flex",flexWrap:"wrap",gap:5,justifyContent:"center"}}>
                {sc.niche.map(n=><span key={n} className="nbd" style={{background:"rgba(212,168,83,.1)",color:"var(--gold)",border:"1px solid rgba(212,168,83,.2)"}}>{n}</span>)}
              </div>
              <div style={{marginTop:6,display:"flex",flexWrap:"wrap",gap:5,justifyContent:"center"}}>
                {sc.vibe.map(v=><span key={v} className="nbd" style={{background:"rgba(6,182,212,.08)",color:"var(--teal)",border:"1px solid rgba(6,182,212,.2)"}}>{v}</span>)}
              </div>
            </div>
            <Out text={output} type="persona" label={"Persona — "+(sc.name||"AI Influencer")} meta={{mode:"scratch"}} loading={loading}/>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CONTENT TAB ─────────────────────────────────────────────────────────────
function ContentTab({persona}) {
  const [plats, setPlats]   = useState(["instagram"]);
  const [ctype, setCtype]   = useState("Viral Caption");
  const [topic, setTopic]   = useState("");
  const [tone, setTone]     = useState("confident");
  const [loading, setLoad]  = useState(false);
  const [output, setOutput] = useState("");
  const togPlat = id => setPlats(p => p.includes(id)?p.filter(x=>x!==id):[...p,id]);

  async function generate() {
    setLoad(true); setOutput("");
    const isFB = plats.includes("facebook") || ctype.toLowerCase().startsWith("facebook");
    const deliverables = ctype==="Reel Script" ? `- HOOK (0-3 sec visual + voiceover)\n- SCENES (5-7 timestamped beats)\n- CAPTION (150 chars)\n- 10 HASHTAGS\n- CTA` :
      ctype==="Carousel Story" ? `- SLIDE 1 (scroll-stopping hook)\n- SLIDES 2-6 (one insight each)\n- SLIDE 7 (CTA + save prompt)\n- CAPTION\n- 8 HASHTAGS` :
      ctype==="Facebook Post" ? `- LONG-FORM POST (150-300 words, storytelling)\n- SHORT VERSION (under 80 words)\n- 3 ENGAGEMENT QUESTIONS\n- BEST POSTING TIME\n- IMAGE/VIDEO SUGGESTION` :
      ctype==="Facebook Live Script" ? `- PRE-LIVE ANNOUNCEMENT POST\n- INTRO SCRIPT (first 60 seconds)\n- MAIN CONTENT OUTLINE (5 segments)\n- ENGAGEMENT PROMPTS throughout\n- CTA CLOSE (last 2 minutes)\n- REPLAY CAPTION` :
      ctype==="Viral Share Post" ? `- SHARE-WORTHY HOOK\n- POST BODY (relatable/emotional)\n- CALL TO SHARE line\n- 3 EMOTIONAL ANGLE VERSIONS (funny/heartfelt/shocking)` :
      `- CAPTION (3 versions: short/medium/long)\n- 12 HASHTAGS\n- Best posting time\n- Engagement hook question`;
    const prompt = `Write "${ctype}" content for AI influencer ${persona.name||"Nova"}, ${persona.age||"24"}, niches: ${(persona.niche||[]).join(",")||"Lifestyle"}, vibe: ${(persona.vibe||[]).join(",")||"Authentic"}.
Platform: ${plats.join(", ")}. Topic: "${topic||"everyday lifestyle moment"}". Tone: ${tone}.
${isFB ? "Facebook audiences value warmth and community — write conversationally. Longer posts do better." : ""}
Deliver:\n${deliverables}\nBe specific, trend-aware, and human-sounding.`;
    setOutput(await callAI(prompt));
    setLoad(false);
  }

  return (
    <div className="fu">
      <h2 className="sectitle">Content Studio</h2>
      <p className="subsub">Platform-optimized posts, scripts, captions & Facebook content</p>
      <div className="g2" style={{gap:22}}>
        <div>
          <div className="card">
            <div className="ct">Platform</div>
            {PLATS.map(p=><button key={p.id} className={"pp"+(plats.includes(p.id)?" on":"")} onClick={()=>togPlat(p.id)}>{p.icon} {p.label}</button>)}
          </div>
          <div className="card">
            <div className="ct">Content Type</div>
            <div>{CTYPES.map(t=><button key={t} className={"tag"+(ctype===t?" on":"")} onClick={()=>setCtype(t)}>{t}</button>)}</div>
          </div>
          <div className="card">
            <div className="ct">Topic & Tone</div>
            <label>Topic / Theme</label>
            <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="e.g. morning coffee ritual in Paris..."/>
            <label>Tone</label>
            <select value={tone} onChange={e=>setTone(e.target.value)}>
              <option value="confident">Confident & Aspirational</option>
              <option value="vulnerable">Raw & Vulnerable</option>
              <option value="playful">Playful & Witty</option>
              <option value="educational">Informative & Value-first</option>
              <option value="mysterious">Mysterious & Intriguing</option>
              <option value="motivational">Motivational & Empowering</option>
              <option value="community">Warm & Community-first</option>
            </select>
          </div>
          <button className="btn bp" style={{width:"100%",justifyContent:"center"}} onClick={generate} disabled={loading}>
            {loading ? "Generating..." : "◈ Generate Content"}
          </button>
        </div>
        <div>
          <Out text={output} type="content" label={`${ctype} — ${topic||"Content"}`} meta={{platform:plats.join(","),type:ctype,tone}} loading={loading}/>
        </div>
      </div>
    </div>
  );
}

// ─── VISUAL TAB ───────────────────────────────────────────────────────────────
function VisualTab({persona}) {
  const [style, setStyle]   = useState("editorial");
  const [setting, setSet]   = useState("");
  const [outfit, setOutfit] = useState("");
  const [mood, setMood]     = useState("");
  const [loading, setLoad]  = useState(false);
  const [output, setOutput] = useState("");

  const STYLES   = ["Editorial","Candid / Lifestyle","Flat Lay","Golden Hour","Studio","Street","Travel","Dark & Moody"];
  const SETTINGS = ["Parisian Cafe","Luxury Hotel","Beach Sunset","Tokyo Streets","NYC Skyline","Desert","Forest","Home Studio"];
  const MOODS    = ["Dreamy","Bold","Minimal","Raw","Cinematic","Retro","Futuristic","Serene"];
  const SAMPLES  = [
    {e:"🌅",cap:"Golden hour energy. Nothing forced.",tags:"#luxury #aesthetic #goldenhour",lk:"48.2K",cm:"892"},
    {e:"☕",cap:"The ritual before the chaos.",      tags:"#morningroutine #slowliving",     lk:"62.1K",cm:"1.4K"},
    {e:"🌙",cap:"Late nights. Big dreams.",           tags:"#nightowl #creative #mindset",    lk:"31.5K",cm:"673"},
    {e:"✈️",cap:"Somewhere new. Same me.",            tags:"#travel #jetset",                 lk:"89.7K",cm:"2.1K"},
    {e:"🖤",cap:"The edit that took 3 days.",         tags:"#editorial #style",               lk:"74.3K",cm:"1.8K"},
    {e:"🌿",cap:"Less things. More living.",          tags:"#minimalist #lifestyle",          lk:"43.8K",cm:"956"},
  ];

  async function generate() {
    setLoad(true); setOutput("");
    const prompt = `Create AI image generation prompts for influencer ${persona.name||"Nova"}, niche: ${(persona.niche||[]).join(",")||"Lifestyle"}, vibe: ${(persona.vibe||[]).join(",")||"Luxury"}.
Style: ${style}. Setting: ${setting||"luxury apartment"}. Outfit: ${outfit||"effortless chic"}. Mood: ${mood||"confident"}.

1. MIDJOURNEY PROMPT (detailed, with camera specs, lighting, --ar 4:5 --v 6)
2. DALL-E PROMPT (clean descriptive version)
3. LIGHTING SETUP (how to achieve this look)
4. EDITING RECIPE (5-step Lightroom/VSCO guide)
5. CAPTION IDEA (for this specific shot)
6. REEL VERSION (how to turn this into a 15-sec reel)`;
    setOutput(await callAI(prompt));
    setLoad(false);
  }

  return (
    <div className="fu">
      <h2 className="sectitle">Visual Generator</h2>
      <p className="subsub">Photo prompts, editing recipes & visual direction for every post</p>
      <div className="g2" style={{gap:22,marginBottom:24}}>
        <div>
          <div className="card">
            <div className="ct">Photo Style</div>
            <div>{STYLES.map(s=><button key={s} className={"tag"+(style===s.toLowerCase().split(" ")[0]?" on":"")} onClick={()=>setStyle(s.toLowerCase().split(" ")[0])}>{s}</button>)}</div>
          </div>
          <div className="card">
            <div className="ct">Shoot Details</div>
            <label>Setting / Location</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:12}}>
              {SETTINGS.map(s=><button key={s} className={"tag"+(setting===s?" on":"")} onClick={()=>setSet(setting===s?"":s)} style={{fontSize:11}}>{s}</button>)}
            </div>
            <label>Outfit</label>
            <input value={outfit} onChange={e=>setOutfit(e.target.value)} placeholder="e.g. oversized blazer, minimal jewelry..."/>
            <label>Mood</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
              {MOODS.map(m=><button key={m} className={"tag"+(mood===m?" on":"")} onClick={()=>setMood(mood===m?"":m)} style={{fontSize:11}}>{m}</button>)}
            </div>
          </div>
          <button className="btn bp" style={{width:"100%",justifyContent:"center"}} onClick={generate} disabled={loading}>
            {loading?"Generating...":"◉ Generate Visual Prompts"}
          </button>
        </div>
        <Out text={output} type="visual" label={`Visual Prompt — ${style} ${setting||"shoot"}`} meta={{style,setting,mood}} loading={loading}/>
      </div>
      <div className="ct" style={{marginBottom:12}}>Sample Content Grid</div>
      <div className="g3">
        {SAMPLES.map((p,i) => (
          <div key={i} style={{background:"var(--s1)",border:"1px solid var(--b)",borderRadius:14,overflow:"hidden"}}>
            <div style={{height:160,background:"linear-gradient(135deg,#1a0a2e,#0a1628,#0d1f1a)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:56}}>{p.e}</div>
            <div style={{padding:"14px"}}>
              <div style={{fontSize:13,marginBottom:6}}>{p.cap}</div>
              <div style={{fontSize:11,color:"var(--teal)",marginBottom:8}}>{p.tags}</div>
              <div style={{display:"flex",gap:12,fontSize:11,color:"var(--muted)"}}>
                <span>♥ {p.lk}</span><span>💬 {p.cm}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DIY TAB ─────────────────────────────────────────────────────────────────
function DIYTab({persona}) {
  const [gtype, setGtype]   = useState("project");
  const [cat, setCat]       = useState("");
  const [lvl, setLvl]       = useState("Beginner (No tools)");
  const [bud, setBud]       = useState("Under $10");
  const [fmt, setFmt]       = useState("Step-by-Step Tutorial");
  const [idea, setIdea]     = useState("");
  const [loading, setLoad]  = useState(false);
  const [output, setOutput] = useState("");

  async function generate() {
    setLoad(true); setOutput("");
    const name = persona.name||"Nova";
    const niche = (persona.niche||[]).join(",")||"DIY";
    const vibe  = (persona.vibe||[]).join(",")||"Authentic";
    let prompt = "";
    if (gtype==="project") {
      prompt = `Generate a viral DIY project for influencer ${name} (niche:${niche}, vibe:${vibe}):
Category: ${cat||"Home Decor"}, Skill: ${lvl}, Budget: ${bud}, Format: ${fmt}, Idea: ${idea||"surprise me with something trending"}

Deliver ALL:
PROJECT NAME (catchy, searchable)
FULL SUPPLY LIST (every item, qty, cost, where to buy — stay within ${bud})
STEP-BY-STEP INSTRUCTIONS (numbered, beginner-friendly, pro tips in [brackets])
REEL SCRIPT (hook 0-3s, scene timestamps, reveal shot, CTA)
CAPTION PACK (short Instagram / long storytelling / Pinterest SEO)
HASHTAG STRATEGY (5 niche + 5 trending + 3 branded)
3 VIRAL HOOK IDEAS (alternative opening lines)
SERIES POTENTIAL (how to turn into recurring series)`;
    } else if (gtype==="flip") {
      prompt = `Create a thrift flip/furniture transformation for ${name} (${vibe} aesthetic):
Budget: ${bud}, Skill: ${lvl}, Category: ${cat||"Furniture Flip"}

FLIP CONCEPT (item + transformation)
THRIFT SHOPPING GUIDE (what to look for, where, price)
TRANSFORMATION STEPS (paint, fabric, hardware — specific products + colors)
PHOTO DIRECTIONS (before/process/reveal angles)
TIKTOK SCRIPT (text overlay + trending audio suggestion)
RESALE VALUE (profit margin if selling)
AFFILIATE LINKS (3-5 specific products to link)`;
    } else {
      prompt = `Build a 30-day DIY content series strategy for ${name} (${niche}, ${vibe}):
Platforms: TikTok + Instagram + Pinterest, Skill: ${lvl}, Budget per project: ${bud}

30-DAY DIY CONTENT CALENDAR (week-by-week: 4 projects/week with format, platform, estimated saves)
TOP 5 VIRAL PROJECT IDEAS (based on current trending DIY searches)
4 CONTENT PILLARS (recurring series this influencer should own)
PINTEREST SEO STRATEGY (board names, pin titles, keyword clusters)
3 COLLAB IDEAS (DIY creator collab concepts)
MONETIZATION ANGLE (how to sell patterns, plans, or e-books)`;
    }
    setOutput(await callAI(prompt, "You are an expert DIY content strategist. You know what goes viral on TikTok, Pinterest, and Instagram for home improvement, upcycling, and crafts."));
    setLoad(false);
  }

  return (
    <div className="fu">
      <div className="row" style={{justifyContent:"space-between",marginBottom:22,flexWrap:"wrap",gap:10}}>
        <div>
          <h2 className="sectitle">DIY Studio</h2>
          <p className="subsub" style={{marginBottom:0}}>Projects, tutorials, thrift flips, and content calendars — fully scripted</p>
        </div>
        <div className="row">
          {[{id:"project",l:"🔨 Project"},{id:"flip",l:"🪑 Thrift Flip"},{id:"calendar",l:"📅 Calendar"}].map(g=>(
            <button key={g.id} className={"btn sm "+(gtype===g.id?"bp":"bo")} onClick={()=>{setGtype(g.id);setOutput("")}}>{g.l}</button>
          ))}
        </div>
      </div>
      <div className="g2" style={{gap:22}}>
        <div>
          {gtype!=="calendar" && (
            <>
              <div className="card">
                <div className="ct">Project Category</div>
                <div>{DIY_CATS.map(c=><button key={c} className={"tag"+(cat===c?" on":"")} onClick={()=>setCat(cat===c?"":c)} style={{fontSize:10}}>{c}</button>)}</div>
              </div>
              <div className="card">
                <div className="ct">Skill & Budget</div>
                <label>Skill Level</label>
                <select value={lvl} onChange={e=>setLvl(e.target.value)}>
                  {DIY_LVL.map(l=><option key={l}>{l}</option>)}
                </select>
                <label>Budget</label>
                <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:4}}>
                  {DIY_BUD.map(b=><button key={b} className={"tag"+(bud===b?" on":"")} onClick={()=>setBud(b)}>{b}</button>)}
                </div>
              </div>
              {gtype==="project" && (
                <div className="card">
                  <div className="ct">Content Format</div>
                  <div>{DIY_FMT.map(f=><button key={f} className={"tag"+(fmt===f?" on":"")} onClick={()=>setFmt(f)} style={{fontSize:11}}>{f}</button>)}</div>
                  <label style={{marginTop:12}}>Project Idea (optional)</label>
                  <input value={idea} onChange={e=>setIdea(e.target.value)} placeholder="e.g. turn old wine crates into a bookshelf..."/>
                </div>
              )}
            </>
          )}
          {gtype==="calendar" && (
            <div className="card">
              <div className="ct">Calendar Settings</div>
              <label>Skill Level</label>
              <select value={lvl} onChange={e=>setLvl(e.target.value)}>
                {DIY_LVL.map(l=><option key={l}>{l}</option>)}
              </select>
              <label>Budget Per Project</label>
              <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                {DIY_BUD.map(b=><button key={b} className={"tag"+(bud===b?" on":"")} onClick={()=>setBud(b)}>{b}</button>)}
              </div>
            </div>
          )}
          <button className="btn bp" style={{width:"100%",justifyContent:"center",fontSize:14}} onClick={generate} disabled={loading}>
            {loading?"Building...":gtype==="project"?"🔨 Generate Full Project":gtype==="flip"?"🪑 Generate Thrift Flip":"📅 Build Content Calendar"}
          </button>
          <div style={{marginTop:14,padding:"12px 16px",background:"rgba(212,168,83,.05)",border:"1px solid rgba(212,168,83,.15)",borderRadius:12}}>
            <div style={{fontSize:11,color:"var(--gold)",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>💡 DIY Trend Alert</div>
            <div style={{fontSize:12,color:"var(--muted)",lineHeight:1.6}}>Cement & thrift flips are getting <span style={{color:"var(--text)"}}>3x more saves</span> right now. Budget under-$20 content outperforms expensive projects by <span style={{color:"var(--text)"}}>78%</span> on TikTok.</div>
          </div>
        </div>
        <div>
          {(loading || output) ? (
            <Out text={output} type="diy" label={`DIY — ${idea||cat||gtype}`} meta={{category:cat,budget:bud,skill:lvl}} loading={loading}/>
          ) : (
            <>
              <div className="ct" style={{marginBottom:12}}>Trending DIY Projects</div>
              {DIY_SMP.map((p,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:14,background:"var(--s1)",border:"1px solid var(--b)",borderRadius:12,padding:"14px 16px",marginBottom:10,cursor:"pointer"}}
                  onClick={()=>{setIdea(p.t);setGtype("project");}}>
                  <div style={{width:44,height:44,borderRadius:10,background:"var(--s2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{p.e}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14,fontWeight:500,marginBottom:3}}>{p.t}</div>
                    <div style={{fontSize:11,color:"var(--gold)"}}>{p.tag}</div>
                    <div className="row" style={{marginTop:4,gap:10}}>
                      <span style={{fontSize:11,color:"var(--teal)"}}>📌 {p.s} saves</span>
                      <span style={{fontSize:11,color:"#4ade80"}}>💰 {p.c}</span>
                    </div>
                  </div>
                  <span style={{fontSize:11,color:"var(--muted)"}}>Use →</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── SCHEDULER TAB ────────────────────────────────────────────────────────────
function SchedulerTab({persona}) {
  const [duration, setDur]      = useState("week");
  const [selPlats, setSelPlats] = useState(["instagram","tiktok"]);
  const [days, setDays]         = useState(defDays());
  const [themes, setThemes]     = useState("");
  const [hashtags, setHt]       = useState(true);
  const [schedule, setSched]    = useState([]);
  const [loading, setLoad]      = useState(false);
  const [progress, setProgress] = useState({cur:0,tot:0,lbl:""});
  const [open, setOpen]         = useState(null);
  const [copied, setCopied]     = useState(null);
  const [view, setView]         = useState("calendar");

  const togPlat = id => setSelPlats(p => p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const togDay  = d  => setDays(ds => ({...ds,[d]:{...ds[d],on:!ds[d].on}}));
  const setSlotTime = (d,i,v) => setDays(ds => {const s=[...ds[d].slots];s[i]={...s[i],t:v};return{...ds,[d]:{...ds[d],slots:s}}});
  const setSlotPlat = (d,i,v) => setDays(ds => {const s=[...ds[d].slots];s[i]={...s[i],p:v};return{...ds,[d]:{...ds[d],slots:s}}});
  const addSlot = d  => setDays(ds => ({...ds,[d]:{...ds[d],slots:[...ds[d].slots,{t:"7:00 PM",p:"auto"}]}}));
  const remSlot = (d,i) => setDays(ds => {const s=ds[d].slots.filter((_,x)=>x!==i);return{...ds,[d]:{...ds[d],slots:s.length?s:[{t:"7:00 PM",p:"auto"}]}}});

  const activeDays = WDAYS.filter(d=>days[d].on);
  const slotsPerWeek = activeDays.reduce((s,d)=>s+days[d].slots.length,0);

  function copyPost(id,text){navigator.clipboard.writeText(text);setCopied(id);setTimeout(()=>setCopied(null),1500)}
  function copyAll(){
    const all = schedule.map(day=>`=== ${day.label} ===\n`+(day.posts||[]).map(p=>`[${(p.platform||"").toUpperCase()} ${p.type} ${p.time}]\nTopic: ${p.topic}\nCaption: ${p.caption}\nHashtags: ${p.hashtags||""}\n`).join("\n")).join("\n\n");
    navigator.clipboard.writeText(all);setCopied("all");setTimeout(()=>setCopied(null),1500);
  }

  function buildSchedStr(wOffset){
    return activeDays.map((day,i)=>{
      const dn=wOffset*activeDays.length+i+1;
      return `Day ${dn} (${day}): `+days[day].slots.map((s,si)=>{
        const pl=s.p==="auto"?selPlats[si%selPlats.length]:s.p;
        return `${s.t} on ${pl}`;
      }).join(", ");
    }).join("\n");
  }

  async function generate() {
    if (!selPlats.length||!activeDays.length) return;
    setSched([]); setLoad(true); setOpen(null);
    const pInfo=`${persona.name||"Nova"}, niches:${(persona.niche||[]).join(",")||"Lifestyle"}, vibe:${(persona.vibe||[]).join(",")||"Authentic"}`;
    const weeks = duration==="week"?1:4;
    setProgress({cur:0,tot:weeks,lbl:"Starting..."});
    const all=[];
    for(let w=0;w<weeks;w++){
      setProgress({cur:w+1,tot:weeks,lbl:`Generating Week ${w+1} of ${weeks}...`});
      const prompt=`Generate social media posts for Week ${w+1} for AI influencer: ${pInfo}.
EXACT POSTING SCHEDULE:\n${buildSchedStr(w)}
Themes: ${themes||"mix of lifestyle, tips, personal stories, trending topics"}
Output ONLY a valid JSON array (no markdown):
[{"day":1,"label":"Day 1 — Mon","posts":[{"platform":"instagram","type":"Reel","time":"7:00 PM","topic":"specific topic","caption":"full ready-to-post caption","hashtags":"#tag1 #tag2 #tag3 #tag4 #tag5 #tag6 #tag7 #tag8","hook":"opening hook line"}]}]
Rules: use EXACT platform and time from schedule; vary post types; captions sound human; no duplicate topics.`;
      const raw = await callAI(prompt,"You are a social media content scheduler. Output ONLY valid JSON array. No markdown, no backticks.");
      try {
        const clean=raw.replace(/```json|```/g,"").trim();
        const match=clean.match(/\[[\s\S]*\]/);
        const parsed=JSON.parse(match?match[0]:clean);
        const offset=w*activeDays.length;
        parsed.forEach((d,i)=>{d.day=offset+i+1;d.week=w+1;});
        all.push(...parsed);setSched([...all]);
      } catch(err) {
        activeDays.forEach((_,i)=>all.push({day:w*activeDays.length+i+1,label:`Week ${w+1} Day ${i+1}`,posts:[],error:"Parse failed — try regenerating"}));
        setSched([...all]);
      }
    }
    setLoad(false);setProgress({cur:0,tot:0,lbl:""});
    if(all.length>0)setOpen(0);
  }

  const totalPosts=schedule.reduce((s,d)=>s+(d.posts||[]).length,0);
  const platCounts={};schedule.forEach(d=>(d.posts||[]).forEach(p=>{platCounts[p.platform]=(platCounts[p.platform]||0)+1}));

  return (
    <div className="fu">
      <div className="row" style={{justifyContent:"space-between",marginBottom:22,flexWrap:"wrap",gap:10}}>
        <div>
          <h2 className="sectitle">Auto Scheduler</h2>
          <p className="subsub" style={{marginBottom:0}}>Pick your days and times — AI writes every post for your exact schedule</p>
        </div>
        {schedule.length>0 && (
          <div className="row">
            <button className={"btn sm "+(view==="calendar"?"bp":"bo")} onClick={()=>setView("calendar")}>📅 Calendar</button>
            <button className={"btn sm "+(view==="list"?"bp":"bo")} onClick={()=>setView("list")}>☰ List</button>
            <button className="btn bo sm" onClick={copyAll}>{copied==="all"?"✓ Copied!":"⬇ Copy All"}</button>
            <button className="btn bo sm" onClick={()=>{setSched([]);setOpen(null);}}>🔄 Redo</button>
          </div>
        )}
      </div>

      {schedule.length===0 && !loading && (
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div className="g2" style={{gap:14}}>
            {/* Duration */}
            <div className="card">
              <div className="ct">Duration</div>
              <div style={{display:"flex",gap:10}}>
                {[{id:"week",e:"📅",l:"1 Week",s:"7 days"},{id:"month",e:"🗓️",l:"1 Month",s:"30 days"}].map(d=>(
                  <div key={d.id} onClick={()=>setDur(d.id)} style={{flex:1,padding:"14px 10px",borderRadius:12,cursor:"pointer",textAlign:"center",background:duration===d.id?"rgba(212,168,83,.1)":"var(--s2)",border:`1px solid ${duration===d.id?"rgba(212,168,83,.4)":"var(--b)"}`,transition:"all .15s"}}>
                    <div style={{fontSize:20,marginBottom:4}}>{d.e}</div>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:17,letterSpacing:1,color:duration===d.id?"var(--gold)":"var(--text)"}}>{d.l}</div>
                    <div style={{fontSize:11,color:"var(--muted)"}}>{d.s}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Platforms */}
            <div className="card">
              <div className="ct">Platforms</div>
              {PLATS.map(p=><button key={p.id} className={"pp"+(selPlats.includes(p.id)?" on":"")} onClick={()=>togPlat(p.id)}>{p.icon} {p.label}</button>)}
            </div>
          </div>

          {/* Day & Time builder */}
          <div className="card">
            <div className="row" style={{justifyContent:"space-between",marginBottom:16}}>
              <div className="ct" style={{marginBottom:0}}>Posting Days & Times</div>
              <div className="row" style={{gap:6}}>
                <button className="btn bo sm" onClick={()=>setDays(ds=>{const n={...ds};WDAYS.forEach(d=>{n[d]={...n[d],on:true}});return n;})}>Select All</button>
                <button className="btn bo sm" onClick={()=>setDays(defDays())}>Reset</button>
              </div>
            </div>
            {/* Day toggles */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:8,marginBottom:18}}>
              {WDAYS.map(day=>{
                const on=days[day].on;
                return (
                  <div key={day} onClick={()=>togDay(day)} style={{padding:"10px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",background:on?"rgba(212,168,83,.1)":"var(--s2)",border:`1px solid ${on?"rgba(212,168,83,.4)":"var(--b)"}`,transition:"all .15s",userSelect:"none"}}>
                    <div style={{fontSize:12,fontWeight:700,color:on?"var(--gold)":"var(--muted)"}}>{day}</div>
                    <div style={{fontSize:10,color:on?"var(--gold)":"var(--muted)",opacity:.7,marginTop:2}}>{on?`${days[day].slots.length} slot${days[day].slots.length!==1?"s":""}` :"off"}</div>
                  </div>
                );
              })}
            </div>
            {/* Slots for each active day */}
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {WDAYS.filter(d=>days[d].on).map(day=>(
                <div key={day} style={{background:"var(--s2)",border:"1px solid var(--b)",borderRadius:12,padding:"14px 16px"}}>
                  <div className="row" style={{justifyContent:"space-between",marginBottom:10}}>
                    <div style={{fontSize:13,fontWeight:700,color:"var(--gold)"}}>{day}</div>
                    <button className="btn bg2 sm" onClick={()=>addSlot(day)}>+ Add Slot</button>
                  </div>
                  {days[day].slots.map((slot,si)=>(
                    <div key={si} className="row" style={{gap:8,marginBottom:8,flexWrap:"wrap"}}>
                      <div style={{width:24,height:24,borderRadius:"50%",background:"rgba(212,168,83,.15)",border:"1px solid rgba(212,168,83,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"var(--gold)",flexShrink:0}}>{si+1}</div>
                      <select value={slot.t} onChange={e=>setSlotTime(day,si,e.target.value)} style={{margin:0,width:"auto",padding:"7px 12px",fontSize:12,background:"var(--bg)",borderRadius:8,cursor:"pointer",flex:"0 0 auto"}}>
                        {TIMES.map(t=><option key={t}>{t}</option>)}
                      </select>
                      <select value={slot.p} onChange={e=>setSlotPlat(day,si,e.target.value)} style={{margin:0,width:"auto",padding:"7px 12px",fontSize:12,background:"var(--bg)",borderRadius:8,cursor:"pointer",flex:"0 0 auto"}}>
                        <option value="auto">Auto (rotate)</option>
                        {selPlats.map(p=><option key={p} value={p}>{PICONS[p]} {p}</option>)}
                      </select>
                      {slot.p!=="auto" && <div style={{width:10,height:10,borderRadius:"50%",background:PCOLORS[slot.p]||"var(--muted)",flexShrink:0}}/>}
                      {days[day].slots.length>1 && <button onClick={()=>remSlot(day,si)} style={{background:"none",border:"none",color:"var(--muted)",cursor:"pointer",fontSize:18,lineHeight:1,padding:"0 4px"}}>×</button>}
                    </div>
                  ))}
                </div>
              ))}
              {activeDays.length===0&&<div style={{textAlign:"center",padding:20,color:"var(--muted)",fontSize:13}}>Select at least one day above</div>}
            </div>
          </div>

          <div className="g2" style={{gap:14}}>
            <div className="card">
              <div className="ct">Content Themes (optional)</div>
              <textarea value={themes} onChange={e=>setThemes(e.target.value)} style={{minHeight:90,marginBottom:0}} placeholder="e.g. spring home refresh, budget DIY tips, product launch week..."/>
            </div>
            <div className="card">
              <div className="ct">Summary</div>
              <div style={{fontSize:13,color:"var(--muted)",lineHeight:2.2}}>
                {[["📅","Duration",duration==="week"?"1 Week":"1 Month"],["🗓️","Active days",`${activeDays.length}/7 — ${activeDays.join(", ")||"none"}`],["✍️","Posts/week",`${slotsPerWeek} posts`],["🔢","Total",`${(duration==="week"?1:4)*slotsPerWeek} posts`],["📱","Platforms",selPlats.join(", ")||"None"]].map(([e,l,v])=>(
                  <div key={l} className="row" style={{gap:8}}>
                    <span>{e}</span><span style={{color:"var(--muted)",minWidth:90}}>{l}:</span><span style={{color:"var(--text)"}}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="row" style={{justifyContent:"space-between",marginTop:12,padding:"10px 14px",background:"var(--s2)",borderRadius:10,border:"1px solid var(--b)"}}>
                <span style={{fontSize:13}}>Include hashtags</span>
                <Toggle on={hashtags} set={setHt}/>
              </div>
              <button className="btn bp" style={{width:"100%",justifyContent:"center",fontSize:14,padding:13,marginTop:12}} onClick={generate} disabled={loading||!selPlats.length||!activeDays.length}>
                {loading?"Generating...":"📅 Generate Schedule"}
              </button>
              {(!selPlats.length||!activeDays.length)&&<div style={{fontSize:11,color:"var(--coral)",textAlign:"center",marginTop:6}}>{!selPlats.length?"Select a platform":"Select a day"}</div>}
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div style={{textAlign:"center",padding:"60px 20px"}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:18}}><Dots/></div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontStyle:"italic",marginBottom:8}}>{progress.lbl}</div>
          <div style={{color:"var(--muted)",fontSize:13,marginBottom:18}}>Writing posts for your exact days and times...</div>
          {progress.tot>1 && (
            <div style={{maxWidth:300,margin:"0 auto"}}>
              <div className="row" style={{justifyContent:"space-between",fontSize:12,color:"var(--muted)",marginBottom:6}}>
                <span>Week {progress.cur} of {progress.tot}</span>
                <span>{Math.round((progress.cur/progress.tot)*100)}%</span>
              </div>
              <div className="pb"><div className="pf" style={{width:`${(progress.cur/progress.tot)*100}%`}}/></div>
            </div>
          )}
          {schedule.length>0&&<div style={{marginTop:18,color:"var(--teal)",fontSize:13}}>✓ {schedule.length} days done...</div>}
        </div>
      )}

      {schedule.length>0 && !loading && (
        <div className="fu">
          <div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap"}}>
            <div className="stat"><div className="snum">{schedule.length}</div><div className="slbl">Days</div></div>
            <div className="stat"><div className="snum">{totalPosts}</div><div className="slbl">Posts</div></div>
            {Object.entries(platCounts).map(([pl,ct])=>(
              <div key={pl} className="stat"><div className="snum" style={{fontSize:22}}>{ct}</div><div className="slbl">{PICONS[pl]} {pl}</div></div>
            ))}
          </div>

          {view==="calendar" && (
            <div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:6,marginBottom:18}}>
                {schedule.map((day,i)=>{
                  const on=open===i;
                  return (
                    <div key={i} onClick={()=>setOpen(on?null:i)} style={{padding:"10px 6px",borderRadius:10,cursor:"pointer",textAlign:"center",background:on?"rgba(212,168,83,.12)":"var(--s1)",border:`1px solid ${on?"rgba(212,168,83,.4)":"var(--b)"}`,transition:"all .15s"}}>
                      <div style={{fontSize:10,color:"var(--muted)",marginBottom:1}}>{day.label?.split("—")[1]?.trim()?.slice(0,3)||"Day"}</div>
                      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,color:on?"var(--gold)":"var(--text)"}}>D{day.day}</div>
                      <div style={{display:"flex",justifyContent:"center",gap:3,marginTop:4,flexWrap:"wrap"}}>
                        {(day.posts||[]).map((p,pi)=><div key={pi} style={{width:7,height:7,borderRadius:"50%",background:PCOLORS[p.platform]||"var(--muted)"}}/>)}
                      </div>
                    </div>
                  );
                })}
              </div>
              {open!==null && schedule[open] && (
                <div className="card fu">
                  <div className="row" style={{justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:8}}>
                    <div>
                      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,letterSpacing:1}}>{schedule[open].label}</div>
                      <div style={{fontSize:12,color:"var(--muted)"}}>{(schedule[open].posts||[]).length} posts</div>
                    </div>
                    <div className="row">
                      {open>0&&<button className="btn bo sm" onClick={()=>setOpen(open-1)}>← Prev</button>}
                      {open<schedule.length-1&&<button className="btn bo sm" onClick={()=>setOpen(open+1)}>Next →</button>}
                    </div>
                  </div>
                  {(schedule[open].posts||[]).map((post,pi)=>{
                    const pid=`${open}-${pi}`;
                    const txt=`[${(post.platform||"").toUpperCase()} ${post.type} ${post.time}]\n\nTopic: ${post.topic}\n\nCaption:\n${post.caption}\n\nHashtags:\n${post.hashtags||""}`;
                    return (
                      <div key={pi} style={{background:"var(--s2)",border:"1px solid var(--b)",borderRadius:12,padding:16,marginBottom:12}}>
                        <div className="row" style={{marginBottom:12}}>
                          <div style={{width:32,height:32,borderRadius:8,background:PCOLORS[post.platform]||"var(--b)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>{PICONS[post.platform]||"📱"}</div>
                          <div><div style={{fontSize:13,fontWeight:500,textTransform:"capitalize"}}>{post.platform}</div><div style={{fontSize:11,color:"var(--muted)"}}>{post.type} · ⏰ {post.time}</div></div>
                          <button onClick={()=>copyPost(pid,txt)} className={"acbtn"+(copied===pid?" ok":"")} style={{marginLeft:"auto"}}>{copied===pid?"✓":"Copy"}</button>
                        </div>
                        <div style={{fontSize:11,color:"var(--gold)",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Topic</div>
                        <div style={{fontSize:14,fontWeight:500,marginBottom:10}}>{post.topic}</div>
                        <div style={{fontSize:11,color:"var(--gold)",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Caption</div>
                        <div style={{fontSize:13,lineHeight:1.7,padding:"10px 12px",background:"rgba(255,255,255,.03)",borderRadius:8,marginBottom:post.hook||hashtags?10:0}}>{post.caption}</div>
                        {post.hook&&<div style={{fontSize:12,color:"var(--teal)",fontStyle:"italic",marginBottom:8}}>Hook: "{post.hook}"</div>}
                        {hashtags&&post.hashtags&&<div style={{fontSize:12,color:"#a78bfa"}}>{post.hashtags}</div>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {view==="list" && (
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {schedule.map((day,di)=>(
                <div key={di} style={{background:"var(--s1)",border:"1px solid var(--b)",borderRadius:14,overflow:"hidden"}}>
                  <div onClick={()=>setOpen(open===di?null:di)} style={{padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer",background:open===di?"rgba(212,168,83,.05)":"transparent"}}>
                    <div className="row" style={{gap:12}}>
                      <div style={{width:34,height:34,borderRadius:8,background:"var(--s2)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color:"var(--gold)",border:"1px solid rgba(212,168,83,.2)",flexShrink:0}}>D{day.day}</div>
                      <div>
                        <div style={{fontSize:14,fontWeight:500}}>{day.label}</div>
                        <div className="row" style={{marginTop:3,gap:5}}>
                          {(day.posts||[]).map((p,pi)=><span key={pi} style={{fontSize:10,padding:"2px 8px",borderRadius:10,background:`${PCOLORS[p.platform]||"#666"}22`,color:PCOLORS[p.platform]||"var(--muted)",border:`1px solid ${PCOLORS[p.platform]||"#666"}44`}}>{PICONS[p.platform]} {p.time}</span>)}
                        </div>
                      </div>
                    </div>
                    <span style={{color:"var(--muted)",fontSize:12}}>{open===di?"▲":"▼"}</span>
                  </div>
                  {open===di && (
                    <div style={{padding:"0 16px 16px",display:"flex",flexDirection:"column",gap:10}}>
                      {(day.posts||[]).map((post,pi)=>{
                        const pid=`l${di}-${pi}`;
                        const txt=`[${(post.platform||"").toUpperCase()} ${post.type} ${post.time}]\n\nTopic: ${post.topic}\n\nCaption:\n${post.caption}\n\nHashtags:\n${post.hashtags||""}`;
                        return (
                          <div key={pi} style={{background:"var(--s2)",border:"1px solid var(--b)",borderRadius:10,padding:14}}>
                            <div className="row" style={{marginBottom:8}}>
                              <span style={{fontSize:16}}>{PICONS[post.platform]||"📱"}</span>
                              <span style={{fontSize:12,color:PCOLORS[post.platform]||"var(--muted)",textTransform:"capitalize",fontWeight:500}}>{post.platform}</span>
                              <span style={{fontSize:11,color:"var(--muted)"}}>· {post.type} · ⏰ {post.time}</span>
                              <button onClick={()=>copyPost(pid,txt)} className={"acbtn"+(copied===pid?" ok":"")} style={{marginLeft:"auto"}}>{copied===pid?"✓":"Copy"}</button>
                            </div>
                            <div style={{fontSize:13,fontWeight:500,marginBottom:5}}>{post.topic}</div>
                            <div style={{fontSize:12,color:"var(--muted)",lineHeight:1.6,marginBottom:6}}>{post.caption}</div>
                            {hashtags&&post.hashtags&&<div style={{fontSize:11,color:"#a78bfa"}}>{post.hashtags}</div>}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── AD CREATOR TAB ──────────────────────────────────────────────────────────
function AdCreatorTab({persona}) {
  const [plat, setPlat]     = useState("tiktok");
  const [fmt, setFmt]       = useState("");
  const [goal, setGoal]     = useState("Brand Awareness");
  const [dur, setDur]       = useState("15 seconds");
  const [tone, setTone]     = useState("Energetic & Hype");
  const [product, setProduct] = useState("");
  const [offer, setOffer]   = useState("");
  const [cta, setCta]       = useState("Shop Now");
  const [target, setTarget] = useState("");
  const [variants, setVar]  = useState("1");
  const [loading, setLoad]  = useState(false);
  const [outputs, setOutputs] = useState([]);
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(null);
  const pd = AD_PLATS.find(p=>p.id===plat)||AD_PLATS[0];
  const CTAS = ["Shop Now","Learn More","Sign Up","Download","Book Now","Get Offer","Watch More","Follow"];
  function copyOut(id,text){navigator.clipboard.writeText(text);setCopied(id);setTimeout(()=>setCopied(null),1500)}

  async function generate() {
    setLoad(true); setOutputs([]); setActive(0);
    const f = fmt||pd.fmts[0];
    const n = parseInt(variants)||1;
    const prompt = `Write ${n} video ad script variant${n>1?"s":""} for:
INFLUENCER: ${persona.name||"Nova"} | Niche: ${(persona.niche||[]).join(",")||"Lifestyle"} | Vibe: ${(persona.vibe||[]).join(",")||"Authentic"}
PLATFORM: ${pd.label} — ${f}
GOAL: ${goal} | LENGTH: ${dur} | TONE: ${tone}
PRODUCT/SERVICE: ${product||"the influencer's personal brand"}
OFFER: ${offer||"none"} | CTA: ${cta}
TARGET AUDIENCE: ${target||"18-34 social media users"}

${n>1?`Generate ${n} DISTINCT variants with different creative angles.\n`:""}
For each variant:
---
## AD VARIANT [N] — [Creative Angle Name]

HOOK (0-3 sec)
Visual: [what's on screen]
Text overlay: [bold text]
Voiceover: "[exact words]"

SCENES BREAKDOWN
[timestamp] Visual: ... | Text: "..." | VO: "..."
(repeat for each scene)

AD COPY
Headline: 
Description: 
CTA Button: ${cta}

AUDIO DIRECTION
Music vibe: | Sound FX: | VO energy:

CAPTION + HASHTAGS

TARGETING SUGGESTIONS
Age/Interests/Behaviors/Lookalike:

BUDGET TIP (daily budget + bid strategy)
A/B TEST IDEA
---
Make scripts feel native to ${pd.label} — organic, scroll-stopping, platform-authentic.`;
    const result = await callAI(prompt, `You are an expert ${pd.label} ad creative director producing viral video ads.`);
    const blocks = result.split(/---\s*\n?##/).filter(Boolean).map((v,i)=>({
      id:i, raw:(i===0?v:"##"+v).trim(),
      label:v.match(/AD VARIANT.*?—\s*(.+)/)?.[1]?.trim()||`Variant ${i+1}`,
    }));
    setOutputs(blocks.length?blocks:[{id:0,raw:result,label:"Ad Script"}]);
    setLoad(false);
  }

  return (
    <div className="fu">
      <h2 className="sectitle">Ad Creator</h2>
      <p className="subsub">Full video ad scripts for TikTok, Snapchat, Reels, YouTube & Facebook</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:20}}>
        {AD_PLATS.map(p=>(
          <div key={p.id} onClick={()=>{setPlat(p.id);setFmt("");}} style={{padding:"14px 8px",borderRadius:14,cursor:"pointer",textAlign:"center",background:plat===p.id?`${p.color}18`:"var(--s1)",border:`2px solid ${plat===p.id?p.color:"var(--b)"}`,transition:"all .15s"}}>
            <div style={{fontSize:24,marginBottom:6}}>{p.icon}</div>
            <div style={{fontSize:11,fontWeight:600,color:plat===p.id?p.color:"var(--muted)",lineHeight:1.3}}>{p.label}</div>
          </div>
        ))}
      </div>
      <div className="g2" style={{gap:20}}>
        <div>
          <div className="card">
            <div className="ct" style={{color:pd.color}}>Ad Format — {pd.label}</div>
            {pd.fmts.map(f=><button key={f} className={"tag"+(fmt===f?" on":"")} style={{...(fmt===f?{background:`${pd.color}18`,borderColor:pd.color,color:pd.color}:{})}} onClick={()=>setFmt(f)}>{f}</button>)}
          </div>
          <div className="card">
            <div className="ct">Product / Service</div>
            <label>What are you promoting?</label><input value={product} onChange={e=>setProduct(e.target.value)} placeholder="e.g. DIY furniture course, skincare kit, merch drop..."/>
            <label>Special Offer</label><input value={offer} onChange={e=>setOffer(e.target.value)} placeholder="e.g. 30% off this week, free shipping, limited drop..."/>
            <label>Target Audience</label><input value={target} onChange={e=>setTarget(e.target.value)} placeholder="e.g. women 25-40 interested in home decor & DIY..."/>
          </div>
          <div className="card">
            <div className="ct">Ad Settings</div>
            <label>Ad Goal</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:14}}>{AD_GOALS.map(g=><button key={g} className={"tag"+(goal===g?" on":"")} style={{fontSize:11}} onClick={()=>setGoal(g)}>{g}</button>)}</div>
            <label>Video Length</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>{AD_DUR.map(d=><button key={d} className={"tag"+(dur===d?" on":"")} style={{fontSize:11}} onClick={()=>setDur(d)}>{d}</button>)}</div>
            <label>Tone & Energy</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:14}}>{AD_TONE.map(t=><button key={t} className={"tag"+(tone===t?" on":"")} style={{fontSize:11}} onClick={()=>setTone(t)}>{t}</button>)}</div>
            <label>CTA Button</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:10}}>{CTAS.map(c=><button key={c} className={"tag"+(cta===c?" on":"")} style={{fontSize:11}} onClick={()=>setCta(c)}>{c}</button>)}</div>
            <input value={cta} onChange={e=>setCta(e.target.value)} placeholder="Custom CTA..." style={{marginBottom:0}}/>
          </div>
          <div className="card">
            <div className="ct">Script Variants</div>
            <div style={{display:"flex",gap:10}}>
              {["1","2","3"].map(n=>(
                <div key={n} onClick={()=>setVar(n)} style={{flex:1,padding:12,borderRadius:10,cursor:"pointer",textAlign:"center",background:variants===n?`${pd.color}15`:"var(--s2)",border:`1px solid ${variants===n?pd.color:"var(--b)"}`,transition:"all .15s"}}>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:variants===n?pd.color:"var(--text)"}}>{n}</div>
                  <div style={{fontSize:11,color:"var(--muted)"}}>variant{n!=="1"?"s":""}</div>
                </div>
              ))}
            </div>
          </div>
          <button className="btn bp" style={{width:"100%",justifyContent:"center",fontSize:14,background:`linear-gradient(135deg,${pd.color},${pd.color}aa)`}} onClick={generate} disabled={loading}>
            {loading?"Writing Scripts...":"🎬 Generate Ad Scripts"}
          </button>
        </div>
        <div>
          {loading && (
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:300,background:"var(--s1)",border:"1px solid var(--b)",borderRadius:16}}>
              <div style={{textAlign:"center"}}><div style={{fontSize:40,marginBottom:14}}>{pd.icon}</div><Dots/><div style={{marginTop:10,fontSize:13,color:"var(--muted)"}}>Writing {pd.label} scripts...</div></div>
            </div>
          )}
          {!loading && outputs.length===0 && (
            <div style={{background:"var(--s1)",border:"1px solid var(--b)",borderRadius:16,padding:32,textAlign:"center"}}>
              <div style={{fontSize:48,marginBottom:14}}>{pd.icon}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontStyle:"italic",marginBottom:8}}>{pd.label} Ad Scripts</div>
              <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.7}}>Fill in your product, goal, and tone — get scroll-stopping ad scripts with scenes, voiceovers, on-screen text, and targeting recs.</div>
            </div>
          )}
          {!loading && outputs.length>0 && (
            <div className="fu">
              {outputs.length>1 && (
                <div className="row" style={{marginBottom:12,gap:6}}>
                  {outputs.map((o,i)=>(
                    <button key={i} onClick={()=>setActive(i)} style={{padding:"7px 13px",borderRadius:10,cursor:"pointer",fontSize:12,fontFamily:"'DM Sans',sans-serif",background:active===i?`${pd.color}18`:"var(--s2)",border:`1px solid ${active===i?pd.color:"var(--b)"}`,color:active===i?pd.color:"var(--muted)",transition:"all .15s"}}>
                      {o.label||`Variant ${i+1}`}
                    </button>
                  ))}
                </div>
              )}
              {outputs[active] && (
                <div style={{position:"relative"}}>
                  <div className="acbar">
                    <button onClick={()=>copyOut(`o${active}`,outputs[active].raw)} className={"acbtn"+(copied===`o${active}`?" ok":"")}>{copied===`o${active}`?"✓ Copied":"Copy"}</button>
                    <SaveBtn content={outputs[active].raw} type="ad" label={`${pd.label} Ad — ${outputs[active].label}`} meta={{platform:plat,format:fmt,goal,product}}/>
                  </div>
                  <div style={{background:"var(--s2)",border:`1px solid ${pd.color}44`,borderRadius:14,padding:"44px 18px 18px",fontSize:13,lineHeight:1.8,color:"var(--text)",whiteSpace:"pre-wrap",maxHeight:600,overflowY:"auto"}}>
                    {outputs[active].raw}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── BRANDS TAB ──────────────────────────────────────────────────────────────
function BrandsTab({persona}) {
  const [sel, setSel]       = useState(null);
  const [custom, setCustom] = useState("");
  const [deal, setDeal]     = useState("sponsored post");
  const [rate, setRate]     = useState("");
  const [loading, setLoad]  = useState(false);
  const [output, setOutput] = useState("");

  async function generate() {
    setLoad(true); setOutput("");
    const brand = custom||sel?.n||"Nike";
    const prompt = `Write a brand deal pitch from AI influencer ${persona.name||"Nova"} to ${brand}.
Profile: Age ${persona.age||"24"}, Niches:${(persona.niche||[]).join(",")||"Lifestyle"}, Vibe:${(persona.vibe||[]).join(",")||"Authentic"}
Deal type: ${deal}. Rate: ${rate||"market rate"}.

1. COLD EMAIL PITCH (subject line + 150-word email)
2. MEDIA KIT HIGHLIGHTS (5 bullet points)
3. CONTENT CONCEPT (3-post campaign idea for ${brand})
4. DELIVERABLES LIST
5. RATE JUSTIFICATION (3 reasons why rate is fair)
6. FOLLOW-UP DM (60-word Instagram DM)

Tone: confident, data-aware, premium.`;
    setOutput(await callAI(prompt));
    setLoad(false);
  }

  return (
    <div className="fu">
      <h2 className="sectitle">Brand Deal Hub</h2>
      <p className="subsub">Pitch decks, rate cards, and campaign concepts for every partnership</p>
      <div style={{display:"flex",gap:12,marginBottom:22,flexWrap:"wrap"}}>
        {[{n:"12",l:"Active Deals"},{n:"$84K",l:"Monthly Brand Rev"},{n:"4.7%",l:"Avg. Engagement"},{n:"340K",l:"Total Reach"}].map(s=>(
          <div key={s.l} className="stat" style={{flex:1,minWidth:110}}><div className="snum" style={{fontSize:26}}>{s.n}</div><div className="slbl">{s.l}</div></div>
        ))}
      </div>
      <div className="g2" style={{gap:22}}>
        <div>
          <div className="ct" style={{marginBottom:12}}>Brand Directory</div>
          {BRANDS.map(b=>(
            <div key={b.n} onClick={()=>setSel(sel?.n===b.n?null:b)} style={{display:"flex",alignItems:"center",gap:14,background:"var(--s1)",border:`1px solid ${sel?.n===b.n?"rgba(212,168,83,.4)":"var(--b)"}`,borderRadius:12,padding:"14px 16px",marginBottom:10,cursor:"pointer",transition:"all .15s"}}>
              <div style={{width:44,height:44,borderRadius:12,background:"var(--s2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,border:"1px solid var(--b)",flexShrink:0}}>{b.e}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:500}}>{b.n}</div>
                <div style={{fontSize:11,color:"var(--gold)",textTransform:"uppercase",letterSpacing:1}}>{b.c}</div>
                <div style={{fontSize:16,fontWeight:300,marginTop:3}}>{b.r}</div>
              </div>
              {sel?.n===b.n&&<span style={{color:"var(--gold)"}}>✓</span>}
            </div>
          ))}
        </div>
        <div>
          <div className="card">
            <div className="ct">Pitch Builder</div>
            <label>Custom Brand (or use selected)</label><input value={custom} onChange={e=>setCustom(e.target.value)} placeholder="e.g. Glossier, Tesla, Airbnb..."/>
            <label>Deal Type</label>
            <select value={deal} onChange={e=>setDeal(e.target.value)}>
              {["sponsored post","brand ambassador","gifted collaboration","affiliate partnership","product launch","event attendance"].map(o=><option key={o}>{o}</option>)}
            </select>
            <label>Your Rate</label><input value={rate} onChange={e=>setRate(e.target.value)} placeholder="e.g. $5,000 per post..."/>
            <button className="btn bp" style={{width:"100%",justifyContent:"center"}} onClick={generate} disabled={loading}>
              {loading?"Generating Pitch...":"◆ Generate Brand Pitch"}
            </button>
          </div>
          <Out text={output} type="brand" label={`Brand Pitch — ${custom||sel?.n||"Brand"}`} meta={{brand:custom||sel?.n,deal,rate}} loading={loading}/>
        </div>
      </div>
    </div>
  );
}

// ─── MONEY TAB ────────────────────────────────────────────────────────────────
function MoneyTab({persona}) {
  const [followers, setFol] = useState("50000");
  const [selPlats, setSelP] = useState(["instagram","tiktok"]);
  const [goal, setGoal]     = useState("$10,000/month");
  const [loading, setLoad]  = useState(false);
  const [output, setOutput] = useState("");
  const togP = id => setSelP(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);

  const STREAMS = [
    {icon:"◆",n:"Sponsored Posts",  amt:"$12,400",g:"+18% MoM",pct:62},
    {icon:"◉",n:"Affiliate Links",  amt:"$3,200", g:"+41% MoM",pct:28},
    {icon:"✦",n:"Digital Products", amt:"$1,800", g:"+92% MoM",pct:18},
    {icon:"◈",n:"Platform Funds",   amt:"$640",   g:"+7% MoM", pct:8},
    {icon:"▸",n:"Paid Communities", amt:"$2,100", g:"+55% MoM",pct:22},
    {icon:"✶",n:"Licensing & IP",   amt:"$890",   g:"New",     pct:12},
  ];

  async function generate() {
    setLoad(true); setOutput("");
    const prompt = `Create a complete monetization roadmap for AI influencer ${persona.name||"Nova"}:
Profile: ${(persona.niche||[]).join(",")||"Lifestyle"}, ${(persona.vibe||[]).join(",")||"Authentic"}
Followers: ${followers}. Platforms: ${selPlats.join(",")}. Goal: ${goal}.

1. 90-DAY MONETIZATION SPRINT (week-by-week action plan)
2. 6 REVENUE STREAMS (ranked by ease + potential, with first steps)
3. PRICING CALCULATOR (rates for posts, stories, reels, UGC, ambassadorships based on ${followers} followers)
4. DIGITAL PRODUCTS (3 specific product ideas for this niche)
5. AFFILIATE PROGRAMS (5 specific programs to join immediately)
6. FIRST BRAND DM (exact script to send cold outreach today)

Be specific with numbers, platforms, and tool names.`;
    setOutput(await callAI(prompt));
    setLoad(false);
  }

  return (
    <div className="fu">
      <h2 className="sectitle">Monetization Engine</h2>
      <p className="subsub">Revenue streams, rate cards & 90-day growth plans</p>
      <div className="g3" style={{marginBottom:22}}>
        {STREAMS.map((s,i)=>(
          <div key={i} style={{background:"var(--s1)",border:"1px solid var(--b)",borderRadius:14,padding:20,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,var(--gold),var(--coral))"}}/>
            <div style={{fontSize:13,marginBottom:6,color:"var(--muted)"}}>{s.icon} {s.n}</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,letterSpacing:1}}>{s.amt}</div>
            <div style={{fontSize:12,color:"#4ade80",marginTop:3}}>↑ {s.g}</div>
            <div className="pb"><div className="pf" style={{width:`${s.pct}%`}}/></div>
          </div>
        ))}
      </div>
      <div className="g2" style={{gap:22}}>
        <div>
          <div className="card">
            <div className="ct">Strategy Generator</div>
            <label>Current Followers</label><input value={followers} onChange={e=>setFol(e.target.value)} placeholder="50000"/>
            <label>Active Platforms</label>
            <div style={{marginBottom:14}}>{PLATS.map(p=><button key={p.id} className={"pp"+(selPlats.includes(p.id)?" on":"")} onClick={()=>togP(p.id)}>{p.icon} {p.label}</button>)}</div>
            <label>Monthly Revenue Goal</label>
            <select value={goal} onChange={e=>setGoal(e.target.value)}>
              {["$1,000/month","$5,000/month","$10,000/month","$25,000/month","$50,000/month","$100,000/month"].map(o=><option key={o}>{o}</option>)}
            </select>
            <button className="btn bp" style={{width:"100%",justifyContent:"center"}} onClick={generate} disabled={loading}>
              {loading?"Building Strategy...":"◎ Generate Revenue Roadmap"}
            </button>
          </div>
        </div>
        <div>
          {!output && !loading && (
            <div className="card" style={{textAlign:"center",padding:32}}>
              <div style={{fontSize:48,marginBottom:14}}>◎</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontStyle:"italic",marginBottom:8}}>Your Revenue Blueprint</div>
              <div style={{color:"var(--muted)",fontSize:13,lineHeight:1.6}}>Generate a personalized 90-day monetization plan with rate cards, product ideas, and brand outreach scripts.</div>
            </div>
          )}
          <Out text={output} type="money" label={`Revenue Roadmap — ${goal}`} meta={{goal,followers,platforms:selPlats.join(",")}} loading={loading}/>
        </div>
      </div>
    </div>
  );
}

// ─── LIBRARY TAB ─────────────────────────────────────────────────────────────
function LibraryTab() {
  const [items, setItems]   = useState([]);
  const [loading, setLoad]  = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [open, setOpen]     = useState(null);
  const [copied, setCopied] = useState(null);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => { libLoad().then(data => {setItems(data); setLoad(false);}); }, []);

  async function handleDel(id) {
    await delItem(id);
    setItems(prev => prev.filter(i=>i.id!==id));
    if (open===id) setOpen(null);
  }
  async function handleClearAll() {
    await libSave([]);
    setItems([]);
    setOpen(null);
    setConfirm(false);
  }
  function copyText(id,text){navigator.clipboard.writeText(text);setCopied(id);setTimeout(()=>setCopied(null),1500)}

  function fmtDate(iso) {
    try { const d=new Date(iso); return d.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})+" · "+d.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}); }
    catch(e){ return iso; }
  }

  const allTypes = ["all",...Object.keys(TMETA)];
  const filtered = items.filter(item => {
    const mType = filter==="all"||item.type===filter;
    const mSrch = !search||item.label.toLowerCase().includes(search.toLowerCase())||item.content.toLowerCase().includes(search.toLowerCase());
    return mType&&mSrch;
  });
  const counts = {};
  items.forEach(i=>{counts[i.type]=(counts[i.type]||0)+1});

  return (
    <div className="fu">
      {confirm && <Confirm msg="Delete all saved items? This cannot be undone." onYes={handleClearAll} onNo={()=>setConfirm(false)}/>}
      <div className="row" style={{justifyContent:"space-between",marginBottom:22,gap:10}}>
        <div>
          <h2 className="sectitle">Saved Library</h2>
          <p className="subsub" style={{marginBottom:0}}>All generated content — searchable, copyable, persistent across sessions</p>
        </div>
        {items.length>0&&<button className="btn bo sm" style={{color:"var(--coral)",borderColor:"rgba(255,107,107,.3)"}} onClick={()=>setConfirm(true)}>🗑 Clear All</button>}
      </div>

      {loading && <div style={{display:"flex",justifyContent:"center",padding:60}}><Dots/></div>}

      {!loading && items.length===0 && (
        <div style={{textAlign:"center",padding:"80px 20px"}}>
          <div style={{fontSize:64,marginBottom:18}}>💾</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontStyle:"italic",marginBottom:10}}>Nothing saved yet</div>
          <div style={{color:"var(--muted)",fontSize:14,lineHeight:1.7,maxWidth:420,margin:"0 auto"}}>
            Every time you generate content, hit the <span style={{color:"var(--gold)"}}>💾 Save</span> button on any output to store it here permanently — personas, captions, ad scripts, schedules, everything.
          </div>
        </div>
      )}

      {!loading && items.length>0 && (
        <div>
          {/* Stats */}
          <div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap"}}>
            <div className="stat" style={{flex:1,minWidth:80}}><div className="snum" style={{fontSize:26}}>{items.length}</div><div className="slbl">Total Saved</div></div>
            {Object.entries(counts).map(([type,count])=>{
              const tm=TMETA[type]||{icon:"✦",color:"#d4a853",label:type};
              return (
                <div key={type} className="stat" style={{flex:1,minWidth:80,cursor:"pointer",borderColor:filter===type?tm.color:undefined}} onClick={()=>setFilter(filter===type?"all":type)}>
                  <div className="snum" style={{fontSize:26,color:tm.color}}>{count}</div>
                  <div className="slbl">{tm.icon} {tm.label}</div>
                </div>
              );
            })}
          </div>

          {/* Search & filter */}
          <div className="row" style={{marginBottom:14,gap:10}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search saved items..." style={{flex:1,minWidth:200,marginBottom:0}}/>
            <div className="row" style={{gap:5,flexWrap:"wrap"}}>
              {allTypes.map(t=>{
                const tm=t==="all"?{icon:"✦",color:"#d4a853",label:"All"}:(TMETA[t]||{icon:"✦",color:"#d4a853",label:t});
                return (
                  <button key={t} onClick={()=>setFilter(t)} style={{padding:"6px 13px",borderRadius:20,cursor:"pointer",fontSize:11,fontFamily:"'DM Sans',sans-serif",border:`1px solid ${filter===t?tm.color:"var(--b)"}`,background:filter===t?`${tm.color}18`:"transparent",color:filter===t?tm.color:"var(--muted)",transition:"all .15s"}}>
                    {tm.icon} {tm.label} {t!=="all"&&counts[t]?`(${counts[t]})`:t==="all"?`(${items.length})`:""}
                  </button>
                );
              })}
            </div>
          </div>

          {filtered.length===0 && <div style={{textAlign:"center",padding:40,color:"var(--muted)",fontSize:14}}>No items match your search or filter.</div>}

          {/* Items */}
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {filtered.map(item=>{
              const tm=TMETA[item.type]||{icon:"✦",color:"#d4a853",label:item.type};
              const isOpen=open===item.id;
              const preview=item.content.slice(0,120).replace(/\n+/g," ")+(item.content.length>120?"…":"");
              return (
                <div key={item.id} style={{background:"var(--s1)",border:`1px solid ${isOpen?tm.color+"44":"var(--b)"}`,borderRadius:14,overflow:"hidden",transition:"border-color .2s"}}>
                  <div className="row" style={{padding:"14px 16px",cursor:"pointer",gap:12}} onClick={()=>setOpen(isOpen?null:item.id)}>
                    <div style={{width:36,height:36,borderRadius:10,flexShrink:0,background:`${tm.color}15`,border:`1px solid ${tm.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{tm.icon}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div className="row" style={{marginBottom:2,flexWrap:"wrap",gap:6}}>
                        <span style={{fontSize:14,fontWeight:500}}>{item.label}</span>
                        <span className="nbd" style={{background:`${tm.color}15`,color:tm.color,border:`1px solid ${tm.color}30`}}>{tm.label}</span>
                        {item.meta?.platform&&<span style={{fontSize:10,color:"var(--muted)"}}>{item.meta.platform}</span>}
                      </div>
                      <div style={{fontSize:12,color:"var(--muted)",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{preview}</div>
                      <div style={{fontSize:10,color:"var(--muted)",marginTop:3,opacity:.6}}>{fmtDate(item.at)}</div>
                    </div>
                    <div className="row" style={{gap:6,flexShrink:0}} onClick={e=>e.stopPropagation()}>
                      <button onClick={()=>copyText(item.id,item.content)} className={"acbtn"+(copied===item.id?" ok":"")}>{copied===item.id?"✓":"Copy"}</button>
                      <button onClick={()=>handleDel(item.id)} className="acbtn" style={{color:"rgba(255,107,107,.6)",borderColor:"rgba(255,107,107,.2)"}}>✕</button>
                      <span style={{color:"var(--muted)",fontSize:12}}>{isOpen?"▲":"▼"}</span>
                    </div>
                  </div>
                  {isOpen&&(
                    <div style={{borderTop:"1px solid var(--b)",padding:16,background:"var(--s2)",fontSize:13,color:"var(--text)",lineHeight:1.8,whiteSpace:"pre-wrap",maxHeight:400,overflowY:"auto"}}>
                      {Object.keys(item.meta||{}).length>0&&(
                        <div className="row" style={{flexWrap:"wrap",marginBottom:10}}>
                          {Object.entries(item.meta).map(([k,v])=>v&&(
                            <span key={k} className="nbd" style={{background:`${tm.color}10`,color:tm.color,border:`1px solid ${tm.color}20`}}>{k}: {String(v)}</span>
                          ))}
                        </div>
                      )}
                      {item.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function Confirm({msg,onYes,onNo}) {
  return (
    <div className="dlg">
      <div className="dlgb">
        <div style={{fontSize:15,marginBottom:18}}>{msg}</div>
        <div className="row" style={{justifyContent:"center",gap:10}}>
          <button className="btn bo" onClick={onNo}>Cancel</button>
          <button className="btn" style={{background:"var(--coral)",color:"#fff"}} onClick={onYes}>Delete All</button>
        </div>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab]       = useState("persona");
  const [persona, setPersona] = useState({name:"",age:"24",niche:[],vibe:[]});

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <header className="hdr">
          <div className="logo">INFLUX.AI</div>
          <div className="row" style={{gap:10}}>
            {persona.name && <div style={{padding:"6px 14px",background:"rgba(212,168,83,.08)",border:"1px solid rgba(212,168,83,.2)",borderRadius:8,fontSize:12}}>✦ {persona.name}</div>}
            <div className="badge">AI STUDIO</div>
          </div>
        </header>
        <nav className="nav">
          {TABS.map(t=>(
            <button key={t.id} className={"nb"+(tab===t.id?" on":"")} onClick={()=>setTab(t.id)}>
              <span style={{fontSize:15}}>{t.icon}</span>{t.label}
            </button>
          ))}
        </nav>
        <main className="main">
          {tab==="persona"   && <PersonaTab   persona={persona} setPersona={setPersona}/>}
          {tab==="content"   && <ContentTab   persona={persona}/>}
          {tab==="visual"    && <VisualTab     persona={persona}/>}
          {tab==="diy"       && <DIYTab        persona={persona}/>}
          {tab==="scheduler" && <SchedulerTab  persona={persona}/>}
          {tab==="ads"       && <AdCreatorTab  persona={persona}/>}
          {tab==="brands"    && <BrandsTab     persona={persona}/>}
          {tab==="money"     && <MoneyTab      persona={persona}/>}
          {tab==="library"   && <LibraryTab/>}
        </main>
      </div>
    </>
  );
}
