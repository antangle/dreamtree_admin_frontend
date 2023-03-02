<template>
  <v-list lines="two">

    <v-list-subheader>Profile</v-list-subheader>

    <!--회원 프로필 이미지 & 닉네임-->
    <v-list-item>
      <div class="d-flex flex-no-wrap justify-center">
        <v-avatar
          style="margin-left: 20px"
          class="ma-1"
          size="250"
          rounded="10"
        >
          <v-img
            :src="getImageUrl(student.profileImgUrl)"
          ></v-img>
        </v-avatar>

        <v-card-title
        >
          {{ student.nickname }}
        </v-card-title>

        <v-btn
          flat
          color="grey"
          size="small"
          icon="fa-solid fa-pen"
          @click="() => emits('moveModify')"
        ></v-btn>
      </div>
    </v-list-item>

    <v-divider/>

    <!--회원 이메일-->
    <v-list-item>
      <div
        class="d-flex flex-no-wrap"
        style="margin-right: 50px"
      >
        <v-card-subtitle>이메일</v-card-subtitle>
        <v-text>{{ student.email }}</v-text>
      </div>
    </v-list-item>

    <v-divider/>

    <!--회원 생년월일-->
    <v-list-item>
      <div
        class="d-flex flex-no-wrap"
        style="margin-right: 50px"
      >
        <v-card-subtitle>생일</v-card-subtitle>
        <v-text>{{ student.birth }}</v-text>
      </div>
    </v-list-item>

    <!--회원 성별-->
    <v-list-item>
      <div
        class="d-flex flex-no-wrap"
        style="margin-right: 50px"
      >
        <v-card-subtitle>성별</v-card-subtitle>
        <v-text>{{ student.gender }}</v-text>
      </div>
    </v-list-item>

    <!--회원 대학-->
    <v-list-item>
      <div
        class="d-flex flex-no-wrap"
        style="margin-right: 50px"
      >
        <v-card-subtitle>대학교</v-card-subtitle>
        <v-text>
          {{ student.college }}
          <span style="position: absolute; left: 20%; background-color: pink; border-radius: 10px; padding: 5px">
            {{student.authState == 'yes' ? '인증' : student.authState == 'pending' ? '요청 중' : student.authState == 'no' ? '승인거절' : '요청필요'}}
          </span></v-text>
      </div>
    </v-list-item>

    <!--회원 전공-->
    <v-list-item>
      <div
        class="d-flex flex-no-wrap"
        style="margin-right: 50px"
      >
        <v-card-subtitle>전공</v-card-subtitle>
        <v-text>{{ student.major }}</v-text>
      </div>
    </v-list-item>
  </v-list>

  <v-btn class="auth-btn" @click="dialog = !dialog">인증요청</v-btn>

  <!-- post dialog -->
  <v-dialog style="max-width: 45%" v-model="dialog">

    <v-card>
      <v-card-text style="text-align: center">
        <div class="v-container">
          <v-sheet width="300" class="mx-auto">
            <v-form fast-fail @submit.prevent>
              <v-text-field
                v-model="addCollegeInfo.college"
                label="대학교"
              ></v-text-field>

              <v-text-field
                v-model="addCollegeInfo.major"
                label="전공"
              ></v-text-field>

              <div>
                인증파일
                <v-btn
                  prepend-icon="fa-solid fa-floppy-disk"
                  @click="onClickUploadButton"
                >
                  Upload
                </v-btn>
              </div>

              <div class="text-center">
                <v-dialog
                  v-model="uploadDialog"
                >
                  <UploadComponent @addImages="addImages" @offDialog="uploadDialog = false"/>
                </v-dialog>
              </div>
            </v-form>
          </v-sheet>
        </div>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="grey" @click="addClickCollege"> 전송</v-btn>
        <v-btn color="grey" @click="dialog = false"> 취소</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script setup>

import {addCertificate, getStudentInfo} from "@/apis/adminAPIS";
import {onMounted, ref} from "vue";
import {authCollege} from "@/apis/StudentAPIS";
import UploadComponent from "@/components/image/UploadComponent.vue";
import useMemberInfo from "@/store/useMemberInfo";
import {getImageUrl} from "@/util/imageUrlGetter";

const props = defineProps(['id'])

const emits = defineEmits(['moveModify'])

const student = ref({})

const dialog = ref(false)

const addCollegeInfo = ref({})

const uploadDialog = ref(false)

const imageListKey = ref(0)

const imageNameList = ref([])


// Dialog에서 전송 클릭 시
const addClickCollege = async () => {

  if(!addCollegeInfo.value.college) {

    alert("대학교를 입력하세요")
    return
  }

  if(!addCollegeInfo.value.major) {

    alert("전공를 입력하세요")
    return
  }

  if(!imageNameList.value[0]) {

    alert("인증파일을 업로드하세요")
    return
  }

  const college = {
    studentId: props.id,
    college: addCollegeInfo.value.college,
    major: addCollegeInfo.value.major,
    url: imageNameList.value[0].filename
  }

  await authCollege(college)

  // 변경 된 내용 다시 화면에 보여지게
  await fetchGetInfo()

  dialog.value = !dialog.value
}


const addImages = (imageNames) => {
  console.log(imageNames)
  imageNameList.value.push(...imageNames)
  imageListKey.value++
}

const onClickUploadButton = () => {
  uploadDialog.value = true
}


const fetchGetInfo = async () => {

  student.value = await getStudentInfo(props.id);

  console.log("Student: ", student.value)

}

onMounted(() => {
  fetchGetInfo()
})


</script>

<style scoped>

.auth-btn {
  background-color: #e57373;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border-radius: 5px;
  padding: 5px 20px;
  text-transform: uppercase;

  float: right;
  margin: 3%;
}

</style>
