var main = document.getElementById("main"),isOk = false, msg = 0, input = document.getElementById("inp"), msg2 = 0, count = 0;
  function run(vak){
    document.getElementById("test").innerText="Typing..."
    document.getElementById("test").style.color="lime"
    if(vak.value!=""){
      document.querySelector(".btn-h").style.backgroundColor="#82ff48";isOk=true;
    }else{document.querySelector(".btn-h").style.backgroundColor="#bbbbbb";
      isOk=false;
    }
  }
  function gto(){
  var kk = document.querySelectorAll("#date");
  for(let u=0;u<kk.length;u++){
    if(kk[u].innerText==getdate()||kk[u].innerText==getdate()+" Today"){
      kk[u].innerText=getdate()+" Today";
    }else{
      try{var ll = kk[u].innerText.split(" ");
        kk[u].innerText=ll[0];
      }catch(err){}
    }
  }
}
  setInterval(function (){
    document.getElementById("test").innerText="Online";
    document.getElementById("test").style.color="whitesmoke";
    if(input === document.activeElement){input.style.top="85%";document.querySelector(".btn-h").style.top="85%";
    }else{input.style.top="92%";document.querySelector(".btn-h").style.top="92%";}
    gto();
  },800);
  function getdate(){
    var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1;
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
return String(day+"/"+month+"/"+year);
  }
function addtim(){
  document.getElementById("main").innerHTML+=`<center><h4 class="val1"><p id="date" class="val2">${getdate()}</p></h4></center>`;
}
function cadd(){
  try{
  var hh = document.querySelectorAll("#date");}catch(err){addtim();}
  var vo=0;
  for(let y=0;y<hh.length;y++){
    if(hh[y].innerText!=getdate()&&hh[y].innerText!=getdate()+" Today"){
      vo++;
    }
  }
  if(hh.length==vo){
    addtim();
  }
}
  function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
function send(){
  var text = input.value.replaceAll('\n','<br>');
  if(isOk){
    cadd();
    document.getElementById("main").innerHTML+= `<div ondblclick="dis('${msg}')" id="msg${msg}" class="msg-you"><span id='msgt${msg}'>${text}</span><br>
<span class="timy">${formatAMPM(new Date)}</span></div>`;
document.getElementById(`msg${msg}`).scrollIntoView(true);
input.value="";
isOk=false;
localStorage.setItem('chat_msgt',document.getElementById('main').innerHTML);
localStorage.setItem('chat_valt',`msg=${msg};msg2=${msg2};count=${count};`);
bot(text.toLowerCase());
msg++;
input.blur();
  }
}

function getans(prompt){
const apiKey = "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";
const apiUrl = "https://api.openai.com/v1/engines/text-davinci-003/completions";
const requestOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    prompt,
    max_tokens: 100,
  }),
};
var aiResponse = "";
fetch(apiUrl, requestOptions)
  .then((response) => response.json())
  .then((data) => {
    aiResponse = data.choices[0].text;
    setTimeout(function (){
      send_bot(aiResponse.replaceAll('\n','<br>'));
    },1500)
  })
  .catch((error) => send_bot("something went wrong! sorry"));
}

function send_bot(txt){
    document.getElementById("main").innerHTML+= `<div id="msgb${msg2}" ondblclick="disb('${msg2}')" class="msg-bot"><span id="mgb${msg2}">${txt}</span><br>
<span class="timy">${formatAMPM(new Date)}</span></div>`;
document.getElementById("mainbody").scrollTo({top: document.getElementById("mainbody").scrollHeight,
  behavior: 'smooth',});
localStorage.setItem('chat_msgt',document.getElementById('main').innerHTML);
localStorage.setItem('chat_valt',`msg=${msg};msg2=${msg2};count=${count};`)
msg2++;
}
function bot(txt){
if(txt.toLowerCase()=="start new chat"){localStorage.removeItem('chat_valt');localStorage.removeItem('chat_msgt');location.reload();}else if(txt.toLowerCase()=='sing a song'){eval(`var songTHB = new Audio('https://multimentality.epizy.com/accessories/music/song4.mp3');songTHB.play();`)
  }else{
    getans(txt);
  }
}
var deleteT;
function dis(id){
  try{ckose();}catch(err){}
  var h = document.createElement("div");
  deleteT = h;
  h.className = "al";
  h.innerHTML = `<center>
      <span onclick="deletet('msg${id}')" >Delete for everyone</span><hr>
      <span onclick="copy(document.getElementById('msgt${id}').innerText,this)">Copy</span><hr>
      <span onclick="ckose()">close</span><hr>
    </center>`;
    document.body.appendChild(h);
}
function disb(id){
  try{ckose();}catch(err){}
  var h = document.createElement("div");
  deleteT = h;
  h.className = "al";
  h.innerHTML = `<center>
      <span onclick="copy(document.getElementById('mgb${id}').innerText,this)">Copy</span><hr>
      <span onclick="ckose()">close</span><hr>
    </center>`;
    document.body.appendChild(h);
}
function copy(v,t){
  try{
    navigator.clipboard.writeText(v);
    t.innerText="Copied to clipboard!";
  }catch(err){
    t.innerText="failed to copy"
  }
}
function ckose(){
  deleteT.remove();
  deleteT="";
}
function deletet(id){
  document.getElementById(id).innerHTML="This message was deleted!";
  document.getElementById(id).setAttribute('ondblclick','');
  localStorage.setItem('chat_msgt',document.getElementById('main').innerHTML);
  localStorage.setItem('chat_valt',`msg=${msg};msg2=${msg2};count=${count};`);
  ckose();
}
function restore() {
				if(localStorage.getItem('chat_msgt')!=null){
						document.getElementById('main').innerHTML=localStorage.getItem('chat_msgt');
						eval(localStorage.getItem('chat_valt'));
						window.scrollTo({top: document.body.scrollHeight,
  behavior: 'smooth',});
       		}else{alert("Double tap on a message to get it's options and type hi to get a reply from bot.\nSend: start new chat \nto start a fresh chat with bot.\n Also , after sending a command (or) message and if you see the old message sent by the bot , scroll up so that you will reach the bottom of the screen and you will see the latest output. ");
				}
}   
function openpg(){
  document.getElementById("mainbody").style.display="block";
  document.getElementById("mainbody").style.animation="pop 0.5s 1";
  document.getElementById("mainbody").scrollTo({top: document.getElementById("mainbody").scrollHeight,
  behavior: 'smooth',});
}
window.onload = restore();