<!-- 임성현 ver.0.1 -->

<template>

  <div class="v-container">
    <v-btn style="position: absolute; right: 10%;" @click="removeMail">{{ selected.length }}삭제</v-btn>
  </div>

  <div class="v-container">
    보낸메일<br>
    <v-list lines="three">

      <v-list-subheader>To Mail</v-list-subheader>

      <v-list-item
        v-for="mail in toMails"
        :key="mail.mailId"
      >
        <div style="display: flex">
          <div class="d-flex flex-nowrap justify-space-between"
               @click="() => getToMail(mail.mailId)">
            <div class="d-flex flex-no-wrap ma-1">

              <div style="margin-left: 15px;">
                <v-list-item-title v-text="mail.toEmail"></v-list-item-title>
                <div class="d-flex flex-no-wrap">
                  <v-list-subheader> {{ mail.updatedAt }}</v-list-subheader>
                  <v-list-subheader> {{ mailCheck }}</v-list-subheader>
                </div>
              </div>
            </div>
          </div>
          <div class="check">
            <v-checkbox
              v-model="selected"
              :value="mail.mailId"
            ></v-checkbox>
            {{ mail.mailId }}
          </div>
        </div>
      </v-list-item>
    </v-list>

    <div>
      <v-pagination
        v-model="pageNum"
        :length="totalPageSize"
        rounded="circle"
        @click="() => emits('movePageNum', pageNum)"
      ></v-pagination>
    </div>
  </div>

  <!-- dialog -->
  <div class="text-center">
    <v-dialog v-model="dialog">

      <v-card>
        <v-card-text style="text-align: center">
          <div class="v-container">
            받는사람: {{toMailInfo.toEmail}} <br>
            <v-card-item
              prepend-icon="fa-solid fa-circle-info"
              @click="emits('moveInfo', toMailInfo.toEmail)"
            />
            보낸사람: {{ toMailInfo.fromEmail }} <br>
            제목: {{ toMailInfo.title }} <br>
            내용: {{ toMailInfo.content }} <br>
            보낸날짜: {{ toMailInfo.updatedAt }}
          </div>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="grey" @click="dialog = false"> 확인</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

  </div>

</template>

<script setup>

import {computed, onMounted, ref} from "vue";
import {getFromEmail, getMail, getToEmail, removeEmail, writeEmail} from "@/apis/StudentAPIS";
import useMemberInfo from "@/store/useMemberInfo";

const props = defineProps(['pNum', 'pSize'])

const emits = defineEmits(['movePageNum', 'moveInfo'])

const toMails = ref([])

const totalPageSize = ref()

const pageNum = ref(1)

const dialog = ref(false)

const toMailInfo = ref({})

const memberInfo = useMemberInfo().getMemberInfo()

// 체크 박스
const selected = ref([])

// 체크 박스 선택 된거 삭제
const removeMail = async () => {

  await removeEmail(selected.value)

  selected.value = []

  await fetchGetList()
}

// 메일 조회
const getToMail = async (id) => {

  dialog.value = true
  toMailInfo.value = await getMail(id)
}

// 읽은 메일인지 읽지 않은 메일인지
const mailCheck = computed(() => {

  return toMailInfo.value.check == 'false' ? '읽음' : '읽지않음'
})

const fetchGetList = async () => {

  pageNum.value = parseInt(props.pNum)

  const result = {mail: memberInfo.email, page: pageNum.value, size: props.pSize}

  const toData = await getFromEmail(result)

  toMails.value = toData.dtoList

  totalPageSize.value = toData.end

}

onMounted(() => {
  fetchGetList()
})

</script>

<style scoped>

.check {

  position: absolute;

  right: 10%;
}

</style>
