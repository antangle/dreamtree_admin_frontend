<template>

  <v-list lines="two">
    <v-list-item>
      <div class="d-flex flex-no-wrap justify-center">
        <v-avatar
          style="margin-left: 20px"
          class="ma-1"
          size="250"
          rounded="10"
        >
          <v-img
            :src="getImageUrl(college.url)"
          ></v-img>
        </v-avatar>

        <v-card-title
        >
          {{ college.nickname }}
        </v-card-title>
      </div>
    </v-list-item>

    <v-divider/>

    <!-- 대학 -->
    <v-list-item>
      <div
        class="d-flex flex-no-wrap"
        style="margin-right: 50px"
      >
        <v-card-subtitle>대학교</v-card-subtitle>
        <v-text>{{ college.college }}</v-text>
      </div>
    </v-list-item>

    <v-divider/>

    <!-- 전공 -->
    <v-list-item>
      <div
        class="d-flex flex-no-wrap"
        style="margin-right: 50px"
      >
        <v-card-subtitle>전공</v-card-subtitle>
        <v-text>{{ college.major }}</v-text>
      </div>
    </v-list-item>

    <v-divider/>
  </v-list>

  <div style="float: right; margin-right: 3%; margin-top: 1%">
    <v-btn @click="() => clickAccept(id, 'yes')">수락</v-btn>
    <v-btn @click="() => clickAccept(id, 'no')">거절</v-btn>
  </div>

</template>

<script setup>

import {onMounted, ref} from "vue";
import {getCollegeAuthInfo, modifyCollegeAuthState} from "@/apis/adminAPIS";
import {getImageUrl} from "@/util/imageUrlGetter";

const props = defineProps(['id'])

const emits = defineEmits(['moveAuthManagement'])

const college = ref({})

const clickAccept = async (id, authState) => {

  await modifyCollegeAuthState(id, authState)

  emits('moveAuthManagement')
}

const fetchGetInfo = async () => {

  console.log(props.id)

  college.value = await getCollegeAuthInfo(props.id);

  console.log("College: ", college.value)

}

onMounted(() => {
  fetchGetInfo()
})

</script>

<style scoped>

</style>
