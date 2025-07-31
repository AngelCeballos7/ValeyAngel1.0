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
  for (let i = 0; i < 15; i++) {
    fireworkTexts.push({
      text: "ME ENCANTAS 💖",
      x, y,
      dx: (Math.random() - 0.5) * 8,
      dy: (Math.random() - 0.5) * 8,
      alpha: 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drops.forEach((d, i) => {
    ctx.fillStyle = `rgba(255,105,180,${d.alpha})`;
    ctx.fillText(d.text, d.x, d.y);
    d.y += d.speed;
    d.alpha -= 0.002;
    if (d.alpha <= 0) drops.splice(i, 1);
  });
  fireworkTexts.forEach((f, i) => {
    ctx.fillStyle = `rgba(${hexToRgb(f.color)},${f.alpha})`;
    ctx.fillText(f.text, f.x, f.y);
    f.x += f.dx;
    f.y += f.dy;
    f.alpha -= 0.02;
    if (f.alpha <= 0) fireworkTexts.splice(i, 1);
  });
  requestAnimationFrame(animate);
}
function hexToRgb(hex) {
  const bigint = parseInt(hex.replace('#',''), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255].join(',');
}
setInterval(createDrop, 300);

canvas.addEventListener("click", e => {
  createExplosion(e.clientX, e.clientY);
  if (!musicStarted) { music.play(); musicStarted = true; }
});
ctx.font = "20px Arial";
ctx.textAlign = "center";
animate();
