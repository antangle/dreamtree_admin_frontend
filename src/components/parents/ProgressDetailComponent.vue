<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="2"><p>수강생 이름</p></v-col>
      <v-col>{{ props.info.childName }}</v-col>
    </v-row>

    <v-row>
      <v-col cols="2"><p>분야</p></v-col>
      <v-col>{{ props.info.subCategory }}</v-col>
    </v-row>

    <v-row>
      <v-col cols="2"><p>레슨 회차</p></v-col>
      <v-col>{{ props.info.lesson_time }}</v-col>
      <v-col cols="2"><p>레슨 시간</p></v-col>
      <v-col>{{ props.info.lesson_length }}</v-col>
    </v-row>

    <v-row>
      <v-col cols="2"><p>레슨 시작일</p></v-col>
      <v-col>{{ setLocalDateString(props.info.startDate) }}</v-col>
      <v-col cols="2"><p>레슨 종료일</p></v-col>
      <v-col>{{ setLocalDateString(props.info.endDate) }}</v-col>
    </v-row>

    <v-row>
      <v-col cols="2"><p>장소</p></v-col>
      <v-col>{{ props.info.place }}</v-col>
      <v-col cols="2"><p>수강료</p></v-col>
      <v-col>{{ props.info.fee }} 원</v-col>
    </v-row>

    <v-row justify="space-between">
      <v-col cols="2"><p>상태</p></v-col>
      <v-col><v-chip>{{ props.info.state }}</v-chip></v-col>

      <v-col cols="2"><p>결제 상태</p></v-col>
      <v-col>
        <v-btn v-if="props.info.payStatus === 'request'" @click="onClickGetKakaoPay" variant="flat" color="error">{{ props.info.payStatus }}</v-btn>
        <v-chip v-if="props.info.payStatus != 'request'">{{ props.info.payStatus }}</v-chip>
      </v-col>

    </v-row>
  </v-container>
</template>

<script setup>

import {postKakaoPayReadyRequest} from "@/apis/kakaoPayAPIS";
import consts from "@/consts/const";
import useMemberInfo from "@/store/useMemberInfo";

const props = defineProps(['info'])
const emits = defineEmits(['paySucceeded'])

// 날짜 yyyy.MM.DD 변환 함수
const setLocalDateString = (str) => {

  const date = new Date(str)
  return date.toLocaleDateString()

}

console.log(props.info)

const onClickGetKakaoPay = async () => {
  const memberInfo = useMemberInfo().getMemberInfo()

  /*todo: 카카오페이 진행 */
  const kakaoPayDTO = {
    itemName: props.info.title,
    id: memberInfo.id,
    role: memberInfo.role,
    quantity: 1,
    totalAmount: props.info.fee,
    taxFreeAmount: 0,
    progressId: props.info.progressId
  }

  /*카카오페이 Ready*/
  const kakaoPayResponse = await postKakaoPayReadyRequest(kakaoPayDTO)

  openWinPop(kakaoPayResponse.next_redirect_pc_url, 720, 480)

  var interval = setInterval(() => {
    if(localStorage.getItem(consts.PAY_NUMBER)){
      localStorage.removeItem(consts.PAY_NUMBER)
      onPaymentSuccess()
      clearInterval(interval)
    }
  }, 5000)


/*  /!*3분후 clear*!/
  setTimeout(() => {
    if(!localStorage.getItem(consts.PAY_NUMBER)){
      alert('다시 결제를 진행해주세요')
    }
    clearInterval(interval)
  }, 180000)*/
}

const openWinPop = (uri, width, height) => {
  return window.open(uri, width, height);
}

const onPaymentSuccess = () => {
  /*결제 성공!*/
  console.log('결제가 완료되었습니다.')
  emits('paySucceeded')
}

</script>

<style scoped>

</style>
