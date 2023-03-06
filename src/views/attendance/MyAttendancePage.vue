<!--이승윤 ver0.1-->

<template>
  <DefaultLayout>
<!--  탭   -->
    <v-tabs
      align-tabs="center"
      grow
      bg-color="transparent"
      v-model="tab"
    >
      <v-tab value="1">
        출석 현황 조회
      </v-tab>
<!--  만약 parent라면 이 탭을 보여주지 않음    -->
      <v-tab
        value="2"
        v-if="userRole != 'parent'"
      >
        출석 등록
      </v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="1">
        <AttendanceListComponent
          :attendanceInfo="attendanceInfo"
        ></AttendanceListComponent>
      </v-window-item>

      <v-window-item value="2">
        <AttendanceFormComponent
          :attendanceInfo="attendanceInfo"
        ></AttendanceFormComponent>
      </v-window-item>
    </v-window>

    <v-container>
      <v-row>
        <v-col>
        </v-col>
      </v-row>



    </v-container>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import {onMounted, ref} from "vue";
import AttendanceListComponent from "@/components/attendance/AttendanceListComponent.vue";
import useMemberInfo from "@/store/useMemberInfo";
import AttendanceFormComponent from "@/components/attendance/AttendanceFormComponent.vue";
import {getAttendanceInfo} from "@/apis/attendanceAPIS";
import consts from "@/consts/const";
import {getTurn} from "@/util/dayBitParser";
const userRole = useMemberInfo().getMemberInfo().role
const attendanceInfo = ref([])
const memberInfo = useMemberInfo().getMemberInfo()

const tab = ref(1);

const fetchAttendanceInfo = async () => {
  const data = await getAttendanceInfo(memberInfo.id, memberInfo.role)

  data.map(lesson => {
    lesson.turn = getTurn(lesson)
  })
  /*parent일 시, progressList항목 추가*/
  if(memberInfo.role == consts.PARENT){
    data.map(lesson => {
      lesson.progressList = [{
        childName: lesson.childName,
        attendanceId: lesson.attendanceId,
        attendanceStatus: lesson.attendanceStatus
      }]
    })
  }

  attendanceInfo.value = data
  console.log(attendanceInfo.value)
}

onMounted(() => {
  fetchAttendanceInfo();
})


</script>

<style scoped>

</style>
