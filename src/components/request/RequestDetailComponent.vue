
<!--최서연 ver.0.1-->
<!-- 요청글 상세 조회 컴포넌트 -->

<template>
  <v-container>
    <v-card-text>{{ info.subCategoryName ? info.subCategoryName : "etc" }}</v-card-text>

    <v-card-title class="text-h4 text--primary">
      {{ info.title }}
    </v-card-title>

    <v-card-actions class="justify-end">
      <v-card-item>
        {{ info.nickname }}
      </v-card-item>
      <v-card-item
        prepend-icon="fa-solid fa-circle-info"
        @click="emits('moveParentInfoPage', info.parentId)"
      >
      </v-card-item>
    </v-card-actions>

    <br/>

    <p> {{ info.description }}</p>
    <br/>

    <div clas="text--primary">

      {{ info.content }}

    </div>

    <br/>
    <v-divider/>
    <div class="d-flex flex-nowrap justify-center">
      <div style="margin-right: 100px">
        <v-card-text>자녀의 학년</v-card-text>
        <v-alert flat variant="outlined"> {{ info.studentGrade }}</v-alert>
      </div>

      <div style="margin-left: 100px">
        <v-card-text>자녀의 성별</v-card-text>
        <v-alert flat variant="outlined"> {{ info.studentGender }}</v-alert>
      </div>

    </div>

  <div class="d-flex">

    <v-btn
      v-if="info.parentId === memberInfo.id"
      @click="emits('moveModifyPage', props.id)"
    >
      수정
    </v-btn>

    <v-btn
      @click="emits('moveListPage')"
    >
      목록
    </v-btn>

  </div>
  </v-container>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {getRequestDetail} from "@/apis/RequestAPIS";
import useMemberInfo from "@/store/useMemberInfo";

const props = defineProps(['id'])
const emits = defineEmits(['moveModifyPage', 'moveListPage'])
const memberInfo = useMemberInfo().getMemberInfo()
const info = ref({})

const fetchGetRequestInfo = async () => {

  const res = await getRequestDetail(props.id)

  console.log(res)

  info.value = res

}
onMounted(() => {
  fetchGetRequestInfo()
})

</script>

<style scoped>

</style>
