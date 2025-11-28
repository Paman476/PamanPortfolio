// Cyber-tag typing effect
const text = "Cyber Security Student";
const speed = 80;
let index = 0;

function typeCyber() {
  if (index < text.length) {
    document.querySelector(".cyber-tag").textContent += text.charAt(index);
    index++;
    setTimeout(typeCyber, speed);
  }
}
window.onload = () => { typeCyber(); };

// Contact form popup
const form = document.getElementById("contactForm");
const popup = document.getElementById("popup");
form.addEventListener("submit", function(e){
  e.preventDefault();
  popup.classList.add("show");
  setTimeout(()=> popup.classList.remove("show"), 2000);
});
