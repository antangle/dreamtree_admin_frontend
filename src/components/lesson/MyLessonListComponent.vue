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
              <v-container>
                <v-row no-gutters>
                  <v-col cols="2"><p>수강생</p></v-col>
                  <v-col>
                  <ul style="list-style: none">
                    <li v-for="progress in lesson.progressList" :key="progress.progressId">
                      이름: {{ progress.childName }} &nbsp; &nbsp; &nbsp;
                      상태: <v-chip>{{ progress.state == 'success' ? '결제완료' : progress.state == 'pending' ? '결제 요청 중' : '미결제'}}</v-chip>
                    </li>
                  </ul>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="2"><p>레슨 회차</p></v-col>
                  <v-col>{{ lesson.lessonTime }}</v-col>
                  <v-col cols="2"><p>레슨 시간</p></v-col>
                  <v-col>{{ lesson.lessonLength }}</v-col>
                </v-row>

                <v-row>
                  <v-col cols="2"><p>레슨 시작일</p></v-col>
                  <v-col>{{ setLocalDateString(lesson.startDate) }}</v-col>
                  <v-col cols="2"><p>레슨 종료일</p></v-col>
                  <v-col>{{ setLocalDateString(lesson.endDate) }}</v-col>
                </v-row>

                <v-row>
                  <v-col cols="2"><p>장소</p></v-col>
                  <v-col>{{ lesson.place }}</v-col>
                  <v-col cols="2"><p>수강료</p></v-col>
                  <v-col>{{ lesson.fee.toLocaleString() }} 원</v-col>
                </v-row>

                <v-row justify="space-between">
                  <v-col cols="2"><p>상태</p></v-col>
                  <v-col><v-chip>{{ lesson.state == 'inProgress' ? '진행 중' : lesson.state == 'open' ? '모집 중' : '마감'   }}</v-chip></v-col>
                </v-row>
              </v-container>
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

const setLocalDateString = (str) => {

  const date = new Date(str)
  return date.toLocaleDateString()

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
