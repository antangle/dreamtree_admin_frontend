<template>
  <h2>레슨 관리</h2>
  <v-expansion-panels
      v-model="programPanel"
  >
    <v-expansion-panel
      v-for="program in lessons"
      :key="program.programId"
    >
      <v-expansion-panel-title>
        <v-row justify="space-around">
          <v-col>
            프로그램: {{ program.title }}
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-expansion-panels>
          <v-expansion-panel
            v-for="lesson in program.lessonProgressDTO"
            :key="lesson.lessonId"
          >
            <v-expansion-panel-title>
              <v-row justify="space-around">
                <v-col>
                  {{ lesson.startDate }} ~ {{ lesson.endDate }} 장소: {{ lesson.place }}
                </v-col>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              레슨 기간 : {{ lesson.startDate }} ~ {{ lesson.endDate }} <br>
              장소: {{ lesson.place }} <br>
              모집 기간: {{ lesson.expireStartDate }} ~ {{ lesson.expireEndDate }} <br>
              모집 인원: {{ lesson.personnel }}명 <br>
              주 {{ lesson.day }} 회 {{ lesson.lessonLength }}시간<br>
              총 {{ lesson.lessonTime }}시간 <br>
              금액: {{ lesson.fee.toLocaleString() }}원 <br>
              <hr>
              수강생 정보 <br>
              <div>
                <ul style="list-style: none">
                  <li v-for="progress in lesson.progressList" :key="progress.progressId">
                    상태: {{ progress.state }}
                    수강생 이름: {{ progress.childName }}
                  </li>
                </ul>
              </div>

              <v-chip
                size="small"
                label
                color="primary"
                class="me-2"
              >
                {{ stateMapper[lesson.state] }}
              </v-chip>
              <v-btn @click="dialog = !dialog">삭제</v-btn>
              <v-btn @click="() => onClickCloseButton(lesson.state)">마감</v-btn>

              <v-dialog v-model="dialog">

                <v-card>
                  <v-card-text style="text-align: center">
                    <div class="v-container">
                      정말 삭제하시겠습니까?
                    </div>
                  </v-card-text>
                  <v-card-actions class="justify-center">
                    <v-btn color="grey" @click="() => deleteLesson(lesson.lessonId)"> 확인</v-btn>
                  </v-card-actions>
                </v-card>

              </v-dialog>

              <v-dialog v-model="closeDialog">
                <v-card>
                  <v-card-text style="text-align: center">
                    <div class="v-container">
                      정말 마감하시겠습니까? 되돌릴 수 없습니다!
                    </div>
                  </v-card-text>
                  <v-card-actions class="justify-center">
                    <v-btn color="grey" @click="() => closeLesson(lesson.lessonId, lesson.state)"> 확인</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-expansion-panel-text>
      <v-divider></v-divider>
    </v-expansion-panel>
  </v-expansion-panels>

</template>

<script setup>

import {onMounted, ref} from "vue";
import {myLessonList} from "@/apis/StudentAPIS";
import {closeLessonStatus, removeLesson} from "@/apis/adminAPIS";
import useMemberInfo from "@/store/useMemberInfo";
import consts from "@/consts/const";

const props = defineProps(['programId'])
const memberInfo = useMemberInfo().getMemberInfo()
const lessons = ref([])

const dialog = ref(false)
const closeDialog = ref(false)

const programPanel = ref()

const stateMapper = {
  open: '모집 중',
  inProgress: '진행 중',
  close: '마감'
}

const onClickCloseButton = (state) => {
  if(state == consts.CLOSE){
    alert('이미 마감된 레슨입니다')
    return
  }

  closeDialog.value = !closeDialog.value
}

const closeLesson = async (id, state) => {

  console.log('close lesson')

  //이미 마감되면 아무것도 하지않음
  if(state == consts.CLOSE){
    return
  }

  await closeLessonStatus(id)

  closeDialog.value = !closeDialog.value

  await fetchGetList()
}

const deleteLesson = async (id) => {

  await removeLesson(id)

  dialog.value = !dialog.value

  await fetchGetList()
}

const fetchGetList = async () => {

  let data = await myLessonList(memberInfo.id)

  data = data.filter(item => item.lessonProgressDTO.length != 0)
  lessons.value = data

  /*programId을 어떻게 가져와서(query) 조회*/

  const programId = props.programId
  lessons.value.filter((data, index) => {
    if(data.programId == programId){
      programPanel.value = index
    }
  })

}

onMounted(() => {
  fetchGetList()
})

</script>

<style scoped>

</style>
