import {ref} from "vue";
import {defineStore} from "pinia";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies()

const useMemberInfo = defineStore('useMemberInfo',() => {

  const memberInfo = ref({
    id: null,
    role: null,
    email: null,
    authState: 'no',
    nickname: null,
    profileImage: null,
    thumbnailImage: null
  })

  const getMemberInfo = () => {
    if(!memberInfo.value.id) setMemberInfo()
    return memberInfo.value
  }

  const setMemberInfo = () => {

    memberInfo.value.id = cookies.get("loginId")
    memberInfo.value.role = cookies.get("loginRole")
    memberInfo.value.email = cookies.get('loginEmail')
    memberInfo.value.nickname = cookies.get('loginNickname')
    memberInfo.value.authState = cookies.get('studentAuthState')
    memberInfo.value.profileImage = cookies.get('loginProfileImg')
    memberInfo.value.thumbnailImage = cookies.get('loginThumbnailImg')

    console.log("set memberInfo...", memberInfo.value)
  }

  const initMemberInfo = () => {

    memberInfo.value.id = null
    memberInfo.value.role = null
    memberInfo.value.email = null
    memberInfo.value.nickname = null
    memberInfo.value.authState = 'no'
    memberInfo.value.profileImage = null
    memberInfo.value.thumbnailImage = null

    console.log("init memberInfo...", memberInfo.value)
  }

  return {getMemberInfo, setMemberInfo, initMemberInfo}
})

export default useMemberInfo
