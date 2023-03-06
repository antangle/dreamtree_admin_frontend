<template>
  <v-container>
    <v-row dense>
      <v-col cols="2">
        <v-select
          v-model="searchOptions.condition"
          label="검색조건"
          :items="['전체', 'title', 'email', 'nickname']"
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-select
          v-model="searchOptions.order"
          label="정렬"
          :items="['최신순', 'times']"
        ></v-select>
      </v-col>
      <v-col cols="5">
        <v-text-field
          v-model="searchOptions.keyword"
          label="Search"
          single-line
          hide-detail
        ></v-text-field>
      </v-col>
      <v-col align-self="center">
        <v-btn
          @click="() => emits('clickSearch', searchOptions)"
          append-icon="fa-solid fa-magnifying-glass" variant="plain">
          search
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const emits = defineEmits(['clickSearch'])
const props = defineProps(['searchOptions'])


</script>

<style scoped>

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
