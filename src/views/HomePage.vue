<template>
<DefaultLayout>
  <div class="background">
  <div class="vue-word-cloud-container">
    <div class="vue-word-cloud-wrapper">
      <vue-word-cloud
        :words="words"
        :color="([, weight]) => weight > 10 ? '#5B407F' : weight > 5 ? '#D95F76' : '#595959'"
      >
        <template v-slot="{text, weight, word}">
          <div :title="weight" style="cursor: pointer; font-family: 'Cafe24SsurroundAir'" @click="() => onClickWord(word[2])">
            {{ text }}
          </div>
        </template>
      </vue-word-cloud>
    </div>
  </div>
</div>
</DefaultLayout>
</template>

<script setup>

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getWordCloudInfo} from "@/apis/api";
import consts from "@/consts/const";

const router = useRouter()

const words = ref([])
const rotate = ref({from: -60, to: 60, numOfOrientation: 5 })

const fetchWordCloudInfo = async () => {
  const data = await getWordCloudInfo()
  data.map((item) => {
    //[부카테고리이름, 개수, 부카테고리id]
    words.value.push([item.subCategoryName, item.count, item.subCategoryId])
  })
  console.log(data);
}

// 워드클라우드의 단어 클릭시
const onClickWord = (id) => {
  //[부카테고리이름, 개수, 부카테고리id]
  router.push({
    name: consts.PROGRAM_LIST_PAGE,
    query: {
      subCategoryId: id
    }
  })
}


onMounted(() => {
  fetchWordCloudInfo()
})

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gugi&family=IBM+Plex+Sans+KR:wght@300&family=Nanum+Gothic&family=Noto+Serif+KR:wght@700&family=Single+Day&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Gowun+Dodum&family=Gugi&family=IBM+Plex+Sans+KR:wght@300&family=Nanum+Gothic&family=Noto+Serif+KR:wght@700&family=Single+Day&display=swap');
@font-face {
  font-family:'Cafe24Oneprettynight';
  src: url('@/assets/fonts/Cafe24Oneprettynight.ttf') format('truetype');
  font-weight: 400;
}
@font-face {
  font-family:'Cafe24SsurroundAir';
  src: url('@/assets/fonts/Cafe24SsurroundAir.ttf') format('truetype');
  font-weight: 400;
}


.background {
  background-image: url("public/cherryblossom_home2.png");
  background-size: cover;
  background-color: rgb(255, 243, 237);
  background-position-y: 1%;
  background-position-x: -40px;
  height: 900px;
}
.vue-word-cloud-container{
  display: flex;
  justify-content: center;
  min-height: 100%;
}
.vue-word-cloud-wrapper{
  background-color: transparent;
  max-width: 90%;
  max-height: 100%;
  min-width: 80%;
  min-height: 50%;
  height: 640px;
  width: 480px;
}
</style>
