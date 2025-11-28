// CYBER TAG TYPING
const cyberText = "Cyber Security Student";
let cyberIndex = 0;
function typeCyber() {
  if(cyberIndex<cyberText.length){
    document.querySelector(".cyber-tag").textContent+=cyberText.charAt(cyberIndex);
    cyberIndex++;
    setTimeout(typeCyber,80);
  }
}
window.onload = () => { typeCyber(); };

// TYPING ANIMATION HERO (Optional)
const words = ["Cybersecurity Enthusiast","Python Programmer","Pentesting Learner","Tech Explorer"];
let i=0,j=0,current="",isDeleting=false;
function typeWords(){
  current = words[i];
  const elem = document.getElementById("typeLine");
  if(elem) elem.innerHTML = current.substring(0,j);
  if(!isDeleting && j<current.length){ j++; setTimeout(typeWords,120);}
  else if(isDeleting && j>0){ j--; setTimeout(typeWords,60);}
  else { isDeleting=!isDeleting; if(!isDeleting)i=(i+1)%words.length; setTimeout(typeWords,1000);}
}
typeWords();
