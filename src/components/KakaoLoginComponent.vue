
<!--최서연 ver.0.1-->
<!-- 카카오 로그인 API 컴포넌트 -->

<template>
  <v-card-title style="align-content: center">로그인/회원가입</v-card-title>
  <v-divider/>

  <v-card
    class="justify-center align-content-center"
    style="margin: 100px"
  >
    <v-card-title>카카오 아이디로 로그인하기</v-card-title>
    <v-text-field variant="outlined"></v-text-field>
    <v-text-field variant="outlined"></v-text-field>
    <v-img
      src="public/kakao_login_large_wide.png"
      width="400px"
      @click="linkToKakaoRedirectUrl"
    >
    </v-img>
    <strong>계정이 없으신가요?</strong>
    <v-card-text @click="linkToKakaoAuthorization">카카오 계정으로 간편하게 회원가입!</v-card-text>
  </v-card>

</template>

<script setup>
import {kakaoLogin, kakaoSignUp, postAuthCode} from "@/apis/KakaoLoginAPIS";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import useMemberInfo from "@/store/useMemberInfo";
import {useCookies} from "vue3-cookies";

const route = useRoute()
const router = useRouter()
const data = ref({})
const code = route.query.code
const memberInfo = ref(useMemberInfo().getMemberInfo())
const {cookies} = useCookies()


console.log(code)
if (code) {
  console.log("code...")
  postAuthCode(code)
}

const linkToKakaoRedirectUrl = () => {

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
  window.Kakao.Auth.login({
    scope: 'profile_nickname,profile_image,account_email,birthday',
    success: getKakaoAccount
  })

}

const linkToKakaoAuthorization = () => {

  window.Kakao.Auth.authorize({
    redirectUri: 'http://localhost:3000/kakaologin',
    scope: 'profile_nickname,profile_image,account_email,birthday',
  })

}

const getKakaoAccount =  async () => {

  window.Kakao.API.request({
    url: '/v2/user/me',
    success: async (res) => {
      const kakao_account = res.kakao_account
      const properties = res.properties
      const profile_nickname = properties.nickname
      const account_email = kakao_account.email
      const profile_image = properties.profile_image
      const thumbnail_image = properties.thumbnail_image
      const birthday = kakao_account.birthday
      const pathValue = route.query.path

      data.value.userInfoDTO = {
        profile_nickname, account_email, birthday, profile_image, thumbnail_image
      }
      data.value.pathValue = pathValue

      let loginInfo = await kakaoLogin(data.value)
      console.log("server....", loginInfo)


      // 없는 유저면 회원가입 경로로 재전송
      if (!loginInfo.id) {

        console.log("signUp....", loginInfo)
        const success = await kakaoSignUp(data.value)

        if(!success) return

        loginInfo = await kakaoLogin(data.value)

      }

      cookies.set("loginId", loginInfo.id)
      cookies.set("loginRole", loginInfo.memberValue)
      cookies.set("loginEmail", data.value.userInfoDTO.account_email)
      cookies.set("studentAuthState", loginInfo.authState)
      cookies.set("loginNickname", loginInfo.nickname)
      cookies.set("loginProfileImg", loginInfo.profileImgUrl)
      cookies.set("studentAuthState", loginInfo.authState)
      cookies.set("loginThumbnailImg", loginInfo.thumbnailImgUrl)
      console.log("id.....", cookies.get("loginId"))

      useMemberInfo().setMemberInfo()
      memberInfo.value = useMemberInfo().getMemberInfo()

      await router.push({name: 'HomePage'})

    },
    fail: error => {
      console.log(error)
    }
  })

}


</script>

<style scoped>

</style>
