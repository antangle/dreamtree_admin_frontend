<template>
  <DefaultLayout>
    <AdminStudentInfoComponent
      @moveModify="moveModify"
      @moveMemberManagement="moveMemberManagement"
      :id="studentId"
    />
  </DefaultLayout>
</template>

<script setup>

import {useRoute, useRouter} from "vue-router";
import StudentInfoComponent from "@/components/admin/AdminStudentInfoComponent.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const router = useRouter()

const route = useRoute()

const studentId = route.params.id

const moveModify = () => {

  router.push({name: 'StudentModifyPage', params: {id: studentId}})
}

const moveMemberManagement = () => {

  router.push({name: 'MemberManagementPage'})
}
</script>

<style scoped>

</style>
