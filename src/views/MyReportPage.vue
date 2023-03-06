<!-- 임성현 ver.0.1 -->

<template>

  <default-layout>
    <AddReportComponent @PostReport="postReport"/>
    <StudentReportComponent
      @movePageNum="reportMovePageNum"
      :pNum="pNum"
      :pSize="pSize"
      :key="componentKey"
    />
  </default-layout>

</template>

<script setup>

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import StudentReportComponent from "@/components/common/ReportListComponent.vue";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {addReport} from "@/apis/StudentAPIS";
import AddReportComponent from "@/components/common/addReportComponent.vue";

const router = useRouter()

const route = useRoute()

const pNum = ref(route.query.page || 1)

const pSize = ref(route.query.size || 10)

const componentKey = ref(0)


const postReport = async (report) => {

  await addReport(report)

  // 보낸 메일 화면에 바로 보여짐
  componentKey.value++
}


const reportMovePageNum = (pageNum) => {

  pNum.value = pageNum

  router.push({
    name: "StudentReportPage",
    query: {
      page: pNum.value,
      size: pSize.value,
    }
  })
}

router.beforeEach((to, from, next) => {

  pSize.value = to.query.size

  pNum.value = to.query.page

  if (to.name == 'StudentReportPage') componentKey.value++

  next()
})

</script>

<style scoped>

</style>
