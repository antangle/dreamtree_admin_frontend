<!-- 임성현 ver.0.1 -->

<template>

  <v-expansion-panels

  >
    <v-expansion-panel
      v-for="program in programs"
      :key="program"
    >
      <v-expansion-panel-title>
        <v-row justify="space-around">
          <v-col>
            프로그램: {{program.title}}
          </v-col>
          <v-col>
            학생이름: {{program.nickname}}
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row justify="space-around">
        <v-col>
          제목: {{program.title}} <br>
          내용: {{program.content}} <br>
          커리큘럼 <br>
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
        </v-col>
          <v-col>
            이메일: {{program.email}} <br>
            인증상태: {{program.authState}}
          </v-col>
        </v-row>

        총회차: {{program.times}} <br>
        <ul style="list-style: none">
          <li v-for="file in program.fileList" :key="file.fileId">
            첨부파일(이미지url): {{file.url}}
          </li>
        </ul>
        <v-btn @click="() => emits('moveLessonInfo', program.title)">레슨조회</v-btn>
        <v-btn @click="dialog = !dialog">삭제</v-btn>

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

  <div>
    <v-pagination
      v-model="pageNum"
      :length="totalPageSize"
      rounded="circle"
      @click="() => emits('movePageNum', pageNum)"
    ></v-pagination>
  </div>

</template>

<script setup>

import {getAdminProgramList, removeProgram} from "@/apis/adminAPIS";
import {onMounted, ref} from "vue";
import ProgramCurriculumDayComponent from "@/components/program/ProgramCurriculumDayComponent.vue";
import {getProgramLessonCount} from "@/apis/StudentAPIS";

const props = defineProps(['pSize', 'pNum', 'searchKeyword'])

const emits = defineEmits(['movePageNum', 'moveLessonInfo'])

const pageNum = ref(1)

const totalPageSize = ref()

const programs = ref([])

const dialog = ref(false)

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

  pageNum.value = parseInt(props.pNum)

  if(props.searchKeyword.condition == 'total') {

    props.searchKeyword.condition = 'title,email,nickname,authState'
  }

  const result = {
    ...props.searchKeyword,
    page: props.pNum,
    size: props.pSize
  }

  const programData = await getAdminProgramList(result);


  programs.value = programData.dtoList

  totalPageSize.value = Math.ceil(programData.total / props.pSize)
}

onMounted(() => {
  fetchGetList()
})

</script>

<style scoped>

</style>
