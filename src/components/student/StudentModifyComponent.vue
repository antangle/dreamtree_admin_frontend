<template>

  <div>
    <v-avatar
      style="margin-left: 20px"
      class="ma-1; align-content-center"
      size="200"
      rounded="10"
    >
      <v-img
        :src="getImageUrl(student.profileImgUrl)"
      ></v-img>
    </v-avatar>
  </div>

  <div
    style="margin-left: 50px; margin-right: 50px"
  >
    <strong>이름</strong>
    <v-text-field
      v-model="student.nickname"
      :value="student.nickname"
      required
      variant="outlined"
    ></v-text-field>
  </div>

  <v-divider/>

  <div
    style="margin-left: 50px; margin-right: 50px; margin-top: 20px"
  >
    <strong>비밀번호</strong>
    <v-text-field
      v-model="student.password"
      :value="student.password"
      required
      variant="outlined"
    >
    </v-text-field>
  </div>

  <div
    style="margin-left: 50px; margin-right: 50px; margin-top: 20px"
  >
    <strong>생년월일</strong>
    <v-text-field
      v-model="student.birth"
      :value="student.birth"
      required
      variant="outlined"
    >
    </v-text-field>
  </div>

  <div
    style="margin-left: 50px; margin-right: 50px; margin-top: 20px"
  >
    <strong>성별</strong>
    <v-text-field
      v-model="student.gender"
      :value="student.gender"
      required
      variant="outlined"
    >
    </v-text-field>
  </div>

  <v-btn
    variant="elevated"
    size="default"
    color="blue"
    icon="fa-solid fa-check"
    @click="dialog = true"
  ></v-btn>

  <!-- dialog -->
  <div class="text-center">
    <v-dialog v-model="dialog">

      <v-card>
        <v-card-text style="text-align: center">
          수정하시겠습니까?
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="grey" @click="dialog = false"> 취소 </v-btn>
          <v-btn color="grey" @click="clickModifyStudent"> 완료 </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

  </div>

  <v-btn @click="() => emits('moveInfo')">취소</v-btn>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {getStudentInfo, modifyStudent} from "@/apis/adminAPIS";
import useMemberInfo from "@/store/useMemberInfo";
import {getImageUrl} from "@/util/imageUrlGetter";

const props = defineProps(['id'])

const emits = defineEmits(['moveInfo'])

const student = ref({})

const dialog = ref(false)

// 수정
const clickModifyStudent = async () => {

  const result = {
    studentId: props.id,
    profileImgUrl: student.value.profileImgUrl,
    password: student.value.password,
    nickname: student.value.nickname,
    birth: student.value.birth,
    gender: student.value.gender
  }

  console.log("result: ", result)

  await modifyStudent(result)

  emits('moveInfo')
}


const fetchGetInfo = async () => {

  student.value = await getStudentInfo(props.id);
}

onMounted(() => {
  fetchGetInfo()
})

</script>

<style scoped>

</style>
