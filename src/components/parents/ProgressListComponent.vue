
<!--최서연 ver.0.1-->
<!-- 수강 프로그램 리스트 조회 컴포넌트 -->

<template>
  <v-container>
    <v-list>
      <v-list-subheader>수강 프로그램/레슨 조회</v-list-subheader>
      <v-expansion-panels variant="inset">

        <v-expansion-panel
          v-for="list in info"
          :key="list.id"
        >
          <v-expansion-panel-title>{{ list.title }}</v-expansion-panel-title>
          <v-expansion-panel-text>

            <ProgressDetailComponent
              :info="list"
              @paySucceeded="onPaySucceeded"
            />

          </v-expansion-panel-text>
        </v-expansion-panel>

      </v-expansion-panels>
    </v-list>


  </v-container>
</template>

<script setup>

import {getProgressList} from "@/apis/ProgressAPIS";
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import ProgressDetailComponent from "@/components/parents/ProgressDetailComponent.vue";
const route = useRoute()
const parentId = parseInt(route.params.id)
const info = ref([])

const onPaySucceeded = () => {
  fetchGetProgressList()
}
const fetchGetProgressList = async () => {

  const res = await getProgressList(parentId)

  console.log(res)
  info.value = res
  console.log(info.value)

}

onMounted(() => {
  fetchGetProgressList()
})


</script>

<style scoped>

</style>
