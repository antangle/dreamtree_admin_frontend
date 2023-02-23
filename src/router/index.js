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
        component: () => import('@/views/admin/MyPage.vue'),
      },
      {
      path: 'member',
      name: 'MemberAdminPage',
      component: () => import('@/views/admin/MemberAdminPage.vue')
      },
      {
        path: 'parent',
        name: 'ParentMyPage',
        component: () => import('@/views/parents/ParentMyPage.vue'),
      },
      {
        path: 'parentInfo/:id',
        name: 'ParentInfoPage',
        component: () => import('@/views/parents/ParentInfoPage.vue'),
      },
      {
        path: 'progress/:id',
        name: 'ProgressListPage',
        component: () => import('@/views/parents/ProgressListPage.vue'),
      },
      {
        path: 'attendance',
        name: consts.MY_ATTENDANCE_PAGE,
        component: () => import('@/views/attendance/MyAttendencePage.vue'),
      },
    ]
  },
  {
    path: '/mypage/admin',
    children: [
      {
        // (admin) 마이페이지 첫 화면
        path: '',
        name: 'MyPageAdmin',
        component: () => import('@/views/MyPageAdmin.vue'),
      },
      {
        // 전체 학생 리스트
        path: 'member/management',
        name: 'MemberManagementPage',
        component: () => import('@/views/MemberManagementPage.vue')
      },
      {
        // Admin 학생 조회
        path: 'member/student',
        name: 'AdminStudentInfoPage',
        component: () => import('@/views/admin/AdminStudentInfoPage.vue')
      },
      {
        // 인증 요청 리스트
        path: 'auth/management',
        name: 'AuthManagementPage',
        component: () => import('@/views/admin/AuthManagementPage.vue')
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
        name: 'AdminReportManagementPage',
        component: () => import('@/views/admin/AdminReportManagementPage.vue')
      },
      {
        // 프로그램 관리
        path: 'program',
        name: 'AdminProgramManagementPage',
        component: () => import('@/views/admin/AdminProgramManagementPage.vue')
      },
      {
        // 레슨 관리
        path: 'lesson',
        name: 'AdminLessonManagementPage',
        component: () => import('@/views/admin/AdminLessonManagementPage.vue')
      },
    ]
  },
  {
    path: '/mypage/student',
    children: [
      {
        // (학생) my 정보 조회
        path: ':id',
        name: 'StudentInfoPage',
        component: () => import('@/views/student/StudentInfoPage.vue')
      },
      {
        // (학생) my 자격증 조회
        path: 'certificate/:id',
        name: 'CertificateManagementPage',
        component: () => import('@/views/admin/CertificateManagementPage.vue')
      },
      {
        // (학생) 내 정보 수정
        path: '/modify/:id',
        name: 'StudentModifyPage',
        component: () => import('@/views/student/StudentModifyPage.vue')
      },
      {
        // (학생) 쪽지
        path: 'mail',
        name: 'StudentMailPage',
        component: () => import('@/views/student/StudentMailPage.vue')
      },
      {
        // 신고
        path: 'report',
        name: 'StudentReportPage',
        component: () => import('@/views/ReportPage.vue')
      },
      {
        // 프로그램
        path: 'program',
        name: 'MyProgramListPage',
        component: () => import('@/views/MyProgramListPage.vue')
      },
      {
        // 레슨
        path: 'lesson',
        name: 'MyLessonListPage',
        component: () => import('@/views/MyLessonListPage.vue')
      },
    ]
  },
  {
    path: '/test',
    name: 'TestCal',
    component: () => import('@/views/TestCal.vue')
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
        component: () => import('@/views/lesson/LessonAddPage.vue')
      },
    ]
  },
  {
    path: '/infoModify/:id',
    name: 'InfoModifyPage',
    component: () => import('@/views/InfoModifyPage.vue'),
  },
  {
    path: '/kakaologin',
    name: 'InfoModifyPage',
    component: () => import('@/views/KakaoLoginPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
