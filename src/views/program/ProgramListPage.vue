<!--이승윤 ver0.1-->

<template>
  <DefaultLayout>
    <ProgramSearchComponent
      @clickSearch="onClickSearch"
      :searchOptions="searchOptions"
    ></ProgramSearchComponent>
    <ProgramListComponent
      :key="listComponentKey"
      :searchOptions="searchOptions"
      :pageNum="pageNum"
      @onClickMovePage="onClickMovePage"
      @onClickProgramItem="onClickProgramItem"
    ></ProgramListComponent>
  </DefaultLayout>
</template>

<script setup>
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ProgramSearchComponent from "@/components/program/ProgramSearchComponent.vue";
import ProgramListComponent from "@/components/program/ProgramListComponent.vue";
import objectMapper from "@/util/objectmapper";
import consts from "@/consts/const";

const route = useRoute()
const router = useRouter()

const pageNum = ref(route.query.page || 1)

const searchOptions = ref({
  keyword: route.query.keyword || "",
  condition: route.query.condition || "total",
  order: route.query.order || "newest",
  subCategoryId: route.query.subCategoryId || 0
})

//검색 버튼 클릭시
const onClickSearch = (emittedSearchOptions) => {
  objectMapper(searchOptions.value, emittedSearchOptions)
  listComponentKey.value++
}

//페이징 이동
const onClickMovePage = (pageInfo) => {
  router.push({
    name: consts.PROGRAM_LIST_PAGE,
    query: {
      page: pageInfo.pageNum,
      subCategoryId: searchOptions.value.subCategoryId
    }
  })
}

//ProgramDetailPage로 이동
const onClickProgramItem = (programId) => {
  router.push({
    name: consts.PROGRAM_DETAIL_PAGE,
    params: {
      id: programId
    },
    query: {
      id: route.query.subCategoryId
    }
  })
}

const listComponentKey = ref(0)

//뒤로가기, 앞으로가기시 재로딩
router.beforeEach((to, from, next) => {
  objectMapper(searchOptions.value, to.query)
  pageNum.value = parseInt(to.query.page) || 1
  if(to.name == consts.PROGRAM_LIST_PAGE) listComponentKey.value++
  next()
})
</script>

<style scoped>

</style>
