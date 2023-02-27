<template>
  <DefaultLayout>
    <v-expansion-panels>
<!--현재 모집중인 레슨들-->
      <v-expansion-panel
        v-for="program in 3"
        :key="program"
      >
        <v-expansion-panel-title>
          <v-row justify="space-around">
            <v-col>
              프로그램: {{ program.title }}
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>

<!--현재 신청한 학부모들-->
          <v-expansion-panels>
            <v-expansion-panel
              v-for="lesson in 3"
              :key="lesson"
            >
            </v-expansion-panel>
          </v-expansion-panels>


        </v-expansion-panel-text>
        <v-divider></v-divider>
      </v-expansion-panel>
    </v-expansion-panels>

  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
/*
* todo: 페이지 형태, api 제작  || 마감버튼은 레슨관리에서! -> 누를 시 출석 생성 || 학부모 신청 받을 시 progress pay_status 'request'로 변경
* */
</script>

<style scoped>

</style>
