import { useState, useRef, useCallback } from "react";
import { LOGO_GOLD, LOGO_DARK } from "./assets/logos.js";

// ─── Paleta oficial Gabryelle Campos ───────────────────────────────────────
const P = {
  bg:        "#1a1612",
  surface:   "#231f1a",
  card:      "#2c2720",
  border:    "#3d3530",
  gold1:     "#EFD976",
  gold2:     "#CDA162",
  gold3:     "#B88940",
  gold4:     "#886337",
  charcoal:  "#373435",
  gray1:     "#606062",
  gray2:     "#D2D3D5",
  white:     "#FFFFFF",
  text:      "#F5EFE0",
  muted:     "#9A8E7E",
  error:     "#C0614A",
  green:     "#6BAF82",
};

// ─── Estilos globais inline ─────────────────────────────────────────────────
const G = {
  font:      "'Montserrat', sans-serif",
  fontSerif: "'Cormorant Garamond', Georgia, serif",
};

// ─── Helpers ────────────────────────────────────────────────────────────────
const OBJETIVOS = [
  { v: "educar",     l: "Educar / Informar" },
  { v: "captar",     l: "Captar clientes" },
  { v: "autoridade", l: "Mostrar autoridade" },
  { v: "dor",        l: "Tocar na dor" },
  { v: "resultado",  l: "Mostrar resultado" },
];

const OBJ_MAP = {
  educar:     "educar o público explicando o tema de forma clara e acessível",
  captar:     "captar leads e converter seguidores em clientes de consultoria",
  autoridade: "posicionar Gabryelle como maior especialista em redução de INSS de obras",
  dor:        "tocar na dor do cliente que está perdendo dinheiro sem saber",
  resultado:  "mostrar cases e resultados concretos que ela já obteve para clientes",
};

const STARS = [1,2,3,4,5];

// ─── Slide Canvas (arte final) ──────────────────────────────────────────────
function SlideArt({ slide, idx, total, fotoUrl, logoUrl }) {
  const isCapa = slide.tipo === "capa";
  const isCTA  = slide.tipo === "cta";

  const base = {
    width: "100%",
    aspectRatio: "1/1",
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    fontFamily: G.fontSerif,
    flexShrink: 0,
    border: `1px solid ${P.border}`,
  };

  if (isCapa) return (
    <div style={{ ...base, background: P.charcoal }}>
      {/* Fundo com foto se disponível */}
      {fotoUrl && (
        <div style={{ position:"absolute", inset:0, backgroundImage:`url(${fotoUrl})`, backgroundSize:"cover", backgroundPosition:"center top", opacity:0.35 }} />
      )}
      {/* Overlay gradiente */}
      <div style={{ position:"absolute", inset:0, background:`linear-gradient(160deg, rgba(55,52,53,0.6) 0%, rgba(26,22,18,0.95) 100%)` }} />
      {/* Detalhe dourado */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, transparent, ${P.gold2}, transparent)` }} />
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:`linear-gradient(90deg, transparent, ${P.gold2}, transparent)` }} />
      {/* Conteúdo */}
      <div style={{ position:"relative", zIndex:1, height:"100%", display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"16px 18px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          {logoUrl && <img src={logoUrl} alt="logo" style={{ height:28, objectFit:"contain", opacity:0.9 }} />}
          <span style={{ fontSize:9, fontFamily:G.font, fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:P.gold2, marginLeft:"auto" }}>
            @gabryellec
          </span>
        </div>
        <div>
          <div style={{ fontSize:8, fontFamily:G.font, fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", color:P.gold2, marginBottom:8 }}>
            Regularização de Obras
          </div>
          <div style={{ fontSize:17, fontStyle:"italic", fontWeight:300, lineHeight:1.25, color:P.white, marginBottom:10 }}>
            {slide.titular}
          </div>
          <div style={{ width:32, height:1.5, background:P.gold3 }} />
        </div>
      </div>
    </div>
  );

  if (isCTA) return (
    <div style={{ ...base, background:`linear-gradient(145deg, ${P.charcoal}, #1a1612)`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:20 }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, transparent, ${P.gold2}, transparent)` }} />
      {logoUrl && <img src={logoUrl} alt="logo" style={{ height:36, objectFit:"contain", marginBottom:14, opacity:0.95 }} />}
      <div style={{ fontSize:15, fontStyle:"italic", fontWeight:400, lineHeight:1.3, color:P.white, marginBottom:10 }}>{slide.titular}</div>
      <div style={{ fontSize:10, fontFamily:G.font, color:P.muted, lineHeight:1.6, marginBottom:14 }}>{slide.corpo}</div>
      <div style={{ background:`linear-gradient(135deg, ${P.gold2}, ${P.gold4})`, color:P.charcoal, borderRadius:20, padding:"7px 18px", fontSize:10, fontWeight:700, fontFamily:G.font }}>
        Fale com Gabryelle
      </div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:`linear-gradient(90deg, transparent, ${P.gold2}, transparent)` }} />
    </div>
  );

  // Slide conteúdo / destaque
  const isDestaque = slide.tipo === "destaque";
  return (
    <div style={{ ...base, background: isDestaque ? P.charcoal : P.surface, display:"flex", flexDirection:"column", padding:"14px 16px", position:"relative" }}>
      {isDestaque && fotoUrl && (
        <div style={{ position:"absolute", inset:0, backgroundImage:`url(${fotoUrl})`, backgroundSize:"cover", backgroundPosition:"center", opacity:0.12 }} />
      )}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:`linear-gradient(90deg, transparent, ${P.gold3}, transparent)` }} />
      <div style={{ position:"relative", zIndex:1, flex:1, display:"flex", flexDirection:"column" }}>
        <div style={{ fontSize:8, fontFamily:G.font, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:P.gold3, marginBottom:8 }}>
          {idx}/{total-1} · {isDestaque ? "Destaque" : "Conteúdo"}
        </div>
        <div style={{ fontSize:14, fontStyle:"italic", fontWeight:400, lineHeight:1.3, color:P.white, marginBottom:8, flex:1 }}>
          {slide.titular}
        </div>
        <div style={{ fontSize:10, fontFamily:G.font, color:P.gray2, lineHeight:1.65 }}>
          {slide.corpo}
        </div>
        {slide.destaque && (
          <div style={{ marginTop:8, paddingLeft:10, borderLeft:`2px solid ${P.gold3}`, fontSize:10, fontFamily:G.font, fontWeight:600, color:P.gold1 }}>
            {slide.destaque}
          </div>
        )}
      </div>
      {logoUrl && (
        <img src={logoUrl} alt="" style={{ position:"absolute", bottom:10, right:12, height:16, opacity:0.4, objectFit:"contain" }} />
      )}
    </div>
  );
}

// ─── Painel de edição de um slide ───────────────────────────────────────────
function SlideEditor({ slide, idx, total, onChange }) {
  const tipos = ["capa","conteudo","destaque","cta"];
  return (
    <div style={{ background:P.card, border:`1px solid ${P.border}`, borderRadius:12, padding:16, marginBottom:10 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <span style={{ fontSize:11, fontFamily:G.font, fontWeight:700, color:P.gold2, textTransform:"uppercase", letterSpacing:"0.1em" }}>
          Slide {idx}
        </span>
        <select value={slide.tipo} onChange={e => onChange({...slide, tipo:e.target.value})}
          style={{ background:P.surface, border:`1px solid ${P.border}`, color:P.muted, borderRadius:6, padding:"3px 8px", fontSize:11, fontFamily:G.font, outline:"none" }}>
          {tipos.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div style={{ marginBottom:8 }}>
        <div style={{ fontSize:10, color:P.muted, fontFamily:G.font, marginBottom:4 }}>Título / Frase principal</div>
        <textarea value={slide.titular} onChange={e => onChange({...slide, titular:e.target.value})} rows={2}
          style={{ width:"100%", background:P.surface, border:`1px solid ${P.border}`, borderRadius:8, padding:"8px 10px", color:P.text, fontSize:13, fontFamily:G.fontSerif, fontStyle:"italic", outline:"none", resize:"vertical", lineHeight:1.4 }} />
      </div>
      <div style={{ marginBottom:8 }}>
        <div style={{ fontSize:10, color:P.muted, fontFamily:G.font, marginBottom:4 }}>Texto do corpo</div>
        <textarea value={slide.corpo} onChange={e => onChange({...slide, corpo:e.target.value})} rows={3}
          style={{ width:"100%", background:P.surface, border:`1px solid ${P.border}`, borderRadius:8, padding:"8px 10px", color:P.text, fontSize:12, fontFamily:G.font, outline:"none", resize:"vertical", lineHeight:1.6 }} />
      </div>
      <div>
        <div style={{ fontSize:10, color:P.muted, fontFamily:G.font, marginBottom:4 }}>Destaque (opcional)</div>
        <input value={slide.destaque || ""} onChange={e => onChange({...slide, destaque:e.target.value || null})}
          placeholder="Ex: → Economia de até 40%"
          style={{ width:"100%", background:P.surface, border:`1px solid ${P.border}`, borderRadius:8, padding:"7px 10px", color:P.gold1, fontSize:12, fontFamily:G.font, outline:"none" }} />
      </div>
    </div>
  );
}

// ─── App principal ───────────────────────────────────────────────────────────
export default function App() {
  // Config
  const [apiKey, setApiKey]   = useState(() => localStorage.getItem("gc_api_key") || "");
  const [showKey, setShowKey] = useState(false);
  const [tab, setTab]         = useState("carrossel"); // carrossel | historico

  // Foto da Gabryelle
  const [fotoUrl, setFotoUrl] = useState(null);
  const fotoRef = useRef();

  // Formulário
  const [tema, setTema]           = useState("");
  const [descricao, setDescricao] = useState("");
  const [objetivo, setObjetivo]   = useState("educar");
  const [qtd, setQtd]             = useState("7");

  // Estado de fluxo
  const [fase, setFase]     = useState("form"); // form | revisao | arte
  const [loading, setLoading] = useState(false);
  const [erro, setErro]     = useState("");

  // Conteúdo gerado
  const [slides, setSlides]     = useState([]);
  const [legenda, setLegenda]   = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [tituloPost, setTituloPost] = useState("");

  // Avaliação
  const [nota, setNota]             = useState(0);
  const [notaEnviada, setNotaEnviada] = useState(false);

  // Histórico
  const [historico, setHistorico] = useState(() => {
    try { return JSON.parse(localStorage.getItem("gc_historico") || "[]"); } catch { return []; }
  });

  // Copiar
  const [copiado, setCopiaodo] = useState("");
  function copiar(texto, key) {
    navigator.clipboard.writeText(texto).catch(()=>{});
    setCopiaodo(key);
    setTimeout(()=>setCopiaodo(""), 2200);
  }

  // Salvar chave
  function salvarKey(v) { setApiKey(v); localStorage.setItem("gc_api_key", v); }

  // Upload foto
  function handleFoto(e) {
    const f = e.target.files[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setFotoUrl(url);
  }

  // ── Gerar roteiro ──────────────────────────────────────────────────────────
  async function gerarRoteiro() {
    if (!apiKey.trim()) { setErro("Cole sua chave de API Anthropic para continuar."); return; }
    if (!tema.trim())   { setErro("Digite o tema do post."); return; }
    setErro(""); setLoading(true);

    const prompt = `Você é o assistente de conteúdo de Gabryelle Campos, contadora especialista em regularização de obras e redução de INSS na Receita Federal, com perfil @gabryellec no Instagram.

Crie um carrossel de ${qtd} slides sobre: "${tema}".
${descricao ? `Contexto adicional: ${descricao}` : ""}
Objetivo: ${OBJ_MAP[objetivo]}.

Tom: direto, premium, confiante, feminino-profissional. Frases curtas e impactantes.

Retorne SOMENTE JSON válido, sem markdown:
{
  "titulo": "título chamativo para o post (máx 65 chars)",
  "slides": [
    {
      "numero": 1,
      "tipo": "capa",
      "titular": "frase de impacto (máx 55 chars, pode ser interrogativa ou provocativa)",
      "corpo": "texto explicativo (máx 130 chars)",
      "destaque": null
    }
  ],
  "legenda": "legenda Instagram: gancho forte + valor + CTA para o direct (máx 350 chars, pode ter emojis)",
  "hashtags": ["tag1","tag2","tag3","tag4","tag5","tag6","tag7","tag8","tag9","tag10"]
}

Regras obrigatórias:
- Slide 1: tipo="capa", sem corpo longo, só uma frase poderosa
- Slide final: tipo="cta", convidando para falar no direct
- Slides 2 a (n-2): tipo="conteudo" ou "destaque" (máx 2 destaques)
- Use dados reais quando relevante (% de economia, prazos legais, valores)
- Hashtags: sem o símbolo #, mix de nicho + broad`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json", "x-api-key":apiKey, "anthropic-version":"2023-06-01", "anthropic-dangerous-direct-browser-access":"true" },
        body: JSON.stringify({
          model:"claude-sonnet-4-5",
          max_tokens:2000,
          system:"Você é assistente de conteúdo especializado em marketing para Instagram no nicho de regularização de imóveis e redução de INSS. Responda APENAS com JSON válido, sem markdown.",
          messages:[{ role:"user", content:prompt }]
        })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const raw = data.content.map(i=>i.text||"").join("");
      const clean = raw.replace(/```json|```/g,"").trim();
      const json = JSON.parse(clean);
      setSlides(json.slides);
      setLegenda(json.legenda);
      setHashtags(json.hashtags);
      setTituloPost(json.titulo);
      setFase("revisao");
      setNota(0);
      setNotaEnviada(false);
    } catch(e) {
      setErro("Erro: " + (e.message||"Tente novamente."));
    } finally {
      setLoading(false);
    }
  }

  // ── Aprovar e ir para arte ─────────────────────────────────────────────────
  function aprovar() { setFase("arte"); }

  // ── Salvar avaliação ───────────────────────────────────────────────────────
  function salvarNota(n) {
    setNota(n);
    const item = { tema, objetivo, slides, legenda, hashtags, titulo:tituloPost, nota:n, data: new Date().toLocaleDateString("pt-BR") };
    const novo = [item, ...historico].slice(0,50);
    setHistorico(novo);
    localStorage.setItem("gc_historico", JSON.stringify(novo));
    setNotaEnviada(true);
  }

  // ── Export PNG ─────────────────────────────────────────────────────────────
  async function exportarPNG() {
    // Importa html2canvas dinamicamente
    const { default: html2canvas } = await import("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.esm.js");
    const container = document.getElementById("slides-export");
    if (!container) return;
    const cards = container.querySelectorAll(".slide-export-card");
    for (let i = 0; i < cards.length; i++) {
      const canvas = await html2canvas(cards[i], { scale:3, useCORS:true, backgroundColor:null });
      const a = document.createElement("a");
      a.download = `gabryelle-slide-${String(i+1).padStart(2,"0")}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
      await new Promise(r=>setTimeout(r,300));
    }
  }

  // ── Resetar ────────────────────────────────────────────────────────────────
  function resetar() { setFase("form"); setTema(""); setDescricao(""); setSlides([]); setNota(0); setNotaEnviada(false); }

  // ─── Render ────────────────────────────────────────────────────────────────
  const inp = { width:"100%", background:P.card, border:`1px solid ${P.border}`, borderRadius:10, padding:"11px 14px", color:P.text, fontSize:"0.88rem", outline:"none", fontFamily:G.font, boxSizing:"border-box" };
  const cardStyle = { background:P.surface, border:`1px solid ${P.border}`, borderRadius:16, padding:20, marginBottom:14 };
  const lbl = { fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:P.gold2, marginBottom:10, display:"block", fontFamily:G.font };

  return (
    <div style={{ fontFamily:G.font, background:P.bg, minHeight:"100vh", color:P.text }}>

      {/* ── Header ── */}
      <div style={{ padding:"16px 20px 14px", borderBottom:`1px solid ${P.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <img src={LOGO_GOLD} alt="Gabryelle Campos" style={{ height:36, objectFit:"contain" }} />
          <div>
            <div style={{ fontFamily:G.fontSerif, fontStyle:"italic", fontSize:"1.05rem", color:P.text }}>Estúdio Gabryelle</div>
            <div style={{ fontSize:"0.62rem", color:P.muted, letterSpacing:"0.1em", textTransform:"uppercase" }}>Criação de Conteúdo</div>
          </div>
        </div>
        {/* Tabs */}
        <div style={{ display:"flex", gap:4 }}>
          {["carrossel","historico"].map(t => (
            <button key={t} onClick={()=>setTab(t)} style={{ background:tab===t ? P.gold3 : "transparent", color:tab===t ? P.charcoal : P.muted, border:`1px solid ${tab===t?P.gold3:P.border}`, borderRadius:8, padding:"5px 12px", fontSize:"0.72rem", fontWeight:600, cursor:"pointer", fontFamily:G.font, textTransform:"capitalize" }}>
              {t === "carrossel" ? "📝 Carrossel" : "🕐 Histórico"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:640, margin:"0 auto", padding:"20px 16px 80px" }}>

        {/* ══ TAB HISTÓRICO ══ */}
        {tab === "historico" && (
          <div>
            <span style={lbl}>Posts criados · {historico.length} no total</span>
            {historico.length === 0 && <div style={{ color:P.muted, fontSize:"0.85rem", textAlign:"center", padding:40 }}>Nenhum post criado ainda.</div>}
            {historico.map((h,i) => (
              <div key={i} style={{ ...cardStyle, cursor:"default" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
                  <div style={{ fontFamily:G.fontSerif, fontStyle:"italic", fontSize:"0.95rem", color:P.text, flex:1, marginRight:10 }}>{h.titulo}</div>
                  <div style={{ display:"flex", gap:2 }}>
                    {STARS.map(s => <span key={s} style={{ color: s<=h.nota ? P.gold1 : P.border, fontSize:14 }}>★</span>)}
                  </div>
                </div>
                <div style={{ fontSize:"0.75rem", color:P.muted }}>{h.objetivo} · {h.slides?.length} slides · {h.data}</div>
              </div>
            ))}
          </div>
        )}

        {/* ══ TAB CARROSSEL ══ */}
        {tab === "carrossel" && (
          <>
            {/* ── FASE: FORM ── */}
            {fase === "form" && (
              <>
                {/* API Key */}
                <div style={{ ...cardStyle, borderColor: apiKey ? P.border : "rgba(205,161,98,0.5)" }}>
                  <span style={lbl}>🔑 Chave de API (Anthropic)</span>
                  <div style={{ position:"relative" }}>
                    <input type={showKey?"text":"password"} value={apiKey} onChange={e=>salvarKey(e.target.value)} placeholder="sk-ant-api03-..." style={{ ...inp, paddingRight:44 }} />
                    <button onClick={()=>setShowKey(v=>!v)} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:P.muted, cursor:"pointer", fontSize:16 }}>
                      {showKey?"🙈":"👁️"}
                    </button>
                  </div>
                  <div style={{ fontSize:"0.68rem", color:P.muted, marginTop:7, lineHeight:1.5 }}>
                    Obtenha em <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noreferrer" style={{ color:P.gold1 }}>console.anthropic.com</a> · Salva só no seu navegador
                  </div>
                </div>

                {/* Foto */}
                <div style={cardStyle}>
                  <span style={lbl}>📸 Foto da Gabryelle (opcional)</span>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    {fotoUrl ? (
                      <>
                        <img src={fotoUrl} alt="preview" style={{ width:64, height:64, borderRadius:8, objectFit:"cover", border:`2px solid ${P.gold3}` }} />
                        <div>
                          <div style={{ fontSize:"0.78rem", color:P.text, marginBottom:4 }}>Foto carregada ✓</div>
                          <button onClick={()=>setFotoUrl(null)} style={{ fontSize:"0.7rem", color:P.muted, background:"none", border:`1px solid ${P.border}`, borderRadius:6, padding:"3px 8px", cursor:"pointer", fontFamily:G.font }}>Remover</button>
                        </div>
                      </>
                    ) : (
                      <button onClick={()=>fotoRef.current.click()} style={{ background:P.card, border:`1px dashed ${P.border}`, borderRadius:10, padding:"14px 20px", color:P.muted, cursor:"pointer", fontSize:"0.8rem", fontFamily:G.font, width:"100%", textAlign:"left" }}>
                        + Clique para adicionar foto (será usada nos slides)
                      </button>
                    )}
                    <input ref={fotoRef} type="file" accept="image/*" onChange={handleFoto} style={{ display:"none" }} />
                  </div>
                </div>

                {/* Formulário */}
                <div style={cardStyle}>
                  <span style={lbl}>✦ Novo Carrossel</span>

                  <div style={{ marginBottom:12 }}>
                    <div style={{ fontSize:"0.72rem", color:P.muted, marginBottom:5 }}>Tema do post *</div>
                    <input value={tema} onChange={e=>setTema(e.target.value)} onKeyDown={e=>e.key==="Enter"&&gerarRoteiro()}
                      placeholder="Ex: Como regularizar obra iniciada sem alvará..."
                      style={inp} />
                  </div>

                  <div style={{ marginBottom:12 }}>
                    <div style={{ fontSize:"0.72rem", color:P.muted, marginBottom:5 }}>Contexto / detalhes (opcional)</div>
                    <textarea value={descricao} onChange={e=>setDescricao(e.target.value)} rows={3} placeholder="Explique mais sobre o tema, algum caso real, dados específicos..."
                      style={{ ...inp, resize:"vertical", lineHeight:1.6 }} />
                  </div>

                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
                    <div>
                      <div style={{ fontSize:"0.72rem", color:P.muted, marginBottom:5 }}>Objetivo</div>
                      <select value={objetivo} onChange={e=>setObjetivo(e.target.value)} style={{ ...inp, appearance:"auto" }}>
                        {OBJETIVOS.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
                      </select>
                    </div>
                    <div>
                      <div style={{ fontSize:"0.72rem", color:P.muted, marginBottom:5 }}>Slides</div>
                      <select value={qtd} onChange={e=>setQtd(e.target.value)} style={{ ...inp, appearance:"auto" }}>
                        {["5","7","9"].map(n=><option key={n} value={n}>{n} slides</option>)}
                      </select>
                    </div>
                  </div>

                  {erro && <div style={{ color:P.error, fontSize:"0.78rem", marginBottom:10, lineHeight:1.5 }}>{erro}</div>}

                  <button onClick={gerarRoteiro} disabled={loading} style={{ width:"100%", background:loading?P.border:`linear-gradient(135deg,${P.gold2},${P.gold4})`, color:loading?P.muted:P.charcoal, border:"none", borderRadius:10, padding:"13px", fontSize:"0.9rem", fontWeight:700, cursor:loading?"not-allowed":"pointer", fontFamily:G.font }}>
                    {loading ? "✦ Gerando roteiro..." : "Gerar Roteiro ✦"}
                  </button>
                </div>
              </>
            )}

            {/* ── FASE: REVISÃO ── */}
            {fase === "revisao" && (
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:8 }}>
                  <div style={{ fontFamily:G.fontSerif, fontStyle:"italic", fontSize:"1.15rem" }}>{tituloPost}</div>
                  <button onClick={resetar} style={{ background:"transparent", border:`1px solid ${P.border}`, color:P.muted, borderRadius:8, padding:"5px 12px", fontSize:"0.72rem", cursor:"pointer", fontFamily:G.font }}>← Novo</button>
                </div>

                <div style={{ ...cardStyle, borderColor:`rgba(205,161,98,0.4)` }}>
                  <span style={lbl}>✏️ Revise e edite os slides</span>
                  <div style={{ fontSize:"0.75rem", color:P.muted, marginBottom:14, lineHeight:1.5 }}>
                    Ajuste os textos como quiser antes de gerar a arte final.
                  </div>
                  {slides.map((s,i) => (
                    <SlideEditor key={i} slide={s} idx={s.numero} total={slides.length}
                      onChange={updated => setSlides(prev => prev.map((sl,idx) => idx===i ? updated : sl))} />
                  ))}
                </div>

                {/* Legenda */}
                <div style={cardStyle}>
                  <span style={lbl}>Legenda</span>
                  <textarea value={legenda} onChange={e=>setLegenda(e.target.value)} rows={4}
                    style={{ ...inp, resize:"vertical", lineHeight:1.7, marginBottom:10 }} />
                  <button onClick={()=>copiar(legenda,"legenda")} style={{ background:"transparent", border:`1px solid ${P.border}`, color:copiado==="legenda"?P.green:P.muted, borderRadius:7, padding:"6px 14px", fontSize:"0.72rem", cursor:"pointer", fontFamily:G.font }}>
                    {copiado==="legenda"?"✓ Copiada!":"Copiar legenda"}
                  </button>
                </div>

                {/* Hashtags */}
                <div style={cardStyle}>
                  <span style={lbl}>Hashtags</span>
                  <div style={{ marginBottom:10 }}>
                    {hashtags.map((h,i)=>(
                      <span key={i} style={{ display:"inline-block", background:"rgba(205,161,98,0.1)", border:`1px solid rgba(205,161,98,0.25)`, color:P.gold1, borderRadius:20, padding:"2px 9px", fontSize:"0.72rem", margin:"2px" }}>#{h}</span>
                    ))}
                  </div>
                  <button onClick={()=>copiar(hashtags.map(h=>"#"+h).join(" "),"tags")} style={{ background:"transparent", border:`1px solid ${P.border}`, color:copiado==="tags"?P.green:P.muted, borderRadius:7, padding:"6px 14px", fontSize:"0.72rem", cursor:"pointer", fontFamily:G.font }}>
                    {copiado==="tags"?"✓ Copiadas!":"Copiar hashtags"}
                  </button>
                </div>

                <button onClick={aprovar} style={{ width:"100%", background:`linear-gradient(135deg,${P.gold2},${P.gold4})`, color:P.charcoal, border:"none", borderRadius:12, padding:"15px", fontSize:"0.95rem", fontWeight:700, cursor:"pointer", fontFamily:G.font, marginBottom:8 }}>
                  ✦ Aprovar e Gerar Arte Final
                </button>
              </div>
            )}

            {/* ── FASE: ARTE FINAL ── */}
            {fase === "arte" && (
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:8 }}>
                  <div style={{ fontFamily:G.fontSerif, fontStyle:"italic", fontSize:"1.1rem" }}>{tituloPost}</div>
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={()=>setFase("revisao")} style={{ background:"transparent", border:`1px solid ${P.border}`, color:P.muted, borderRadius:8, padding:"5px 12px", fontSize:"0.72rem", cursor:"pointer", fontFamily:G.font }}>
                      ← Editar
                    </button>
                    <button onClick={resetar} style={{ background:"transparent", border:`1px solid ${P.border}`, color:P.muted, borderRadius:8, padding:"5px 12px", fontSize:"0.72rem", cursor:"pointer", fontFamily:G.font }}>
                      Novo
                    </button>
                  </div>
                </div>

                {/* Slides arte final */}
                <div style={{ ...cardStyle }}>
                  <span style={lbl}>Arte Final · {slides.length} slides</span>
                  <div id="slides-export" style={{ display:"flex", gap:10, overflowX:"auto", paddingBottom:10 }}>
                    {slides.map((s,i) => (
                      <div key={i} className="slide-export-card" style={{ width:180, flexShrink:0 }}>
                        <SlideArt slide={s} idx={s.numero} total={slides.length} fotoUrl={fotoUrl} logoUrl={LOGO_GOLD} />
                        <div style={{ fontSize:10, color:P.muted, textAlign:"center", marginTop:5, fontFamily:G.font }}>{s.tipo}</div>
                      </div>
                    ))}
                  </div>
                  <button onClick={exportarPNG} style={{ width:"100%", background:`linear-gradient(135deg,${P.gold2},${P.gold4})`, color:P.charcoal, border:"none", borderRadius:10, padding:"12px", fontSize:"0.88rem", fontWeight:700, cursor:"pointer", fontFamily:G.font, marginTop:12 }}>
                    ⬇ Baixar Slides PNG
                  </button>
                </div>

                {/* Legenda + hashtags */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
                  <div style={cardStyle}>
                    <span style={lbl}>Legenda</span>
                    <div style={{ fontSize:"0.82rem", color:P.muted, lineHeight:1.7, marginBottom:10 }}>{legenda}</div>
                    <button onClick={()=>copiar(legenda,"legenda2")} style={{ background:"transparent", border:`1px solid ${P.border}`, color:copiado==="legenda2"?P.green:P.muted, borderRadius:7, padding:"5px 12px", fontSize:"0.7rem", cursor:"pointer", fontFamily:G.font }}>
                      {copiado==="legenda2"?"✓":"Copiar"}
                    </button>
                  </div>
                  <div style={cardStyle}>
                    <span style={lbl}>Hashtags</span>
                    <div style={{ marginBottom:10 }}>
                      {hashtags.map((h,i)=>(
                        <span key={i} style={{ display:"inline-block", background:"rgba(205,161,98,0.1)", color:P.gold1, borderRadius:20, padding:"2px 7px", fontSize:"0.68rem", margin:"2px" }}>#{h}</span>
                      ))}
                    </div>
                    <button onClick={()=>copiar(hashtags.map(h=>"#"+h).join(" "),"tags2")} style={{ background:"transparent", border:`1px solid ${P.border}`, color:copiado==="tags2"?P.green:P.muted, borderRadius:7, padding:"5px 12px", fontSize:"0.7rem", cursor:"pointer", fontFamily:G.font }}>
                      {copiado==="tags2"?"✓":"Copiar"}
                    </button>
                  </div>
                </div>

                {/* Avaliação */}
                <div style={{ ...cardStyle, textAlign:"center" }}>
                  <span style={{ ...lbl, textAlign:"center", display:"block" }}>Como ficou esse post?</span>
                  <div style={{ display:"flex", justifyContent:"center", gap:8, marginBottom:10 }}>
                    {STARS.map(s => (
                      <button key={s} onClick={()=>!notaEnviada&&salvarNota(s)} style={{ background:"none", border:"none", cursor:notaEnviada?"default":"pointer", fontSize:28, color: s<=nota ? P.gold1 : P.border, transition:"color 0.15s" }}>★</button>
                    ))}
                  </div>
                  {notaEnviada && (
                    <div style={{ fontSize:"0.78rem", color:P.green }}>
                      {nota >= 4 ? "Ótimo! Guardado no histórico ✓" : nota >= 3 ? "Salvo! Vamos melhorar nos próximos ✓" : "Feedback salvo — vou aprender com isso ✓"}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
