import {ref} from "vue";
import {defineStore} from "pinia";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies()

const useMemberInfo = defineStore('useMemberInfo',() => {

  const memberInfo = ref({id: null, role: null, email: "hello@naver.com"})

  const getMemberInfo = () => {
    if(!memberInfo.value.id) setMemberInfo()
    return memberInfo.value
  }

  const setMemberInfo = () => {

    memberInfo.value.id = cookies.get("loginId")
    memberInfo.value.role = cookies.get("loginRole")

    console.log("set memberInfo...", memberInfo.value)
  }

  const initMemberInfo = () => {

    memberInfo.value.id = null
    memberInfo.value.role = null

    console.log("set memberInfo...", memberInfo.value)
  }
  return {getMemberInfo, setMemberInfo, initMemberInfo}
})

export default useMemberInfo
