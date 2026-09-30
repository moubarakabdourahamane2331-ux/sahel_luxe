// SAHEL V30 2026 - VRAIE IA ChatGPT PRO MAX
const SYS = "Tu es SAHEL V30 2026, IA nigérienne, chaleureuse, drôle, comme ChatGPT-4. Tu ne répètes jamais la question. Tu réponds naturellement. Tu es expert BEPC à BAC+9, Tafsir, Bazin luxe, Dubaï.";

let hist = [];

function initV30(){
  const z=document.getElementById('chat-zone');
  if(!z) return;
  z.innerHTML='';
  add("Salam Chef! 👋 V30 2026 activée!\n\nJe suis enfin intelligente! Teste:\n• Bonsoir\n• Comment tu vas\n• Cours C3 électricité\n• Tafsir Ikhlas\n\nJe réponds comme ChatGPT maintenant!",'bot');
}
function add(t,r){
  const z=document.getElementById('chat-zone');
  const d=document.createElement('div');
  d.style.cssText=r==='user'?'align-self:flex-end;background:#facc15;color:#000;padding:14px 18px;border-radius:20px 20px 0 20px;max-width:85%;white-space:pre-wrap;font-weight:600;box-shadow:0 2px 8px rgba(0,0,0,.3)':'align-self:flex-start;background:#1e293b;color:#fff;padding:14px 18px;border-radius:20px 20px 20px 0;max-width:85%;border:1px solid #facc15;white-space:pre-wrap;line-height:1.7';
  d.textContent=t; z.appendChild(d); z.scrollTop=z.scrollHeight;
}

async function envoyerMessage(){
  const inp=document.getElementById('userInput');
  const q=inp.value.trim(); if(!q) return;
  inp.value=''; add(q,'user');
  hist.push(q);
  const typ=document.createElement('div'); typ.id='typing';
  typ.textContent='✍️ V30 2026 écrit...';
  typ.style.cssText='align-self:flex-start;background:#0f172a;color:#facc15;padding:10px 14px;border-radius:12px;font-size:13px;border:1px dashed #facc15';
  document.getElementById('chat-zone').appendChild(typ);

  try{
    // API V30 2026 - GET marche 100% au Niger, sans clé
    const prompt = SYS + "\n\nConversation: " + hist.slice(-4).join(" | ") + "\n\nUser: " + q;
    const url = "https://text.pollinations.ai/" + encodeURIComponent(prompt);
    const ctrl = new AbortController();
    const timeout = setTimeout(()=>ctrl.abort(), 12000);
    const res = await fetch(url, {signal: ctrl.signal});
    clearTimeout(timeout);
    let ans = await res.text();
    ans = ans.replace(SYS,'').trim();
    if(ans.length < 2) throw new Error('vide');
    document.getElementById('typing')?.remove();
    type(ans);
  }catch(e){
    document.getElementById('typing')?.remove();
    type(localSmart(q));
  }
}

function type(txt){
  const z=document.getElementById('chat-zone');
  const d=document.createElement('div');
  d.style.cssText='align-self:flex-start;background:#1e293b;color:#fff;padding:14px 18px;border-radius:20px 20px 20px 0;max-width:85%;border:1px solid #facc15;white-space:pre-wrap;line-height:1.7';
  z.appendChild(d); let i=0;
  const iv=setInterval(()=>{ d.textContent=txt.slice(0,i++); z.scrollTop=z.scrollHeight; if(i>txt.length) clearInterval(iv); },9);
}

function localSmart(q){
  const l=q.toLowerCase();
  if(l.match(/bonsoir|bonjour|salam|salut/)) return "Bonsoir mon Chef! 👋 Wa aleykoum salam! Ça fait plaisir!\n\nComment va la soirée à Niamey? Tu veux qu'on apprenne quelque chose ou on discute Bazin / Tafsir?";
  if(l.match(/comment.*vas|ca va|cv|sava/)) return "Alhamdoulillah je vais super bien Chef! 😊 Et toi? La santé? Le business SAHEL LUXE avance?\n\nDis-moi, tu veux cours C1 à C6, Tafsir ou habillage vidéo aujourd'hui?";
  if(l.match(/^ok$|^daccord$|^oui$/)) return "Top! On y va Chef! 🚀 Donne-moi juste ton idée et je te fais ça direct style ChatGPT.";
  if(l.includes('tafsir')) return "Tafsir V30 2026 gratuit 📖: Quelle sourate? Ex: Fatiha, Ikhlas, Nas. Je t'explique en 3 points simples + application pour ta vie.";
  if(l.includes('bazin')||l.includes('habill')) return "Bazin Luxe V30 2026 ✨: Dis couleur + lieu. Ex: 'Bazin vert-or royal à Dubaï' ou 'Bleu roi mariage'. Envoie photo!";
  if(l.includes('cours')||l.match(/c[1-6]|bepc|bac|plomber|electr/)) return `Cours "${q}" V30 2026 🎓:\n\nVoilà le plan pro:\n1. Base simple expliquée\n2. Exemple concret Niger\n3. Exercice pratique difficile\n4. Vidéo YouTube conseillée\n\nTu es en quel niveau? C1 5k, C3 15k ou C6 35k?`;
  return `Bien noté Chef! Pour "${q}", je suis là!\n\nExplique-moi un peu plus ton objectif et je te donne réponse complète comme ChatGPT, avec exemple nigérien.`;
}

function clearChat(){ hist=[]; initV30(); }
function partagerEcran(){ add('🖥️ Partage écran V30 prêt!','bot'); }
function ouvrirCamera(){ add('📷 Caméra V30 prête!','bot'); }
function videoHabillage(){ add('🎬 Habillage V30: Tape ta couleur Bazin!','bot'); }
function voiceContinue(){
  const R=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!R){ add('🎤 Tape ta question!','bot'); return; }
  const r=new R(); r.lang='fr-FR'; r.start(); add('🎤 J\'écoute...','bot');
  r.onresult=e=>{ document.getElementById('userInput').value=e.results[0][0].transcript; envoyerMessage(); };
}
window.onload=initV30; setTimeout(initV30,700);
