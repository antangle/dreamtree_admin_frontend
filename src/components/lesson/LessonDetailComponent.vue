<template>
  <v-container class="bg-white">
    <v-row>
      <v-col class="h1">
        <h1>
          {{programTitle}}
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        레슨 기간: {{lessonInfo.startDate}} ~ {{lessonInfo.endDate}}
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        레슨 진행일:
        <v-chip
          v-for="tag in bitToDayParser(lessonInfo.day)" :key="tag"
        >
          {{ tag }}
        </v-chip>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        레슨 시간: {{lessonInfo.lessonTime}}시 ~ {{lessonInfo.lessonTime + lessonInfo.lessonLength}}시
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        모집 인원: 총 {{lessonInfo.personnel}}명
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        가격: {{lessonInfo.fee}}원
      </v-col>
    </v-row>
    <v-row
      v-if="lessonInfo.place"
    >
      <v-col>
        장소: {{lessonInfo.place}}
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        모집 기간: {{lessonInfo.expireStartDate}} ~ {{lessonInfo.expireEndDate}}
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn
          v-if="memberInfo.role == consts.PARENT || memberInfo.role == consts.ADMIN"
          @click="onClickApply"
        >
          신청하기
        </v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup>
import {bitToDayParser} from "@/util/dayBitParser";
import useMemberInfo from "@/store/useMemberInfo";
import consts from "@/consts/const";
import {postKakaoPayReadyRequest} from "@/apis/kakaoPayAPIS";

const props = defineProps(['lessonInfo', 'programTitle']);
const emits = defineEmits(['paySucceeded'])

const memberInfo = useMemberInfo().getMemberInfo()

/*레슨 결제 -> title, fee, memberId, memberRole 필요*/
const onClickApply = async () => {
  /*todo: 카카오페이 진행 */
  const kakaoPayDTO = {
    itemName: props.programTitle,
    id: memberInfo.id,
    role: memberInfo.role,
    quantity: 1,
    totalAmount: props.lessonInfo.fee,
    taxFreeAmount: 0
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
