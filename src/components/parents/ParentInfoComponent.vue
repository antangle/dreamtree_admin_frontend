<template>
  <v-list lines="two">

    <v-list-subheader>Parent Info</v-list-subheader>

    <!--회원 프로필 이미지 & 닉네임-->
    <v-list-item>
      <div class="d-flex flex-no-wrap justify-center" >
        <v-avatar
          style="margin-left: 20px"
          class="ma-1"
          size="250"
          rounded="10"
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
          ></v-img>
        </v-avatar>

        <v-card-title
        >
          {{ info.nickname }}
        </v-card-title>

        <v-btn
          v-if="info.id === memberInfo.id"
          flat
          color="grey"
          size="small"
          icon="fa-solid fa-pen"
          @click="() => emits(`onClickMoveInfoModifyPage`, id)"
        ></v-btn>
      </div>
    </v-list-item>

    <v-divider/>

    <!--회원 이메일-->
    <v-list-item>
      <div
        class="d-flex flex-no-wrap justify-md-space-between"
        style="margin-right: 50px"
      >
        <v-card-subtitle>EMAIL</v-card-subtitle>
        <v-text>{{ info.email }}</v-text>
      </div>
    </v-list-item>

    <v-divider/>

    <!--회원 생년월일-->
    <v-list-item>
      <div
        class="d-flex flex-no-wrap justify-md-space-between"
        style="margin-right: 50px"
      >
        <v-card-subtitle>BIRTH</v-card-subtitle>
        <v-text>{{ setLocalDateString(info.birth) }}</v-text>
      </div>
    </v-list-item>

  </v-list>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {getParentInfo} from "@/apis/ParentAPIS";
import useMemberInfo from "@/store/useMemberInfo";

const props = defineProps(['id'])
const emits = defineEmits(['onClickMoveInfoModifyPage'])
const memberInfo = useMemberInfo().getMemberInfo()

const info = ref({id: null, email: null, nickname: null, birth: null, profileImgUrl: null})
const fetchGetInfo = async () => {

  const res = await getParentInfo(props.id)
  console.log(res)
  info.value = res

}

onMounted(() => {
  fetchGetInfo()
})

// 날짜 yyyy.MM.DD 변환 함수
const setLocalDateString = (str) => {

  const date = new Date(str)
  return date.toLocaleDateString()

}


</script>

<style scoped>

</style>
