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
