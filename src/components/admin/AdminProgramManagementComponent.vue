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
        <ul style="list-style: none">
          <li v-for="file in program.fileList" :key="file.fileId">
            첨부파일(이미지url): {{file.url}}
          </li>
        </ul>
        <v-btn>레슨조회</v-btn>
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

import {getAdminProgramList} from "@/apis/adminAPIS";
import {onMounted, ref} from "vue";
import ProgramCurriculumDayComponent from "@/components/program/ProgramCurriculumDayComponent.vue";

const props = defineProps(['pSize', 'pNum', 'searchKeyword'])

const emits = defineEmits(['movePageNum'])

const pageNum = ref(1)

const totalPageSize = ref()

const programs = ref([])

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
