<template>

  <DefaultLayout>
    <MyPageAdminComponent @movePage="movePage" />
  </DefaultLayout>

</template>

<script setup>

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import MyPageAdminComponent from "@/components/admin/MyPageAdminComponent.vue";
import {useRouter} from "vue-router";

const router = useRouter()

// 페이지 이동
const movePage = (page) => {

  router.push({name: page})

}

</script>

<style scoped>

</style>
