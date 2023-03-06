<!--이승윤 ver0.1-->

<template>
  <!--  input  -->
  <v-text-field
    v-model="curriculumForm"
    label="커리큘럼 내용"
    single-line
    hide-detail
    v-if="!readMode"

  ></v-text-field>
  <!--  추가버튼  -->
  <v-btn
    icon="fa-solid fa-plus"
    @click="onClickInsideAddButton"
    v-if="!readMode"
  >
  </v-btn>


</template>

<script setup>

import {ref} from "vue";

const emits = defineEmits(['onClickInsideAddButton'])
const props = defineProps(['readMode'])
const curriculumForm = ref()
const readMode = ref(props.readMode)

const onClickInsideAddButton = () => {
  emits('onClickInsideAddButton', curriculumForm.value)
  curriculumForm.value = null
}

</script>

<style scoped>

</style>
