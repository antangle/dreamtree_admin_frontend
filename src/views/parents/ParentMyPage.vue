
<!--최서연 ver.0.1-->
<!-- 학부모 마이 페이지 -->

<template>
    <DefaultLayout>

      <ParentMyPageComponent
        @onClickMoveInfo="moveParentInfoPage"
        @onClickMoveProgressList="moveProgressListPage"
      />

    </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ParentMyPageComponent from "@/components/parents/ParentMyPageComponent.vue";

import {useRouter} from "vue-router";

const router = useRouter()

const moveParentInfoPage = (id) => {

  console.log("Move to Parent MyPage...")

  router.push( { name: 'ParentInfoPage', params: {id: id} })

}

const moveProgressListPage = (id) => {

  router.push({ name: 'ProgressListPage', params: {id: id}})

}

</script>

<style scoped>

</style>
