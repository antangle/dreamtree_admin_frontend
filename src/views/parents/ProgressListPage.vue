
<!--최서연 ver.0.1-->
<!-- 학부모 수강 프로그램 조회 페이지 -->

<template>
    <DefaultLayout>

      <ProgressListComponent
        :key="componentKey"
        @paySucceeded="onPaySucceeded"
      />

    </DefaultLayout>
</template>

<script setup>


import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ProgressListComponent from "@/components/parents/ProgressListComponent.vue";
import {ref} from "vue";

const componentKey = ref(0)

const onPaySucceeded = () => {
  console.log('결제성성공공')
  componentKey.value++
}


</script>

<style scoped>

</style>
