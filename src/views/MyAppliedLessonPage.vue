<template>
  <DefaultLayout>
    {{programs}}
    <v-expansion-panels>
<!--현재 모집중인 레슨들-->
      <v-expansion-panel
        v-for="program in programs"
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
              v-for="lesson in program.lessonProgressDTO"
              :key="lesson"
            >
              <v-expansion-panel-title>
                <v-chip
                  v-for="tag in bitToDayParser(lesson.day)" :key="tag"
                  color="pink"
                >
                  {{ tag }}
                </v-chip>
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

                    <v-col cols="1">
                      <v-btn
                        @click="() => onClickAccept(progress.progressId)"
                      >수락</v-btn>
                    </v-col>
                  </v-row>

                  <v-row justify="end">
                  </v-row>
                </v-container>
              </v-expansion-panel-text>
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
import {myAppliedLessonList} from "@/apis/StudentAPIS";
import {onMounted, ref} from "vue";
import useMemberInfo from "@/store/useMemberInfo";
import {bitToDayParser} from "@/util/dayBitParser";
import {updatePayStatus} from "@/apis/ProgressAPIS";
import consts from "@/consts/const";
const programs = ref();

const memberInfo = useMemberInfo().getMemberInfo();
/*
* todo: 페이지 형태, api 제작  || 학부모 신청 받을 시 progress pay_status 'request'로 변경
* */

const onClickAccept = async (progressId) => {
  const reqDTO = {
    id: progressId,
    status: consts.REQUEST
  }
  await updatePayStatus(reqDTO)

  await fetchGetList()
}
const fetchGetList = async () => {

  let data = await myAppliedLessonList(memberInfo.id)

  data = data.filter(item => item.lessonProgressDTO.length != 0)
  programs.value = data

}

onMounted(() => {
  fetchGetList()
})


</script>

<style scoped>

</style>
