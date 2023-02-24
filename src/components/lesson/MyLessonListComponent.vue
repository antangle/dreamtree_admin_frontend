<template>

  <h2>레슨 관리</h2>
  <v-expansion-panels

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
        {{program}}
        <hr>
        {{program.lessonProgressDTO}}
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
              <v-btn @click="dialog = !dialog">삭제</v-btn>

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
import {myLessonList, myProgramList} from "@/apis/StudentAPIS";
import {removeLesson} from "@/apis/adminAPIS";


const lessons = ref([])

const dialog = ref(false)

const deleteLesson = async (id) => {

  await removeLesson(id)

  dialog.value = !dialog.value

  await fetchGetList()
}

const fetchGetList = async () => {

  lessons.value = await myLessonList(1)

}

onMounted(() => {
  fetchGetList()
})

</script>

<style scoped>

</style>
