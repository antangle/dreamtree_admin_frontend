<template>

  <default-layout>
    <MyProgramListComponent
    @moveProgramModify="moveProgramModify"
    />
  </default-layout>
</template>

<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import MyProgramListComponent from "@/components/common/MyProgramListComponent.vue";
import {useRouter} from "vue-router";

const router = useRouter()

const moveProgramModify = (id) => {

  router.push({name: 'ProgramModifyPage', params: {id}})
}

</script>

<style scoped>

</style>
