
<!--최서연 ver.0.1-->
<!-- 학부모 회원 정보 조회 페이지 -->

<template>
  <DefaultLayout>

    <ParentInfoComponent
      :id="id"
      @onClickMoveInfoModifyPage="moveInfoModifyPage"
    />

  </DefaultLayout>
</template>

<script setup>

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ParentInfoComponent from "@/components/parents/ParentInfoComponent.vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()

const id = route.params.id

const moveInfoModifyPage = () => {

  router.push({ name: 'InfoModifyPage' , params: {id: id} })

}

</script>

<style scoped>

</style>
