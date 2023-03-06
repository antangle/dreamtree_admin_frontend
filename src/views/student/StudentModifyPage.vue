<!-- 임성현 ver.0.1 -->

<template>

  <DefaultLayout>
    <StudentModifyComponent
      @moveInfo="moveInfo"
      :id="studentId"
    />
  </DefaultLayout>

</template>

<script setup>

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import StudentModifyComponent from "@/components/student/StudentModifyComponent.vue";
import {useRoute, useRouter} from "vue-router";
import useMemberInfo from "@/store/useMemberInfo";

const router = useRouter()

const route = useRoute()

const studentId = route.params.id

// 수정 후 다시 조회로 이동
const moveInfo = () => {

  const id = studentId

  if(useMemberInfo().getMemberInfo().role === 'admin') {

    router.push({name: 'AdminStudentInfoPage', params: {id}})
  }
  if(useMemberInfo().getMemberInfo().role === 'student') {

    router.push({name: 'StudentInfoPage', params: {id}})
  }
}

</script>

<style scoped>

</style>
