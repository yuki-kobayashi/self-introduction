<template>
  <div class="relative min-h-screen text-gray-800">
    <!-- 背景キャンバス -->
    <canvas ref="bgCanvas" class="fixed top-0 left-0 w-full h-full -z-10"></canvas>

    <!-- ヘッダー -->
    <header class="fixed top-6 left-6 flex items-center space-x-2 z-10">
      <div class="w-4 h-4 bg-red-500 rounded-full"></div>
      <button
        @click="changeSection('profile')"
        class="text-lg font-bold hover:opacity-70 transition"
      >
        小林優希
      </button>
      <span
        @click="changeSection('profile')"
        class="text-sm text-gray-600 cursor-pointer hover:opacity-70 transition"
      >
        WEBエンジニア、モバイルアプリエンジニア
      </span>
    </header>

    <!-- 右上メニュー -->
    <nav class="fixed top-6 right-6 flex space-x-4 text-lg z-10">
      <button @click="changeSection('career')" class="hover:underline">職務経歴・スキル</button>
      <span class="border-l border-gray-400 h-6 self-center"></span>
      <button @click="changeSection('hobby')" class="hover:underline">趣味・好きなもの</button>
    </nav>

    <!-- コンテンツ部分 -->
    <main class="pt-20 pb-10">
      <transition name="fade-slide" mode="out-in">
        <component
            :is="currentView"
            :key="currentSection"
            @navigate="changeSection"
        />
      </transition>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

import ProfileView from '~/components/ProfileView.vue'
import CareerView from '~/components/CareerView.vue'
import HobbyView from '~/components/HobbyView.vue'

const currentSection = ref('profile')
const sections = { profile: ProfileView, career: CareerView, hobby: HobbyView }
const currentView = computed(() => sections[currentSection.value])
// 画面切り替え時にスクロール位置をトップに戻す
const changeSection = (section) => {
  currentSection.value = section

  // ページ最上部へスムーズにスクロール
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // アニメーションでスクロール
  })
}

const bgCanvas = ref(null)

function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = Math.PI / 2 * 3
  let x = cx
  let y = cy
  let step = Math.PI / spikes
  ctx.beginPath()
  ctx.moveTo(cx, cy - outerRadius)
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius
    y = cy + Math.sin(rot) * outerRadius
    ctx.lineTo(x, y)
    rot += step

    x = cx + Math.cos(rot) * innerRadius
    y = cy + Math.sin(rot) * innerRadius
    ctx.lineTo(x, y)
    rot += step
  }
  ctx.closePath()
  ctx.fill()
}

onMounted(() => {
  const canvas = bgCanvas.value
  const ctx = canvas.getContext('2d')

  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    spikes: 5,
    innerR: 1,
    outerR: Math.random() * 3 + 1,
    alpha: Math.random() * 0.8 + 0.2
  }))

    function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    }

  function draw() {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach(p => {
      p.alpha += (Math.random() - 0.5) * 0.02
      p.alpha = Math.min(Math.max(p.alpha, 0.2), 1)

      ctx.fillStyle = `rgba(30,144,255,${p.alpha})`
      ctx.shadowBlur = 6
      ctx.shadowColor = 'deepskyblue'
      drawStar(ctx, p.x, p.y, p.spikes, p.outerR, p.innerR)
      ctx.shadowBlur = 0

      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1
    })

    // 粒子間線
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx*dx + dy*dy)
        if (dist < 120) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(30,144,255,${0.3 - dist/400})`
          ctx.lineWidth = 0.4
          ctx.stroke()
        }
      }
    }

    requestAnimationFrame(draw)
  }

  resizeCanvas()
  draw()

  window.addEventListener('resize', resizeCanvas)
})

</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active,
.fade-slide-appear-active {
  transition: all 0.6s ease;
}

.fade-slide-enter-from,
.fade-slide-appear-from {
  opacity: 0;
  transform: translateY(40px);
}

.fade-slide-enter-to,
.fade-slide-appear-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>