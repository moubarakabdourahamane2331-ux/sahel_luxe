// SAHEL LUXE V12 FINAL - VOICE + IMAGE IA + VIDEO IA + COURS + MONETISATION Q&A
let cart=[], total=0, profit=10000, isListening=false, recognition=null;
const OWNER_PHONE="97028392";
let shops=JSON.parse(localStorage.getItem('sahel_products')||'[{"n":"Bazin Riche Bleu Roi","p":25000}]');
let profile=JSON.parse(localStorage.getItem('sahel_profile')||'{"name":"SAHEL LUXE","phone":"97028392"}');
let freeQuestions=parseInt(localStorage.getItem('sahel_free_q')||'3');
let isVIP=localStorage.getItem('sahel_vip')=='true';
let chatMsgs=JSON.parse(localStorage.getItem('sahel_chat')||'[{"t":"🎙️ SAHEL LUXE V12 - VOICE + GAGNE ARGENT!\\n\\n🎤 Parle oralement\\n🎨 Genere image IA\\n🎬 Cree video IA\\n📚 Cours + Questions\\n💰 3 questions gratuites/jour → VIP 2000F/mois\\n\\nTape: Je veux Bazin bleu ou Cours couture","me":false}]');

function showTab(t){
document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
document.querySelectorAll('.navBtn').forEach(x=>x.classList.remove('active'));
document.getElementById('tab'+t).classList.add('active');
let m={Chat:0,Status:1,Videos:2,Shop:3,Money:4,Post:5};
document.querySelectorAll('.navBtn')[m[t]]?.classList.add('active');
if(t=='Shop') renderShop(); if(t=='Chat') renderChat(); if(t=='Money') renderMoney();
if('speechSynthesis' in window) speechSynthesis.getVoices();
}
function speak(text){
 if(!('speechSynthesis' in window)) return;
 speechSynthesis.cancel();
 let clean=text.replace(/\[.*?\]/g,'').substring(0,280);
 let u=new SpeechSynthesisUtterance(clean);
 let voices=speechSynthesis.getVoices();
 u.voice=voices.find(v=>v.lang.includes('fr'))||voices[0];
 u.rate=0.95;
 speechSynthesis.speak(u);
}
function startVoiceChat(){
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SR) return alert("Utilise Chrome Android!");
 if(!recognition){ recognition=new SR(); recognition.lang='fr-FR'; }
 if(isListening){ recognition.stop(); isListening=false; document.getElementById('micBtn').innerText='🎤 Parler'; document.getElementById('micBtn').style.background='gold'; return; }
 recognition.onstart=()=>{ isListening=true; document.getElementById('micBtn').innerText='⏹️ J\'écoute...'; document.getElementById('micBtn').style.background='red'; };
 recognition.onresult=(e)=>{
   let t=e.results[0][0].transcript;
   chatMsgs.push({t:t,me:true}); renderChat();
   setTimeout(()=>{ let r=sahelAI_V12(t); chatMsgs.push({t:r,me:false}); renderChat(); speak(r); },600);
 };
 recognition.onend=()=>{ isListening=false; document.getElementById('micBtn').innerText='🎤 Parler'; document.getElementById('micBtn').style.background='gold'; };
 recognition.start();
}
function sahelAI_V12(q){
let lower=q.toLowerCase();
let phone=OWNER_PHONE;
function extract(t){ return t.replace(/cours|genere|cree|image|video|ia|explique/gi,'').trim()||"Bazin Riche"; }

// VIP CHECK
if(!isVIP && freeQuestions<=0 &&!lower.includes("vip") &&!lower.includes("payer") &&!lower.includes("97028392")){
 return `🔒 3 QUESTIONS GRATUITES FINIES AUJOURD'HUI!\n\n💎 DEVIENS VIP SAHEL LUXE 2.000F/mois:\n✅ Questions illimitées\n✅ Prix -10%\n✅ Images/Vidéos IA illimitées\n✅ Cours couture complet\n✅ Livraison gratuite\n\n📲 Payer MyNita: ${phone}\n[MY NITA VIP:https://wa.me/227${phone}?text=Je%20veux%20VIP%202000F]\nAprès paiement tape "Je suis VIP"`;
}
if(lower.includes("je suis vip")||lower.includes("activer vip")||lower.includes("97028392")){
 localStorage.setItem('sahel_vip','true'); localStorage.setItem('sahel_free_q','1000'); isVIP=true;
 return `✅ VIP ACTIVÉ! Bienvenue! Questions illimitées! Tu gagnes maintenant 10% réduction! Pose question!`;
}

// COURS PAYANT
if(lower.includes("cours couture")||lower.includes("formation")){
 if(!isVIP){
  return `📚 FORMATION COUTURE BAZIN (Valeur 25.000F)\n🎁 Gratuit: Lave Bazin eau froide + vinaigre!\n\n💰 Complet 10 vidéos + patrons + fournisseurs Alibaba = 10.000F\n[ACHETER:https://wa.me/227${phone}?text=Formation%20couture%2010000F]\nTu peux revendre formation et gagner 5.000F/vente!`;
 }
 return `📚 FORMATION VIP:\n1. Mesure 5m\n2. Coupe Boubou\n3. Broderie or\n[VIDEO COURS:https://www.youtube.com/results?search_query=couture+bazin]`;
}

// IMAGE IA
if(lower.includes("genere image")||lower.includes("image")){
 let prompt=extract(q);
 let img=`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt+", african bazin luxury, 8k")}?width=600&height=600&seed=${Math.floor(Math.random()*1000)}`;
 let out=`🎨 IMAGE IA: ${prompt}\n[IMAGE:${img}]\n💾 Enregistre image pour Shop!\n`;
 if(!isVIP){ freeQuestions--; localStorage.setItem('sahel_free_q',freeQuestions); out+=`\n📊 Reste ${freeQuestions} gratuites`; }
 return out+`[WHATSAPP:https://wa.me/227${phone}?text=Image%20${encodeURIComponent(prompt)}]`;
}

// VIDEO IA
if(lower.includes("cree video")||lower.includes("video")){
 let prompt=extract(q);
 return `🎬 VIDEO IA: ${prompt}\n[IMAGE:https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=912]\nScript TikTok: "Nouveau ${prompt} SAHEL LUXE ${shops[0]?.p||25000}F! WhatsApp ${phone}"\n[VIDEO_CAPCUT:https://www.capcut.com/tools/ai-video-generator?prompt=${encodeURIComponent(prompt)}]`;
}

// BAZIN / PRIX / Q&A MONETISE
if(lower.includes("bazin")||lower.includes("je veux")||lower.includes("prix")){
 let prompt=extract(q);
 let img=`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512`;
 let prixA=Math.floor(Math.random()*8000+12000);
 let tonPrix=prixA+profit;
 let out=`🛍️ ${prompt}\n[IMAGE:${img}]\nAlibaba ${prixA}F → SAHEL LUXE ${tonPrix}F\n💵 TU GAGNES ${profit}F!\n[ALIBABA:https://www.alibaba.com/trade/search?searchText=${encodeURIComponent(prompt)}]\n[WHATSAPP:https://wa.me/227${phone}?text=Je%20veux%20${encodeURIComponent(prompt)}%20${tonPrix}F]`;
 if(!isVIP){ freeQuestions--; localStorage.setItem('sahel_free_q',freeQuestions); out+=`\n📊 Reste ${freeQuestions} gratuites - VIP illimité 2000F!`; }
 return out;
}
let out=`🤖 Réponse à "${q}": Voici explication...\nTape "Genere image Bazin bleu" ou "Cours couture"`;
if(!isVIP){ freeQuestions--; localStorage.setItem('sahel_free_q',freeQuestions); out+=`\n📊 Reste ${freeQuestions} gratuites`; }
return out;
}
function renderChat(){
let list=document.getElementById('chatList'); if(!list) return;
list.innerHTML=chatMsgs.map(m=>{
 let t=m.t;
 t=t.replace(/\[IMAGE:(.*?)\]/g,(a,u)=>`<img src="${u}" style="width:100%;border-radius:12px;margin:8px 0;border:2px solid gold">`);
 t=t.replace(/\[ALIBABA:(.*?)\]/g,(a,u)=>`<a href="${u}" target="_blank" style="display:inline-block;background:#FF6A00;color:#fff;padding:8px 12px;border-radius:8px;margin:4px;text-decoration:none">🛒 Alibaba</a>`);
 t=t.replace(/\[WHATSAPP:(.*?)\]/g,(a,u)=>`<a href="${u}" target="_blank" style="display:inline-block;background:#25D366;color:#fff;padding:10px 16px;border-radius:8px;margin:6px 0;text-decoration:none;font-weight:bold">💬 WhatsApp</a>`);
 t=t.replace(/\[MY NITA VIP:(.*?)\]/g,(a,u)=>`<a href="${u}" target="_blank" style="display:block;background:gold;color:#000;padding:12px;border-radius:12px;margin:8px 0;text-align:center;text-decoration:none;font-weight:bold">💎 DEVENIR VIP 2000F - MyNita</a>`);
 t=t.replace(/\[VIDEO_CAPCUT:(.*?)\]/g,(a,u)=>`<a href="${u}" target="_blank" style="display:block;background:#000;color:#fff;padding:12px;border-radius:12px;margin:8px 0;text-align:center;text-decoration:none;border:2px solid #00D4FF">🎬 GENERER VIDEO IA</a>`);
 t=t.replace(/\[ACHETER:(.*?)\]/g,(a,u)=>`<a href="${u}" target="_blank" style="display:block;background:gold;color:#000;padding:12px;border-radius:12px;margin:8px 0;text-align:center;text-decoration:none;font-weight:bold">💰 ACHETER FORMATION 10000F</a>`);
 t=t.replace(/\n/g,'<br>');
 return `<div style="background:${m.me?'gold':'#222'};color:${m.me?'#000':'#fff'};padding:12px;border-radius:16px;margin:8px;max-width:92%;${m.me?'margin-left:auto':''}">${t}${!m.me?`<button onclick="speak('${m.t.replace(/'/g,"\\'").substring(0,180)}')" style="float:right;background:gold;border:none;border-radius:50%;width:26px;height:26px">🔊</button>`:''}<div style="clear:both"></div></div>`;
}).join('');
list.scrollTop=list.scrollHeight; localStorage.setItem('sahel_chat',JSON.stringify(chatMsgs));
let qc=document.getElementById('qCount'); if(qc) qc.innerText=3-freeQuestions;
}
function sendMessage(){
let i=document.getElementById('chatInput'); if(!i.value.trim()) return;
let q=i.value; chatMsgs.push({t:q,me:true}); i.value=''; renderChat();
document.getElementById('typing').style.display='block';
setTimeout(()=>{document.getElementById('typing').style.display='none'; let r=sahelAI_V12(q); chatMsgs.push({t:r,me:false}); renderChat(); speak(r);},900);
}
function renderShop(){
let form=`<div style="background:#111;padding:12px;border-radius:12px;margin-bottom:12px;border:2px solid gold"><h4 style="color:gold">Benefice ${profit}F/vente | Gratuit: ${freeQuestions} | VIP: ${isVIP?'✅':'❌'}</h4><input id="prodName" placeholder="Nom" style="width:100%;padding:10px;background:#222;color:#fff;border-radius:6px;margin:4px 0"><input id="prodPrice" type="number" placeholder="Prix Alibaba" style="width:100%;padding:10px;background:#222;color:#fff;border-radius:6px;margin:4px 0"><button onclick="addProduct()" style="width:100%;padding:12px;background:gold;color:#000;font-weight:bold;border-radius:8px;border:none">+ AJOUTER</button><button onclick="activateVIP()" style="width:100%;padding:8px;background:#222;color:gold;border:1px solid gold;border-radius:8px;margin-top:6px">💎 Activer VIP après paiement</button></div>`;
let list=shops.map((s,i)=>`<div style="background:#111;border:1px solid #333;border-radius:12px;padding:10px;margin-bottom:8px;display:flex;justify-content:space-between"><div><b>${s.n}</b><br><b style="color:gold">${s.p+profit}F</b></div><button onclick="addCart(${i})" style="background:gold;color:#000;padding:8px 14px;border-radius:8px;font-weight:bold;border:none">ACHETER</button></div>`).join('');
document.getElementById('shopList').innerHTML=form+list;
}
function addProduct(){let n=document.getElementById('prodName').value, p=parseInt(document.getElementById('prodPrice').value); if(!n||!p) return; shops.unshift({n:n,p:p}); localStorage.setItem('sahel_products',JSON.stringify(shops)); renderShop();}
function addCart(i){let s=shops[i]; let f=s.p+profit; cart.push({...s,p:f}); total+=f; document.getElementById('cartCount').innerText=cart.length; document.getElementById('cartTotal').innerText=total.toLocaleString()+' FCFA';}
function renderMoney(){let el=document.getElementById('profileArea'); if(el) el.innerHTML=`<div style="background:#111;padding:15px;border-radius:12px;text-align:center;border:1px solid gold"><b>${profile.name}</b><br>${profile.phone}<br><br>💰 Benefice: ${profit}F/vente<br>📊 Questions gratuites: ${freeQuestions}<br>VIP: ${isVIP?'✅ Actif':'❌ 2000F/mois'}<br><br><button onclick="activateVIP()" style="background:gold;color:#000;padding:10px 16px;border-radius:8px;font-weight:bold;border:none;width:100%">💎 ACTIVER VIP</button><br><br><small>🎙️ Voice + 🎨 Image IA + 🎬 Video IA</small></div>`;}
function activateVIP(){ let c=prompt("Après paiement MyNita 2000F au 97028392, tape ton numéro MyNita ou 97028392 pour test:"); if(c){ localStorage.setItem('sahel_vip','true'); localStorage.setItem('sahel_free_q','1000'); isVIP=true; freeQuestions=1000; alert("✅ VIP ACTIVÉ! Questions illimitées!"); location.reload(); } }
renderChat(); renderShop(); renderMoney();
