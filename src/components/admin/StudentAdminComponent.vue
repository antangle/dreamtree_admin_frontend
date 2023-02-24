<template>

  <v-list lines="three">

    <v-list-subheader>Student Admin</v-list-subheader>

    <v-list-item
      v-for="student in students"
      :key="student.studentId"
      @click="() => emits('moveStudentInfo', student.studentId)"
    >
      <div class="d-flex flex-nowrap justify-space-between">
        <div class="d-flex flex-no-wrap ma-1">
          <v-avatar size="70px">
            <v-img src="https://randomuser.me/api/portraits/women/79.jpg"/>
          </v-avatar>

          <div style="margin-left: 15px;">
            <v-list-item-title v-text="student.email"></v-list-item-title>
            <div class="d-flex flex-no-wrap">
              <v-list-subheader> {{student.nickname}}</v-list-subheader>
              <v-list-subheader> {{student.birth}} </v-list-subheader>
            </div>
          </div>
        </div>

        <v-list-item-title>{{student.password}}</v-list-item-title>
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
import {getAuthCount, getStudentLists} from "@/apis/adminAPIS";

const props = defineProps(['searchKeyword', 'pSize', 'pNum'])

const emits = defineEmits(['movePageNum', 'moveStudentInfo', 'moveAuthManagementPage'])

const pageNum = ref(1)

const totalPageSize = ref()

const students = ref([])

const authCount = ref(0)

const fetchGetList = async () => {

  pageNum.value = parseInt(props.pNum)

  props.searchKeyword.condition = 'total'

  const data = await getStudentLists(props.searchKeyword, pageNum.value, props.pSize);

  console.log(data)

  students.value = data.dtoList

  authCount.value = await getAuthCount()

  console.log("authCount: ", authCount.value)

  totalPageSize.value = Math.ceil(data.total / props.pSize)
}

onMounted(() => {
  fetchGetList()
})
</script>

<style scoped>

</style>
