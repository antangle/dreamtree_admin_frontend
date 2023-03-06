<!-- 임성현 ver.0.1 -->

<template>

  <v-table>
    <thead>
    <tr>
      <th>자격증명</th>
      <th>취득일자</th>
      <th>인증상태</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="certificate in certificates">
      <td>{{ certificate.name }}</td>
      <td>{{ certificate.aquireDate }}</td>
      <td><v-chip>{{ certificate.authState == 'pending' ? '요청 중' : certificate.authState == 'yes' ? '인증' : '거절' }}</v-chip></td>
    </tr>
    </tbody>
  </v-table>

  <v-btn class="auth-btn" @click="dialog = !dialog">인증 요청</v-btn>

  <!-- post dialog -->
  <v-dialog v-model="dialog">
    <v-container class="bg-white">
      <v-row>
        <v-col>
          <v-text-field
            v-model="addCertificateInfo.name"
            label="수상/취득 내용"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <div class="text-center">
            <v-dialog
              v-model="uploadDialog"
            >
              <UploadComponent @addImages="addImages" @offDialog="uploadDialog = false"/>
            </v-dialog>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            disabled
          > {{ new Date(date).toDateString() }}</v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <VueDatePicker v-model="date" auto-apply placeholder="수상/취득 년월"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          인증파일
          <v-btn
            prepend-icon="fa-solid fa-floppy-disk"
            @click="onClickUploadButton"
          >
            Upload
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn color="grey" @click="addClickCertificate"> 전송</v-btn>
          <v-btn color="grey" @click="dialog = false"> 취소</v-btn>
        </v-col>
      </v-row>

    </v-container>
  </v-dialog>
</template>

<script setup>

import {addCertificate, getCertificateList} from "@/apis/adminAPIS";
import {computed, onMounted, ref} from "vue";
import UploadComponent from "@/components/image/UploadComponent.vue";

const props = defineProps(['id'])

const emits = defineEmits(['addSuccess'])

const certificates = ref([])

const addCertificateInfo = ref({})

const add = ref(false)

const imageNameList = ref([])

const imageListKey = ref(0)

const uploadDialog = ref(false)

const dialog = ref(false)

const date = ref()

const onClickUploadButton = () => {
  uploadDialog.value = true
}

const addImages = (imageNames) => {
  console.log(imageNames)
  imageNameList.value.push(...imageNames)
  imageListKey.value++
}

// Dialog에서 전송 클릭 시
const addClickCertificate = async () => {

  if (!addCertificateInfo.value.name) {
    alert("자격증/수상 명을 입력하세요")

    return
  }

  if (!date.value.getYear()) {
    alert("취득일을 선택하세요")
  }

  const month = () => {

    if(parseInt(date.value.getMonth() + 1) < 10) return '0' + parseInt(date.value.getMonth() + 1)

    return date.value.getMonth()
  }

  const day = () => {

    if(date.value.getDate() < 10) return '0' + date.value.getDate()

    return date.value.getDate()
  }

  const aquireDate = date.value.getYear()
    + 1900
    + '-'
    + month()
    + '-'
    + day()

  const certificate = {
    studentId: props.id,
    name: addCertificateInfo.value.name,
    aquireDate: aquireDate,
    url: imageNameList.value[0].filename
  }

  console.log(certificate)

  await addCertificate(certificate)

  emits('addSuccess')
  add.value = !add.value
}

const fetchGetList = async () => {

  certificates.value = await getCertificateList(props.id)

}

onMounted(() => {
  fetchGetList()
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
