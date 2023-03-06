<!--이승윤 ver0.1-->

<template>

  <default-layout>
    <v-container class="form-container">
      <v-row>
        <v-col>
          <div style="display: flex">
            <MainCategoryComponent
              name="mainCategory"
              @mainCategoryChange="mainCategoryChange"
            ></MainCategoryComponent>
            <SubCategoryComponent
              :subCategoryList="subCategoryList"
              @updateSubCategory="onUpdateSubCategory"
            ></SubCategoryComponent>
          </div>
        </v-col>
      </v-row>

      <!--입력폼-->
      <v-row>
        <v-col>
          <v-text-field
            v-model="programForm.title"
            label="제목"
          ></v-text-field>

          <v-textarea
            v-model="programForm.content"
            label="내용"
          ></v-textarea>

          <v-text-field
            type="number"
            v-model="programForm.fee"
            label="가격"
          ></v-text-field>

        </v-col>
      </v-row>

      <!--커리큘럼-->
      <v-row>
        <v-col>
          회차별 수업 정보
        </v-col>
      </v-row>
      <v-row
        v-for="(dayCurriculum, index) in mainCurriculum"
        :key="index"
      >
        <v-col>
          <ProgramCurriculumDayComponent
            :key="curriculumKey"
            :dayCurriculum="dayCurriculum"
            :readMode="false"
            :times="index"
            @pushCurriculum="(curriculum) => updateCurriculum(curriculum, index)"
            @deleteDayCurriculum="() => deleteDayCurriculum(index)"
          ></ProgramCurriculumDayComponent>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-btn
          icon="fa-solid fa-plus"
          @click="generateCurriculum"
        >
        </v-btn>
      </v-row>


      <!--이미지 업로드-->
      <v-row>
        <v-col>
          <v-btn
            prepend-icon="fa-solid fa-floppy-disk"
            @click="onClickUploadButton"
          >
            Upload
          </v-btn>
        </v-col>
        <div class="text-center">
          <v-dialog
            v-model="uploadDialog"
          >
            <UploadComponent @addImages="addImages" @offDialog="uploadDialog = false"/>
          </v-dialog>
        </div>
      </v-row>

      <v-row>
        <ProgramImageListComponent
          :imageNameList="imageNameList"
          :key="imageListKey"
          @onImageDeleted="onImageDeleted"
        ></ProgramImageListComponent>
      </v-row>

      <!--생성 버튼-->
      <v-row>
        <v-col>
          <CreateButtonComponent
            @onClickSave="updateProgram"
            @onClickCancel="cancelProgramForm"
          ></CreateButtonComponent>
        </v-col>
      </v-row>
    </v-container>


    <v-snackbar
      v-model="snackbar"
    >
      {{ text }} 에 값이 없습니다

      <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </default-layout>
</template>

<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import useMemberInfo from "@/store/useMemberInfo";
import objectMapper from "@/util/objectmapper";
import {deleteMinioImage, getProgramDetailInfo, getProgramLists, postProgramForm} from "@/apis/api";
import consts from "@/consts/const";
import CreateButtonComponent from "@/components/util/CreateButtonComponent.vue";
import ProgramCurriculumDayComponent from "@/components/program/ProgramCurriculumDayComponent.vue";
import {getProgramLessonCount, modifyProgram} from "@/apis/StudentAPIS";
import MainCategoryComponent from "@/components/category/MainCategoryComponent.vue";
import SubCategoryComponent from "@/components/category/SubCategoryComponent.vue";
import UploadComponent from "@/components/image/UploadComponent.vue";
import ProgramImageListComponent from "@/components/image/ImageListComponent.vue";

const router = useRouter()

const route = useRoute()
//ref
const programForm = ref({})
const curriculumKey = ref(0)
const mainCurriculum = ref([])
const subCategoryList = ref({})
const uploadDialog = ref(false)
const imageNameList = ref([])
const imageListKey = ref(0)

const snackbar = ref()
const text = ref()

//첨부파일 dialog
const onClickUploadButton = () => {
  uploadDialog.value = true
}

//첨부파일 imageList에 추가, 추가시 ImageListComponent 리로딩
const addImages = (imageNames) => {
  imageNameList.value.push(...imageNames)
  imageListKey.value++
}

//이미지 컴포넌트에서 delete시 업데이트
const onImageDeleted = (imageList) => {
  imageNameList.value = imageList
}

/*
* 카테고리 select 컴포턴트 함수
*
* */
//부 카테고리 변경 시 programForm에 subCategoryId 추가
const onUpdateSubCategory = (subCategoryId) => {
  programForm.value.subCategoryId = subCategoryId
}

//주 카테고리 변경시 categoryList 반환
const mainCategoryChange = (categoryList) => {
  subCategoryList.value = categoryList
}


/*커리큘럼*/

//회차 업데이트
const updateCurriculum = (curriculum, index) => {
  mainCurriculum.value[index] = curriculum
}

//회차 삭제
const deleteDayCurriculum = (index) => {
  mainCurriculum.value = mainCurriculum.value.filter(e => e !== mainCurriculum.value[index])
  curriculumKey.value++
}


//회차 추가
const generateCurriculum = () => {

  mainCurriculum.value.push([])
  programForm.value.times = mainCurriculum.value.length
  curriculumKey.value++
}

const cancelProgramForm = async () => {
  await deleteMinioImage(imageNameList.value)

  imageNameList.value = []
  await router.go(-1)

}

const updateProgram = async () => {

  programForm.value.curriculumJson = JSON.stringify(programForm.value.curriculumJson)

  const count = await getProgramLessonCount(programForm.value.programId)

  if(count < 1) {
    await modifyProgram(programForm.value)

    moveProgramList(programForm.value.studentId)
  } else {
    alert(count + "개의 레슨으로 인해 수정할 수 없습니다.")

    moveProgramList(programForm.value.studentId)

    return
  }

}
const moveProgramList = (id) => {

  router.push({name: 'MyProgramListPage'})
}
const fetchProgramLists = async () => {

  programForm.value = await getProgramDetailInfo(route.params.id)

  mainCurriculum.value = JSON.parse(programForm.value.curriculumJson)

  console.log(programForm.value)
}
onMounted(() => {
  fetchProgramLists();
})

</script>

<style scoped>

</style>
