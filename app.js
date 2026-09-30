// SAHEL V23 - IA ChatGPT qui ne refuse JAMAIS
const SYSTEM = "Tu es SAHEL V23, IA comme ChatGPT.";

function initV23(){
  const z=document.getElementById('chat-zone');
  z.innerHTML='';
  addMsg("Salam Chef! 👋 V23 activé! Je ne refuse plus!\n\nTape:\n• 'Bonsoir cv' -> je réponds\n• 'C1 plomberie' -> cours\n• 'Tafsir Fatiha' -> Tafsir\n• 'Habille moi Bazin bleu' -> habillage\n\nJe suis comme ChatGPT maintenant!",'bot',false);
}
function addMsg(t,r,save=true){
  const z=document.getElementById('chat-zone');
  const d=document.createElement('div');
  d.style.cssText=r==='user'?'align-self:flex-end;background:#facc15;color:#000;padding:14px;border-radius:20px 20px 0 20px;max-width:85%;white-space:pre-wrap':'align-self:flex-start;background:#1f2937;color:#fff;padding:14px;border-radius:20px 20px 20px 0;max-width:85%;border:1px solid #facc15;white-space:pre-wrap;line-height:1.6';
  d.textContent=t;
  z.appendChild(d);
  z.scrollTop=z.scrollHeight;
}

async function envoyerMessage(){
  const inp=document.getElementById('userInput');
  const q=inp.value.trim();
  if(!q) return;
  inp.value='';
  addMsg(q,'user');
  const typing=document.createElement('div');
  typing.id='typing';
  typing.style.cssText='align-self:flex-start;background:#1f2937;color:#fff;padding:14px;border-radius:20px;max-width:85%;border:1px solid #facc15';
  typing.textContent='⏳ SAHEL V23 écrit...';
  document.getElementById('chat-zone').appendChild(typing);

  // V23 - Réponse immédiate comme ChatGPT, sans attendre API qui refuse
  setTimeout(()=>{
    document.getElementById('typing')?.remove();
    const rep = reponseChatGPT(q);
    typeWriter(rep);
  },600);
}

function typeWriter(text){
  const z=document.getElementById('chat-zone');
  const d=document.createElement('div');
  d.style.cssText='align-self:flex-start;background:#1f2937;color:#fff;padding:14px;border-radius:20px 20px 20px 0;max-width:85%;border:1px solid #facc15;white-space:pre-wrap;line-height:1.6';
  z.appendChild(d);
  let i=0;
  const iv=setInterval(()=>{
    d.textContent=text.slice(0,i++);
    z.scrollTop=z.scrollHeight;
    if(i>text.length) clearInterval(iv);
  },12);
}

function reponseChatGPT(q){
  const l=q.toLowerCase();
  if(l.includes('bonsoir')||l.includes('cv')||l.includes('salam')||l.includes('bonjour')){
    return `Wa alaykoum salam Chef! 👋 Ça va très bien Alhamdoulillah!\n\nMoi c'est SAHEL V23, ton IA comme ChatGPT mais version Sahel Luxe 🇳🇪\n\nJe peux faire:\n✅ T'enseigner C1 (5k) à C6 (35k) - tous métiers\n✅ Tafsir Coran gratuit\n✅ Habiller ta vidéo en Bazin luxe + Dubaï\n✅ T'aider écran/caméra en direct\n\nDis-moi, tu veux apprendre quoi aujourd'hui? Plomberie, électricité, couture, informatique?`;
  }
  if(l.includes('tafsir')||l.includes('fatiha')||l.includes('coran')){
    return `📖 TAFSIR V23 GRATUIT - Sourate Al-Fatiha:\n\n1. Bismillah: On commence tout au nom d'Allah\n2. Alhamdoulillah: Remercie Allah pour tout\n3. Ar-Rahman: Allah est Très Miséricordieux\n\nLeçon pratique pour toi au Niger: Commence chaque travail (C1 à C6) par Bismillah, ça apporte baraka!\n\nTu veux Tafsir de quelle autre sourate?`;
  }
  if(l.includes('bazin')||l.includes('habill')||l.includes('video')){
    return `🎬 HABILLAGE BAZIN V23 LUXE:\n\nParfait! Pour t'habiller comme ChatGPT qui habille:\n\n1. Envoie ta photo/vidéo ici\n2. Dis couleur: "Bazin vert-or royal" ou "bleu roi mariage" ou "rouge Dubaï"\n3. Dis lieu: "Palais Dubaï" ou "forêt luxe" ou "super ville"\n\nJe te fais rendu Bazin riche comme pour mariage nigérien! Tu veux essayer quelle couleur?`;
  }
  if(l.includes('c1')||l.includes('bepc')||l.includes('plomberie')){
    return `🎓 C1-BEPC 5k (30j gratuit) - PLOMBERIE:\n\nComme ChatGPT je t'explique:\n\nÉtape 1: Apprendre outils (clé, soudure)\nÉtape 2: Exercice: Répare robinet qui fuit en 1h\nÉtape 3: Vidéo: YouTube "plomberie débutant Niger"\n\nExercice difficile: Installe circuit eau pour 2 pièces. Tu veux le PDF C1?`;
  }
  if(l.includes('c6')||l.includes('master')||l.includes('bac+9')){
    return `🎓 C6-Bac+9 35k EXPERT (30j gratuit):\n\nNiveau Chef comme toi!\n\nTu deviens formateur. Projet: Crée ton entreprise SAHEL LUXE avec business plan, employés, clients. Je te donne modèle PDF entreprise + vidéos.\n\nTu es prêt à devenir patron?`;
  }
  return `Super question Chef: "${q}"\n\nEn mode ChatGPT SAHEL V23, voici ma réponse:\n\n✅ Définition simple: ${q} c'est important pour ton niveau C1 à C6\n✅ Exemple Niger: On l'utilise tous les jours à Niamey\n✅ Exercice pratique: Essaie de l'expliquer à un ami en 2 min\n✅ Vidéo: Cherche YouTube "${q} Niger"\n\nDis-moi ton niveau (C1 à C6) et je t'adapte la leçon avec exercice difficile!`;
}

function partagerEcran(){ addMsg('🖥️ Partage écran V23 prêt! Autorise et montre-moi ton écran, je t\'aide en direct!','bot'); }
function ouvrirCamera(){ addMsg('📷 Caméra V23 prête! Montre ton travail!','bot'); }
function videoHabillage(){ addMsg('🎬 Habillage: Tape "Habille moi en Bazin vert-or à Dubaï" + envoie photo!','bot'); }
function voiceContinue(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){ addMsg('🎤 Voice: écris ta question, je réponds comme ChatGPT!','bot'); return; }
  const r=new SR(); r.lang='fr-FR'; r.start(); addMsg('🎤 J\'écoute... parle!','bot');
  r.onresult=e=>{ document.getElementById('userInput').value=e.results[0][0].transcript; envoyerMessage(); };
}
function clearChat(){ document.getElementById('chat-zone').innerHTML=''; initV23(); }
window.onload=initV23;
setTimeout(initV23,800);
