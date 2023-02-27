<template>
  <DefaultLayout>
    <v-container>
      <v-form>
        <v-container>

          <v-text-field
            v-model="requestForm.title"
            label="제목 입력"
            variant="outlined"
            disabled
          ></v-text-field>

          <v-textarea
            v-model="requestForm.content"
            label="내용 입력"
            variant="outlined"
            auto-grow
          ></v-textarea>

          <v-divider />

          <br/>
          <h4>학생 정보를 알려주세요!</h4>
          <br/>

          <v-text-field
            v-model="requestForm.childName"
            label="자녀 이름 입력"
            variant="outlined"
          ></v-text-field>

          <v-card-subtitle>자녀 학년 선택</v-card-subtitle>

          <div
            class="d-flex justify-space-around align-center flex-column flex-sm-row fill-height"
            style="margin: 20px 150px 50px;"
          >
            <v-chip-group v-model="requestForm.student_grade">
              <v-chip
                v-for="grade in gradeList" :key="grade" :value="grade"
                size="x-large"
                filter
                variant="outlined"
              > {{ grade }} </v-chip>
            </v-chip-group>
          </div>

          <v-card-subtitle>자녀 성별 선택</v-card-subtitle>

          <div
            class="d-flex justify-space-around align-center flex-column flex-sm-row fill-height"
            style="margin: 20px 150px 10px;"
          >
            <v-chip-group v-model="requestForm.student_gender">
              <v-chip
                v-for="gender in genderList" :key="gender" :value="gender"
                size="x-large"
                filter
                variant="outlined"
              > {{ gender }} </v-chip>
            </v-chip-group>
          </div>

        </v-container>
        <div class="flex-nowrap">
          <v-btn
            style="margin-right: 15px;
        background: lightgray"
            @click="onClickRequestButton"
          >요청</v-btn>
          <v-btn
            style="background: lightgray"
            @click="onClickCancelButton"

          >취소</v-btn>
        </div>
      </v-form>
    </v-container>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import useMemberInfo from "@/store/useMemberInfo";
import {getLessonApplyInfo, postLessonApply} from "@/apis/api";
import objectNullChecker from "@/util/objectNullChecker";
import consts from "@/consts/const";
import objectMapper from "@/util/objectmapper";
const router = useRouter()
const route = useRoute()
const memberInfo = useMemberInfo().getMemberInfo()
const ids = ref({
  programId: null,
  subCategoryId: null
})

const studentEmail = ref()

const requestForm = ref({
  title: null,
  parent_id: memberInfo.id,
  sub_category_id: null,
  description: null,
  content: null,
  student_grade: null,
  student_gender: null,
  childName: null
})

const gradeList = ref(['입학예정', '저학년', '고학년', '중학생 이상'])

const genderList = ['남', '여', '선택 안 함']

const fetchLessonApplyInfo = async () => {
  const data = await getLessonApplyInfo(route.query.lessonId)

  requestForm.value.title = "[레슨 신청] " + data.title
  studentEmail.value = data.email
  objectMapper(ids.value, data)

}

onMounted(() => {
  /*레슨하는 대학생 이메일, 프로그램 제목 가져오기*/
  fetchLessonApplyInfo()
})

const onClickRequestButton = async () => {

  const addMail = {
    toEmail: studentEmail.value,
    fromEmail: memberInfo.email,
    title: requestForm.value.title,
    content: makeContent(requestForm.value)
  }

  const progressDTO = {
    childGrade: requestForm.value.student_grade,
    childGender: requestForm.value.student_gender,
    childName: requestForm.value.childName,
    parentId: requestForm.value.parent_id,
    lessonId: route.query.lessonId
  }

  console.log(progressDTO)
  console.log(addMail)

  if(objectNullChecker(progressDTO) || objectNullChecker(addMail)){
    alert('빈칸을 모두 채워주세요')
  }

  await postLessonApply(addMail, progressDTO)

  await router.push({
    name: consts.PROGRAM_DETAIL_PAGE,
    params: {
      id: ids.value.programId
    },
    query: {
      id: ids.value.subCategoryId
    }
  })
}

/*취소버튼 누를 시 뒤로가기*/
const onClickCancelButton = () => {
  router.go(-1)
}

const makeContent = (form) => {
  const contents = [
    form.content,
    form.student_gender,
    form.student_grade,
    form.childName
  ]

  const contentName = [
    "내용",
    "성별",
    "학년",
    "이름"
  ]

  let content = ""
  for(var idx in contents){
    content += `${contentName[idx]}: ${contents[idx]}"\n"`
  }
  return content
}

</script>

<style scoped>

</style>
