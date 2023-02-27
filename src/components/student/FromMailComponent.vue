<template>

  <div class="v-container">
    <v-btn style="position: absolute; right: 10%;" @click="removeMail">{{ selected.length }}삭제</v-btn>
  </div>
  <div class="v-container">
    받은메일<br>

    <v-list lines="three">

      <v-list-subheader>From Mail</v-list-subheader>

      <v-list-item
        v-for="mail in fromMails"
        :key="mail.mailId"
      >
        <div style="display: flex">
          <div class="d-flex flex-nowrap justify-space-between"
               @click="() => getFromMail(mail.mailId)">
            <div class="d-flex flex-no-wrap ma-1">

              <div style="margin-left: 15px;">
                <v-list-item-title v-text="mail.fromEmail"></v-list-item-title>
                <div class="d-flex flex-no-wrap">
                  <v-list-subheader> {{ mail.updatedAt }}</v-list-subheader>
                  <v-list-subheader> {{ mail.check == true ? '읽음' : '읽지않음' }}</v-list-subheader>
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

  <!-- get dialog -->
  <div class="text-center">
    <v-dialog v-model="getDialog">

      <v-card>
        <v-card-text style="text-align: center">
          <div class="v-container">
            <v-row>
              <v-col>
                보낸사람: {{ fromMailInfo.fromEmail }} <br>
                받는사람: {{fromMailInfo.toEmail}}
              </v-col>
              <v-col>
                <v-card-item
                  prepend-icon="fa-solid fa-circle-info"
                  @click="emits('moveInfo', fromMailInfo.fromEmail)"
                />
              </v-col>
            </v-row>
            제목: {{ fromMailInfo.title }} <br>
            내용: {{ fromMailInfo.content }} <br>
            보낸날짜: {{ fromMailInfo.updatedAt }}
          </div>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="grey" @click="getDialog = false"> 확인</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

  </div>

</template>

<script setup>

import {getFromEmail, getMail, getToEmail, removeEmail, writeEmail} from "@/apis/StudentAPIS";
import {onMounted, ref} from "vue";
import AddMailComponent from "@/components/student/AddMailComponent.vue";
import useMemberInfo from "@/store/useMemberInfo";

const props = defineProps(['pNum', 'pSize'])

const emits = defineEmits(['movePageNum', 'moveInfo'])

const pageNum = ref(1)

const fromMails = ref([])

const totalPageSize = ref()

const getDialog = ref(false)

const fromMailInfo = ref({})

const selected = ref([])

const memberInfo = useMemberInfo().getMemberInfo()

// 체크박스 선택된 메일 삭제
const removeMail = async () => {

  await removeEmail(selected.value)

  selected.value = []

  await fetchGetList()
}

// 메일 조회
const getFromMail = async (id) => {

  getDialog.value = true

  fromMailInfo.value = await getMail(id)

  const target = fromMails.value.filter(m => m.mailId === id)[0]

  target.check = true

}

const fetchGetList = async () => {

  pageNum.value = parseInt(props.pNum) || 1

  const fromResult = {mail: memberInfo.email, page: pageNum.value, size: props.pSize}

  const fromData = await getToEmail(fromResult)

  fromMails.value = fromData.dtoList

  totalPageSize.value = fromData.end

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
