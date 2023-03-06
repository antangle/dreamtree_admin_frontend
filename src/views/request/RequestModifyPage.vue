
<!--최서연 ver.0.1-->
<!-- 요청글 수정 페이지 -->

<template>
  <DefaultLayout>

    <RequestFormComponent
      @moveDetailPage="moveDetailPage"
    />

  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import RequestFormComponent from "@/components/request/RequestFormComponent.vue";
import {useRouter} from "vue-router";

const router = useRouter()
const moveDetailPage = (id) => {

  router.push({ name: 'RequestDetailPage', params: {id: id} })

}


</script>

<style scoped>

</style>
