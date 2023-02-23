<template>

</template>

<script setup>
import {useRoute} from "vue-router";
import {postKakaoPayApproveRequest} from "@/apis/kakaoPayAPIS";
import {onMounted} from "vue";

const route = useRoute()
const emits = defineEmits(['onPaymentSuccess', 'onPaymentFail'])

onMounted(() => {
  fetchFunc()
})

const fetchFunc = async () => {
  console.log('start payPage')
  /*페이 성공 로직 approve*/
  const pgToken = route.query.pg_token
  const payId = route.params.id
  if(pgToken){
    console.log(pgToken, payId)

    const data = await postKakaoPayApproveRequest(pgToken, payId)

    console.log(data)
    localStorage.setItem(`payNumber`, payId)

    window.close()
  }
}


</script>

<style scoped>

</style>
