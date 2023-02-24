<template>

  <default-layout>
    <SearchComponent @clickSearch="clickSearch" />
    <CollegeAuthManagementComponent
      @movePageNum="moveCollegePageNum"
      @moveCollegeAuthInfo="moveCollegeAuthInfo"
      :searchKeyword="searchKeyword"
      :pNum="collegePNum"
      :pSize="collegePSize"
      :key="collegeComponentKey"
    />

    <CertificateAuthManagementComponent
      @movePageNum="moveCertificatePageNum"
      @moveCertificateAuthInfo="moveCertificateAuthInfo"
      :searchKeyword="searchKeyword"
      :pNum="certificatePNum"
      :pSize="certificatePSize"
      :key="certificateComponentKey"
    />
  </default-layout>

</template>

<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import SearchComponent from "@/components/common/SearchComponent.vue";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import CollegeAuthManagementComponent from "@/components/admin/CollegeAuthAdminComponent.vue";
import CertificateAuthManagementComponent from "@/components/admin/CertificateAuthAdminComponent.vue";

const router = useRouter()

const route = useRoute()

const collegeComponentKey = ref(0)

const searchKeyword = ref({ keyword: '', condition: 'total' })

const collegePNum = ref(route.query.collegePage || 1)

const collegePSize = ref(route.query.collegeSize || 5)

const certificateComponentKey = ref(0)

const certificatePNum = ref(route.query.certificatePage || 1)

const certificatePSize = ref(route.query.certificateSize || 5)


// 검색 (학교, 자격증 동시)
const clickSearch = (search) => {

  searchKeyword.value.keyword = search.keyword

  searchKeyword.value.condition = search.condition

  router.push({name: "AuthManagementPage",
    query: {
      keyword: searchKeyword.value.keyword,
      condition: searchKeyword.value.condition,
      collegePage: 1,
      collegeSize: collegePSize.value,
      certificatePage: 1,
      certificateSize: certificatePSize.value,
      component: 'search'
    }})
}

// 학교 인증 요청 페이지 이동
const moveCollegePageNum = (pageNum) => {

  collegePNum.value = pageNum

  router.push({ name: "AuthManagementPage",
    query: {
      ...searchKeyword.value,
      collegePage: collegePNum.value,
      collegeSize: collegePSize.value,
      certificatePage: certificatePNum.value,
      certificateSize: certificatePSize.value,
      component: 'college'
    }
  })
}

// 학교 조회
const moveCollegeAuthInfo = (id) => {

  console.log("student id: ", id)

  router.push({ name: "CollegeAuthInfoPage",
    query: {
      id: id,
      collegePage: collegePNum.value,
      collegeSize: collegePSize.value,
      certificatePage: certificatePNum.value,
      certificateSize: certificatePSize.value,
    }
  })
}

// 자격증 페이지 이동
const moveCertificatePageNum = (pageNum) => {

  certificatePNum.value = pageNum

  router.push({ name: "AuthManagementPage",
    query: {
      ...searchKeyword.value,
      collegePage: collegePNum.value,
      collegeSize: collegePSize.value,
      certificatePage: certificatePNum.value,
      certificateSize: certificatePSize.value,
      component: 'certificate'
    }
  })
}

// 자격증 조회
const moveCertificateAuthInfo = (id) => {

  console.log("info")

  router.push({ name: "CertificateAuthInfoPage",
    query: {
      id: id,
      collegePage: collegePNum.value,
      collegeSize: collegePSize.value,
      certificatePage: certificatePNum.value,
      certificateSize: certificatePSize.value,
    }
  })
}


router.beforeEach((to, from, next)=> {


  if(to.query.component == 'college') {
    collegePSize.value = to.query.collegeSize

    collegePNum.value = to.query.collegePage

    searchKeyword.value.keyword = to.query.keyword || ''

    searchKeyword.value.condition = to.query.condition || 'total'

    collegeComponentKey.value++

  }
  if(to.query.component == 'certificate') {
    certificatePSize.value = to.query.certificateSize

    certificatePNum.value = to.query.certificatePage

    searchKeyword.value.keyword = to.query.keyword || ''

    searchKeyword.value.condition = to.query.condition || 'total'

    certificateComponentKey.value++

  }
  if(to.query.component == 'search') {
    certificatePSize.value = to.query.certificateSize

    certificatePNum.value = to.query.certificatePage

    searchKeyword.value.keyword = to.query.keyword || ''

    searchKeyword.value.condition = to.query.condition || 'total'

    collegeComponentKey.value++

    certificateComponentKey.value++

  }


  next()
})
</script>

<style scoped>

</style>
