
<!--최서연 ver.0.1-->
<!-- 로그인 경로 설정 컴포넌트 -->

<template>
  <v-container>
    <v-row align-content="end">
      <v-col class="d-flex justify-center align-end">
        <v-sheet>
          <v-img src="public/bachelor_cap_icon.png" width="200"
            @click="() => pathValue = 'student'"
          >
          </v-img>
          <div class="d-flex justify-center">
            <strong>대학생</strong>
            <text>으로 로그인</text>
          </div>
        </v-sheet>
      </v-col>
      <v-col class="d-flex justify-center align-end">
        <v-sheet>
          <v-img src="public/test_icon.png" width="180"
            @click="() => pathValue = 'parent'"
          >
          </v-img>
          <div class="d-flex justify-center">
            <strong>부모님</strong>
            <text>으로 로그인</text>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>

import {ref, watch} from "vue";

const pathValue = ref()
const emits = defineEmits('sendLoginPathValue')

watch(pathValue, async () => {

  console.log(pathValue.value)
  emits('sendLoginPathValue', pathValue.value)

})


</script>

<style scoped>

</style>
