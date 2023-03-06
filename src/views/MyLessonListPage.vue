<!-- 임성현 ver.0.1 -->

<template>

  <default-layout>
    <LessonListComponent
      :programId="programId"
    />
  </default-layout>
</template>

<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import LessonListComponent from "@/components/lesson/MyLessonListComponent.vue";
import {useRoute} from "vue-router";
import {ref} from "vue";

const route = useRoute()

const programId = ref(route.query.programId)

</script>

<style scoped>

</style>
