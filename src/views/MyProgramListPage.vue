<!-- 임성현 ver.0.1 -->

<template>

  <default-layout>
    <MyProgramListComponent
    @moveProgramModify="moveProgramModify"
    @moveLesson="moveLesson"
    />
  </default-layout>
</template>

<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import MyProgramListComponent from "@/components/common/MyProgramListComponent.vue";
import {useRouter} from "vue-router";
import useMemberInfo from "@/store/useMemberInfo";

const router = useRouter()

const moveProgramModify = (id) => {

  router.push({name: 'ProgramModifyPage', params: {id}})
}

const moveLesson = (programId) => {
  const userInfo = useMemberInfo().getMemberInfo()
  const id = userInfo.id
  router.push({
    name: 'MyLessonListPage',
    params: {
      id: id
    },
    query: {programId}})
}

</script>

<style scoped>

</style>
