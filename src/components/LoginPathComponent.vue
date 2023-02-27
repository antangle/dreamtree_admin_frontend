<template>
  <v-container>
    <v-row class="align-center">
        <v-col>
          <v-img src="public/bachelor_cap_icon.png" width="200"
            @click="() => pathValue = 'student'"
          >
          </v-img>

          <div display="flex">
            <strong>대학생</strong>
            <text>으로 로그인</text>
          </div>
        </v-col>

        <v-col>
          <v-img src="public/test_icon.png" width="180"
            @click="() => pathValue = 'parent'"
          >
          </v-img>

          <div display="flex">
            <strong>부모님</strong>
            <text>으로 로그인</text>
          </div>
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
