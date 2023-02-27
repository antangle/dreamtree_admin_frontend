<template>
<DefaultLayout>
  <div class="vue-word-cloud-container">
    <div class="vue-word-cloud-wrapper">
      <vue-word-cloud
        :words="words"
        :color="([, weight]) => weight > 10 ? 'DeepPink' : weight > 5 ? 'RoyalBlue' : 'Indigo'"
        font-family="Roboto"
      >
        <template v-slot="{text, weight, word}">
          <div :title="weight" style="cursor: pointer;" @click="() => onClickWord(word[2])">
            {{ text }}
          </div>
        </template>
      </vue-word-cloud>
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
.vue-word-cloud-container{

  display: flex;
  justify-content: center;
  align-items: center;
}
.vue-word-cloud-wrapper{
  max-width: 90%;
  max-height: 90%;
  min-width: 80%;
  min-height: 50%;
  height: 640px;
  width: 480px;
}
</style>
