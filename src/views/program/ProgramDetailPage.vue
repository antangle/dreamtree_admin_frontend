<template>
  <DefaultLayout>
    <v-container>
      <!--대학생 정보-->
      <LessonStudentInfoComponent
        :programDetailInfo="programDetailInfo"
        @onClickStudentImage="moveToStudentPage"
      ></LessonStudentInfoComponent>

      <!--레슨정보 없을시 디폴트-->
      <v-row
        v-if="!programDetailInfo.lessonLists || programDetailInfo.lessonLists.length == 0"
      >
        <v-col>
          <v-card
            class="lessons"
            height="200"
            width="200"
          >
            <div style="margin: 10px; color: #424242">
              현재 등록된 레슨이 없습니다
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!--레슨 정보-->
      <v-row>
        <v-col>
          <LessonInfoComponent
            :programDetailInfo="programDetailInfo"
            @onClickLesson="onClickLesson"
          ></LessonInfoComponent>

        </v-col>
      </v-row>

      <!--레슨 상세 정보 모달-->
      <div class="text-center">
        <v-dialog
          v-model="lessonDialog"
        >
          <LessonDetailComponent
            v-if="lessonIndex != undefined"
            :programTitle="programDetailInfo.title"
            :lessonInfo="programDetailInfo.lessonLists[lessonIndex]"
            :key="lessonDetailComponentKey"
            @offDialog="lessonDialog = false"
            @paySucceeded="afterPaySucceed"
            @moveLessonApplyPage="moveToLessonApplyPage"
          />
        </v-dialog>
      </div>

      <!--프로그램 정보-->
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>
              {{programDetailInfo.title}}
            </v-card-title>

            <v-card-item>
              <v-row
                v-for="(dayCurriculum, index) in programDetailInfo.curriculumJson"
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
            </v-card-item>

            <v-card-text style="margin-top: 15px">
              {{ programDetailInfo.content }}
            </v-card-text>

            <v-card-item>
              <v-row>
                <v-col
                  v-for="url in programDetailInfo.fileUrls"
                  :key="url"
                >
                  <v-img
                    :src="getImageUrl(url)"
                    width="200"
                  >
                    <template v-slot:placeholder>
                      <div class="d-flex align-center justify-center fill-height">
                        <v-progress-circular
                          color="grey-lighten-4"
                          indeterminate
                        ></v-progress-circular>
                      </div>
                    </template>
                  </v-img>
                </v-col>
              </v-row>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            @click="onClickListButton"
          >
            목록
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import {onMounted, ref} from "vue";
import ProgramCurriculumDayComponent from "@/components/program/ProgramCurriculumDayComponent.vue";
import {getProgramDetailInfo} from "@/apis/api";
import {useRoute, useRouter} from "vue-router";
import consts from "@/consts/const";
import LessonStudentInfoComponent from "@/components/lesson/LessonStudentInfoComponent.vue";
import LessonInfoComponent from "@/components/lesson/LessonInfoComponent.vue";
import LessonDetailComponent from "@/components/lesson/LessonDetailComponent.vue";
import {getImageUrl} from "@/util/imageUrlGetter";


const programDetailInfo = ref({})
const lessonDialog = ref(false)
const lessonIndex = ref()
const lessonDetailComponentKey = ref(0)

const route = useRoute()
const router = useRouter()

/*목록 버튼 누를 시 리스트 페이지로*/
const onClickListButton = () => {
  router.push({
    name: consts.PROGRAM_LIST_PAGE,
    query: {
      subCategoryId: route.query.id
    }
  })
}

const moveToLessonApplyPage = (lessonInfo, programTitle) => {
  console.log(lessonInfo)
  console.log(lessonInfo)
  router.push({
    name: consts.LESSON_APPLY_PAGE,
    query: {
      title: programTitle,
      lessonId: lessonInfo.lessonId
    }
  })
}

const moveToStudentPage = () => {
  console.log(programDetailInfo.value)
  router.push({
    name: consts.STUDENT_INFO_PAGE,
    params:{
      id: programDetailInfo.value.studentId
    }
  })
}

/*결제 이후*/
const afterPaySucceed = () => {
  lessonDialog.value = false
  /*todo: 결제 이후 로직 구현*/
}

/*해당 인덱스의 lesson 상세 정보를 가져오는 dialog를 보여준다.*/
const onClickLesson = (index) => {
  if(index == undefined) return
  lessonDialog.value = true
  lessonIndex.value = index
  lessonDetailComponentKey.value++
}

const fetchProgramDetailInfo = async () => {
  const data = await getProgramDetailInfo(parseInt(route.params.id))

  if(!data.lessonLists[0].lessonId){
    data.lessonLists = []
  }

  data.curriculumJson = JSON.parse(data.curriculumJson)

  programDetailInfo.value = data

}

onMounted(() => {
  fetchProgramDetailInfo()
})
</script>

<style scoped>

.lessons {
  background-color: #F2F2F2;
  justify-items: center;
  align-content: center;
  align-items: center;
}
</style>
