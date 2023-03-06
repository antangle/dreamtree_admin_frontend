
<!--최서연 ver.0.1-->
<!-- 로그인 경로 설정 페이지 -->

<template>
  <DefaultLayout>

    <RoleComponent @sendLoginPathValue="sendLoginPathValue" />

  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import RoleComponent from "@/components/LoginPathComponent.vue";
import {useRouter} from "vue-router";

const router = useRouter()

/** KakaoLoginPage로 로그인 경로(회원/부모님) 전송 **/
const sendLoginPathValue = (value) => {

  router.push({ name: 'KakaoLoginPage', query: {path: value} })

}

</script>

<style scoped>

</style>
