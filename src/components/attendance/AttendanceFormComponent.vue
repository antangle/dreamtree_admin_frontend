<!--이승윤 ver0.1-->

<template>
  <v-expansion-panels
    v-model="panel"
  >
    <v-expansion-panel
      v-for="lesson in attendanceInfo"
      :key="lesson"
      :disabled="lesson.turn == 0 || checkIfAttendanceSet(lesson.turn, lesson.progressList[0].attendanceStatus)"
    >
      <v-expansion-panel-title
        @click="radio = []"
      >
        <v-row justify="space-around">
          <v-col>
            레슨: {{ lesson.title }}
          </v-col>

          <v-col cols="2"
            v-if="lesson.turn > 0"
          >
            {{lesson.turn}} 회차
          </v-col>

          <v-col cols="5"
            v-if="lesson.turn == 0"
          >
            아직 수업이 진행되지 않았습니다
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-container>
          <v-row
            v-for="(progress, index) in lesson.progressList"
            :key="progress"
            justify="space-around"
          >
            <v-col>
              {{ progress.childName }}
            </v-col>

            <v-col cols="3">
              <v-radio-group
                v-model="radio[index]"
                inline
              >
                <v-radio label="출석" value="1"></v-radio>
                <v-radio label="결석" value="2"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row justify="end">
            <v-col cols="1">
              <v-btn
                @click="() => onClickSave(lesson, radio)"
              >확인</v-btn>
            </v-col>
          </v-row>
        </v-container>

      </v-expansion-panel-text>
      <v-divider></v-divider>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import {ref} from "vue";
import {updateAttendanceStatus} from "@/apis/attendanceAPIS";

const props = defineProps(['attendanceInfo'])
const emits = defineEmits(['onAttendanceSave'])
const radio = ref([]);
const panel = ref([])
const onClickSave = async (lesson, curRadio) => {
  const attendanceDTOList = []
  /*서버에 보낼 attendanceDTO 제작*/
  lesson.progressList.map((item, index) => {
    /*만약 radio가 눌리지 않다면 패스*/
    if(!curRadio[index]) return
    attendanceDTOList.push({
      attendanceId: item.attendanceId,
      status: updateStatus(item, curRadio[index], lesson.turn)
    })
  })

  panel.value = []
  /*위에서 radio가 눌리지 않았다면 아무것도 하지않고 종료*/
  if(attendanceDTOList.length != curRadio.length){
    console.log("select all radio!")
    return
  }

  await updateAttendanceStatus(attendanceDTOList)
  emits('onAttendanceSave')
}

/*출석 String 변환 로직*/
const updateStatus = (progress, radioValue, turn) => {
  const status = progress.attendanceStatus
  progress.attendanceStatus = status.substring(0, turn-1) + radioValue + status.substring(turn);
  return progress.attendanceStatus
}


/*만약 출석처리 한번 헀으면 못바꾸게 할 수 있는 처리값 계산*/
const checkIfAttendanceSet = (turn, attendanceStatus) => {
  return attendanceStatus[turn-1] != '0' ? true : false
}
</script>

<style scoped>

</style>
