<template>

  <default-layout>
    <CertificateAuthInfoComponent
      @moveAuthManagement="moveAuthManagement"
      :id="certificateId"
    />
  </default-layout>

</template>

<script setup>

import {useRoute, useRouter} from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import CertificateAuthInfoComponent from "@/components/admin/CertificateAuthInfoComponent.vue";

const router = useRouter()

const route = useRoute()

const certificateId = route.query.id
const moveAuthManagement = () => {

  router.push({name: 'AuthAdminPage'})
}

</script>

<style scoped>

</style>
