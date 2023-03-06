<!--이승윤 ver0.1-->

<template>
  <v-expansion-panels

  >
    <v-expansion-panel
      v-for="lesson in attendanceInfo"
      :key="lesson"
    >
      <v-expansion-panel-title>
        <v-row justify="space-around">
          <v-col>
            레슨: {{ lesson.title }}
          </v-col>

          <v-col cols="2">
            {{lesson.childName}}
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>

        <v-expansion-panels>
          <v-expansion-panel
            v-for="progress in lesson.progressList"
            :key="progress"
          >
            <v-expansion-panel-title>
              {{ progress.childName }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <AttendanceStatusComponent
                :attendanceStatus="progress.attendanceStatus"
              ></AttendanceStatusComponent>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-divider></v-divider>
        </v-expansion-panels>

      </v-expansion-panel-text>
      <v-divider></v-divider>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import AttendanceStatusComponent from "@/components/attendance/AttendanceStatusComponent.vue"
const props = defineProps(['attendanceInfo'])

</script>

<style scoped>

</style>
