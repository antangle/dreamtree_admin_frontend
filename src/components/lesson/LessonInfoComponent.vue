<template>
  <v-row>
    <v-col>
      <v-sheet
        class="mx-auto"
      >
        <v-slide-group
          v-model="model"
          selected-class="bg-success"
          show-arrows
          center-active
        >
          <v-slide-group-item
            v-for="lesson in programDetailInfo.lessonLists"
            :key="lesson"
            v-slot="{ isSelected, toggle }"
          >
            <v-card
              :color="isSelected ? '#D9B4C8' : '#F2F2F2'"
              class="ma-4"
              height="200"
              width="200"
              @click="() => onClickLessonSheet(toggle)"
            >
              <v-card-item>
                <v-chip
                  v-for="tag in bitToDayParser(lesson.day)" :key="tag"
                  color="pink"
                >
                  {{ tag }}
                </v-chip>
              </v-card-item>

              <v-card-item>
                {{lesson.startDate}} ~ {{lesson.endDate}}
              </v-card-item>

              <v-card-item>
                <v-chip text-color="white">
                  {{lesson.lessonLength}}H
                  <v-icon end icon="fa-solid fa-clock"></v-icon>
                </v-chip>
                <v-chip text-color="white">
                  {{ lesson.progressList.length }}/{{ lesson.personnel }}
                  <v-icon end icon="fa-solid fa-child"></v-icon>
                </v-chip>
              </v-card-item>

              <!--선택시 아이콘-->
              <div class="d-flex fill-height align-center justify-center">
                <v-scale-transition>
                  <v-icon
                    v-if="isSelected"
                    color="white"
                    size="48"
                    icon="fa-solid fa-arrow-pointer"
                  ></v-icon>
                </v-scale-transition>
              </div>

            </v-card>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>

import {bitToDayParser} from "@/util/dayBitParser";
import {ref} from "vue";

const props = defineProps(['programDetailInfo'])
const emits = defineEmits(['onClickLesson'])
const model = ref()
const onClickLessonSheet = (toggle) => {
  toggle()
  console.log(model.value)
  emits('onClickLesson', model.value)
}

</script>

<style scoped>

</style>
