
<!--최서연 ver.0.1-->
<!-- Parent 회원 상세 조회 컴포넌트-->

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
            :src="info.profileImgUrl"
          ></v-img>
        </v-avatar>

        <v-card-title
        >
          {{ info.nickname }}
        </v-card-title>

        <v-btn
          v-if="info.id === parseInt(memberInfo.id)"
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
        <v-text>{{ info.birthday }}</v-text>
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

const info = ref({id: null, email: null, nickname: null, birthday: null, profileImgUrl: null})
const fetchGetInfo = async () => {

  const res = await getParentInfo(memberInfo.id)
  console.log(res)
  info.value = res

}

onMounted(() => {
  fetchGetInfo()
})



</script>

<style scoped>

</style>
