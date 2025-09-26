<template>
  <transition name="fade-slide" appear>
    <div class="flex flex-col md:flex-row items-center justify-center min-h-[75vh] px-6">
      <!-- プロフィール画像 -->
      <img
        src="/profile.jpg"
        alt="プロフィール写真"
        class="w-[300px] h-[300px] object-cover rounded-full shadow-lg ring-4 ring-gray-500 ring-offset-2 ring-offset-white mb-6 md:mb-0 md:mr-12"
      />

      <!-- 右側テキスト -->
      <div class="text-center md:text-left">
        <h1 class="text-5xl text-white font-bold mb-4">自己紹介</h1>
        <p class="text-lg text-white max-w-md mb-8">
          初めまして！10月よりお世話になります、小林です。<br>
          長年社内SEとしてサポート業務を中心に経験してきており、WEBエンジニアとしてはまだまだ学習中です。(Macを業務で扱うのも初めてです...)<br>
          そのため、最初はご迷惑をおかけすることも多々あるかと思いますが、1日でも早く業務に貢献できるよう努力してまいりますので、どうぞよろしくお願いいたします。<br>
          インドア・アウトドア共に多趣味で、共通の話題もいろいろあるかと思いますので、気軽にお声がけいただけると嬉しいです。
        </p>

        <!-- 丸ボタン -->
        <div class="flex justify-center md:justify-start space-x-6">
          <button
            @click="$emit('navigate', 'career')"
            class="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center font-bold hover:scale-105 transition float-animate"
          >
            職務経歴・<br>スキル
          </button>

          <button
            @click="$emit('navigate', 'hobby')"
            class="w-20 h-20 bg-cyan-400 rounded-full flex items-center justify-center font-bold hover:scale-105 transition float-animate delay"
          >
            趣味・<br>好きなもの
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineEmits(['navigate'])
</script>

<style scoped>
/* ふよふよ浮くアニメーション */
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0px);
  }
}

/* 丸ボタン用アニメーション */
.float-animate {
  animation: float 3s ease-in-out infinite;
}

/* 2つ目のボタンを少し遅らせて自然な動きに */
.float-animate.delay {
  animation-delay: 1.5s;
}
</style>