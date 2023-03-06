
<!--최서연 ver.0.1-->
<!-- 카카오 연결 해제 API 컴포넌트 -->

<template>

</template>

<script setup>

if (window.Kakao.Auth.getAccessToken()) {
  window.Kakao.API.request({
    url: '/v1/user/unlink',
    success: async (res) => {
      console.log("unlink...", res)
    },
    fail: error => {
      console.log(error)
    }
  })
  window.Kakao.Auth.setAccessToken()
}

</script>

<style scoped>

</style>
