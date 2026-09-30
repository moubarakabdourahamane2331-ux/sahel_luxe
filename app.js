// SAHEL LUXE V3 - TikTok+WhatsApp Vocal+Video+Shop+Statut Story+Money 70%
let cart=[], total=0, subs=1241, views=15500;
let videos=[
{t:"Nouveau Bazin Tahoua 🔥",l:1200,u:"Aminou",p:"HOMME",price:25000},
{t:"Hilux 2024 dispo",l:890,u:"Moussa Auto",p:"VOITURE",price:8500000},
{t:"Montre Or Dubai",l:2100,u:"Sahel Luxe",p:"MONTRE",price:45000}
];
let shops=[
{n:"Bazin Riche 5m",p:25000,c:"HOMME",i:"👘"},{n:"Boubou Femme",p:30000,c:"FEMME",i:"👗"},
{n:"Hilux",p:8500000,c:"VOITURE",i:"🚙"},{n:"Bazin Getzner",p:40000,c:"BAZIN",i:"✨"},
{n:"Rolex",p:45000,c:"MONTRE",i:"⌚"}
];
let statuses=JSON.parse(localStorage.getItem('sahel_status')||'[]');
let chatMsgs=JSON.parse(localStorage.getItem('sahel_chat')||'[]');

function showTab(t){
document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
document.querySelectorAll('.navBtn').forEach(x=>x.classList.remove('active'));
document.getElementById('tab'+t).classList.add('active');
event.target.classList.add('active');
if(t=='Videos') renderVideos();
if(t=='Shop') renderShop();
if(t=='Status') renderStatus();
if(t=='Chat') renderChat();
}
function renderVideos(){
document.getElementById('videoFeed').innerHTML=videos.map((v,i)=>`
<div class="videoCard"><div class="videoArea"><div style="font-size:50px">▶️</div><b>${v.t}</b><small>@${v.u} - ${v.p}</small></div>
<div style="display:flex;gap:5px;padding:10px"><button class="navBtn" onclick="likeVideo(${i})">❤️ ${v.l}</button><button class="navBtn" style="background:gold;color:#000" onclick="buyVideo(${i})">ACHETER ${v.price} FCFA</button></div></div>
`).join('');
}
function likeVideo(i){videos[i].l++; renderVideos(); views+=100; updateMoney();}
function buyVideo(i){let v=videos[i]; cart.push(v); total+=v.price; document.getElementById('cartCount').innerText=cart.length; alert(v.t+' ajoute au panier!');}
function renderShop(){
document.getElementById('shopList').innerHTML=shops.map(s=>`
<div style="background:#111;border:1px solid #333;border-radius:12px;padding:10px;margin-bottom:10px;display:flex;gap:10px"><div style="font-size:40px">${s.i}</div><div style="flex:1"><b>${s.n}</b><br>${s.c}<br><b style="color:gold">${s.p} FCFA</b></div><button onclick="addCart('${s.n}',${s.p})" style="background:gold;color:#000;padding:8px 12px;border-radius:8px;font-weight:bold;border:none">+</button></div>
`).join('');
}
function addCart(n,p){cart.push({n,p}); total+=p; document.getElementById('cartCount').innerText=cart.length; }
function filterShop(c){let f=shops.filter(s=>s.c==c); document.getElementById('shopList').innerHTML=f.map(s=>`<div style="background:#111;padding:10px;margin-bottom:8px;border-radius:8px">${s.i} ${s.n} - ${s.p} FCFA <button onclick="addCart('${s.n}',${s.p})" style="background:gold">+</button></div>`).join('');}
function payer(){if(cart.length==0){alert('Panier vide!');return;} alert('Commande '+total+' FCFA envoyee au 97028392! Avance 50% Orange Money.'); cart=[]; total=0; document.getElementById('cartCount').innerText=0;}
function createPost(){let t=document.getElementById('postTitle').value; if(!t)return alert('Titre vide!'); videos.unshift({t:t,l:0,u:"Toi",p:"HOMME",price:25000}); document.getElementById('postTitle').value=''; alert('Video postee!'); showTab('Videos'); renderVideos();}
function renderChat(){document.getElementById('chatList').innerHTML=chatMsgs.map(m=>`<div style="background:${m.me?'gold':'#222'};color:${m.me?'#000':'#fff'};padding:8px;border-radius:10px;margin:5px;max-width:80%;${m.me?'margin-left:auto':''}">${m.t}</div>`).join('');}
function sendMessage(){let i=document.getElementById('chatInput'); if(!i.value)return; chatMsgs.push({t:i.value,me:true}); localStorage.setItem('sahel_chat',JSON.stringify(chatMsgs)); i.value=''; renderChat();}
function sendVocal(){chatMsgs.push({t:"🎙️ Message vocal 0:12",me:true}); localStorage.setItem('sahel_chat',JSON.stringify(chatMsgs)); renderChat(); alert('Vocal envoye! (Simule) - Vrai vocal arrive V4');}
function videoCall(){alert('📹 Appel video lance vers 97028392! (Simule) - Vrai appel V4 avec WebRTC');}
// NOUVEAU STATUT WHATSAPP
function renderStatus(){
let now=Date.now();
statuses=statuses.filter(s=>now-s.time<86400000);
localStorage.setItem('sahel_status',JSON.stringify(statuses));
let bar=document.getElementById('storyBar');
bar.innerHTML='<div class="storyItem" onclick="document.getElementById(\'tabStatus\').scrollIntoView()"><div class="storyRing" style="border-style:dashed"><div style="width:100%;height:100%;background:#222;border-radius:50%;display:flex;align-items:center;justify-content:center">+</div></div><small>Mon statut</small></div>'+statuses.map((s,i)=>`<div class="storyItem" onclick="viewStatus(${i})"><div class="storyRing"><img src="https://i.pravatar.cc/100?u=${s.u}"></div><small>${s.u}</small></div>`).join('');
document.getElementById('statusList').innerHTML=statuses.map((s,i)=>`
<div class="statusCard"><div style="display:flex;gap:8px;align-items:center"><img src="https://i.pravatar.cc/40?u=${s.u}" style="width:35px;height:35px;border-radius:50%"><b>${s.u}</b><small style="color:#aaa">il y a ${Math.floor((now-s.time)/60000)}min</small></div><p style="margin:8px 0">${s.t}</p><div style="display:flex;gap:5px"><button onclick="likeStatus(${i})" style="background:#222;color:#fff;padding:6px 10px;border-radius:15px;border:none">❤️ ${s.likes||0}</button><button onclick="replyStatus(${i})" style="background:#222;color:#fff;padding:6px 10px;border-radius:15px;border:none">💬 Repondre</button></div></div>
`).join('')||'<p style="color:#777;text-align:center;margin-top:20px">Aucun statut. Sois le premier!</p>';
}
function addStatus(){let t=document.getElementById('statusText').value; if(!t)return alert('Ecris statut!'); statuses.unshift({t:t,u:"Toi",time:Date.now(),likes:0}); localStorage.setItem('sahel_status',JSON.stringify(statuses)); document.getElementById('statusText').value=''; renderStatus(); alert('Statut poste! Disparait dans 24h comme WhatsApp!');}
function viewStatus(i){let s=statuses[i]; alert('STATUT de '+s.u+':\n\n'+s.t+'\n\n👁️ Vu - Reponds dans Chat!');}
function likeStatus(i){statuses[i].likes=(statuses[i].likes||0)+1; localStorage.setItem('sahel_status',JSON.stringify(statuses)); renderStatus();}
function replyStatus(i){showTab('Chat'); document.getElementById('chatInput').value='Re: '+statuses[i].t; }
function updateMoney(){document.getElementById('subCount').innerText=subs; document.getElementById('viewCount').innerText=views;}
// init
renderVideos(); renderShop(); renderChat(); renderStatus(); updateMoney();
