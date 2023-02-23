<template>
  <v-container>
    <v-row
      v-for="page in pages.filter(e => e.role.includes(userInfo.role))"
      :key="page.title"
    >
      <v-col>
        <v-card
          @click="() => emits('movePage', page.value)"
          flat
        >
          <v-card-item>
            {{page.title}}
          </v-card-item>
        </v-card>
      </v-col>
      <v-divider></v-divider>
    </v-row>
  </v-container>
</template>

<script setup>
import consts from "@/consts/const";
import useMemberInfo from "@/store/useMemberInfo";

const {getMemberInfo} = useMemberInfo()
const userInfo = getMemberInfo()

const emits = defineEmits(['movePage'])
const pages = [
  {title: '프로그램 관리', value: '', role: ['student', 'parent', 'admin']},
  {title: '레슨 관리', value: '', role: ['admin']},
  {title: '회원 관리', value: 'MemberManagementPage', role: ['admin']},
  {title: '카테고리 관리', value: '', role: ['admin']},
  {title: '신고 관리', value: '', role: ['admin']},
  {title: '출석 관리', value: consts.MY_ATTENDANCE_PAGE, role: ['student', 'parent']},
  {title: '회원 정보 조회 및 수정', value: consts.MEMBER_MANAGEMENT_PAGE, role: ['student', 'parent']},
]

</script>

<style scoped>

</style>
