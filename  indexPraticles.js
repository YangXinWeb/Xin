document.addEventListener('mousemove', (e) => {
  const cursor = document.getElementById('custom-cursor');
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Update canvas size and redraw particles on window resize
window.addEventListener('resize', function() {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

init ();
});

let particles = [];

// Mouse position
const mouse = {
x: null,
y: null,
radius: 180 // Radius of impact
};

// Mouse event
window.addEventListener('mousemove', function(event) {
mouse.x = event.x;
mouse.y = event.y;
});

// Create particle
class Particle {
constructor(x, y) {
this.x = x;
this.y = y;
this.size = Math.random() * 2 +1;
this.baseX = this.x;
this.baseY = this.y;
this.density = Math.random() * 30 + 1;
}

draw() {
ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
ctx.beginPath();
ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
ctx.closePath();
ctx.fill();
}

update() {
let dx = mouse.x - this.x;
let dy = mouse.y - this.y;
let distance = Math.sqrt(dx * dx + dy * dy);
let forceDirectionX = dx / distance;
let forceDirectionY = dy / distance;
let maxDistance = mouse.radius;
let force = (maxDistance - distance) / maxDistance;
let directionX = forceDirectionX * force * this.density;
let directionY = forceDirectionY * force * this.density;

if (distance < mouse.radius) {
  this.x -= directionX;
  this.y -= directionY;
} else {
  if (this.x !== this.baseX) {
      let dx = this.x - this.baseX;
      this.x -= dx / 10;
  }
  if (this.y !== this.baseY) {
      let dy = this.y - this.baseY;
      this.y -= dy / 10;
  }
}
}
}

// Initialize particles
function init() {
particles = [];
for (let i = 0; i < 8500; i++) {
let x = Math.random() * canvas.width;
let y = Math.random() * canvas.height;
particles.push(new Particle(x, y));
}
}

// Animate particles
function animate() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
for (let i = 0; i < particles.length; i++) {
particles[i].draw();
particles[i].update();
}
requestAnimationFrame(animate);
}

init();
animate();