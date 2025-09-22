<template>
  <div class="relative min-h-screen text-gray-800">
    <!-- 新しい3D背景 -->
    <SpaceBackground />

    <!-- ヘッダー -->
    <header class="fixed top-6 left-6 flex items-center space-x-2 z-50">
      <div class="w-4 h-4 bg-red-500 rounded-full"></div>
      <button
        @click="changeSection('profile')"
        class="text-lg text-white font-bold hover:opacity-70 transition"
      >
        小林優希
      </button>
      <span
        @click="changeSection('profile')"
        class="text-sm text-white cursor-pointer hover:opacity-70 transition"
      >
        WEBエンジニア、モバイルアプリエンジニア
      </span>
    </header>

    <!-- 右上メニュー -->
    <nav class="fixed top-6 text-white right-6 flex space-x-4 text-lg z-50">
      <button @click="changeSection('career')" class="hover:underline">職務経歴・スキル</button>
      <span class="border-l border-gray-400 h-6 self-center"></span>
      <button @click="changeSection('hobby')" class="hover:underline">趣味・好きなもの</button>
    </nav>

    <!-- コンテンツ部分 -->
    <main class="pt-20 pb-10 relative z-10">
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
import SpaceBackground from '~/components/SpaceBackground.vue'
import { ref, computed } from 'vue'

import ProfileView from '~/components/ProfileView.vue'
import CareerView from '~/components/CareerView.vue'
import HobbyView from '~/components/HobbyView.vue'

const currentSection = ref('profile')
const sections = { profile: ProfileView, career: CareerView, hobby: HobbyView }
const currentView = computed(() => sections[currentSection.value])

const changeSection = (section) => {
  currentSection.value = section
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>