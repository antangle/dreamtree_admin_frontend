<template>

  <div class="v-container">

    내가 신고한 목록<br>
    <div style="width: 1000px">
      <v-select
        style="max-width: 15%"
        v-model="select"
        label="정렬"
        :items="sortItems"
        @update:modelValue="sort"
      ></v-select>
    </div>
    <v-list lines="three">

      <v-list-subheader>Report</v-list-subheader>

      <v-list-item
        v-for="report in reports"
        :key="report.reportId"
      >
        <div style="display: flex">
          <div class="d-flex flex-nowrap justify-space-between"
               @click="() => clickReport(report.reportId)">
            <div class="d-flex flex-no-wrap ma-1">

              <div style="margin-left: 15px;">
                <v-list-item-title v-text="report.title"></v-list-item-title>
                <div class="d-flex flex-no-wrap">
                  <v-list-subheader> {{ report.updatedAt }}</v-list-subheader>
                  <v-list-subheader>
                    {{ report.status == 'pending' ? '접수 중' : report.status == 'accepted' ? '접수완료' : '처리완료' }}
                  </v-list-subheader>
                </div>
              </div>
            </div>
          </div>
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
  </div>

  <!-- dialog -->
  <div class="text-center">
    <v-dialog v-model="dialog">

      <v-card>
        <v-card-text style="text-align: center">
          <div class="v-container">
            제목: {{ reportInfo.title }} <br>
            내용: {{ reportInfo.content }} <br>
            접수날짜: {{ reportInfo.updatedAt }} <br>
            신고 상태: {{ reportInfo.status }}
            <v-btn @click="() => solved(reportInfo.reportId)">처리 완료</v-btn>
          </div>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="grey" @click="dialog = false"> 확인</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

  </div>

</template>

<script setup>

import {myReportList} from "@/apis/StudentAPIS";
import {computed, onMounted, ref} from "vue";
import {adminGetReport, updateReportStatus} from "@/apis/adminAPIS";

const props = defineProps(['pNum', 'pSize'])

const emits = defineEmits(['movePageNum'])

const pageNum = ref(1)

const totalPageSize = ref()

const reports = ref([])

const reportInfo = ref({})

const dialog = ref(false)

const select = ref('접수 중')

const sortItems = ref(['접수완료', '접수 중', '처리완료'])

const sort = async () => {

  await fetchGetList()
}

const solved = async (id) => {

  await updateReportStatus(id)

  dialog.value = !dialog.value

  await fetchGetList()
}

const clickReport = async (id) => {

  reportInfo.value = await adminGetReport(id)

  const target = reports.value.filter(r => r.reportId === id)

  target.status = 'accepted'

  dialog.value = true
}

const sortItem = () => {

  switch (select.value) {

    case '접수 중':
      return 'pending'
    case '접수완료':
      return 'accepted'
    case '처리완료':
      return 'solved'
  }
}

const selectCheck = computed(() => {

  return select.value
})

const fetchGetList = async () => {

  pageNum.value = parseInt(props.pNum)

  const result = {reporterEmail: 'reportEmail1', page: pageNum.value, size: props.pSize, sort: sortItem()}

  const reportData = await myReportList(result)

  reports.value = reportData.dtoList

  totalPageSize.value = reportData.end

  console.log(reports.value)

}

onMounted(() => {
  fetchGetList()
})


</script>

<style scoped>

.check {

  position: absolute;

  right: 10%;
}

</style>
