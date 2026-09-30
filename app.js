// SAHEL V30 - VRAIE IA ChatGPT qui sait parler!
const SAHEL_PROMPT = "Tu es SAHEL V30, assistant nigérien comme ChatGPT, chaleureux, drôle, expert C1 5k à C6 35k, Tafsir, Bazin luxe. Tu réponds naturellement. Si on te dit Bonsoir, réponds Bonsoir avec chaleur. Si on dit Comment tu vas, dis que ça va bien.";

async function initV30(){
  const z=document.getElementById('chat-zone');
  z.innerHTML='';
  addMsg("Salam Chef! 👋 V30 VRAIE IA lancée!\n\nMaintenant je sais quoi dire!\n• Dis 'Bonsoir' -> je te réponds bien\n• Dis 'Comment tu vas' -> je parle comme un humain\n• Dis 'Cours électricité C3' -> vrai cours\n\nTeste-moi!",'bot');
}
function addMsg(t,r){
  const z=document.getElementById('chat-zone');
  const d=document.createElement('div');
  d.style.cssText=r==='user'?'align-self:flex-end;background:#facc15;color:#000;padding:14px;border-radius:20px 20px 0 20px;max-width:85%;white-space:pre-wrap;font-weight:600':'align-self:flex-start;background:#222;color:#fff;padding:14px;border-radius:20px 20px 20px 0;max-width:85%;border:1px solid #facc15;white-space:pre-wrap;line-height:1.6';
  d.textContent=t; z.appendChild(d); z.scrollTop=z.scrollHeight;
}

async function envoyerMessage(){
  const inp=document.getElementById('userInput');
  const q=inp.value.trim(); if(!q) return;
  inp.value=''; addMsg(q,'user');
  const t=document.createElement('div'); t.id='typing'; t.textContent='✍️ V30 réfléchit comme ChatGPT...';
  t.style.cssText='align-self:flex-start;background:#111;color:#aaa;padding:10px;border-radius:10px;font-style:italic';
  document.getElementById('chat-zone').appendChild(t);

  try{
    // V30 utilise GET qui marche partout en Afrique, sans blocage CORS
    const fullPrompt = SAHEL_PROMPT + "\n\nUtilisateur: " + q + "\nAssistant:";
    const url = "https://text.pollinations.ai/" + encodeURIComponent(fullPrompt) + "?model=openai-large&seed=" + Date.now();
    const res = await fetch(url, {method:"GET"});
    if(!res.ok) throw new Error('api');
    let txt = await res.text();
    txt = txt.replace(SAHEL_PROMPT,'').replace('Utilisateur:','').replace('Assistant:','').trim();
    document.getElementById('typing')?.remove();
    if(txt.length < 3) throw new Error('vide');
    typeWriter(txt);
  }catch(e){
    document.getElementById('typing')?.remove();
    typeWriter(bonneReponseLocale(q));
  }
}

function typeWriter(text){
  const z=document.getElementById('chat-zone');
  const d=document.createElement('div');
  d.style.cssText='align-self:flex-start;background:#222;color:#fff;padding:14px;border-radius:20px 20px 20px 0;max-width:85%;border:1px solid #facc15;white-space:pre-wrap;line-height:1.6';
  z.appendChild(d); let i=0;
  const iv=setInterval(()=>{ d.textContent=text.slice(0,i++); z.scrollTop=z.scrollHeight; if(i>text.length) clearInterval(iv); },12);
}

function bonneReponseLocale(q){
  const l=q.toLowerCase();
  if(l.includes('bonsoir')||l.includes('bonjour')||l.includes('salam')){
    return "Bonsoir Chef! 👋 Wa salam! Ça fait plaisir de te voir!\n\nComment tu vas? Tu veux qu'on bosse sur quoi ce soir? Un cours C1 à C6, un Tafsir, ou habillage Bazin luxe?";
  }
  if(l.includes('comment tu vas')||l.includes('cv')||l.includes('ça va')){
    return "Alhamdoulillah Chef, je vais très bien! 😊 Merci! Et toi, comment tu vas? La famille va bien?\n\nJe suis chaud pour t'aider. Tu veux apprendre quoi aujourd'hui?";
  }
  if(l.includes('ok')||l==='oui'){
    return "Parfait! 👍 Alors on y va! Dis-moi juste:\n1. Ton niveau (C1 à C6)\n2. Ce que tu veux faire\n\nEt je te lance le cours direct comme ChatGPT!";
  }
  if(l.includes('tafsir')) return "Tafsir gratuit V30: Donne-moi la sourate (ex: Fatiha, Baqara, Ikhlas) et je t'explique en français simple + leçon pour ta vie au Niger.";
  if(l.includes('bazin')||l.includes('habill')) return "Bazin V30 luxe! Dis couleur: 'Bazin bleu roi + Dubaï' ou 'Vert-or forêt' et envoie photo, je te fais rendu mariage!";
  if(l.includes('electric')||l.includes('plomber')||l.includes('c1')||l.includes('c3')) return `Cours V30: "${q}" - Super choix!\n\nÉtape 1: Base simple\nÉtape 2: Exercice pratique Niger\nÉtape 3: Vidéo YouTube pour devenir pro\n\nTu veux le PDF complet C1 à C6?`;
  return `Ah oui Chef! "${q}"\n\nJe comprends! Explique-moi un peu plus et je te réponds comme ChatGPT avec exemple concret du Niger.`;
}
function clearChat(){ initV30(); }
function partagerEcran(){ addMsg('🖥️ Partage ton écran, je t\'aide!','bot'); }
function ouvrirCamera(){ addMsg('📷 Montre avec caméra!','bot'); }
function videoHabillage(){ addMsg('🎬 Tape "Bazin rouge mariage Dubaï" + photo!','bot'); }
function voiceContinue(){
  const R=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!R){ addMsg('🎤 Écris ta question Chef!','bot'); return; }
  const r=new R(); r.lang='fr-FR'; r.start(); addMsg('🎤 J\'écoute...','bot');
  r.onresult=e=>{ document.getElementById('userInput').value=e.results[0][0].transcript; envoyerMessage(); };
}
window.onload=initV30; setTimeout(initV30,600);
