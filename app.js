// SAHEL V22 - IA comme ChatGPT PRO + Streaming
const SYSTEM = "Tu es SAHEL V22, IA du Sahel comme ChatGPT-4o. Expert C1-BEPC 5k à C6-Bac+9 35k (plomberie, électricité, couture, informatique, Bazin). Tu donnes Tafsir clair, tu fais Vidéo Habillage Bazin luxe, tu es pédagogue, tu parles français Niger, tu donnes exercices difficiles + vidéos YouTube. 30j gratuit/niveau. Réponds court, utile, comme ChatGPT.";

let hist = JSON.parse(localStorage.getItem('sahel_v22')||'[]');

function initV22(){
 const zone = document.getElementById('chat-zone');
 if(hist.length===0){
   addMsg("Salam Chef! 👋 V22 activé! Je suis comme ChatGPT maintenant.\n\n✅ C1 à C6: Tape 'C1 plomberie' ou 'C6 master'\n✅ TAFSIR: Tape 'Tafsir Fatiha'\n✅ HABILLAGE: Tape 'Habille moi en Bazin bleu à Dubai'\n\nPose ta question!",'bot');
 } else {
   hist.forEach(m=>addMsg(m.t,'bot'===m.r?'bot':'user',false,false));
 }
}

function addMsg(t,r,save=true,isTyping=false){
 const zone=document.getElementById('chat-zone');
 const d=document.createElement('div');
 d.className=r;
 if(isTyping) d.id='typing';
 d.style.cssText=r==='user'?'align-self:flex-end;background:#facc15;color:#000;padding:14px;border-radius:20px 20px 0 20px;max-width:85%;white-space:pre-wrap;font-size:14px':'align-self:flex-start;background:#1f2937;color:#fff;padding:14px;border-radius:20px 20px 20px 0;max-width:85%;border:1px solid #facc15;white-space:pre-wrap;font-size:14px;line-height:1.5';
 d.textContent=t;
 zone.appendChild(d);
 zone.scrollTop=zone.scrollHeight;
 if(save){ hist.push({t,r}); localStorage.setItem('sahel_v22',JSON.stringify(hist)); }
}

async function envoyerMessage(){
 const inp=document.getElementById('userInput');
 const q=inp.value.trim();
 if(!q) return;
 inp.value='';
 addMsg(q,'user');
 addMsg('⏳ SAHEL V22 écrit comme ChatGPT...','bot',false,true);
 try{
   const rep=await callIAV22(q);
   document.getElementById('typing')?.remove();
   typeWriter(rep);
 }catch(e){
   document.getElementById('typing')?.remove();
   addMsg('Réseau faible, mais je suis là! Réessaie: '+q.slice(0,50),'bot');
 }
}

function typeWriter(text){
 let i=0; const zone=document.getElementById('chat-zone');
 const d=document.createElement('div');
 d.className='bot'; d.style.cssText='align-self:flex-start;background:#1f2937;color:#fff;padding:14px;border-radius:20px 20px 20px 0;max-width:85%;border:1px solid #facc15;white-space:pre-wrap;font-size:14px;line-height:1.5';
 zone.appendChild(d);
 const interval=setInterval(()=>{
   d.textContent=text.slice(0,i++);
   zone.scrollTop=zone.scrollHeight;
   if(i>text.length){ clearInterval(interval); hist.push({t:text,r:'bot'}); localStorage.setItem('sahel_v22',JSON.stringify(hist)); }
 },15);
}

async function callIAV22(q){
 // V22 utilise Pollinations PRO gratuit sans clé - marche 100% sur GitHub Pages
 const prompt = SYSTEM + "\nUser: " + q + "\nAssistant (réponds comme ChatGPT en français, utile, avec exemple Niger):";
 const url = "https://text.pollinations.ai/"+encodeURIComponent(prompt)+"?model=openai&seed="+Date.now();
 const res = await fetch(url);
 if(!res.ok) throw new Error('fail');
 let txt = await res.text();
 txt = txt.replace(SYSTEM,'').trim();
 if(txt.length<5) return localFallback(q);
 return txt;
}

function localFallback(q){
 q=q.toLowerCase();
 if(q.includes('tafsir')) return "TAFSIR V22 GRATUIT: Donne sourate/verset. Ex: 'Tafsir Al-Fatiha' -> Je t'explique mot par mot + leçon pour ta vie au Niger + comment l'appliquer aujourd'hui.";
 if(q.includes('bazin')||q.includes('habill'))) return "🎬 VIDEO HABILLAGE V22: Envoie ta photo et dis 'Habille moi en Bazin vert-or à Dubaï' ou 'Bazin bleu roi forêt luxe'. Je te fais rendu Bazin comme un vrai designer Sahel Luxe!";
 if(q.includes('c1')) return "C1 BEPC 5k (30j gratuit): Bases. Ex: Electricité -> apprendre brancher interrupteur simple. Exercice: Fais schéma maison 2 pièces. Vidéo: YouTube 'électricité bâtiment débutant'. Tu veux PDF?";
 return `V22 comme ChatGPT: Ta question "${q}" est top! Je t'explique en 3 étapes:\n1. Définition simple\n2. Exemple pratique Niger\n3. Exercice difficile + vidéo YouTube.\nDis ton niveau C1 à C6 pour adapter!`;
}

function partagerEcran(){ addMsg('🖥️ Partage écran V22: Clique autoriser, montre app/panne, je t\'explique pas à pas comme ChatGPT Vision!','bot'); if(navigator.mediaDevices?.getDisplayMedia) navigator.mediaDevices.getDisplayMedia({video:true}); }
function ouvrirCamera(){ addMsg('📷 Caméra V22: Montre ton travail, je diagnostique!','bot'); }
function videoHabillage(){ addMsg('🎬 Habillage V22 activé! Tape: "Habille ma photo en Bazin rouge mariage + palais Dubaï"','bot'); }
function voiceContinue(){
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SR){ addMsg('🎤 Voice: navigateur non supporté, écris!','bot'); return; }
 const r=new SR(); r.lang='fr-FR'; r.start(); addMsg('🎤 J\'écoute 30s... parle!','bot');
 r.onresult=e=>{ document.getElementById('userInput').value=e.results[0][0].transcript; envoyerMessage(); };
}
function clearChat(){ localStorage.removeItem('sahel_v22'); document.getElementById('chat-zone').innerHTML=''; initV22(); }

window.onload=initV22;
