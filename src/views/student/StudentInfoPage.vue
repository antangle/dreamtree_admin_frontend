<template>

  <default-layout>
    <v-tabs
      v-model="tab"
      bg-color="transparent"
      grow
    >
      <v-tab value="1">회원정보</v-tab>
      <v-tab value="2">자격증</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="1">
        <StudentInfoComponent
          @moveModify="moveModify"
          :id="studentId"
        />
      </v-window-item>

      <v-window-item value="2">
        <CertificateManagementComponent
          @addSuccess="addSuccess"
          :id="studentId"
          :key="certificateComponentKey"
        />
      </v-window-item>

    </v-window>
  </default-layout>

</template>

<script setup>

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import CertificateManagementComponent from "@/components/student/CertificateManagementComponent.vue";
import StudentInfoComponent from "@/components/student/StudentInfoComponent.vue";

const router = useRouter()

const route = useRoute()

const tab = ref()

const studentId = route.params.id

const certificateComponentKey = ref(0)

// 자격증 신청 완료 시
const addSuccess = () => {

  alert("요청완료")

  certificateComponentKey.value++
}

// 회원 수정 페이지 이동
const moveModify = () => {

  const id = studentId

  router.push({name: 'StudentModifyPage', params: {id}})
}


</script>

<style scoped>

</style>
