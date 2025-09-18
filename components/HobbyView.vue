<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-12 space-y-16">
    <h2 class="text-4xl font-bold mb-10">趣味・好きなもの</h2>

  <div
    v-for="(hobby, index) in hobbies"
    :key="index"
    :class="[
      'flex flex-col md:items-start space-y-6 md:space-y-0 md:space-x-8 w-full max-w-4xl',
      index === 2 || index === 4 || index === 6 ? 'md:flex-row-reverse' : 'md:flex-row' // 音楽は左右反転
    ]"
  >
      <!-- 左または右: 画像カルーセル -->
      <div class="w-full md:w-1/2">
        <div class="relative rounded-xl shadow-lg">
          <div
            ref="carousels"
            class="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 py-6 scrollbar-hide"
          >
            <div
              v-for="(img, idx) in hobby.images"
              :key="idx"
              class="carousel-item flex-shrink-0 w-[300px] md:w-[460px] h-72 md:h-96 snap-center"
            >
              <img
                :src="img"
                alt="趣味の画像"
                class="w-full h-full object-contain rounded-xl bg-gray-100"
              />
            </div>
          </div>

          <!-- 左右ボタン -->
          <button
            @click="prev(index)"
            class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:scale-105"
          >‹</button>

          <button
            @click="next(index)"
            class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:scale-105"
          >›</button>
        </div>
      </div>

      <!-- 右: 説明テキスト -->
      <div class="w-full md:w-1/2 text-gray-700">
        <h3 class="text-2xl font-semibold mb-4">{{ hobby.title }}</h3>
        <p v-html="hobby.description"></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

/**
 * 複数のカルーセルを配列で管理
 */
const carousels = ref([])

const hobbies = [
  {
    title: 'スノーボード🏂',
    description: `
      唯一の身体を動かす趣味がスノーボードです。<br>
      シーズン平均10回ほど滑ります。<br>
      お気に入りのスキー場は舞子、ロッテアライ、ネコママウンテンです。
    `,
    images: ['/snow1.jpg', '/snow2.jpg', '/snow3.jpg']
  },
  {
    title: 'スポーツ観戦⚽',
    description: `
      学生時代サッカーをやっていたこともあり、今でも代表戦やアルビの試合を見ることがあります。(選手にはあまり詳しくないです)<br><br>
      日本ではマイナーなジャンルですが、モータースポーツも好きで、特にF1のレースはシーズン通してテレビ観戦してます。<br>
    `,
    images: ['/sports1.jpg', '/sports2.jpg', '/sports3.jpg', '/sports4.jpg']
  },
  {
    title: '音楽🎸',
    description: `
      音楽はロックバンドの曲をよく聴いており、好きなバンドは　Alexandros、Base Ball Bear、BLUE ENCOUNT、ELLEGARDEN、FLOW、L'Arc～en～Ciel、MAGIC OF LiFE、
      MY FIRST STORY、RADWIMPS、SCANDAL、Silent Siren、SPYAIR、sumika、SUPER BEAVER、THE ORAL CIGARETTES、The Winking Owl、UNISON SQUARE GARDEN、
      UVERworld、WANIMA<br>等々です。<br><br>
      ロックバンドに縛らなくても大丈夫なので、オススメのアーティストがいたら是非教えてください。
    `,
    images: ['/music1.jpg', '/music2.jpg']
  },
  {
    title: 'ゲーム🎮',
    description: `
      一番リソースを使っている趣味はゲームだと思います。<br>
      いろんなジャンルを遊びますが、特にRPGが好きで、FFシリーズのナンバリングタイトルはほぼコンプリートしてます。<br>
      一時期レースゲームにガチになり、eスポーツをかじっていた頃もありました。<br>
      YouTubeでゲーム実況を見ることもあります。<br><br>
      自慢ですが、Switch2が2台当たりました。
    `,
    images: ['/game1.jpg', '/game2.jpg', '/game3.jpg', '/game4.jpg']
  },
  {
    title: '漫画・アニメ📚',
    description: `
      有名どころではありますが、最近の漫画作品だとスパイファミリー、ダンダダンを集めてます。<br>
      10月からの秋アニメで注目しているのはスパイファミリー(3期)、ワンパンマン(3期)、僕のヒーローアカデミア(8期)、3年Z組銀八先生、野原ひろし昼メシの流儀<br>
      です。<br><br>
      漫画でもアニメでも、オススメがあれば是非教えてください。
    `,
    images: ['/anime1.jpg']
  },
  {
    title: '動物🐶',
    description: `
      動物は全般的に好きで、自宅でもミニチュアシュナウザーを2頭飼っていたり、自室でアクアリウムを立ち上げています。<br>
      余談ですが、この前日課の夜のウォーキング中、信濃川沿いの遊歩道でキツネに会いました。
    `,
    images: ['/animal1.jpg','/animal2.jpg','/animal3.jpg']
  },
  {
    title: 'スイーツ🍰',
    description: `
      甘いものは大体なんでも好きです。<br>
      Komachi、ガタ子から新しいお店の情報をキャッチするとリサーチに行きます。<br>
      今まで食べた中で一番美味しかったスイーツは、銀座ねんりん家のバームクーヘンです。<br><br>
      オススメのスイーツがあれば是非教えてください。
    `,
    images: ['/sweets1.jpg','/sweets2.jpg','/sweets3.jpg']
  },
]

/**
 * 1枚あたりの幅を取得
 */
const getItemWidth = (carousel) => {
  const item = carousel.querySelector('.carousel-item')
  return item
    ? item.clientWidth + parseInt(getComputedStyle(carousel).gap || 16)
    : carousel.clientWidth
}

/**
 * 次の画像へ
 */
function next(index) {
  const el = carousels.value[index]
  if (!el) return
  const step = getItemWidth(el)

  if (el.scrollLeft + el.clientWidth >= el.scrollWidth - step / 2) {
    el.scrollTo({ left: 0, behavior: 'smooth' })
  } else {
    el.scrollBy({ left: step, behavior: 'smooth' })
  }
}

/**
 * 前の画像へ
 */
function prev(index) {
  const el = carousels.value[index]
  if (!el) return
  const step = getItemWidth(el)

  if (el.scrollLeft <= step / 2) {
    el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' })
  } else {
    el.scrollBy({ left: -step, behavior: 'smooth' })
  }
}
</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
img {
  image-orientation: from-image;
}
</style>