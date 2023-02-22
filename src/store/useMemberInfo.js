import {ref} from "vue";
import {defineStore} from "pinia";
import consts from "@/consts/const";

const useMemberInfo = defineStore('useMemberInfo',() => {

  const memberInfo = ref({id: null, role: null})

  const getMemberInfo = () => {
    return {id: 1, role: 'admin'}
  }

  const setMemberInfo = (data) => {

    memberInfo.value.id = data.id
    memberInfo.value.role = data.memberValue

  }
  return {getMemberInfo, setMemberInfo}
})

export default useMemberInfo
