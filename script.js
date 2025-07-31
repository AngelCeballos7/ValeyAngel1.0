const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const music = document.getElementById("bg-music");
let musicStarted = false;
const drops = [];
const fireworkTexts = [];

function createDrop() {
  drops.push({ text: "ME ENCANTAS 💖", x: Math.random() * canvas.width, y: 0, speed: 1 + Math.random() * 2, alpha: 1 });
}
function createExplosion(x, y) {
  const colors = ["#ff69b4", "#ff1493", "#ffb6c1"];
  for (let i = 0; i < 20; i++) {
    fireworkTexts.push({
      text: "ME ENCANTAS 💖",
      x, y,
      dx: (Math.random() - 0.5) * 6,
      dy: (Math.random() - 0.5) * 6,
      alpha: 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
}

function animate() {
  // Fondo con opacidad para generar estela
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Letras que caen
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  drops.forEach((d, i) => {
    ctx.fillStyle = `rgba(255,105,180,${d.alpha})`;
    ctx.fillText(d.text, d.x, d.y);
    d.y += d.speed;
    d.alpha -= 0.0015;
    if (d.alpha <= 0) drops.splice(i, 1);
  });

  // Letras que explotan
  ctx.font = "32px Arial";
  fireworkTexts.forEach((f, i) => {
    ctx.fillStyle = `rgba(${hexToRgb(f.color)},${f.alpha})`;
    ctx.fillText(f.text, f.x, f.y);
    f.x += f.dx;
    f.y += f.dy;
    f.alpha -= 0.01;
    if (f.alpha <= 0) fireworkTexts.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.replace('#',''), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255].join(',');
}
setInterval(createDrop, 250);

canvas.addEventListener("click", e => {
  createExplosion(e.clientX, e.clientY);
  if (!musicStarted) { music.play(); musicStarted = true; }
});

animate();
