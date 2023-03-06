<!-- 임성현 ver.0.1 -->

<template>

  <default-layout>
    <CertificateManagementComponent
      @addSuccess="addSuccess"
      :id="id"
     :key="componentKey"
    />
  </default-layout>

</template>

<script setup>

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import CertificateManagementComponent from "@/components/student/CertificateManagementComponent.vue";
import {ref} from "vue";
import {useRoute} from "vue-router";

const componentKey = ref(0)

const route = useRoute()

const id = route.params.id;

const addSuccess = () => {

  alert("요청완료")

  componentKey.value++
}

</script>

<style scoped>

</style>
