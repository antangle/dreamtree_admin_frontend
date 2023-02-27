<template>
  <v-container class="bg-white">
    <v-row>
      <v-col class="h1">
        <h1>
          {{programTitle}}
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        레슨 기간: {{lessonInfo.startDate}} ~ {{lessonInfo.endDate}}
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        레슨 진행일:
        <v-chip
          v-for="tag in bitToDayParser(lessonInfo.day)" :key="tag"
        >
          {{ tag }}
        </v-chip>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        레슨 시간: {{lessonInfo.lessonTime}}시 ~ {{lessonInfo.lessonTime + lessonInfo.lessonLength}}시
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        모집 인원: 총 {{lessonInfo.personnel}}명
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        가격: {{lessonInfo.fee}}원
      </v-col>
    </v-row>
    <v-row
      v-if="lessonInfo.place"
    >
      <v-col>
        장소: {{lessonInfo.place}}
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        모집 기간: {{lessonInfo.expireStartDate}} ~ {{lessonInfo.expireEndDate}}
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn
          v-if="memberInfo.role == consts.PARENT || memberInfo.role == consts.ADMIN"
          @click="() => onClickApplyButton(lessonInfo, programTitle)"
          >
          문의하기
        </v-btn>
      </v-col>
    </v-row>
    {{lessonInfo}}
  </v-container>
</template>

<script setup>
import {bitToDayParser} from "@/util/dayBitParser";
import consts from "@/consts/const";
import useMemberInfo from "@/store/useMemberInfo";

const memberInfo = useMemberInfo().getMemberInfo()
const props = defineProps(['lessonInfo', 'programTitle']);
const emits = defineEmits(['paySucceeded', 'moveLessonApplyPage'])

const onClickApplyButton = (lessonInfo, programTitle) => {
  if(lessonInfo.progressList.length >= lessonInfo.personnel){
    alert('이미 인원이 꽉 찬 레슨입니다.')
    return
  }
  emits('moveLessonApplyPage', lessonInfo, programTitle)
}


</script>

<style scoped>

</style>
