
<!--이승윤 ver0.1-->
const DOMAIN = "http://localhost:8081"

const consts = {
  PARENT: "parent",
  ADMIN: "admin",
  STUDENT: "student",

  //kakaopay
  PAY_NUMBER: "payNumber",

  //lesson state
  OPEN: 'open',
  INPROGRESS: 'inProgress',
  CLOSE: 'close',

  //progress state
  PENDING: 'pending',
  REQUEST: 'request',
  SUCCESS: 'success',

  // api
  DOMAIN: DOMAIN,
  IMG_DOMAIN: `${DOMAIN}/api/minio`,
  VIDEO_DOMAIN: `${DOMAIN}/api/minio/video`,
  // page names
  HOME_PAGE: "HomePage",
  PROGRAM_LIST_PAGE: "ProgramListPage",
  PROGRAM_DETAIL_PAGE: "ProgramDetailPage",
  LESSON_ADD_PAGE: "LessonAddPage",
  PROGRAM_ADD_PAGE: "ProgramAddPage",
  MY_ATTENDANCE_PAGE: "MyAttendancePage",
  STUDENT_INFO_PAGE: "StudentInfoPage",
  MEMBER_MANAGEMENT_PAGE: "MemberManagementPage",
  LESSON_APPLY_PAGE: "LessonApplyPage",
  KAKAOPAY_SUCCESS_PAGE: "KakaoPaySuccessPage",
  KAKAOPAY_CANCEL_PAGE: "KakaoPayCancelPage",
  KAKAOPAY_FAIL_PAGE: "KakaoPayFailPage",
  MY_LESSON_APPLIED_PAGE: "MyLessonAppliedPage",

  CONTENT_TYPE_VIDEO_MP4: 'video/mp4',
}


export default consts;
