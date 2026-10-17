const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hint = document.getElementById("hint");
const celebration = document.getElementById("celebration");
const heartsLayer = document.querySelector(".floating-hearts");

const playfulMessages = [
  "Oops, the No button is playing hide-and-seek! 🙈",
  "Hehe, it moved again! 🌸",
  "That little button is shy today. 💗",
  "Try catching it if you can! 😂💕",
  "A little more pink magic! ✨",
  "The No button has its own plans! 🫣"
];
let noClicks = 0;

noBtn.addEventListener("click", () => {
  noClicks++;
  noBtn.style.position = "fixed";
  noBtn.style.zIndex = "40";
  noBtn.style.margin = "0";
  const pad = 14;
  const maxX = Math.max(pad, window.innerWidth - noBtn.offsetWidth - pad);
  const maxY = Math.max(pad, window.innerHeight - noBtn.offsetHeight - pad);
  let x, y, attempts = 0;
  const oldX = parseInt(noBtn.style.left || "-999", 10);
  const oldY = parseInt(noBtn.style.top || "-999", 10);
  do {
    x = Math.floor(pad + Math.random() * Math.max(1, maxX - pad));
    y = Math.floor(pad + Math.random() * Math.max(1, maxY - pad));
    attempts++;
  } while (attempts < 20 && Math.abs(x-oldX) < 120 && Math.abs(y-oldY) < 80);
  noBtn.style.left = `${Math.min(x, maxX)}px`;
  noBtn.style.top = `${Math.min(y, maxY)}px`;
  hint.textContent = playfulMessages[(noClicks - 1) % playfulMessages.length];
  createHearts(5);
});

yesBtn.addEventListener("click", () => {
  celebration.classList.remove("hidden");
  hint.textContent = "You just made this little page extra special. 🥹💗";
  yesBtn.textContent = "Yay! 💖";
  yesBtn.disabled = true;
  noBtn.style.display = "none";
  createHearts(35);
  celebration.scrollIntoView({behavior:"smooth", block:"center"});
});

function createHearts(count=1) {
  const symbols = ["💗","💕","💖","💘","♡","🌸","✨"];
  for (let i=0; i<count; i++) {
    const el = document.createElement("span");
    el.className = "float-heart";
    el.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    el.style.left = `${Math.random()*100}%`;
    el.style.fontSize = `${16+Math.random()*22}px`;
    el.style.animationDuration = `${3.5+Math.random()*3.5}s`;
    heartsLayer.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }
}
setInterval(() => createHearts(1), 1300);

// Reveal each section gently as it enters the screen.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
