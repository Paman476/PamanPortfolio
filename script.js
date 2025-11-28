// typing effect & small animations
document.addEventListener('DOMContentLoaded', function(){
  // typing effect
  const phrases = ['Network Security','Ethical Hacking','Vulnerability Analysis','Security Automation'];
  let i = 0, pos = 0, forward = true;
  const el = document.getElementById('typeLine');

  function step(){
    const word = phrases[i];
    if(!el) return;
    if(forward){
      pos++;
      el.textContent = word.slice(0,pos);
      if(pos === word.length){ forward=false; setTimeout(step,900); return; }
    } else {
      pos--;
      el.textContent = word.slice(0,pos);
      if(pos === 0){ forward=true; i=(i+1)%phrases.length; }
    }
    setTimeout(step,80);
  }
  step();

  // animate progress bars when visible
  const bars = document.querySelectorAll('.bar');
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const bar = entry.target;
        const lvl = bar.getAttribute('data-level');
        bar.style.width = lvl + '%';
      }
    });
  }, {threshold:0.5});
  bars.forEach(b=>obs.observe(b));

  // scroll spy for nav links
  const sections = document.querySelectorAll('main section, header');
  const navLinks = document.querySelectorAll('.nav-link');
  const spy = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting && entry.target.id){
        navLinks.forEach(a=>a.classList.remove('active'));
        const link = document.querySelector('.nav-link[href="#'+entry.target.id+'"]');
        if(link) link.classList.add('active');
      }
    });
  }, {threshold:0.5});
  sections.forEach(s=>spy.observe(s));

  // theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  themeBtn.addEventListener('click', ()=> {
    document.body.classList.toggle('light');
    if(document.body.classList.contains('light')) themeBtn.textContent = '🌞';
    else themeBtn.textContent = '🌙';
  });
});

// contact form handler: Netlify will intercept POST; we keep a JS fallback for immediate feedback
function handleContact(e){
  // If Netlify will handle the form via POST, let it submit normally.
  // But we intercept to show a quick message and prevent redirect when JavaScript is present.
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);

  // Try to submit via `fetch` to Netlify Forms endpoint (same origin)
  fetch("/", {
    method: "POST",
    body: data
  }).then(res => {
    if(res.ok) {
      alert("Message sent — thank you! I'll reply soon.");
      form.reset();
    } else {
      // fallback to mailto if fetch fails
      fallbackMailto();
    }
  }).catch(err => {
    fallbackMailto();
  });

  return false;
}

function fallbackMailto(){
  const name = document.getElementById('name').value || 'Visitor';
  const email= document.getElementById('email').value || '';
  const message = document.getElementById('message').value || '';
  const subject = encodeURIComponent('Portfolio message from ' + name);
  const body = encodeURIComponent('Name: '+name+'\\nEmail: '+email+'\\n\\n'+message);
  window.location.href = 'mailto:pamannetani@example.com?subject='+subject+'&body='+body;
}
