<template>
  <canvas ref="canvas" class="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"></canvas>
</template>

<script setup>
import * as THREE from 'three'
import { onMounted, onUnmounted, ref } from 'vue'

const canvas = ref(null)

onMounted(() => {
  // === 基本設定 ===
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75, // 視野角
    window.innerWidth / window.innerHeight, // アスペクト比
    0.1,
    1000
  )
  camera.position.z = 5

  const renderer = new THREE.WebGLRenderer({ canvas: canvas.value })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  // === 星を作成 ===
  const starCount = 1000
  const positions = []
  for (let i = 0; i < starCount; i++) {
    positions.push(
      (Math.random() - 0.5) * 2000,
      (Math.random() - 0.5) * 2000,
      (Math.random() - 0.5) * 2000
    )
  }

  const starGeometry = new THREE.BufferGeometry()
  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1.2,
    transparent: true,
    opacity: 0.8
  })

  const stars = new THREE.Points(starGeometry, starMaterial)
  scene.add(stars)

  // === マウス移動でカメラを制御 ===
  const mouse = { x: 0, y: 0 }
  window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  })

  // === アニメーション ===
  const animate = () => {
    requestAnimationFrame(animate)

    // 星をゆっくり回転
    stars.rotation.x += 0.0005
    stars.rotation.y += 0.001

    // マウス移動に合わせてカメラを少し傾ける
    camera.position.x += (mouse.x * 5 - camera.position.x) * 0.05
    camera.position.y += (mouse.y * 5 - camera.position.y) * 0.05
    camera.lookAt(scene.position)

    renderer.render(scene, camera)
  }
  animate()

  // === 画面リサイズ対応 ===
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})
</script>