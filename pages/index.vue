<template>
  <div class="relative min-h-screen bg-gray-50 text-gray-800">
    <!-- ヘッダー -->
    <header class="fixed top-6 left-6 flex items-center space-x-2 z-10 bg-gray-50">
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
    <nav class="fixed top-6 right-6 flex space-x-4 text-lg z-10 bg-gray-50">
      <button @click="changeSection('career')" class="hover:underline">職務経歴・スキル</button>
      <span class="border-l border-gray-400 h-6 self-center"></span>
      <button @click="changeSection('hobby')" class="hover:underline">趣味・好きなもの</button>
    </nav>

    <!-- コンテンツ部分 -->
    <main class="pt-20 pb-10"> <!-- ヘッダー分の余白を確保 -->
      <transition name="fade-slide" mode="out-in" appear>
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
import { ref, computed } from 'vue'

// 子コンポーネント読み込み
import ProfileView from '~/components/ProfileView.vue'
import CareerView from '~/components/CareerView.vue'
import HobbyView from '~/components/HobbyView.vue'

// 現在の表示セクション
const currentSection = ref('profile')

// セクションマッピング
const sections = {
  profile: ProfileView,
  career: CareerView,
  hobby: HobbyView,
}

// 現在のビューを返す計算プロパティ
const currentView = computed(() => sections[currentSection.value])

// セクション切り替え関数
const changeSection = (section) => {
  currentSection.value = section
}
</script>

<style scoped>
/* フェードスライドアニメーション */
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