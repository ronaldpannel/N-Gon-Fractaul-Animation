function setup() {
  const size = min(windowWidth, windowHeight);
  createCanvas(size, size);
  angleMode(DEGREES);
  colorMode(HSL, 1);
}
function inCoSin(v) {
  return 1 - (Math.cos(v * Math.PI * 2) * 0.5 + 0.5);
}

let n;
let t;
let frame = 0;
const frames = 2000;

function draw() {
  frame += deltaTime / (1000 / 60);
  t = fract(frame / frames);
  scale(width, height);
  background(0);
  stroke(1);
  strokeWeight(0.002);

  const depth = 5 * inCoSin(t * 4);

  n = 3 + floor(4 * t);
  drawFractal(0.5, 0.5, 0.4, depth);
}

function polar(angle, radius) {
  return {
    x: Math.cos(angle * Math.PI * 2) * radius,
    y: Math.sin(angle * Math.PI * 2) * radius,
  };
}

function drawFractal(x, y, size, depth) {
  const df = constrain(depth, 0, 1);
  for (let i = 0; i < n; i++) {
    const f = i / n;
    const angle = f + 0.25;

    if (depth > 0) {
      const scale = 0.5;
      const r = size * scale * df;
      const p = polar(angle, r);
      const s = size * (1 - df * scale);
      drawFractal(x + p.x, y + p.y, s, depth - 1);
    } else {
      const p1 = polar(angle, size);
      const p2 = polar(angle + 1 / n, size);
      const hue = fract(t + y * 0.25);
      const sat = 0.75;
      const light = 0.5 + x * 0.2;
      const c = color(hue, sat, light);
      stroke(c);

      line(x + p1.x, y + p1.y, x + p2.x, y + p2.y);
    }
  }
}

// function windowResized() {
//   resizeCanvas(600, 600);

// }
