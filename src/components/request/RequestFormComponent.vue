<template>
  <v-form>
    <v-container style="margin: 10px" >

      <v-text-field
        v-model="requestForm.title"
        label="제목 입력"
        variant="outlined"
      ></v-text-field>

      <div style="display: flex">
      <MainCategoryComponent
        @mainCategoryChange="mainCategoryChange"
      ></MainCategoryComponent>

      <SubCategoryComponent
        :subCategoryList="subCategoryList"
        @updateSubCategory="onUpdateSubCategory"
      ></SubCategoryComponent>
      </div>

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
        @click="onClickSaveRequest"
      >요청</v-btn>
      <v-btn style="background: lightgray">취소</v-btn>
    </div>
  </v-form>

</template>

<script setup>
import {onMounted, ref} from "vue";
import MainCategoryComponent from "@/components/category/MainCategoryComponent.vue";
import SubCategoryComponent from "@/components/category/SubCategoryComponent.vue";
import {getRequestDetail, postRequest, putRequest} from "@/apis/RequestAPIS";
import {useRoute} from "vue-router";
import useMemberInfo from "@/store/useMemberInfo";

const emits = defineEmits(['moveListPage', 'moveDetailPage'])

const route = useRoute()
const request_id = parseInt(route.params.id)
const memberInfo = useMemberInfo().getMemberInfo()

const requestForm = ref({
  title: null,
  parent_id: memberInfo.id,
  sub_category_id: null,
  description: null,
  content: null,
  student_grade: null,
  student_gender: null
})

const subCategoryList = ref({})

const gradeList = ref(['입학예정', '저학년', '고학년', '중학생 이상'])

const genderList = ['남', '여', '선택 안 함']

/** 수정일 경우 requestId로 요청글 정보 받아오기 **/
const fetchGetRequestInfo = async () => {
  console.log(request_id)

  if(request_id) {
    const res = await getRequestDetail(request_id)
    requestForm.value = res
  }
}
onMounted(() => {
  fetchGetRequestInfo()
})

/** validation **/
let valid = true
let validAlertText = ref('')

for (const key in requestForm) {
  if (!key) {

    validAlertText.value += key + ' '

  }

}

/** 카테고리 설정 **/
//부 카테고리 변경 시 programForm에 subCategoryId 추가
const onUpdateSubCategory = (subCategoryId) => {

  requestForm.value.sub_category_id = subCategoryId
  console.log(requestForm.value)
}

//주 카테고리 변경시 categoryList 반환

const mainCategoryChange = (categoryList) => {

  subCategoryList.value = categoryList

}

/** 입력 폼 제출 **/
const onClickSaveRequest = async () => {

  requestForm.value.description = requestForm.value.content.split(".")[0]
  // 요청글 수정으로 들어온 경우
  if (request_id) {

    if (valid) {
      requestForm.value.request_id = request_id
      console.log("Modify...........")

      console.log(requestForm.value)

      await putRequest(requestForm.value)
      emits('moveDetailPage', request_id)
    } else alert("필수 입력 항목을 작성해주세요")

  }
  // 요청글 작성으로 들어온 경우
  else {

    console.log(requestForm.value)

    if (valid) {
      await postRequest(requestForm.value)
    } else alert(validAlertText)

    emits('moveListPage')
  }
}


</script>

<style scoped>

</style>
