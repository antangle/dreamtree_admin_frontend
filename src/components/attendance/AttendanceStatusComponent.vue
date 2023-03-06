<!--이승윤 ver0.1-->

<template>
  <v-container>
    <v-row justify="start" align-content="center">
      <v-col
        class="border-md"
        v-for="i in attendanceStatus"
        :key="i"
        :class="setStatusColor(i)"
        cols="1"
      >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const props = defineProps(['attendanceStatus'])
const setStatusColor = (i) => {
  if(i == 0) return 'bg-white'
  if(i == 1) return 'bg-green'
  if(i == 2) return 'bg-grey'
}
</script>

<style scoped>

</style>
