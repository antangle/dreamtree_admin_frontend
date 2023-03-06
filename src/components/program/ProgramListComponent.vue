<!--이승윤 ver0.1-->

<template>
  <v-card
    class="mx-auto"
  >
    <v-list lines="two" class="ma-3">
      <v-list-subheader>프로그램 목록</v-list-subheader>

      <div
        v-for="list in programList"
        :key="list.programId"
      >
        <v-list-item
          :prepend-avatar="getPersonImageUrl(list.profileImgUrl)"
          :title="list.title"
          @click="emits('onClickProgramItem', list.programId)"
        >
          <template v-slot:subtitle>
            {{list.times}}회차
          </template>
        </v-list-item>

        <v-divider></v-divider>
      </div>

    </v-list>
  </v-card>

  <div>
    <v-pagination
      v-model="pageInfo.pageNum"
      :length="pageInfo.pageEnd"
      rounded="circle"
      @click="() => emits(`onClickMovePage`, pageInfo)"
    ></v-pagination>
  </div>

</template>

<script setup>
import {getProgramLists} from "@/apis/api";
import {onMounted, ref} from "vue";
import {getPersonImageUrl} from "@/util/imageUrlGetter";
const props = defineProps(['searchOptions', 'pageNum'])
const programList = ref()
const emits = defineEmits(['onClickMovePage', 'onClickProgramItem'])
const pageInfo = ref({
  pageNum: 0,
  pageSize: 5,
  pageEnd: 10
})
const fetchProgramLists = async () => {
  //컴포넌트 리로딩 시 pageNum값 세팅
  pageInfo.value.pageNum = parseInt(props.pageNum)

  const data = await getProgramLists(props.searchOptions, pageInfo.value)
  console.log(data);

  //가져온 페이징 데이터 저장
  programList.value = data.dtoList
  pageInfo.value.pageEnd = data.end
}
onMounted(() => {
  fetchProgramLists();
})

</script>

<style scoped>

</style>
