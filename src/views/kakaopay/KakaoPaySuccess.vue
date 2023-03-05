<!--이승윤 ver0.1-->

<template>
  KAKAOPAY
</template>

<script setup>
import {useRoute} from "vue-router";
import {postKakaoPayApproveRequest} from "@/apis/kakaoPayAPIS";
import {onMounted} from "vue";

const route = useRoute()

onMounted(() => {
  fetchFunc()
})

const fetchFunc = async () => {
  console.log('start payPage')
  console.log(route)
  /*페이 성공 로직 approve*/
  const pgToken = route.query.pg_token
  const payId = route.params.id
  if(pgToken){
    const data = await postKakaoPayApproveRequest(pgToken, payId)

    console.log(data)
    localStorage.setItem(`payNumber`, payId)

    window.close()
  }
}


</script>

<style scoped>

</style>
