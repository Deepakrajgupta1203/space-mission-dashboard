const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createStars();
}
window.addEventListener('resize', initCanvas);
initCanvas();

function createStars(count = 600) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width,
      o: Math.random()
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let s of stars) {
    s.z -= 2;
    if (s.z <= 0) {
      s.x = Math.random() * canvas.width;
      s.y = Math.random() * canvas.height;
      s.z = canvas.width;
    }
    const k = 128.0 / s.z;
    const x = (s.x - canvas.width / 2) * k + canvas.width / 2;
    const y = (s.y - canvas.height / 2) * k + canvas.height / 2;
    const size = (1 - s.z / canvas.width) * 3;
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${s.o})`;
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(draw);
}
draw();

// Simulated dashboards
function simulate(id, generator, interval) {
  const el = document.getElementById(id);
  setInterval(() => el.innerText = generator(), interval);
}

simulate('iss-location', () => {
  return `Lat: ${(Math.random() * 180 - 90).toFixed(2)}°, Lon: ${(Math.random() * 360 - 180).toFixed(2)}°`;
}, 3000);

simulate('asteroid-info', () => {
  return `Detected ${Math.floor(Math.random() * 5 + 1)} near‑Earth objects passing today.`;
}, 4000);

simulate('mars-weather', () => {
  return `Temp: ${(-60 + Math.random() * 40).toFixed(1)} °C  •  Wind: ${(Math.random() * 50).toFixed(1)} km/h`;
}, 3500);
