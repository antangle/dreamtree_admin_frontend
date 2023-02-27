<template>
  <v-container class="curriculum-wrapper">
    <v-row
      justify="center"
      class="box"
    >
      <v-col >
        {{props.times + 1}} 회차
      </v-col>
      <v-spacer></v-spacer>
      <v-btn flat icon="fa-solid fa-x" style="float: right"
        @click="emits('deleteDayCurriculum', curriculum)"
        v-if="!readMode"
      ></v-btn>
    </v-row>
    <!-- 커리큘럼 -->
    <v-row
      justify="end"
    >
      <v-col
        v-for="(content, index) in curriculum"
        class="curriculum-day ma-1"
        :key="index"
      >
        {{content}}
        <!-- todo: 수정 -->
        <v-btn
          class="float-right"
          icon="fa-solid fa-pencil"
          v-if="!readMode"
        ></v-btn>
        <!-- 삭제 -->
        <v-btn
          class="float-right"
          icon="fa-solid fa-x"
          @click="() => removeCurriculum(content)"
          v-if="!readMode"
        ></v-btn>
      </v-col>
    </v-row>

    <v-row>
      <!-- input -->
      <ProgramCurriculumComponent
        @onClickInsideAddButton="onClickInsideAddButton"
        :readMode="readMode"
      ></ProgramCurriculumComponent>
    </v-row>
  </v-container>
</template>

<script setup>
import {ref} from "vue";
import ProgramCurriculumComponent from "@/components/program/ProgramCurriculumComponent.vue";

const emits = defineEmits(['pushCurriculum', 'deleteDayCurriculum'])
const props = defineProps(['dayCurriculum', 'readMode', 'times'])
const readMode = ref(props.readMode)
const curriculum = ref(props.dayCurriculum)


//1줄 삭제
const removeCurriculum = (content) => {
  curriculum.value = curriculum.value.filter(e => e !== content)
  emits('pushCurriculum', curriculum.value)
}

//1줄 추가
const onClickInsideAddButton = (curriculumStr) => {
  curriculum.value.push(curriculumStr)
  emits('pushCurriculum', curriculum.value)
}

</script>

<style scoped>

.box {
  outline-color: #424242;
}
.curriculum-wrapper{
  border: #212529;
  border-style: solid;
  border-radius: 10px;
}

.curriculum-day{
  background-color: #F2F2F2;
  border-radius: 10px;
}

.button-day{
  border-radius: 10px;
  background-color: black;
}

</style>
