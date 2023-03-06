<!-- 임성현 ver.0.1 -->

<template>

  <v-btn @click="dialog = !dialog">메일쓰기</v-btn>

  <!-- post dialog -->
  <v-dialog v-model="dialog">

    <v-card>
      <v-card-text style="text-align: center">
        <div class="v-container">
          <v-form>
            <v-container style="margin: 10px" >

              <v-text-field
                style="margin-bottom: 5%"
              >{{ memberInfo.email }}</v-text-field>

              <v-text-field
                v-model="addMail.toEmail"
                label="보낼 사람 (abcd123@gmail.com)"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                v-model="addMail.title"
                label="제목 입력"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                v-model="addMail.content"
                label="내용 입력"
                variant="outlined"
              ></v-text-field>
            </v-container>
          </v-form>
        </div>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="grey" @click="accept"> 전송</v-btn>
        <v-btn color="grey" @click="dialog = false"> 취소</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>

</template>

<script setup>

import {ref} from "vue";
import useMemberInfo from "@/store/useMemberInfo";

const emits = defineEmits(['postMail'])
const memberInfo = useMemberInfo().getMemberInfo()

const addMail = ref({
  toEmail: '',
  fromEmail: memberInfo.email,
  title: '',
  content: ''
})

const dialog = ref(false)

const accept = () => {

  emits('postMail', addMail.value)

  dialog.value = !dialog.value

  addMail.value = {
    toEmail: '',
    fromEmail: memberInfo.email,
    title: '',
    content: ''
  }
}

</script>

<style scoped>

</style>
