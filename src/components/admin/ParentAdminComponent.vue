<template>
  <v-list lines="three">

    <v-list-subheader>수정하려면 학부모 정보를 클릭하세요</v-list-subheader>

    <v-list-item
      v-for="info in infoList"
      :key="info.id"
    >
      <v-row>
        <v-col cols="11">
          <div class="d-flex flex-nowrap justify-space-between"
               @click="() => emits(`onClickMoveInfoModifyPage`, info.id)"
          >
            <div class="d-flex flex-no-wrap ma-1">
              <v-avatar size="70px">
                <v-img :src="getImageUrl(info.profileImgUrl)"/>
              </v-avatar>

              <div style="margin-left: 15px;">
                <v-list-item-title v-text="info.email"></v-list-item-title>
                <div class="d-flex flex-no-wrap">
                  <v-list-subheader> {{ info.nickname }}</v-list-subheader>
                  <v-list-subheader> {{ info.birth }}</v-list-subheader>
                </div>
              </div>
            </div>

            <v-list-item-title>{{ info.password }}</v-list-item-title>
          </div>
        </v-col>
        <v-col>
          <v-btn
            icon="fa-solid fa-delete-left"
            flat
            @click="() => deleteInfo(info)"
          >
          </v-btn>
        </v-col>
      </v-row>
    </v-list-item>

  </v-list>

  <div>
    <v-pagination
      v-model="pageNum"
      :length="totalPageSize"
      rounded="circle"
      @click="() => emits('movePageNum', pageNum)"
    ></v-pagination>
  </div>

</template>

<script setup>

import {onMounted, ref} from "vue";
import {getParentList, softDeleteParentInfo} from "@/apis/ParentAPIS";
import {getImageUrl} from "@/util/imageUrlGetter";

const props = defineProps(['movePage', 'pNum', 'pSize', 'searchCondition'])
const emits = defineEmits(['onClickMoveInfoModifyPage', 'movePageNum'])

const infoList = ref([])

const pageNum = ref(1)

const pageSize = ref(10)

const totalPageSize = ref()

/** 학부모 회원정보 전체 리스트 받아오기 **/
const fetchGetParentList = async () => {

  pageNum.value = parseInt(props.pNum)
  pageSize.value = props.pSize

  const data = await getParentList(props.searchCondition, pageNum.value, pageSize.value)

  infoList.value = data.dtoList
  console.log(infoList.value)

  totalPageSize.value = Math.ceil(data.total / props.pSize)

}

onMounted(() => {
  fetchGetParentList()
})

/** 회원 정보 삭제(soft) **/
const deleteInfo =  async (info) => {

  infoList.value = infoList.value.filter(e => e !== info)
  await softDeleteParentInfo(info.id)
  await alert("삭제되었습니다")

}

</script>

<style scoped>

</style>
