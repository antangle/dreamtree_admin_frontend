// Composables
import { createRouter, createWebHistory } from 'vue-router'
import consts from "@/consts/const";

const routes = [
  {
    path: '/',
    name: consts.HOME_PAGE,
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/mypage',
    children: [
      {
        path: '',
        name: 'MyPage',
        component: () => import('@/views/MyPage.vue'),
      },

      /** 마이페이지 공통 **/
      // 출석 현황 조회
      {
        path: 'attendance',
        name: consts.MY_ATTENDANCE_PAGE,
        component: () => import('@/views/attendance/MyAttendancePage.vue')
      },
      {
        // 쪽지
        path: 'mail',
        name: 'MailPage',
        component: () => import('@/views/MailPage.vue')
      },

      /** 대학생 마이페이지 **/
      // 대학생 정보 조회
      {
        path: 'studentInfo/:id',
        name: 'StudentInfoPage',
        component: () => import('@/views/student/StudentInfoPage.vue'),
      },
      {
        path: 'studentInfo/modify/:id',
        name: 'StudentModifyPage',
        component: () => import('@/views/student/StudentModifyPage.vue'),
      },
      {
        // 프로그램 (대학생)
        path: 'program/:id',
        name: 'MyProgramListPage',
        component: () => import('@/views/MyProgramListPage.vue')
      },
      {
        // 레슨 (대학생)
        path: 'lesson/:id',
        name: 'MyLessonListPage',
        component: () => import('@/views/MyLessonListPage.vue')
      },

      /** 학부모 마이페이지 **/
      // 학부모 정보 조회
      {
        path: 'parentInfo/:id',
        name: 'ParentInfoPage',
        component: () => import('@/views/parents/ParentInfoPage.vue'),
      },
      // 수강 중인 레슨 (학부모)
      {
        path: 'progress/:id',
        name: 'ProgressListPage',
        component: () => import('@/views/parents/ProgressListPage.vue'),
      },
      {
        // 프로그램 수정
        path: 'program/modify/:id',
        name: 'ProgramModifyPage',
        component: () => import('@/views/program/ProgramModifyPage.vue')
      },
      /** 관리자 마이페이지 **/
      {
        path: 'admin',
        children: [
          {
            // 전체 회원 리스트
            path: 'members',
            name: 'MemberAdminPage',
            component: () => import('@/views/admin/MemberAdminPage.vue')
          },
          {
            // Admin 학생 정보 상세 조회
            path: 'studentInfo/:id',
            name: 'AdminStudentInfoPage',
            component: () => import('@/views/admin/AdminStudentInfoPage.vue')
          },
          {
            // Admin 학생 정보 수정
            path: 'studentInfo/modify/:id',
            name: 'AdminStudentModifyPage',
            component: () => import('@/views/student/StudentModifyPage')
          },
          {
            // 인증 요청 리스트
            path: 'auth',
            name: 'AuthAdminPage',
            component: () => import('@/views/admin/AuthAdminPage.vue')
          },
          {
            // 대학 인증 요청 조회
            path: 'college',
            name: 'CollegeAuthInfoPage',
            component: () => import('@/views/admin/CollegeAuthInfoPage.vue')
          },
          {
            // 자격/수상 인증 요청 조회
            path: 'certificate',
            name: 'CertificateAuthInfoPage',
            component: () => import('@/views/admin/CertificateAuthInfoPage.vue')
          },
          {
            // 신고 관리
            path: 'report',
            name: 'ReportAdminPage',
            component: () => import('@/views/admin/ReportAdminPage.vue')
          },
          {
            // 프로그램 관리
            path: 'program',
            name: 'ProgramAdminPage',
            component: () => import('@/views/admin/ProgramAdminPage.vue')
          },
          {
            // 레슨 관리
            path: 'lesson',
            name: 'LessonAdminPage',
            component: () => import('@/views/admin/LessonAdminPage.vue')
          },
        ]
      }
    ]
  },

  {
    path: '/request',
    children: [
      {
        path: '',
        name: 'RequestListPage',
        component: () => import('@/views/request/RequestListPage.vue')
      },
      {
        path: ':id',
        name: 'RequestDetailPage',
        component: () => import('@/views/request/RequestDetailPage.vue')
      },
      {
        path: 'form',
        name: 'RequestAddPage',
        component: () => import('@/views/request/RequestAddPage.vue')
      },
      {
        path: 'modify/:id',
        name: 'RequestModifyPage',
        component: () => import('@/views/request/RequestAddPage.vue')
      },

    ]
  },
  {
    path: '/programs',
    children: [{
        path: '',
        name: consts.PROGRAM_LIST_PAGE,
        component: () => import('@/views/program/ProgramListPage.vue')
      },
      {
        path: ':id',
        name: consts.PROGRAM_DETAIL_PAGE,
        component: () => import('@/views/program/ProgramDetailPage.vue')
      },
      {
        path: 'form',
        name: consts.PROGRAM_ADD_PAGE,
        component: () => import('@/views/program/ProgramAddPage.vue')
      },
    ]
  },
  {
    path: '/lesson',
    children: [{
        path: 'form',
        name: consts.LESSON_ADD_PAGE,
        component: () => import('@/views/program/LessonAddPage.vue')
      },
      {
        path: 'apply',
        name: consts.LESSON_APPLY_PAGE,
        component: () => import('@/views/program/LessonApplyPage.vue')
      }
    ]
  },
  {
    path: '/infoModify/:id',
    name: 'InfoModifyPage',
    component: () => import('@/views/InfoModifyPage.vue'),
  },
  {
    path: '/kakaologin',
    name: 'KakaoLoginPage',
    component: () => import('@/views/auth/KakaoLoginPage.vue'),
  },
  {
    path: '/loginPath',
    name: 'LoginPathPage',
    component: () => import('@/views/auth/LoginPathPage.vue'),
  },
  {
    path: '/payment',
    children: [
      {
        path: 'success/:id',
        name: consts.KAKAOPAY_SUCCESS_PAGE,
        component: () => import('@/views/kakaopay/KakaoPaySuccess.vue')
      },
      {
        path: 'fail/:id',
        name: consts.KAKAOPAY_FAIL_PAGE,
        component: () => import('@/views/kakaopay/KakaoPayFail.vue')
      },
      {
        path: 'cancel/:id',
        name: consts.KAKAOPAY_CANCEL_PAGE,
        component: () => import('@/views/kakaopay/KakaoPayCancel.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
