<template>
  <div class="background">
    <canvas id="backgroundCanvas"></canvas>
    <div class="fixed-bottom ground-container">
      <div id="baseTank">
        <div id="tankBall"/>
        <div id="canonTank"/>
      </div>
      <div class="ground shadow-top"></div>
    </div>
  </div>
</template>
<script setup>
import {onBeforeUnmount, onMounted, ref} from "vue";

// TANK BACKGROUND
let canvas = null;
let ctx = null;
const cursor = ref({ x: 0, y: 0 });
const missiles = ref([]);
const explosions = ref([]);
const lastRadRotationOfTheCanon = ref(0);

let tankBallCenterX;
let tankBallCenterY;

function updateCursorPosition(event) {
  cursor.value.x = event.clientX;
  cursor.value.y = event.clientY;
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  initTank();
}

// Initialiser les positions du tank et du canon
function initTank() {
  const tankBall = document.getElementById('tankBall');
  const tankBallRect = tankBall.getBoundingClientRect();
  tankBallCenterX = tankBallRect.left + tankBallRect.width / 2;
  tankBallCenterY = tankBallRect.top + tankBallRect.height / 2;
}


// Explosion de particules
function createExplosion(x, y) {
  const numParticles = 20;
  const explosionSize = 5;
  const particles = [];

  for (let i = 0; i < numParticles; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 5 + 2;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: explosionSize,
      life: 100
    });
  }

  explosions.value.push(...particles);
}

function updateExplosions() {
  explosions.value.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.life -= 2;
    particle.size *= 0.95;

    if (particle.life <= 0) {
      explosions.value.splice(index, 1);
    }
  });
}

function drawExplosions() {
  ctx.fillStyle = 'orange';
  explosions.value.forEach(particle => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
    ctx.fill();
  });
}
// END TANK BACKGROUND

// BUBBLE BACKGROUND
const arc = 100;
const size = 7;
const speed = 2;
const parts = [];
const colors = ['rgb(30, 41, 59)','rgba(226, 232, 240,0.3)', 'rgb(14, 165, 233)'];
let time = 0;

function create() {
  for (let i = 0; i < arc; i++) {
    parts[i] = {
      x: Math.ceil(Math.random() * window.innerWidth),
      y: Math.ceil(Math.random() * window.innerHeight),
      toX: Math.random() * 5 - 1,
      toY: Math.random() * 2 - 1,
      c: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * size
    };
  }
}

function particles() {
  function DistanceBetween(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  for (let i = 0; i < arc; i++) {
    const li = parts[i];
    let distanceFactor = DistanceBetween(cursor.value, parts[i]);
    distanceFactor = Math.max(Math.min(15 - distanceFactor / 10, 10), 1);
    ctx.beginPath();
    ctx.arc(li.x, li.y, li.size * distanceFactor, 0, Math.PI * 2, false);
    ctx.fillStyle = li.c;
    ctx.strokeStyle = li.c;

    if (i % 2 === 0) ctx.stroke();
    else ctx.fill();

    li.x += li.toX * (time * 0.05);
    li.y += li.toY * (time * 0.05);

    if (li.x > window.innerWidth) li.x = 0;
    if (li.y > window.innerHeight) li.y = 0;
    if (li.x < 0) li.x = window.innerWidth;
    if (li.y < 0) li.y = window.innerHeight;
  }

  if (time < speed) time++;

}

onMounted(() => {
  canvas = document.getElementById('backgroundCanvas');
  ctx = canvas.getContext('2d');

  function tankCanonRotationOnCursor() {
    const deltaX = cursor.value.x - tankBallCenterX;
    const deltaY = cursor.value.y - tankBallCenterY;
    const angleInRadians = Math.atan2(deltaY, deltaX);

    const angleInDegrees = angleInRadians * (180 / Math.PI) + 90;

    // Appliquer la rotation à canonTank
    const tankCanon = document.getElementById('canonTank');
    tankCanon.style.transform = `translateX(-50%) rotate(${angleInDegrees}deg)`;

    return angleInRadians;
  }

  function shootMissile() {
    const speed = 5;
    const vx = Math.cos(lastRadRotationOfTheCanon.value) * speed;
    const vy = Math.sin(lastRadRotationOfTheCanon.value) * speed;

    missiles.value.push({
      x: tankBallCenterX,
      y: tankBallCenterY,
      vx,
      vy
    });
  }

  function updateMissiles() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    missiles.value = missiles.value.filter(missile => {
      missile.x += missile.vx;
      missile.y += missile.vy;

      return missile.x > 0 && missile.x < width && missile.y > 0 && missile.y < height;
    });
  }

  function drawMissiles() {
    ctx.fillStyle = 'rgb(226, 232, 240)';
    missiles.value.forEach(missile => {
      ctx.beginPath();
      ctx.arc(missile.x, missile.y, 5, 0, 2 * Math.PI);
      ctx.fill();
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    lastRadRotationOfTheCanon.value = tankCanonRotationOnCursor();
    updateMissiles();
    drawMissiles();
    updateExplosions();
    drawExplosions();
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  initTank();

  setInterval(shootMissile, 3000);

  document.addEventListener('mousemove', updateCursorPosition);
  document.addEventListener('click', (event) => {
    const clickX = event.clientX;
    const clickY = event.clientY;

    missiles.value = missiles.value.filter((missile, index) => {
      const distance = Math.hypot(missile.x - clickX, missile.y - clickY);
      if (distance < 30) {
        createExplosion(missile.x, missile.y);
        return false;
      }
      return true;
    });
  });

  function bgLoop() {
    requestAnimationFrame(bgLoop);
    draw();
    particles();
  }

  create();
  bgLoop();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas);
  document.removeEventListener('mousemove', updateCursorPosition);
});
</script>
<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  z-index: -1000;
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1000;
  background-color: #0f172a;
}

#baseTank {
  width: 50px;
  height: 20px;
  background-color: #1c2b50;
  position: absolute;
  left: 15%;
  bottom: 10vh;
  transform-origin: center bottom;
  transform: translateX(-50%);
  border-radius: 5px;
  z-index: 1;
}

#canonTank {
  width: 8px;
  height: 20px;
  background-color: #1c2b50;
  position: absolute;
  left: 50%;
  bottom: 30px;
  transform-origin: center bottom;
  transform: translateX(-50%);
}

#tankBall {
  width: 20px;
  height: 20px;
  background-color: #1c2b50;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  bottom: 15px;
  transform-origin: center bottom;
  transform: translateX(-50%);

}

.ground {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10vh;
  background-color:  #1c2b50;
}

.ground-container {
  z-index: -1;
}
</style>