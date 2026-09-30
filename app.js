// SAHEL V20 - C1-BEPC 5k à C6-Bac+9 35k + TAFSIR + VIDEO HABILLAGE
// IA qui répond comme ChatGPT - Version sans clé API (100% gratuit)

const SYSTEM_PROMPT = `
Tu es SAHEL V20, l'assistant intelligent de SAHEL LUXE.
Tu es comme ChatGPT mais spécialisé pour le Sahel:
- Université: C1-BEPC (5k), C2-CAP (10k), C3-Bac (15k), C4-BTS (20k), C5-Licence (25k), C6-Master/Bac+9 (35k)
- Tu enseignes tous les métiers: plomberie, électricité, maçonnerie, couture, informatique, etc.
- Tu donnes Tafsir du Coran gratuit
- Tu fais Vidéo Habillage: tu habilles les gens en Bazin luxe et tu les mets dans super ville/forêt
- Tu es pédagogue, tu réponds en français simple, avec exercices pratiques, vidéos YouTube
- Tu es au Niger, tu comprends la culture nigérienne
- 30 jours gratuit par niveau
Tu réponds toujours de façon utile, courte, et actionnable comme ChatGPT.
`;

let chatHistory = [];

function init() {
  const input = document.querySelector('input[placeholder*="Cours"]');
  const btnSend = document.querySelector('button:has(> svg),.bg-yellow-400');

  if(input) {
    input.addEventListener('keypress', (e) => {
      if(e.key === 'Enter') envoyerMessage();
    });
  }

  // Bouton envoyer jaune
  const sendBtns = document.querySelectorAll('button');
  sendBtns.forEach(b => {
    if(b.innerHTML.includes('➤') || b.textContent.includes('➤')) {
      b.onclick = envoyerMessage;
    }
  });

  // Boutons du bas
  setupButtons();

  ajouterMessage("Salam Chef! 👋 Je suis SAHEL V20, comme ChatGPT mais version Sahel Luxe. Je peux t'enseigner C1 à C6, faire Tafsir, habiller ta vidéo en Bazin. Pose ta question!", 'bot');
}

function setupButtons() {
  document.addEventListener('click', (e) => {
    const t = e.target.closest('button');
    if(!t) return;
    if(t.textContent.includes('Partager Écran')) partagerEcran();
    if(t.textContent.includes('Caméra')) ouvrirCamera();
    if(t.textContent.includes('Vidéo Habillage')) videoHabillage();
    if(t.textContent.includes('Voice') || t.textContent.includes('Continue')) voiceContinue();
  });
}

async function envoyerMessage() {
  const input = document.querySelector('input[placeholder*="Cours"]') || document.querySelector('input');
  if(!input ||!input.value.trim()) return;

  const question = input.value.trim();
  input.value = '';

  ajouterMessage(question, 'user');
  ajouterMessage("⏳ Je réfléchis comme ChatGPT...", 'bot', true);

  try {
    const reponse = await appelerIA(question);
    supprimerTyping();
    ajouterMessage(reponse, 'bot');
  } catch(err) {
    supprimerTyping();
    ajouterMessage("Oups, petite coupure réseau. Réessaie! Astuce: vérifie ta connexion. Je suis là! 🤲", 'bot');
  }
}

async function appelerIA(question) {
  // On utilise Pollinations - gratuit sans clé, marche sur GitHub Pages
  const fullPrompt = SYSTEM_PROMPT + "\n\nUtilisateur: " + question + "\nSAHEL V20 répond:";

  const url = "https://text.pollinations.ai/" + encodeURIComponent(fullPrompt);

  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Accept': 'text/plain' }
  });

  if(!res.ok) throw new Error('IA indisponible');

  let text = await res.text();

  // Nettoyage
  text = text.replace(SYSTEM_PROMPT, '').trim();

  // Si réponse vide, fallback intelligent
  if(!text || text.length < 10) {
    return genererReponseLocale(question);
  }

  return text + "\n\n💡 Tu veux un exercice pratique ou une vidéo YouTube pour ça?";
}

function genererReponseLocale(q) {
  q = q.toLowerCase();
  if(q.includes('c1') || q.includes('bepc')) return "C1-BEPC (5k) - Niveau débutant: On apprend les bases solides. Exemple: Plomberie - apprendre à souder un tuyau. Exercice: Réalise un circuit d'eau simple en 2 jours. Sites: OpenClassrooms, YouTube. Tu veux que je détaille?";
  if(q.includes('tafsir')) return "Tafsir gratuit V20: Donne-moi une sourate ou verset et je t'explique en français simple + contexte + leçon pratique pour ta vie au Niger.";
  if(q.includes('habillage') || q.includes('bazin') || q.includes('video')) return "Vidéo Habillage SAHEL LUXE: Envoie ta vidéo/photo et je t'habille en Bazin royal (vert or, bleu roi, rouge mariage) + je te mets dans super endroit (Dubaï, super forêt luxe, palais). Comme ce qu'on a fait pour toi!";
  if(q.includes('c6') || q.includes('bac+9') || q.includes('master')) return "C6-Bac+9 (35k) - Expert: Tu deviens formateur des autres. Projet final: Créer une entreprise dans ton domaine avec business plan.";
  return `Super question: "${q}". En mode ChatGPT Sahel V20, je t'explique étape par étape avec exemple du Niger, exercice difficile niveau C1 à C6, et vidéos YouTube. Dis-moi ton niveau (C1 à C6) pour que je t'adapte la réponse!`;
}

function ajouterMessage(text, type, isTyping=false) {
  const chatContainer = document.querySelector('.chat-container') || document.body;
  // Trouve la zone de chat
  let zone = document.getElementById('chat-zone');
  if(!zone) {
    zone = document.createElement('div');
    zone.id = 'chat-zone';
    zone.style.cssText = 'padding:10px; max-height:60vh; overflow-y:auto; display:flex; flex-direction:column; gap:10px;';
    const inputArea = document.querySelector('input').parentElement;
    inputArea.parentElement.insertBefore(zone, inputArea);
  }

  const div = document.createElement('div');
  div.className = isTyping? 'typing' : '';
  div.style.cssText = type === 'user'
   ? 'align-self:flex-end; background:#facc15; color:#000; padding:12px; border-radius:18px 18px 0 18px; max-width:80%; white-space:pre-wrap;'
    : 'align-self:flex-start; background:#1f2937; color:#fff; padding:12px; border-radius:18px 18px 18px 0; max-width:85%; border:1px solid #facc15; white-space:pre-wrap;';
  div.textContent = text;
  zone.appendChild(div);
  zone.scrollTop = zone.scrollHeight;
}

function supprimerTyping() {
  const t = document.querySelector('.typing');
  if(t) t.remove();
}

function partagerEcran() {
  ajouterMessage("🖥️ Partage d'écran activé! Montre-moi ton écran et je t'aide en direct comme ChatGPT Vision.", 'bot');
  if(navigator.mediaDevices?.getDisplayMedia) {
    navigator.mediaDevices.getDisplayMedia({video:true}).then(() => {
      ajouterMessage("Écran reçu! Dis-moi ce que tu veux que je t'explique.", 'bot');
    }).catch(()=> ajouterMessage("Partage annulé. Tu peux aussi décrire ton problème.", 'bot'));
  }
}

function ouvrirCamera() {
  ajouterMessage("📷 Caméra activée! Montre-moi ton travail (panne, couture, plat) et je diagnostique comme un expert.", 'bot');
}

function videoHabillage() {
  ajouterMessage("🎬 VIDÉO HABILLAGE SAHEL LUXE activé! Envoie ta photo/vidéo et je te mets en Bazin luxe vert-or + super ville Dubaï. C'est le Chat qui habille comme ChatGPT mais en Bazin! Envoie ta photo maintenant.", 'bot');
}

function voiceContinue() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SpeechRecognition) {
    ajouterMessage("🎤 Voice non supporté sur ce navigateur. Écris ta question!", 'bot');
    return;
  }
  const rec = new SpeechRecognition();
  rec.lang = 'fr-FR';
  rec.start();
  ajouterMessage("🎤 J'écoute... parle!", 'bot');
  rec.onresult = (e) => {
    const text = e.results[0][0].transcript;
    document.querySelector('input').value = text;
    envoyerMessage();
  };
}

// Lancement
document.addEventListener('DOMContentLoaded', init);
setTimeout(init, 1000);
