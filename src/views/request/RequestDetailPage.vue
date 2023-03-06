
<!--최서연 ver.0.1-->
<!-- 요청글 상세 조회 페이지 -->

<template>
  <DefaultLayout>

    <RequestDetailComponent
      :id="id"
      @moveModifyPage="moveModifyPage"
      @moveListPage="moveListPage"
      @moveParentInfoPage="moveParentInfoPage"
    />

  </DefaultLayout>

</template>

<script setup>

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import RequestDetailComponent from "@/components/request/RequestDetailComponent.vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()
const id = route.params.id

const moveModifyPage = (id) => {

  router.push({ name: 'RequestModifyPage', params: {id: id}})

}

const moveListPage = () => {

  router.push({ name: 'RequestListPage' })

}

const moveParentInfoPage = (id) => {

  router.push({ name: 'ParentInfoPage', params: {id: id} })

}

</script>

<style scoped>

</style>
