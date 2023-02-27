<template>
  <v-container>
    <v-row>
      <v-col v-for="image in imageNames" :key="image">
        <v-img
          v-if="image.contentType != 'video/mp4'"
          :src="`${consts.IMG_DOMAIN}/t_${image.filename}`"
          max-height="150"
          class="bg-grey-lighten-2"
          cover
          @click="() => deleteImage(image)"
        >
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
    </v-row>
  </v-container>
</template>

<script setup>
import {ref} from "vue";
import consts from "@/consts/const";
import {deleteMinioImage} from "@/apis/api";

const props = defineProps(['imageNameList'])
const emits = defineEmits(['onImageDeleted'])

//리로딩 시 imageNames 업데이트됨
const imageNames = ref(props.imageNameList)

const deleteImage = async (image) => {
  //parameter 배열로 받음
  await deleteMinioImage([image.filename])

  imageNames.value = imageNames.value.filter(e => e !== image)

  emits('onImageDeleted', imageNames.value)
}
</script>

<style scoped>

</style>
