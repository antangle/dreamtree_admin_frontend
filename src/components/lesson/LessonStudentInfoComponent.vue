<template>
  <v-row dense class="border">
    <v-col
      cols="2"
      class="border d-flex"
    >
      <v-img
        :src="getPersonImageUrl(programDetailInfo.profileImgUrl)"
        @click="test"
      >
        <!--   대기시 뺑글이    -->
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              color="grey-lighten-4"
              indeterminate
            ></v-progress-circular>
          </div>
        </template>
      </v-img>
    </v-col>
    <v-col class="ma-1 bg-grey-lighten-5">
      <v-sheet>
        <v-card flat class="bg-grey-lighten-5">
          <v-row justify="space-around">
            <v-col cols="7">
              <v-card-title>
                {{programDetailInfo.title}}
              </v-card-title>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="5">
              <v-card-text>
                {{ programDetailInfo.email }}
              </v-card-text>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-card-text>
            <v-icon icon="fa-solid fa-graduation-cap" /> 학력: {{ programDetailInfo.college }}  {{ programDetailInfo.major }}
          </v-card-text>
          <v-card-text>
            <v-icon icon="fa-solid fa-stamp" /> 자격증:
            <v-chip
              v-for="certificateName in programDetailInfo.certificateNames"
              color="red"
              :key="certificateName"
              class="ma-0"
            >
              {{certificateName}}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import consts from "@/consts/const";
import {ref} from "vue";
import {getPersonImageUrl} from "@/util/imageUrlGetter";
import img from '@/assets/images/no_image.jpg'
const props = defineProps(['programDetailInfo'])
const emits = defineEmits(['onClickStudentImage'])
const model = ref()

const test = () => {
  emits('onClickStudentImage')
}
</script>

<style scoped>

</style>
