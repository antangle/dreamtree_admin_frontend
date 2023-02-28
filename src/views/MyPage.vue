<template>
  <DefaultLayout>

    <StudentMyPageComponent
      v-if="role === 'student'"
      @onClickMoveInfo="movePageById('StudentInfoPage', id)"
      @onClickMoveProgramListPage="movePageById('MyProgramListPage', id)"
      @onClickMoveLessonListPage="movePageById('MyLessonListPage', id)"
      @onClickMoveAttendancePage="movePageById('MyAttendancePage', id)"
      @onClickMoveLessonAppliedPage="movePage(consts.MY_LESSON_APPLIED_PAGE)"
    />

    <ParentMyPageComponent
      v-if="role === 'parent'"
      @onClickMoveProgressList="movePageById('ProgressListPage', id)"
      @onClickMoveAttendanceList="movePageById('MyAttendancePage', id)"
      @onClickMoveInfo="movePageById('ParentInfoPage', id)"
    />

    <AdminMyPageComponent
      v-if="role === 'admin'"
      @movePage="movePage"
    />

  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { useRouter } from "vue-router";
import ParentMyPageComponent from "@/components/parents/ParentMyPageComponent.vue";
import StudentMyPageComponent from "@/components/student/StudentMyPageComponent.vue";
import useMemberInfo from "@/store/useMemberInfo";
import {ref} from "vue";
import AdminMyPageComponent from "@/components/admin/AdminMyPageComponent.vue";
import consts from "@/consts/const";

const router = useRouter()
const memberInfo = ref(useMemberInfo().getMemberInfo())
const role = memberInfo.value.role
const id = memberInfo.value.id

/** 페이지 이동 **/
const movePageById = (page, value) => {

  router.push({name: page, params: {id: value} })

}

const movePage = (page) => {

  router.push({ name: page })

}

</script>

<style scoped>



</style>
