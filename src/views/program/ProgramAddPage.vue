<template>
  <DefaultLayout>     <!--카테고리-->
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
                :key="count"
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
              @onClickSave="saveProgramForm"
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
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import {ref} from "vue";
import ProgramCurriculumDayComponent from "@/components/program/ProgramCurriculumDayComponent.vue";
import {deleteMinioImage, postProgramForm} from "@/apis/api";
import MainCategoryComponent from "@/components/category/MainCategoryComponent.vue";
import SubCategoryComponent from "@/components/category/SubCategoryComponent.vue";
import UploadComponent from "@/components/image/UploadComponent.vue";
import ProgramImageListComponent from "@/components/image/ImageListComponent.vue";
import {useRouter} from "vue-router";
import consts from "@/consts/const";
import CreateButtonComponent from "@/components/util/CreateButtonComponent.vue";
import useMemberInfo from "@/store/useMemberInfo";
import objectMapper from "@/util/objectmapper";


const router = useRouter()
//ref
const programForm = ref({})
const count = ref(0)
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
  count.value++
}


//회차 추가
const generateCurriculum = () => {
  mainCurriculum.value.push([])
  programForm.value.times = mainCurriculum.value.length
}

//프로그램 생성
const saveProgramForm = async () => {
  //maincurriculum, studentId, ProgramForm(programId, subCategoryId, title, content, times, fee)
  programForm.value.times = mainCurriculum.value.length

  const fileForms = []
  imageNameList.value.map(item => {
    fileForms.push(item)
  })

  const programFormDTO = {
    subCategoryId: null,
    title: null,
    content: null,
    times: null,
    fee: null,
    curriculumJson: null,
    studentId: null,
    fileForms: fileForms
  }

  const { getMemberInfo } = useMemberInfo()
  const studentId = getMemberInfo().id

  objectMapper(programFormDTO, {
    ...programForm.value,
    studentId: studentId,
    curriculumJson: JSON.stringify(mainCurriculum.value),
  })
  text.value = ""

  let flag = true
  /*validation*/
  for(const key in programFormDTO){
    if(!programFormDTO[key]){
      flag = false
      text.value += key + ","
    }
  }
  if(programFormDTO.curriculumJson.length == 0){
    flag = false
    text.value += "curriculumJson"
  }

  if(!flag){
    snackbar.value = true
    return
  }


  const data = await postProgramForm(programFormDTO)
  await router.push({
    name: consts.PROGRAM_DETAIL_PAGE,
    params: {
      id :data
    },
    query: {
      id: programForm.value.subCategoryId
    }
  })
}

const cancelProgramForm = async () => {
  await deleteMinioImage(imageNameList.value)

  imageNameList.value = []
  await router.go(-1)

}
</script>

<style scoped>
.form-item{
  width: 90vw;
}
</style>
