// Canvas Setup

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: 0,
  y: 0,
};

let mouseDown = false;
window.addEventListener("mousedown", () => {
  mouseDown = true;
});
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});
// uility functions
const colors = ["#2185C5", "#7ECEFD", "#FF7F66"];

function randomColors(arrayOfcolors) {
  return arrayOfcolors[Math.floor(Math.random() * arrayOfcolors.length)];
}

// Collision detection (Circle)
function distance(x1, y1, x2, y2) {
  const distanceX = x2 - x1;
  const distanceY = y2 - y1;

  return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
}

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  draw() {
    c.beginPath();
    c.shadowColor = this.color;
    c.shadowBlur = 15;
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
  }
}

let particles = [];

function init() {
  particles = [];
  for (i = 0; i < 500; i++) {
    const x = randomIntFromRange(-canvas.width, canvas.width);
    const y = randomIntFromRange(-canvas.height, canvas.height);
    const radius = randomIntFromRange(2, 4);
    const color = randomColors(colors);

    particles.push(new Particle(x, y, radius, color));
  }
}
init();
let radians = 0.01;
let alpha = 1;
function animate() {
  c.fillStyle = `rgba(10 ,10, 10, ${alpha})`;
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.save();
  c.translate(canvas.width / 2, canvas.height / 2);
  c.rotate(radians);
  window.requestAnimationFrame(animate);
  particles.forEach((element) => element.update());
  c.restore();

  radians += 0.001;
  if (mouseDown && alpha >= 0.1) {
    alpha -= 0.01;
  }
}

animate();
