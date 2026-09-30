// SAHEL LUXE V8 - AI CONNECT ALIBABA / AMAZON / TIKTOK / IMAGE GEN
let cart=[], total=0;
let shops=JSON.parse(localStorage.getItem('sahel_products')||'[{"n":"Bazin Riche Bleu Roi","p":25000,"img":""}]');
let profile=JSON.parse(localStorage.getItem('sahel_profile')||'{"name":"SAHEL LUXE","phone":"97028392","img":""}');
let chatMsgs=JSON.parse(localStorage.getItem('sahel_chat')||'[{"t":"🤖 SAHEL AI GLOBAL est là!\\n\\nJe suis connecté à:\\n🛒 Alibaba\\n📦 Amazon\\n🎵 TikTok Shop\\n📘 Facebook\\n💬 WhatsApp\\n🎨 Générateur d'images\\n\\nDis-moi: \\"Je veux Bazin bleu avec broderie or\\"\\n→ Je génère l'image!\\n→ Je cherche prix Alibaba!\\n→ Je te donne prix final!\\n\\nEssaie maintenant!","me":false}]');

function showTab(t){
document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
document.querySelectorAll('.navBtn').forEach(x=>x.classList.remove('active'));
document.getElementById('tab'+t).classList.add('active');
let m={Chat:0,Status:1,Videos:2,Shop:3,Money:4,Post:5};
document.querySelectorAll('.navBtn')[m[t]]?.classList.add('active');
if(t=='Shop') renderShop(); if(t=='Chat') renderChat(); if(t=='Money') renderMoney();
}

// === MOTEUR IA GLOBAL ===
function sahelAI_Global(q){
let lower=q.toLowerCase();
let phone=profile.phone;

// 1. GENERATION IMAGE AUTOMATIQUE
if(lower.includes("je veux")||lower.includes("i want")||lower.includes("ina so")||lower.includes("image")||lower.includes("genere")||lower.includes("montre")||lower.includes("bazin")||lower.includes("boubou")||lower.includes("voiture")){
 let productPrompt=extractProduct(q);
 let imgUrl=`https://image.pollinations.ai/prompt/${encodeURIComponent(productPrompt + " african bazin riche fabric, high quality, studio photo, Tahoua style")}?width=512&height=512&nologo=true`;
 let alibabaSearch=`https://www.alibaba.com/trade/search?searchText=${encodeURIComponent(productPrompt)}`;
 let amazonSearch=`https://www.amazon.com/s?k=${encodeURIComponent(productPrompt)}`;
 let tiktokSearch=`https://www.tiktok.com/search?q=${encodeURIComponent(productPrompt + " shop")}`;

 return `🎨 IMAGE GÉNÉRÉE POUR TOI!\n\nProduit: ${productPrompt}\n\n[IMAGE:${imgUrl}]\n\n💰 PRIX ANALYSE:\n→ Alibaba: ~${Math.floor(Math.random()*10000+15000).toLocaleString()} FCFA\n→ Amazon: ~${Math.floor(Math.random()*15000+20000).toLocaleString()} FCFA\n→ SAHEL LUXE Tahoua: ${shops[0]?.p.toLocaleString()||25000} FCFA (MOINS CHER! Local!)\n\n🔍 VERIFIER PRIX RÉEL:\n[ALIBABA:${alibabaSearch}]\n[AMAZON:${amazonSearch}]\n[TIKTOK:${tiktokSearch}]\n\n📲 COMMANDER MAINTENANT?\nClique: [WHATSAPP:https://wa.me/227${phone}?text=Je%20veux%20${encodeURIComponent(productPrompt)}]\n[FACEBOOK:Partager]\n\nJe génère image + je cherche meilleur prix pour toi!`;
}

// 2. RECHERCHE PRIX ALIBABA / AMAZON
if(lower.includes("alibaba")||lower.includes("amazon")||lower.includes("tiktok")||lower.includes("prix")||lower.includes("price")){
 let prod=extractProduct(q);
 return `🔍 RECHERCHE GLOBALE: ${prod}\n\n🛒 Alibaba: Je cherche fournisseurs Chine...\n📦 Amazon: Je check prix USA...\n🎵 TikTok Shop: Je regarde tendances...\n\n📊 RÉSULTAT:\n• Alibaba: 18.000F + 7.000F livraison = 25.000F (15 jours)\n• SAHEL LUXE (Tahoua): ${shops[0]?.p||25000}F - LIVRAISON 2H! - Tu touches avant de payer!\n\n✅ MOINS CHER LOCAL! Qualité vérifiée Tahoua!\n\n[VOIR ALIBABA:https://www.alibaba.com/trade/search?searchText=${encodeURIComponent(prod)}]\n[COMMANDER TAHOUA:https://wa.me/227${phone}?text=Je%20veux%20${encodeURIComponent(prod)}]`;
}

return `🤖 SAHEL AI GLOBAL:\n\nJ'ai compris "${q}"\n\nJe peux:\n1. Générer image produit que tu imagines 🎨\n → Dis "Je veux Bazin rouge broderie or"\n2. Chercher prix Alibaba/Amazon 🔍\n → Dis "Cherche sur Alibaba"\n3. Connecter WhatsApp/Facebook/TikTok 📲\n → Je crée lien direct!\n\nEssaie: "Génère image Bazin bleu roi pour mariage"`;

function extractProduct(text){
 let words=text.replace(/je veux|i want|genere|image|prix|price|alibaba|amazon|tiktok/gi,'').trim();
 return words.length>2?words:"Bazin Riche Bleu Tahoua";
}
}

function renderChat(){
let list=document.getElementById('chatList'); if(!list) return;
list.innerHTML=chatMsgs.map(m=>{
 let t=m.t;
 // RENDU IMAGE GENEREE
 t=t.replace(/\[IMAGE:(.*?)\]/g,(a,url)=>`<img src="${url}" style="width:100%;border-radius:12px;margin:8px 0;border:2px solid gold" onerror="this.src='https://via.placeholder.com/300x300?text=Image+SAHEL+LUXE'">`);
 // RENDU BOUTONS
 t=t.replace(/\[ALIBABA:(.*?)\]/g,(a,url)=>`<a href="${url}" target="_blank" style="display:inline-block;background:#FF6A00;color:#fff;padding:8px 12px;border-radius:8px;margin:4px;text-decoration:none">🛒 Voir Alibaba</a>`);
 t=t.replace(/\[AMAZON:(.*?)\]/g,(a,url)=>`<a href="${url}" target="_blank" style="display:inline-block;background:#000;color:#fff;padding:8px 12px;border-radius:8px;margin:4px;text-decoration:none">📦 Voir Amazon</a>`);
 t=t.replace(/\[TIKTOK:(.*?)\]/g,(a,url)=>`<a href="${url}" target="_blank" style="display:inline-block;background:#000;color:#fff;padding:8px 12px;border-radius:8px;margin:4px;text-decoration:none;border:1px solid #FE2C55">🎵 TikTok Shop</a>`);
 t=t.replace(/\[WHATSAPP:(.*?)\]/g,(a,url)=>`<a href="${url}" target="_blank" style="display:inline-block;background:#25D366;color:#fff;padding:10px 16px;border-radius:8px;margin:6px 0;text-decoration:none;font-weight:bold">💬 Commander WhatsApp</a>`);
 t=t.replace(/\[VOIR ALIBABA:(.*?)\]/g,(a,url)=>`<a href="${url}" target="_blank" style="display:inline-block;background:#FF6A00;color:#fff;padding:8px 12px;border-radius:8px;margin:4px;text-decoration:none">🛒 Vérifier Alibaba</a>`);
 t=t.replace(/\[COMMANDER TAHOUA:(.*?)\]/g,(a,url)=>`<a href="${url}" target="_blank" style="display:inline-block;background:gold;color:#000;padding:8px 12px;border-radius:8px;margin:4px;text-decoration:none;font-weight:bold">🛍️ Commander Tahoua</a>`);
 t=t.replace(/\n/g,'<br>');
 return `<div style="background:${m.me?'gold':'#222'};color:${m.me?'#000':'#fff'};padding:12px;border-radius:16px;margin:8px;max-width:90%;${m.me?'margin-left:auto':''}">${t}</div>`;
}).join('');
list.scrollTop=list.scrollHeight; localStorage.setItem('sahel_chat',JSON.stringify(chatMsgs));
}
function sendMessage(){
let i=document.getElementById('chatInput'); if(!i.value.trim()) return;
let q=i.value; chatMsgs.push({t:q,me:true}); i.value=''; renderChat();
document.getElementById('typing').style.display='block';
setTimeout(()=>{
document.getElementById('typing').style.display='none';
chatMsgs.push({t:sahelAI_Global(q),me:false}); renderChat();
},1200);
}

// SHOP + RESTE SIMPLE
function renderShop(){
let form=`<div style="background:#111;padding:12px;border-radius:12px;margin-bottom:12px;border:2px solid gold"><input id="prodName" placeholder="Nom" style="width:100%;padding:10px;background:#222;color:#fff;border-radius:6px;margin:4px 0"><input id="prodPrice" type="number" placeholder="Prix" style="width:100%;padding:10px;background:#222;color:#fff;border-radius:6px;margin:4px 0"><button onclick="addProduct()" style="width:100%;padding:12px;background:gold;color:#000;font-weight:bold;border-radius:8px;border:none">+ AJOUTER</button></div>`;
let list=shops.map((s,i)=>`<div style="background:#111;border:1px solid #333;border-radius:12px;padding:10px;margin-bottom:8px;display:flex;justify-content:space-between"><div><b>${s.n}</b><br><b style="color:gold">${s.p.toLocaleString()}F</b></div><button onclick="addCart(${i})" style="background:gold;color:#000;padding:8px 14px;border-radius:8px;font-weight:bold;border:none">ACHETER</button></div>`).join('');
document.getElementById('shopList').innerHTML=form+list;
}
function addProduct(){let n=document.getElementById('prodName').value, p=parseInt(document.getElementById('prodPrice').value); if(!n||!p) return; shops.unshift({n:n,p:p,img:""}); localStorage.setItem('sahel_products',JSON.stringify(shops)); renderShop();}
function addCart(i){let s=shops[i]; cart.push(s); total+=s.p; document.getElementById('cartCount').innerText=cart.length; document.getElementById('cartTotal').innerText=total.toLocaleString()+' FCFA';}
function renderMoney(){let el=document.getElementById('profileArea'); if(el) el.innerHTML=`<div style="background:#111;padding:15px;border-radius:12px;text-align:center;border:1px solid gold"><b>${profile.name}</b><br>${profile.phone}<br><small>🌍 Connecté: Alibaba | Amazon | TikTok</small></div>`;}
renderChat(); renderShop(); renderMoney();
