<template>

  <default-layout>
    <SearchComponent
      @clickSearch="clickSearch"
      :conditions="conditions"
    />
    <AdminProgramManagementComponent
      @movePageNum="movePageNum"
      @moveLessonInfo="moveLessonInfo"
      :pNum="pNum"
      :pSize="pSize"
      :searchKeyword="searchKeyword"
      :key="componentKey"
    />
  </default-layout>
</template>

<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import AdminProgramManagementComponent from "@/components/admin/ProgramAdminComponent.vue";
import SearchComponent from "@/components/common/SearchComponent.vue";

const router = useRouter()
const route = useRoute()

// 페이징 처리 위한 설정값
const pNum = ref(route.query.page || 1)
const pSize = ref(route.query.size || 10)

const searchKeyword = ref({ keyword: '', condition: 'total' })

const componentKey = ref(0)

const conditions = ['total', 'title', 'nickname', 'email']

const clickSearch = (search) => {

  console.log(search)

  searchKeyword.value.keyword = search.keyword

  searchKeyword.value.condition = search.condition

  router.push({name: "AdminProgramManagementPage",
    query: {
      keyword: searchKeyword.value.keyword,
      condition: searchKeyword.value.condition,
      page: 1,
      size: 10
    }})
}

const moveLessonInfo = (keyword) => {

  router.push({ name: 'AdminLessonManagementPage',
    query: {
      keyword: keyword,
      condition: 'total',
      page: 1,
      size: 10
    }
  })
}


const movePageNum = (pageNum) => {

  pNum.value = pageNum

  router.push({ name: "AdminProgramManagementPage",
    query: {
      ...searchKeyword.value,
      page: pNum.value,
      size: pSize.value
    }
  })
}


router.beforeEach((to, from, next)=> {

  pSize.value = to.query.size

  pNum.value = to.query.page

  searchKeyword.value.keyword = to.query.keyword || ''

  searchKeyword.value.condition = to.query.condition || 'total'

  if(to.name == 'AdminProgramManagementPage') componentKey.value++

  next()
})
</script>

<style scoped>

</style>
