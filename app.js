// SAHEL LUXE V4 - VRAI VOCAL + BOUTIQUE COMPLETE + CHAT QUI REPOND
let cart=[], total=0, subs=1241, views=15500;
let videos=[
{t:"Nouveau Bazin Tahoua 🔥",l:1200,u:"Aminou",p:"HOMME",price:25000},
{t:"Hilux 2024",l:890,u:"Moussa Auto",p:"VOITURE",price:8500000},
{t:"Montre Or Dubai",l:2100,u:"Sahel Luxe",p:"MONTRE",price:45000}
];
let shops=JSON.parse(localStorage.getItem('sahel_products')||'[{"n":"Bazin Riche 5m","p":25000,"c":"HOMME","i":"👘"},{"n":"Boubou Femme","p":30000,"c":"FEMME","i":"👗"},{"n":"Hilux","p":8500000,"c":"VOITURE","i":"🚙"},{"n":"Bazin Getzner","p":40000,"c":"BAZIN","i":"✨"},{"n":"Rolex","p":45000,"c":"MONTRE","i":"⌚"}]');
let statuses=JSON.parse(localStorage.getItem('sahel_status')||'[]');
let chatMsgs=JSON.parse(localStorage.getItem('sahel_chat')||'[{"t":"Bienvenue chez SAHEL LUXE! Test vocal 🎙️","me":false}]');
let mediaRecorder, audioChunks=[];

function showTab(t){
document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
document.querySelectorAll('.navBtn').forEach(x=>x.classList.remove('active'));
document.getElementById('tab'+t).classList.add('active');
let btns=document.querySelectorAll('.navBtn');
if(t=='Chat') btns[0].classList.add('active');
if(t=='Status') btns[1].classList.add('active');
if(t=='Videos') btns[2].classList.add('active');
if(t=='Shop') btns[3].classList.add('active');
if(t=='Money') btns[4].classList.add('active');
if(t=='Post') btns[5].classList.add('active');
if(t=='Videos') renderVideos();
if(t=='Shop') renderShop();
if(t=='Status') renderStatus();
if(t=='Chat') renderChat();
}
function renderVideos(){
document.getElementById('videoFeed').innerHTML=videos.map((v,i)=>`
<div class="videoCard" style="background:#111;margin-bottom:15px;border-radius:12px;border:1px solid #333;overflow:hidden"><div style="background:#222;height:380px;display:flex;align-items:center;justify-content:center;flex-direction:column"><div style="font-size:50px">▶️</div><b>${v.t}</b><small>@${v.u}</small></div>
<div style="display:flex;gap:5px;padding:10px"><button style="background:#222;color:#fff;padding:8px;border-radius:8px;flex:1" onclick="likeVideo(${i})">❤️ ${v.l}</button><button style="background:gold;color:#000;padding:8px;border-radius:8px;flex:1;font-weight:bold" onclick="buyVideo(${i})">ACHETER ${v.price} FCFA</button></div></div>
`).join('');
}
function likeVideo(i){videos[i].l++; renderVideos(); views+=100;}
function buyVideo(i){let v=videos[i]; cart.push(v); total+=v.price; document.getElementById('cartCount').innerText=cart.length; alert('Ajouté!');}
function renderShop(){
let addForm=`<div style="background:#111;padding:12px;border-radius:10px;margin-bottom:15px;border:1px solid gold"><h4 style="color:gold">➕ AJOUTER TON PRODUIT</h4><input id="prodName" placeholder="Nom: ex Bazin bleu" style="width:100%;padding:10px;background:#222;color:#fff;border:1px solid #444;border-radius:6px;margin:5px 0"><input id="prodPrice" type="number" placeholder="Prix FCFA ex 25000" style="width:100%;padding:10px;background:#222;color:#fff;border:1px solid #444;border-radius:6px;margin:5px 0"><select id="prodCat" style="width:100%;padding:10px;background:#222;color:#fff;border-radius:6px"><option>HOMME</option><option>FEMME</option><option>VOITURE</option><option>BAZIN</option><option>MONTRE</option></select><button onclick="addProduct()" style="width:100%;padding:12px;background:gold;color:#000;font-weight:bold;border-radius:8px;margin-top:8px">AJOUTER PRODUIT</button></div>`;
document.getElementById('shopList').innerHTML=addForm+shops.map((s,i)=>`
<div style="background:#111;border:1px solid #333;border-radius:12px;padding:10px;margin-bottom:10px;display:flex;gap:10px"><div style="font-size:40px">${s.i}</div><div style="flex:1"><b>${s.n}</b><br><small>${s.c}</small><br><b style="color:gold">${s.p} FCFA</b></div><div><button onclick="addCart(${i})" style="background:gold;color:#000;padding:8px 12px;border-radius:8px;font-weight:bold;border:none">+</button><br><button onclick="delProduct(${i})" style="background:#333;color:#fff;padding:4px 8px;border-radius:6px;margin-top:5px;border:none;font-size:10px">X</button></div></div>
`).join('');
}
function addProduct(){let n=document.getElementById('prodName').value, p=parseInt(document.getElementById('prodPrice').value), c=document.getElementById('prodCat').value; if(!n||!p)return alert('Nom + Prix!'); shops.unshift({n:n,p:p,c:c,i:"📦"}); localStorage.setItem('sahel_products',JSON.stringify(shops)); renderShop(); alert('Produit ajouté!');}
function delProduct(i){if(confirm('Supprimer?')){shops.splice(i,1); localStorage.setItem('sahel_products',JSON.stringify(shops)); renderShop();}}
function addCart(i){let s=shops[i]; cart.push(s); total+=s.p; document.getElementById('cartCount').innerText=cart.length; document.getElementById('cartTotal').innerText=total+' FCFA';}
function filterShop(c){renderShop();}
function payer(){if(cart.length==0)return alert('Panier vide!'); alert('Commande '+total+' FCFA - Appelle 97028392 Orange Money 50% avance'); cart=[]; total=0; document.getElementById('cartCount').innerText=0; document.getElementById('cartTotal').innerText='0';}
function createPost(){let t=document.getElementById('postTitle').value; if(!t)return alert('Titre vide!'); videos.unshift({t:t,l:0,u:"Toi",p:"HOMME",price:25000}); document.getElementById('postTitle').value=''; alert('Video postée!'); showTab('Videos'); renderVideos();}
function renderChat(){let list=document.getElementById('chatList'); if(!list)return; list.innerHTML=chatMsgs.map(m=>`<div style="background:${m.me?'gold':'#222'};color:${m.me?'#000':'#fff'};padding:10px;border-radius:12px;margin:6px;max-width:85%;${m.me?'margin-left:auto':''}">${m.audio?'<audio controls src="'+m.audio+'" style="width:150px"></audio>':m.t}</div>`).join(''); list.scrollTop=list.scrollHeight; localStorage.setItem('sahel_chat',JSON.stringify(chatMsgs));}
function sendMessage(){let i=document.getElementById('chatInput'); if(!i.value.trim())return; chatMsgs.push({t:i.value,me:true}); i.value=''; renderChat(); setTimeout(()=>{chatMsgs.push({t:"✅ Reçu! Merci pour message - SAHEL LUXE 97028392",me:false}); renderChat();},1000);}
async function sendVocal(){
try{
if(!mediaRecorder || mediaRecorder.state=='inactive'){
let stream=await navigator.mediaDevices.getUserMedia({audio:true});
mediaRecorder=new MediaRecorder(stream);
audioChunks=[];
mediaRecorder.ondataavailable=e=>audioChunks.push(e.data);
mediaRecorder.onstop=()=>{
let blob=new Blob(audioChunks,{type:'audio/webm'});
let url=URL.createObjectURL(blob);
chatMsgs.push({audio:url,me:true,t:"🎙️ Vocal"}); renderChat();
setTimeout(()=>{chatMsgs.push({t:"🎙️ Vocal reçu! Je te rappelle vite 97028392",me:false}); renderChat();},1000);
};
mediaRecorder.start();
document.getElementById('vocalBtn').innerText='⏹️ STOP';
document.getElementById('vocalBtn').style.background='red';
}else{
mediaRecorder.stop();
document.getElementById('vocalBtn').innerText='🎙️';
document.getElementById('vocalBtn').style.background='#222';
}
}catch(e){alert('Micro bloqué! Autorise micro dans Chrome: Paramètres > Site > Micro > Autoriser');}
}
function videoCall(){alert('📹 Appel vidéo: Pour vrai appel, utilise WhatsApp 97028392. WebRTC arrive V5!');}
function renderStatus(){
let now=Date.now(); statuses=statuses.filter(s=>now-s.time<86400000); localStorage.setItem('sahel_status',JSON.stringify(statuses));
let bar=document.getElementById('storyBar'); if(bar) bar.innerHTML='<div style="text-align:center;min-width:70px" onclick="document.getElementById(\'statusText\').focus()"><div style="width:60px;height:60px;border-radius:50%;border:3px dashed gold;display:flex;align-items:center;justify-content:center">+</div><small>Mon statut</small></div>'+statuses.map((s,i)=>`<div style="text-align:center;min-width:70px" onclick="viewStatus(${i})"><div style="width:60px;height:60px;border-radius:50%;border:3px solid gold"><img src="https://i.pravatar.cc/100?u=${s.u}" style="width:100%;height:100%;border-radius:50%"></div><small>${s.u}</small></div>`).join('');
let list=document.getElementById('statusList'); if(list) list.innerHTML=statuses.map((s,i)=>`<div style="background:#111;border-radius:12px;padding:10px;margin-bottom:10px;border-left:3px solid gold"><b>${s.u}</b> <small>${Math.floor((now-s.time)/60000)}min</small><p style="margin:8px 0">${s.t}</p><button onclick="likeStatus(${i})" style="background:#222;color:#fff;padding:5px 10px;border-radius:12px;border:none">❤️ ${s.likes||0}</button></div>`).join('')||'<p style="color:#777;text-align:center">Aucun statut</p>';
}
function addStatus(){let t=document.getElementById('statusText').value; if(!t)return alert('Ecris!'); statuses.unshift({t:t,u:"Toi",time:Date.now(),likes:0}); localStorage.setItem('sahel_status',JSON.stringify(statuses)); document.getElementById('statusText').value=''; renderStatus();}
function viewStatus(i){alert(statuses[i].t);} function likeStatus(i){statuses[i].likes=(statuses[i].likes||0)+1; localStorage.setItem('sahel_status',JSON.stringify(statuses)); renderStatus();}
renderVideos(); renderShop(); renderChat(); renderStatus();
