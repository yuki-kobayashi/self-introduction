<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-6 py-12 space-y-16">
    <h2 class="text-4xl font-bold mb-10">趣味・好きなもの</h2>

    <div
      v-for="(hobby, index) in hobbies"
      :key="index"
      :class="[
        'flex flex-col md:items-start w-full max-w-4xl',
        index === 1 || index === 3 || index === 5 || index === 7 ? 'md:flex-row-reverse' : 'md:flex-row'
      ]"
    >
      <!-- 画像カルーセル -->
      <div
        class="w-full md:w-1/2"
        :class="index === 1 || index === 3 || index === 5 || index === 7 ? 'md:ml-8' : 'md:mr-8'"
      >
        <div class="relative rounded-xl shadow-lg">
          <div
            ref="carousels"
            class="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 py-6 scrollbar-hide"
          >
            <div
              v-for="(media, idx) in hobby.images"
              :key="idx"
              class="carousel-item flex-shrink-0 w-[300px] md:w-[460px] h-72 md:h-96 snap-center"
            >
              <!-- 画像の場合 -->
              <img
                v-if="media.type === 'image'"
                :src="media.src"
                alt="趣味の画像"
                class="w-full h-full object-contain rounded-xl"
              />

              <!-- 動画の場合 -->
              <video
                v-else-if="media.type === 'video'"
                :src="media.src"
                controls
                class="w-full h-full object-contain rounded-xl"
              ></video>
            </div>
          </div>

          <!-- 左右ボタン -->
          <button
            @click="prev(index)"
            class="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-blue-500 p-2 rounded-full shadow-lg ring-2 ring-blue-400 hover:ring-blue-500 transition"
          >
            ‹
          </button>
          <button
            @click="next(index)"
            class="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-blue-500 p-2 rounded-full shadow-lg ring-2 ring-blue-400 hover:ring-blue-500 transition"
          >
            ›
          </button>
        </div>
      </div>

      <!-- 説明テキスト -->
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
    images: [
      { type: 'image', src: '/snow1.jpg' },
      { type: 'image', src: '/snow2.jpg' },
      { type: 'image', src: '/snow3.jpg' },
    ]
  },
  {
    title: '車・ドライブ🚙',
    description: `
      車が好きで、特にスポーツカーを見かけると目で追ってしまう人種です。自身も今は赤のWRXに乗っています。<br>
      週末に天気が良ければ洗車して海沿いをドライブしたりします。
    `,
    images: [
      { type: 'image', src: '/car1.jpg' },
      { type: 'image', src: '/car2.png' },
    ]
  },
  {
    title: 'スポーツ観戦⚽🏎',
    description: `
      学生時代サッカーをやっていたこともあり、今でも代表戦やアルビの試合を見ることがあります。(選手にはあまり詳しくないです)<br><br>
      日本ではマイナーなジャンルですが、モータースポーツも好きで、特にF1のレースはシーズン通してテレビ観戦してます。<br>
    `,
    images: [
      { type: 'image', src: '/sports1.jpg' },
      { type: 'image', src: '/sports2.jpg' },
      { type: 'image', src: '/sports3.jpg' },
      { type: 'image', src: '/sports4.jpg' },
    ]
  },
  {
    title: '音楽🎸',
    description: `
      音楽はロックバンドの曲をよく聴いており、好きなバンドは　Alexandros、Base Ball Bear、BLUE ENCOUNT、ELLEGARDEN、FLOW、L'Arc～en～Ciel、MAGIC OF LiFE、
      MY FIRST STORY、RADWIMPS、SCANDAL、Silent Siren、SPYAIR、sumika、SUPER BEAVER、THE ORAL CIGARETTES、The Winking Owl、UNISON SQUARE GARDEN、
      UVERworld、WANIMA<br>等々です。<br><br>
      ロックバンドに縛らなくても大丈夫なので、オススメのアーティストがいたら是非教えてください。
    `,
    images: [
      { type: 'image', src: '/music1.jpg' },
      { type: 'image', src: '/music2.jpg' },
    ]
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
    images: [
      { type: 'image', src: '/game1.jpg' },
      { type: 'image', src: '/game2.jpg' },
      { type: 'image', src: '/game3.jpg' },
      { type: 'image', src: '/game4.jpg' },
    ]
  },
  {
    title: '漫画・アニメ📚',
    description: `
      有名どころではありますが、最近の漫画作品だとスパイファミリー、ダンダダンを読んでます。<br>
      10月からの秋アニメで注目しているのはスパイファミリー(3期)、ワンパンマン(3期)、僕のヒーローアカデミア(8期)、3年Z組銀八先生、野原ひろし昼メシの流儀<br>
      です。<br><br>

      漫画でもアニメでも、オススメがあれば是非教えてください。
    `,
    images: [
      { type: 'image', src: '/anime1.jpg' },
    ]
  },
  {
    title: '動物🐶',
    description: `
      動物は全般的に好きで、自宅でもミニチュアシュナウザーを2頭飼っていたり、自室でアクアリウムを立ち上げています。<br>
      余談ですが、この前日課の夜のウォーキング中、やすらぎ堤の遊歩道でキツネに会いました。<span class="text-red-500">　※動画音出ます。</span>
    `,
    images: [
      { type: 'image', src: '/animal1.jpg' },
      { type: 'image', src: '/animal2.jpg' },
      { type: 'image', src: '/animal3.jpg' },
      { type: 'video', src: '/animal1.mp4' },
    ]
  },
  {
    title: 'スイーツ🍰',
    description: `
      甘いものは大体なんでも好きです。<br>
      Komachi、ガタ子から新しいお店の情報をキャッチするとリサーチに行きます。<br>
      最近食べた中では中条たまごのシャインマスカットパフェが最高でした。<br><br>
      オススメのスイーツがあれば是非教えてください。
    `,
    images: [
      { type: 'image', src: '/sweets1.jpg' },
      { type: 'image', src: '/sweets2.jpg' },
      { type: 'image', src: '/sweets3.jpg' },
    ]
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