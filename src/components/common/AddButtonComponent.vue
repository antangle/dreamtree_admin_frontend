<template>


  <div class="button_group horizontal" >
    <v-btn
      v-if="(memberInfo.role == consts.STUDENT && memberInfo.authState == 'yes') || memberInfo.role == consts.ADMIN"
      class="cube1"
      size="large"
      icon="fa-solid fa-plus"
      @click="emits('onClickMoveProgramAddPage')"
    ></v-btn>
    <v-btn
      v-if="(memberInfo.role == consts.STUDENT && memberInfo.authState == 'yes') || memberInfo.role == consts.ADMIN"
      style="margin-left: 8px; margin-right: 8px"
      class="cube2"
      size="large"
      icon="fa-solid fa-plus"
      @click="emits('onClickMoveLessonAddPage')"
    ></v-btn>
    <v-btn
      v-if="memberInfo.role == consts.PARENT || memberInfo.role == consts.ADMIN"
      class="cube3"
      size="large"
      icon="fa-solid fa-plus"
      @click="emits('onClickMoveRequestAddPage')"
    ></v-btn>

  </div>

</template>

<script setup>
import useMemberInfo from "@/store/useMemberInfo";
import consts from "@/consts/const";

const emits = defineEmits(['onClickMoveProgramAddPage', 'onClickMoveRequestAddPage', 'onClickMoveLessonAddPage'])

const memberInfo = useMemberInfo().getMemberInfo()

</script>

<style scoped>

.button_group {
  display: flex;
  margin-top: 10px;
  background: transparent;
  justify-content:right;
}

.horizontal {
  background: #fff;
  border-radius: 4px;
  position: absolute;
  bottom: 1%;
  left: 90%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.cube1 {
  width: 60px;
  height: 60px;
  background: rgba(52, 25, 25, 0.77);
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
}

.cube2 {
  width: 60px;
  height: 60px;
  background: rgba(222, 199, 199, 0.77);
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
}

.cube3 {
  width: 60px;
  height: 60px;
  background: rgba(52, 25, 25, 0.77);
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
}

</style>
