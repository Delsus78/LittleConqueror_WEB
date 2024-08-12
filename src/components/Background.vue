<template>
  <canvas id="backgroundCanvas"></canvas>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

onMounted(() => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const canvas = document.getElementById('backgroundCanvas');
  const ctx = canvas.getContext('2d');
  const rate = 60;
  const arc = 100;
  const size = 7;
  const speed = 2;
  const parts = new Array();
  const colors = ['#ff4757', '#ffa502', '#1e90ff', '#2ed573', '#5352ed'];
  const mouse = { x: 0, y: 0 };
  let time = 0;
  let count = 0;

  canvas.setAttribute('width', w);
  canvas.setAttribute('height', h);

  function create() {
    for (let i = 0; i < arc; i++) {
      parts[i] = {
        x: Math.ceil(Math.random() * w),
        y: Math.ceil(Math.random() * h),
        toX: Math.random() * 5 - 1,
        toY: Math.random() * 2 - 1,
        c: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * size
      };
    }
  }

  function particles() {
    ctx.clearRect(0, 0, w, h);
    document.addEventListener('mousemove', MouseMove, false);

    for (let i = 0; i < arc; i++) {
      const li = parts[i];
      let distanceFactor = DistanceBetween(mouse, parts[i]);
      distanceFactor = Math.max(Math.min(15 - distanceFactor / 10, 10), 1);
      ctx.beginPath();
      ctx.arc(li.x, li.y, li.size * distanceFactor, 0, Math.PI * 2, false);
      ctx.fillStyle = li.c;
      ctx.strokeStyle = li.c;

      if (i % 2 === 0) ctx.stroke();
      else ctx.fill();

      li.x += li.toX * (time * 0.05);
      li.y += li.toY * (time * 0.05);

      if (li.x > w) li.x = 0;
      if (li.y > h) li.y = 0;
      if (li.x < 0) li.x = w;
      if (li.y < 0) li.y = h;
    }

    if (time < speed) time++;

    requestAnimationFrame(particles);
  }

  function MouseMove(e) {
    mouse.x = e.layerX;
    mouse.y = e.layerY;
  }

  function DistanceBetween(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  create();
  particles();
});

onBeforeUnmount(() => {
  const canvas = document.getElementById('backgroundCanvas');
  document.removeEventListener('mousemove', MouseMove);
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

html, body {
  width: 100vw;
  height: 100vh;
}

canvas {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-color: black;
}
</style>
