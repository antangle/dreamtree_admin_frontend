<template>
  <h3>대학 인증 요청</h3>

  <v-list lines="three">

    <v-list-subheader>College Auth Request</v-list-subheader>

    <v-list-item
      v-for="auth in collegeAuthRequests"
      :key="auth.studentId"
      @click="() => emits('moveCollegeAuthInfo', auth.id)"
    >
      <div class="d-flex flex-nowrap justify-space-between">
        <div class="d-flex flex-no-wrap ma-1">
          <v-avatar size="70px">
            <v-img src="https://randomuser.me/api/portraits/women/79.jpg"/>
          </v-avatar>

          <div style="margin-left: 15px;">
            <v-list-item-title v-text="auth.email"></v-list-item-title>
            <div class="d-flex flex-no-wrap">
              <v-list-subheader> {{ auth.nickname }}</v-list-subheader>
              <v-list-subheader> {{ auth.birth }}</v-list-subheader>
            </div>
          </div>
        </div>

        <v-list-item-title>{{ auth.password }}</v-list-item-title>
      </div>
    </v-list-item>
  </v-list>

  <div>
    <v-pagination
      v-model="pageNum"
      :length="totalPageSize"
      rounded="circle"
      @click="() => emits('movePageNum', pageNum)"
    ></v-pagination>
  </div>

</template>

<script setup>

import {onMounted, ref} from "vue";
import {getStudentCollegeAuthLists} from "@/apis/adminAPIS";

const props = defineProps(['searchKeyword', 'pSize', 'pNum'])

const emits = defineEmits(['movePageNum', 'moveCollegeAuthInfo'])

const pageNum = ref(1)

const totalPageSize = ref()

const collegeAuthRequests = ref([])


const fetchGetList = async () => {

  pageNum.value = parseInt(props.pNum)

  const collegeData = await getStudentCollegeAuthLists(props.searchKeyword, pageNum.value, props.pSize)

  collegeAuthRequests.value = collegeData.dtoList

  totalPageSize.value = collegeData.end
}

onMounted(() => {
  fetchGetList()
})
</script>

<style scoped>

</style>
