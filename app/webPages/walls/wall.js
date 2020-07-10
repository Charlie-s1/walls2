window.addEventListener('load', init);

async function init() {

  //console.log("arr");
  console.log(localStorage.name)

  document.querySelector("#author").value = localStorage.name||"Anonymous";
  document.querySelector("#postMsg").addEventListener("click",messageUp);
  document.querySelector("#refresh").addEventListener("click",refresh);
  const msg = await getMessages();
  printMessages(msg);

  let up = document.querySelectorAll(".up");
  let dn = document.querySelectorAll(".dn");
  for (const u of up){
    u.addEventListener("click",upVote);
  }
  for (const d of dn){
    d.addEventListener("click",dnVote);
  }
}

function refresh(){
  window.location.href = "/getMessages";
}

function messageUp(){
  let form = document.querySelector("#message");
  form.submit();
}

async function getMessages(){
  const response = await fetch("messages.json");
  const msg = await response.json();
  return msg;
}

function printMessages(msg){
  //console.log(msg);
  for(const m of msg){
    //create elements
    const sec = document.createElement("section");
    const title = document.createElement("h1");
    const content = document.createElement("p");
    const score = document.createElement("aside");
    const author = document.createElement("aside");
    const up = document.createElement("p");
    const dn = document.createElement("p");

    up.classList.add("up");
    dn.classList.add("dn");
    up.id = m.id;
    dn.id = m.id;
    score.classList.add("left");
    author.classList.add("right");
    //give content
    title.textContent = m.title;
    content.textContent = m.message;
    score.textContent = m.points;
    author.textContent = m.posterName;
    up.textContent = "up";
    dn.textContent = "dn";
    //organise
    sec.appendChild(title);
    sec.appendChild(content);
    sec.appendChild(score);
    sec.appendChild(author);
    sec.appendChild(up);
    sec.appendChild(dn);
    //upload
    document.querySelector("#messages").appendChild(sec);
  }


}
function upVote(){
  window.location.href = "/up?id="+this.id;
}
function dnVote(){
  window.location.href = "/dn?id="+this.id;
}
