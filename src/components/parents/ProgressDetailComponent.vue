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

const props = defineProps(['info'])

// 날짜 yyyy.MM.DD 변환 함수
const setLocalDateString = (str) => {

  const date = new Date(str)
  return date.toLocaleDateString()

}

const onClickGetKakaoPay = () => {

}


</script>

<style scoped>

</style>
