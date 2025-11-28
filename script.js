// Typewriter-like rotating phrases + small UI behaviors
document.addEventListener('DOMContentLoaded', ()=> {
  // animate hero title glow using anime.js
  anime({
    targets: '.glow',
    scale: [0.94,1],
    opacity: [0.6,1],
    duration: 1600,
    easing: 'easeOutElastic(1, .6)'
  });

  // small type effect (simple)
  const phrases = ['Pentesting', 'Network Security', 'Python Scripting', 'Bug Hunting'];
  let idx = 0;
  const typeLine = document.getElementById('typeLine');
  function typeOut(text, cb){
    let i=0; typeLine.textContent = '';
    const t = setInterval(()=>{ typeLine.textContent += text[i++] || ''; if(i>text.length){ clearInterval(t); setTimeout(cb,900); }}, 45);
  }
  function loopPhrases(){
    typeOut(phrases[idx], ()=>{ idx = (idx+1)%phrases.length; setTimeout(loopPhrases, 600); });
  }
  loopPhrases();

  // animate progress bars
  document.querySelectorAll('.bar').forEach(b=>{
    const level = parseInt(b.getAttribute('data-level')||'60',10);
    setTimeout(()=> b.style.width = level + '%', 600);
  });

  // theme toggle (light/dark simple)
  const themeBtn = document.getElementById('theme-toggle');
  themeBtn && themeBtn.addEventListener('click', ()=>{
    document.body.classList.toggle('light-mode');
  });

  // tsParticles digital neon config
  tsParticles.load("tsparticles", {
    fullScreen: { enable: false },
    detectRetina: true,
    particles: {
      number: { value: 60, density: { enable: true, area: 900 } },
      color: { value: ["#00eaff", "#66fcf1"] },
      shape: { type: "circle" },
      opacity: { value: 0.14, random: { enable: true, minimumValue: 0.06 } },
      size: { value: { min: 1.2, max: 3.6 } },
      move: { enable: true, speed: 1.8, outModes: { default: "out" }, trail: { enable: true, length: 6, fillColor: "#000" } },
      links: { enable: true, distance: 140, color: "#00eaff", opacity: 0.08, width: 1 }
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "repulse" }
      },
      modes: {
        grab: { distance: 160, links: { opacity: 0.12 } },
        repulse: { distance: 120 }
      }
    },
    background: { color: "" },
    retina_detect: true
  });

  // subtle avatar pulse using CSS + JS for stagger
  const avatar = document.querySelector('.avatar');
  if(avatar){
    avatar.style.transition = 'transform 1.2s ease-in-out';
    setInterval(()=> { avatar.style.transform = 'scale(1.02)'; setTimeout(()=> avatar.style.transform='scale(1)', 700); }, 3500);
  }

  // smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if(href.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
});

// Netlify contact handler fallback (optional)
function handleContact(e){
  // Netlify will handle the POST; for UX we can show a quick alert
  // Prevent double submit on JS-only demo
  return true;
}
