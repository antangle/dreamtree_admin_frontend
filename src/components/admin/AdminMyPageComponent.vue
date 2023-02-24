<template>
  <v-container>
    <v-row
      v-for="page in pages"
      :key="page.title"
    >
      <v-col>
        <v-card
          @click="() => emits('movePage', page.value)"
          flat
        >
          <v-card-item>
            {{ page.title }}
          </v-card-item>
        </v-card>
      </v-col>
      <v-divider></v-divider>
    </v-row>
  </v-container>
</template>

<script setup>

const emits = defineEmits(['movePage'])

const pages = [
  {title: '프로그램 관리', value: 'ProgramAdminPage'},
  {title: '레슨 관리', value: 'LessonAdminPage'},
  {title: '회원 관리', value: 'MemberAdminPage'},
  {title: '인증 요청 관리', value: 'AuthAdminPage'},
  {title: '카테고리 관리', value: ''},
  {title: '신고 관리', value: 'ReportAdminPage'},
]

</script>

<style scoped>

</style>
