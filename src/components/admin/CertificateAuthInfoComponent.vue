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
            :src="getImageUrl(certificate.url)"
          ></v-img>
        </v-avatar>
      </div>
    </v-list-item>

    <v-divider/>

    <v-list-item>
      <div
        class="d-flex flex-no-wrap justify-md-space-between"
        style="margin-right: 50px"
      >
        <v-card-subtitle>자격증명</v-card-subtitle>
        <v-text>{{ certificate.name }}</v-text>
      </div>
    </v-list-item>

    <v-divider/>

    <v-list-item>
      <div
        class="d-flex flex-no-wrap justify-md-space-between"
        style="margin-right: 50px"
      >
        <v-card-subtitle>취득일자</v-card-subtitle>
        <v-text>{{ certificate.aquireDate }}</v-text>
      </div>
    </v-list-item>

    <v-divider/>

  </v-list>
  <v-btn @click="() => clickAccept(id, 'yes')">수락</v-btn>
  <v-btn @click="() => clickAccept(id, 'no')">거절</v-btn>

</template>

<script setup>

import {onMounted, ref} from "vue";
import {getCertificateAuthInfo, modifyCertificateAuthState} from "@/apis/adminAPIS";
import {getImageUrl} from "@/util/imageUrlGetter";

const props = defineProps(['id'])

const emits = defineEmits(['moveAuthManagement'])

const certificate = ref({})

const clickAccept = async (id, authState) => {

  await modifyCertificateAuthState(id, authState)

  emits('moveAuthManagement')
}

const fetchGetInfo = async () => {

  console.log(props.id)

  certificate.value = await getCertificateAuthInfo(props.id);

  console.log("Certificate: ", certificate.value)

}

onMounted(() => {
  fetchGetInfo()
})

</script>

<style scoped>

</style>
