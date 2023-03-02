<template>
  <DefaultLayout>
    <v-container>
      <v-row>
        <v-col>
          <v-select
            label="내 프로그램 리스트"
            :items="programList"
            @update:modelValue="onUpdateProgramSelect"
            return-object
          >
          </v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          레슨기간 설정
          <VueDatePicker v-model="lessonForm.date" :enable-time-picker="false" range placeholder="레슨기간을 설정하십시오"/>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          레슨 진행일
          <v-chip-group
            mandatory
            selected-class="text-primary"
            multiple
            v-model="lessonForm.day"
          >

            <v-chip
              v-for="tag in ['월', '화', '수', '목', '금', '토', '일']" :key="tag"
            >
              {{ tag }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          레슨 시작 시간
          <VueDatePicker v-model="lessonForm.time" range time-picker placeholder="레슨 시간을 설정하십시오"/>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          모집 인원
          <v-text-field
            type="number"
            v-model="lessonForm.personnel"
            label="모집 인원"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col>
          가격
          <v-text-field
            type="number"
            v-model="lessonForm.fee"
            label="가격"
            variant="outlined"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn @click="getAddressApi()" value="우편번호 찾기"> 주소 찾기 </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          장소
          <v-text-field v-model="lessonForm.place"> </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          모집기간 설정
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <VueDatePicker v-model="lessonForm.expireDate" :enable-time-picker="false" range/>
        </v-col>
      </v-row>

      <div style="float: right; margin: 2%">
      <v-row>
        <v-col>
          <CreateButtonComponent
            @onClickSave="saveLessonForm"
            @onClickCancel="cancelLessonForm"
          ></CreateButtonComponent>
        </v-col>
      </v-row>
      </div>
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
import {onMounted, ref} from "vue";
import {getStudentProgramLists, postLessonForm} from "@/apis/api";
import CreateButtonComponent from "@/components/util/CreateButtonComponent.vue";
import {useRouter} from "vue-router";
import consts from "@/consts/const";
import {dayToBitParser} from "@/util/dayBitParser";
import useMemberInfo from "@/store/useMemberInfo";
import objectMapper from "@/util/objectmapper";

const router = useRouter()

const snackbar = ref()
const text = ref()

const programList = ref([])
const lessonForm = ref({
  date: [Date.now(), Date.now()],
  expireDate: [Date.now(), Date.now()]
})

const getAddressApi = () => {
  new window.daum.Postcode({
    oncomplete: (data) => {
      console.log(data)
      lessonForm.value.place = data.address
    }
  }).open();
}

const onUpdateProgramSelect = async (obj) => {
  lessonForm.value.programId = obj.programId
  lessonForm.value.subCategoryId = obj.subCategoryId
}

const fetchProgramLists = async () => {
  const { getMemberInfo } = useMemberInfo()
  const studentId = getMemberInfo().id

  const data = await getStudentProgramLists(studentId)
  programList.value = data
}

const saveLessonForm = async () => {
  console.log(lessonForm.value)

  const lessonFormDTO = {
    day: null,
    fee: null,
    personnel: null,
    place: null,
    programId: null,
    subCategoryId: null,
    startDate: null,
    endDate: null,
    expireStartDate: null,
    expireEndDate: null,
    lessonTime: null,
    lessonLength: null,
  }

/*validation*/
  text.value = ""
  if(!lessonForm.value.day){
    text.value = 'day'
    snackbar.value = true
    return
  }

  if(!lessonForm.value.time){
    text.value = 'time'
    snackbar.value = true
    return
  }

  objectMapper(lessonFormDTO, {
    ...lessonForm.value,
    startDate: lessonForm.value.date[0],
    endDate: lessonForm.value.date[1],
    expireStartDate: lessonForm.value.expireDate[0],
    expireEndDate: lessonForm.value.expireDate[1],
    lessonTime: lessonForm.value.time[0].hours,
    lessonLength: lessonForm.value.time[1].hours - lessonForm.value.time[0].hours,
  })


  /*validation*/
  let flag = true
  for(const key in lessonFormDTO){
    if(!lessonFormDTO[key]){
      flag = false
      text.value += key + ","
    }
  }

  lessonFormDTO.day = dayToBitParser(lessonForm.value.day)
  if(!flag){
    snackbar.value = true
    return
  }

  await postLessonForm(lessonFormDTO)
  await router.push({
    name: consts.PROGRAM_DETAIL_PAGE,
    params: {
      id: lessonForm.value.programId
    },
    query: {
      id: lessonForm.value.subCategoryId
    }
  })
}

const cancelLessonForm = () => {
  router.go(-1)
}

onMounted(() => {
  fetchProgramLists()
})

</script>

<style scoped>
</style>
