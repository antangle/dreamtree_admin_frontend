<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      expand-on-hover
      rail
    >
      <v-list
        v-if="memberInfo.id"
        density="compact"
        nav
      >
        <v-list-item
          :prepend-avatar="getPersonImageUrl(member.profileImage)"
          :title="member.nickname"
          :subtitle="member.email"
        ></v-list-item>

        <v-list-item
          prepend-icon="fa-solid fa-user"
          title="마이페이지"
          @click="() => movePageWithPathValue('MyPage', role)"
        ></v-list-item>

        <v-list-item
          prepend-icon="fa-solid fa-envelope"
          title="쪽지함"
          @click="() => movePage('MailPage')"
        ></v-list-item>

        <v-list-item
          prepend-icon="fa-solid fa-right-from-bracket"
          title="로그아웃"
          @click="onClickLogout"
        ></v-list-item>

      </v-list>

      <v-list
        v-if="!memberInfo.id"
        density="compact"
        nav
      >
        <v-list-item
          prepend-icon="fa-solid fa-key"
          title="로그인"
          @click="movePage('LoginPathPage')"
        ></v-list-item>

        <v-list-item
          prepend-icon="fa-solid fa-user-plus"
          title="회원가입"
          @click="movePage('LoginPathPage')"
        ></v-list-item>

      </v-list>

    </v-navigation-drawer>
    <v-app-bar
      class="px-3"
      color="white"
      flat
      density="compact"
    >

      <div
        style="margin: 12px"
      >
        <v-icon
          icon="fa-solid fa-bars"
          @click.stop = "drawer = !drawer"
        >
        </v-icon>
      </div>
      <div
        style="margin-left: 5px"
      >
        <v-img
          class="home-button"
          src="public/home_loc_icon.png"
          @click="() => movePage(consts.HOME_PAGE)"
        >
        </v-img>
      </div>

      <v-spacer></v-spacer>

      <v-tabs
        centered
        color="grey-darken-2"
      >

        <v-menu
          v-for="category in categories"
          :key="category.categoryId"
          open-on-hover :close-on-content-click="true"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              variant="plain"
              rounded="0"
              class="align-self-center me-4"
              height="100%"
              v-bind="props"
            >
              {{ category.categoryName }}
            </v-btn>
          </template>

          <v-list class="bg-grey-lighten-3">
            <v-list-item
              v-for="item in category.subCategoryLists"
              :key="item.subCategoryId"
              @click="() => onClickSubCategory(item.subCategoryId)"
            >
              {{ item.subCategoryName }}
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn
          variant="plain"
          rounded="0"
          class="align-self-center me-4"
          height="100%"
          @click="movePage('RequestListPage')"
        >
          요청
        </v-btn>

      </v-tabs>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main class="main">
      <v-container>

        <v-sheet
          class="sheet"
          min-height="70vh"
          rounded="lg"
          style="justify-content: center"
        >

          <slot></slot>

        </v-sheet>
        <AddButtonComponent
          @onClickMoveProgramAddPage="movePage(consts.PROGRAM_ADD_PAGE)"
          @onClickMoveLessonAddPage="movePage(consts.LESSON_ADD_PAGE)"
          @onClickMoveRequestAddPage="movePage('RequestAddPage')"
        >
        </AddButtonComponent>

      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>

import {onBeforeMount, ref} from "vue";
import {useRouter} from "vue-router";
import AddButtonComponent from "@/components/common/AddButtonComponent.vue";
import {getLayoutInfo} from "@/apis/api";
import consts from "@/consts/const";
import useMemberInfo from "@/store/useMemberInfo";
import {getPersonImageUrl} from "@/util/imageUrlGetter";
import {useCookies} from "vue3-cookies";
import objectMapper from "@/util/objectmapper";
import {getStudentInfo} from "@/apis/adminAPIS";

/** 분야 카테고리 **/
const categories = ref([])
const member = ref({
  profileImage: null,
  nickname: null,
  id: null,
  email: null,
  role: null
})
const drawer = ref()
const router = useRouter()
const { cookies } = useCookies()
const memberInfo = ref(useMemberInfo().getMemberInfo())
const role = memberInfo.value.role

console.log("member......", memberInfo)

/** 학생 회원 인증 상태 받아오기 **/
const fetchAuthState = async () => {

  if (memberInfo.value.role === 'students') {
    const studentInfo = await getStudentInfo(memberInfo.value.id)

    cookies.set("studentAuthState", studentInfo.authState)
    console.log(cookies.get("studentAuthState"))
  }

}

/** 카테고리 정보 받아오기 **/
const fetchCategories = async () => {

  const data = await getLayoutInfo();

  categories.value = data.categories

  objectMapper(member.value, memberInfo.value);

}

onBeforeMount(() => {
  fetchCategories()
  fetchAuthState()
})

/** 페이지 이동 **/
const movePage = (page) => {
  router.push({ name: page })
}

/** 회원 유형(대학생/학부모)에 따라 페이지 이동 **/
const movePageWithPathValue = (page, role) => {
  router.push({name: page, query: {path: role} })
}

/** 클릭시 ProgramListPage 이동 **/
const onClickSubCategory = async (subCategoryId) => {
  await router.push({
    name: consts.PROGRAM_LIST_PAGE,
    query: {
      subCategoryId: subCategoryId
    }
  })
}

/** 로그아웃 **/
const onClickLogout = async () => {

  if (window.Kakao.Auth.getAccessToken()) {

    console.log("Before...", window.Kakao.Auth.getAccessToken())

    try {

      await window.Kakao.Auth.logout()
      // 쿠키 삭제 및 store/memberInfo 변경
      console.log("After...", window.Kakao.Auth.getAccessToken())

      cookies.remove("loginId")
      cookies.remove("loginRole")
      cookies.remove("loginEmail")
      cookies.remove('loginNickname')
      cookies.remove('loginProfileImg')
      cookies.remove('loginThumbnailImg')

      useMemberInfo().initMemberInfo()
      memberInfo.value = useMemberInfo().getMemberInfo()
      await router.push({ name: 'HomePage' })

    } catch (error) { console.log(error) }
  } else {

    cookies.remove("loginId")
    cookies.remove("loginRole")
    cookies.remove("loginEmail")
    cookies.remove('loginNickname')
    cookies.remove('loginProfileImg')
    cookies.remove('loginThumbnailImg')

    alert("로그인이 필요합니다!")

  }

}
</script>

<style scoped>

.main {
  background-color: rgb(255, 243, 237);
}

.home-button {
  width: 50px;
  height: 40px;
  position: relative;
  cursor: pointer;
}

</style>
