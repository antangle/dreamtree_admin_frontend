<!-- 임성현 ver.0.1 -->

<template>

  <default-layout>

    <v-tabs
      v-model="tab"
      bg-color="transparent"
      grow
    >
      <v-tab value="1">받은 쪽지함</v-tab>
      <v-tab value="2">보낸 쪽지함</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="1">
        <FromMailComponent
          @movePageNum="fromMailMovePageNum"
          @moveInfo="moveInfo"
          :pNum="fromMailPNum"
          :pSize="pSize"
          :key="fromMailComponentKey"
        />
      </v-window-item>

      <v-window-item value="2">
        <ToMailComponent
          @movePageNum="toMailMovePageNum"
          @moveInfo="moveInfo"
          :pNum="toMailPNum"
          :pSize="pSize"
          :key="toMailComponentKey"
        />

      </v-window-item>

    </v-window>

    <div class="v-container">
      <AddMailComponent
        @postMail="postMail"
      />
    </div>
  </default-layout>

</template>

<script setup>

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import ToMailComponent from "@/components/student/ToMailComponent.vue";
import FromMailComponent from "@/components/student/FromMailComponent.vue";
import AddMailComponent from "@/components/student/AddMailComponent.vue";
import {getEmailStudent, writeEmail} from "@/apis/StudentAPIS";
import {getEmailParent} from "@/apis/ParentAPIS";

const tab = ref()

const router = useRouter()

const route = useRoute()


const toMailPNum = ref(route.query.toPage || 1)

const pSize = ref(route.query.size || 5)

const fromMailPNum = ref(route.query.fromPage || 1)

const toMailComponentKey = ref(0)

const fromMailComponentKey = ref(0)

const moveInfo = async (email) => {

  const stu = await getEmailStudent(email)

  const par = await getEmailParent(email)

  console.log("stu: ", stu)
  console.log("par: ", par)

  if(stu) moveStudentInfo(stu.studentId)

  if(par) moveParentInfo(par.parentId)

}

const moveStudentInfo = (id) => {

  router.push({name: 'StudentInfoPage', params: {id}})
}

const moveParentInfo = (id) => {

  router.push({name: 'ParentInfoPage', params: {id}})
}

// Dialog창에서 전송 클릭 시
const postMail = async (mail) => {

  await writeEmail(mail)

  // 보낸 메일 화면에 바로 보여짐
  toMailComponentKey.value++
}

// 보낸 메일 페이지 이동
const toMailMovePageNum = (pageNum) => {

  toMailPNum.value = pageNum

  router.push({
    name: "StudentMailPage",
    query: {
      toPage: toMailPNum.value,
      fromPage: fromMailPNum.value,
      size: pSize.value,
      component: 'toMail'
    }
  })
}

// 받은 메일 페이지 이동
const fromMailMovePageNum = (pageNum) => {

  fromMailPNum.value = pageNum

  router.push({
    name: "StudentMailPage",
    query: {
      toPage: toMailPNum.value,
      fromPage: fromMailPNum.value,
      size: pSize.value,
      component: 'fromMail'
    }
  })
}

router.beforeEach((to, from, next) => {

  pSize.value = to.query.size

  toMailPNum.value = to.query.toPage

  fromMailPNum.value = to.query.fromPage


  if (to.query.component == 'toMail') toMailComponentKey.value++

  if (to.query.component == 'fromMail') fromMailComponentKey.value++

  next()
})


</script>

<style scoped>

</style>
