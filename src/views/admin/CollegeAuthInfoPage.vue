<!-- 임성현 ver.0.1 -->

<template>

  <default-layout>
    <CollegeAuthInfoComponent
      @moveAuthManagement="moveAuthManagement"
      :id="collegeId"
    />
  </default-layout>

</template>

<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import CollegeAuthInfoComponent from "@/components/admin/CollegeAuthInfoComponent.vue";
import {useRoute, useRouter} from "vue-router";

const router = useRouter()

const route = useRoute()

const collegeId = route.query.id
const moveAuthManagement = () => {

  router.push({name: 'AuthAdminPage'})
}

</script>

<style scoped>

</style>
