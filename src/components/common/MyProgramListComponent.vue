<template>
  <v-expansion-panels
  >
    <v-expansion-panel
      v-for="program in programs"
      :key="program"
    >
      <v-expansion-panel-title>
        <v-row justify="start">

            {{program.title}}

        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <br/>
        <v-row>
          <v-col cols="2">내용</v-col>
          <v-col>{{ program.content }}</v-col>
          <v-col cols="3">가격</v-col>
          <v-col cols="3">{{ program.fee }}</v-col>
          <br/>
        </v-row>

        <v-row
          v-for="(dayCurriculum, index) in JSON.parse(program.curriculumJson)"
          :key="index"
        >
          <v-col>
            <ProgramCurriculumDayComponent
              :key="index"
              :dayCurriculum="dayCurriculum"
              :readMode="true"
              :times="index"
            ></ProgramCurriculumDayComponent>
          </v-col>
        </v-row>
        총회차: {{program.times}} <br>

        <v-row>
          <v-col
            v-for="file in program.fileList" :key="file.fileId"

          >
            <v-img
              :src="getImageUrl(file.url)"
            ></v-img>

          </v-col>
        </v-row>
        <v-btn @click="() => emits('moveLesson', program.programId)">레슨조회</v-btn>
        <v-btn @click="dialog = !dialog">삭제</v-btn>
        <v-btn @click="() => updateProgram(program.programId)">수정</v-btn>

        <v-dialog v-model="dialog">

          <v-card>
            <v-card-text style="text-align: center">
              <div class="v-container">
                정말 삭제하시겠습니까?
              </div>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn color="grey" @click="() => deleteProgram(program.programId)"> 확인</v-btn>
            </v-card-actions>
          </v-card>

        </v-dialog>
      </v-expansion-panel-text>
      <v-divider></v-divider>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>

import {getProgramLessonCount, myProgramList} from "@/apis/StudentAPIS";
import {onMounted, ref} from "vue";
import ProgramCurriculumDayComponent from "@/components/program/ProgramCurriculumDayComponent.vue";
import {removeProgram} from "@/apis/adminAPIS";
import useMemberInfo from "@/store/useMemberInfo";
import {getImageUrl} from "@/util/imageUrlGetter";

const emits = defineEmits(['moveProgramModify', 'moveLesson'])

const memberInfo = useMemberInfo().getMemberInfo()

const programs = ref([])

const dialog = ref(false)

const updateProgram = async (id) => {

  emits('moveProgramModify', id)
}

const deleteProgram = async (id) => {

  const count = await getProgramLessonCount(id)

  if(count < 1) {
    await removeProgram(id)


    dialog.value = !dialog.value

    await fetchGetList()
  } else {
    alert(count + "개의 레슨으로 인해 삭제할 수 없습니다.")

    dialog.value = !dialog.value

    return
  }
}

const fetchGetList = async () => {

  programs.value = await myProgramList(memberInfo.id)

  console.log(programs.value)
}

onMounted(() => {
  fetchGetList()
})


</script>

<style scoped>

</style>
