<template>
  <DefaultLayout>

    <v-tabs
      v-model="tab"
      bg-color="transparent"
      grow
    >
      <v-tab value="1">대학생</v-tab>
      <v-tab value="2">학부모</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="1">
        <SearchComponent @clickSearch="clickSearch"
        :conditions="conditions"
        />

        <StudentAdminComponent
          @movePageNum="movePageNum"
          @moveStudentInfo="moveStudentInfo"
          @moveAuthManagementPage="moveAuthManagementPage"
          :searchKeyword="searchKeyword"
          :pNum="pNum"
          :pSize="pSize"
          :key="componentKey"
        />
      </v-window-item>

      <v-window-item value="2">
        <SearchComponent @clickSearch="clickSearch"/>
        <ParentAdminComponent
          @movePageNum="movePageNum"
          @onClickMoveInfoModifyPage="moveInfoModifyPage"
          :searchCondition="searchCondition"
          :pNum="pNum"
          :pSize="pSize"
          :key="componentKey"
        />
      </v-window-item>

    </v-window>


  </DefaultLayout>
</template>

<script setup>
import ParentAdminComponent from "@/components/ParentAdminComponent.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import SearchComponent from "@/components/common/SearchComponent.vue";
import StudentAdminComponent from "@/components/admin/StudentAdminComponent.vue";

const tab = ref()

const router = useRouter()
const route = useRoute()

// 페이징 처리 위한 설정값
const pNum = ref(route.query.page || 1)
const pSize = ref(route.query.size || 10)

const searchCondition = ref({ keyword: '', condition: '' })

const searchKeyword = ref({
  keyword: route.query.keyword || '',
  condition: route.query.condition || ''
})

const componentKey = ref(0)

const conditions = ref(['total', 'email', 'nickname', 'authState'])


const moveAuthManagementPage = () => {

  router.push({name: 'AuthManagementPage'})
}

const moveInfoModifyPage = (id) => {

  router.push({ name: 'InfoModifyPage' ,
    query: {
      page: pNum.value,
      size: pSize.value
    },
    params: {id: id} })

}

// 성현
const clickSearch = (search) => {

  searchKeyword.value.keyword = search.keyword

  searchKeyword.value.condition = search.condition

  router.push({name: "MemberAdminPage",
    query: {
      keyword: searchKeyword.value.keyword,
      condition: searchKeyword.value.condition,
      page: 1,
      size: 10
    }})
}

const movePageNum = (pageNum) => {

  pNum.value = pageNum

  router.push({ name: "MemberAdminPage",
    query: {
      ...searchKeyword.value,
      page: pNum.value,
      size: pSize.value
    }
  })
}

const moveStudentInfo = (id) => {

  console.log("info")

  router.push({ name: "AdminStudentInfoPage",
    query: {
      page: pNum.value,
      size: pSize.value
    },
    params: {id: id}
  })
}

router.beforeEach((to, from, next)=> {

  pSize.value = to.query.size

  pNum.value = to.query.page

  searchKeyword.value.keyword = to.query.keyword || ''

  searchKeyword.value.condition = to.query.condition || 'total'

  if(to.name == 'MemberAdminPage') componentKey.value++

  next()
})
</script>

<style scoped>

</style>
