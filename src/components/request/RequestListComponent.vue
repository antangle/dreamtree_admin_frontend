
<!--최서연 ver.0.1-->
<!-- 요청글 리스트 조회 컴포넌트 -->

<template>
  <v-container>
    <v-list lines="one" class="ma-2">
      <v-list-subheader>요청글 목록</v-list-subheader>

      <v-list-item
        v-for="request in requestList"
        :key="request.id"
        @click="() => emits(`onClickMoveRequestDetailPage`, request.requestId)"
      >
        <div class="d-flex flex-nowrap justify-space-between">

          <div class="d-flex flex-no-wrap ma-1">
            <div style="margin-left: 1px">
              <v-card-title>{{ request.title }}</v-card-title>
              <v-card-text>{{ request.description }}</v-card-text>
            </div>
          </div>

          <div>
            <v-card-text> {{ request.subCategoryName ? request.subCategoryName : "etc" }}</v-card-text>
            <v-card-text> {{ request.createdAt }}</v-card-text>
          </div>
        </div>
        <v-divider inset/>
      </v-list-item>
      <v-divider/>
    </v-list>

    <div>
      <v-pagination
        v-model="pageNum"
        :length="pageLen"
        rounded="circle"
        @click="() => emits(`movePage`, pageNum)"
      ></v-pagination>
    </div>

  </v-container>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {getRequestList} from "@/apis/RequestAPIS";
import SearchComponent from "@/components/common/SearchComponent.vue";

const emits = defineEmits(['onClickMovePage'])
const props = defineProps(['movePage', 'pNum', 'pSize', 'searchCondition'])
const requestList = ref([])

// 페이지 처리 위한 설정값
const pageNum = ref(1)
const pageSize = ref()
const pageLen = ref()

const fetchGetReqeustList = async () => {

  pageNum.value = parseInt(props.pNum)

  console.log(pageNum.value)

  const res = await getRequestList(props.searchCondition, props.pNum, props.pSize)

  console.log(res)

  requestList.value = res.dtoList
  pageLen.value = Math.ceil(res.total / props.pSize)

  console.log(requestList.value)

}

onMounted(() =>{
  fetchGetReqeustList()
})

</script>

<style scoped>

</style>
