<template>
  <v-list lines="two">

    <v-list-subheader>
      {{ memberInfo.nickname }} 님, 환영합니다!
    </v-list-subheader>

    <v-list-item
      prepend-icon="fa-solid fa-caret-right"
      title="수강 프로그램 조회"
      @click="() => emits(`onClickMoveProgressList`)"
    ></v-list-item>

    <v-divider/>

    <v-list-item
      prepend-icon="fa-solid fa-caret-right"
      title="출석 현황 조회"
      @click="() => emits('onClickMoveAttendanceList')"
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

const emits = defineEmits(['onClickMoveInfo', 'onClickMoveAttendanceList', 'onClickMoveProgressList'])
const memberInfo = useMemberInfo().getMemberInfo()

</script>

<style scoped>

</style>
