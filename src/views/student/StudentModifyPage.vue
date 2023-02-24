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

const router = useRouter()

const route = useRoute()

const studentId = route.params.id

// 수정 후 다시 조회로 이동
const moveInfo = () => {

  const id = studentId

  router.push({name: 'StudentInfoPage', query: {id}})
}

</script>

<style scoped>

</style>
