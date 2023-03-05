
<!--최서연 ver.0.1-->
<!-- 회원정보 수정 컴포넌트 -->

<template>

  <div>
    <v-avatar
      style="margin-left: 20px"
      class="ma-1; align-content-center"
      size="200"
      rounded="10"
    >
      <v-img
        :src="getImageUrl(info.profileImgUrl)"
      ></v-img>
    </v-avatar>
  </div>

  <div
    style="margin-left: 50px; margin-right: 50px"
  >
    <strong>이름</strong>
    <v-text-field
      v-model="info.nickname"
      :value="info.nickname"
      required
      variant="outlined"
    ></v-text-field>
  </div>

  <v-divider/>

  <div
    style="margin-left: 50px; margin-right: 50px; margin-top: 20px"
  >
    <strong>비밀번호</strong>
    <v-text-field
      v-model="info.password"
      :value="info.password"
      required
      variant="outlined"
    >
    </v-text-field>
  </div>

  <v-btn
    variant="elevated"
    size="default"
    color="blue"
    icon="fa-solid fa-check"
    @click="onClickModifyDialog"
  ></v-btn>

  <!-- dialog -->
  <div class="text-center">
    <v-dialog v-model="dialog">

      <v-card>
        <v-card-text style="text-align: center">
          수정하시겠습니까?
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="grey" @click="dialog = false"> 취소 </v-btn>
          <v-btn color="grey" @click="() => emits(`moveInfoPage`, id)"> 완료 </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

  </div>

</template>

<script setup>

import {onMounted, ref, watch} from "vue";
import {getParentInfo, updateParentInfo} from "@/apis/ParentAPIS";
import {useRoute} from "vue-router";
import {getImageUrl} from "@/util/imageUrlGetter";

const route = useRoute()

const emits = defineEmits(['moveInfoPage'])

const id = parseInt(route.params.id)

// 받아온 회원정보
const info = ref({email: null, nickname: null, password: null, birth: null, profileImgUrl: null})
// 서버로 보낼 수정된 회원정보
const result = ref({id: id, nickname: info.value.nickname, password: info.value.password, profileImgUrl: info.value.profileImgUrl})

const dialog = ref(false)

/** 회원 정보 받아오기 **/
const getInfo = async () => {

  const res = await getParentInfo(id)

  console.log(res)
  console.log(id)

  info.value = res

}

onMounted(() => {
  getInfo()
})

/** 수정 Dialog 팝업 **/
const onClickModifyDialog = () => {
  dialog.value = true
}

/** 수정 완료 **/
watch(dialog, async () => {

  console.log(dialog.value)

  if (dialog.value) {

    console.log(info.value)

    result.value.nickname = info.value.nickname
    result.value.password = info.value.password
    result.value.profileImgUrl = info.value.profileImgUrl

    console.log(result.value)

    await updateParentInfo(result.value)

  }

})


</script>

<style scoped>

</style>
