const FLAMES = [
  {code:"F",label:"Friends 🤝",blurb:"Playful bond detected."},
  {code:"L",label:"Love ❤️",blurb:"Romantic sparks are flying!"},
  {code:"A",label:"Affection 🥰",blurb:"Soft warmth and admiration."},
  {code:"M",label:"Marriage 💍",blurb:"Long-term potential strong."},
  {code:"E",label:"Enemies 😤",blurb:"Too much fire between you!"},
  {code:"S",label:"Siblings 👯",blurb:"Feels like family vibes."}
];

const form=document.getElementById("flames-form");
const resultCard=document.getElementById("resultCard");
const loading=document.getElementById("loading");
const lettersDiv=document.getElementById("letters");
const resetBtn=document.getElementById("resetBtn");
const nameOne=document.getElementById("nameOne");
const nameTwo=document.getElementById("nameTwo");
const countOne=document.getElementById("countOne");
const countTwo=document.getElementById("countTwo");

const normalize=str=>str.toLowerCase().replace(/[^a-z]/g,"");

function countRemainingLetters(a,b){
  let first=normalize(a).split("");
  let second=normalize(b).split("");
  for(let i=0;i<first.length;i++){
    let idx=second.indexOf(first[i]);
    if(idx!==-1){
      first[i]="";
      second[idx]="";
    }
  }
  return first.filter(Boolean).length+second.filter(Boolean).length;
}

function showFlamesLetters(){
  lettersDiv.innerHTML="";
  FLAMES.forEach(f=>{
    let span=document.createElement("div");
    span.className="letter";
    span.textContent=f.code;
    lettersDiv.appendChild(span);
  });
}

async function animateElimination(count){
  let pool=[...FLAMES];
  let pointer=0;

  while(pool.length>1){
    pointer=(pointer+count-1)%pool.length;
    let index=FLAMES.findIndex(f=>f.code===pool[pointer].code);
    lettersDiv.children[index].classList.add("strike");
    await new Promise(r=>setTimeout(r,800));
    pool.splice(pointer,1);
  }
  return pool[0];
}

function typeWriter(text,element,speed=30){
  element.innerHTML="";
  let i=0;
  function type(){
    if(i<text.length){
      element.innerHTML+=text[i];
      i++;
      setTimeout(type,speed);
    }
  }
  type();
}

function confettiEffect(){
  for(let i=0;i<20;i++){
    let conf=document.createElement("div");
    conf.className="confetti";
    conf.style.left=Math.random()*100+"vw";
    conf.textContent="🎉";
    document.body.appendChild(conf);
    setTimeout(()=>conf.remove(),3000);
  }
}

form.addEventListener("submit",async e=>{
  e.preventDefault();

  if(!nameOne.value.trim()||!nameTwo.value.trim()){
    alert("Enter both names!");
    return;
  }

  resultCard.classList.remove("show");
  showFlamesLetters();
  loading.style.display="block";

  const count=countRemainingLetters(nameOne.value,nameTwo.value);

  await new Promise(r=>setTimeout(r,1000));

  const result=await animateElimination(count);

  loading.style.display="none";

  resultCard.innerHTML=`<h2></h2><p></p>`;
  resultCard.classList.add("show");

  typeWriter(result.label,resultCard.querySelector("h2"),40);
  typeWriter(result.blurb,resultCard.querySelector("p"),25);

  if(result.label.includes("Love")||result.label.includes("Marriage")){
    confettiEffect();
  }

  if(result.label.includes("Enemies")){
    resultCard.classList.add("shake");
    setTimeout(()=>resultCard.classList.remove("shake"),500);
  }
});

resetBtn.addEventListener("click",()=>{
  form.reset();
  resultCard.classList.remove("show");
  lettersDiv.innerHTML="";
  countOne.textContent="0 characters";
  countTwo.textContent="0 characters";
});

nameOne.addEventListener("input",()=>{
  countOne.textContent=`${nameOne.value.length} characters`;
});

nameTwo.addEventListener("input",()=>{
  countTwo.textContent=`${nameTwo.value.length} characters`;
});
