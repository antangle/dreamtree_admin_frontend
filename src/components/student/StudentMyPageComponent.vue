<template>
  <v-list lines="two">

    <v-list-subheader>
      {{ memberInfo.nickname }} 선생님, 환영합니다!
    </v-list-subheader>

    <v-list-item
      prepend-icon="fa-solid fa-caret-right"
      title="프로그램 관리"
      @click="() => emits(`onClickMoveProgramListPage`)"
    ></v-list-item>

    <v-divider/>

    <v-list-item
      prepend-icon="fa-solid fa-caret-right"
      title="레슨 관리"
      @click="() => emits(`onClickMoveLessonListPage`)"
    ></v-list-item>

    <v-divider/>

    <v-list-item
      prepend-icon="fa-solid fa-caret-right"
      title="수강 신청 관리"
      @click="() => emits(`onClickMoveLessonAppliedPage`)"
    ></v-list-item>

    <v-divider/>

    <v-list-item
      prepend-icon="fa-solid fa-caret-right"
      title="출석 관리"
      @click="() => emits(`onClickMoveAttendancePage`)"
    ></v-list-item>

    <v-divider/>

    <v-list-item
      prepend-icon="fa-solid fa-caret-right"
      title="회원정보 조회 및 수정"
      @click="() => emits(`onClickMoveInfo`)"
    ></v-list-item>

  </v-list>
</template>

<script setup>

import useMemberInfo from "@/store/useMemberInfo";

const emits = defineEmits([ 'onClickMoveProgramListPage', 'onClickMoveLessonListPage', 'onClickMoveAttendancePage', 'onClickMoveLessonAppliedPage', 'onClickMoveInfo' ])
const memberInfo = useMemberInfo().getMemberInfo()

</script>

<style scoped>

</style>
