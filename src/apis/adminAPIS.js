import axios from "axios";
import consts from "@/consts/const";
import {ca} from "vuetify/locale";


/*** 임성현 ver.0.1 ***/

// 학생 리스트
export const getStudentLists = async (keyword, page, size) => {

  let resultCondition = keyword.condition;

  if(resultCondition == 'total') {

    resultCondition = 'nickname,email,authState'
  }

  try {
    const res = await axios.get(`${consts.DOMAIN}/api/students`, {
      params: {
        keyword: keyword.keyword,
        condition: resultCondition,
        page: page,
        size: size
      }})

    return res.data
  } catch (e) {
    console.log(e)

    return
  }
}

// 대학 인증 요청 리스트
export const getStudentCollegeAuthLists = async (keyword, page, size) => {

  let resultCondition = keyword.condition;

  if(resultCondition == 'total') {

    resultCondition = 'nickname,email,authState'
  }

  try {
    const res = await axios.get(`${consts.DOMAIN}/api/students/college`, {
      params: {
        keyword: keyword.keyword,
        condition: resultCondition,
        page: page,
        size: size
      }})

    return res.data
  } catch (e) {
    console.log(e)

    return
  }
}

// 자격/수상 인증 요청 리스트
export const getStudentCertificateAuthLists = async (keyword, page, size) => {

  let resultCondition = keyword.condition;

  if(resultCondition == 'total') {

    resultCondition = 'nickname,email,authState'
  }

  try {
    const res = await axios.get(`${consts.DOMAIN}/api/students/certificate`, {
      params: {
        keyword: keyword.keyword,
        condition: resultCondition,
        page: page,
        size: size
      }})

    return res.data
  } catch (e) {
    console.log(e)

    return
  }
}

// 학생 정보 조회
export const getStudentInfo = async (id) => {

  try {
    const res = await axios.get(`${consts.DOMAIN}/api/students/${id}`)

    return res.data
  } catch (e) {
    console.log(e)

    return
  }
}

// 대학 정보 조회
export const getCollegeAuthInfo = async (id) => {

  try {
    const res = await axios.get(`${consts.DOMAIN}/api/students/college/${id}`)

    return res.data
  } catch (e) {
    console.log(e)

    return
  }
}

// 자격/수상 정보 조회
export const getCertificateAuthInfo = async (id) => {

  try {
    const res = await axios.get(`${consts.DOMAIN}/api/certificate/details/${id}`)

    return res.data
  } catch (e) {
    console.log(e)

    return
  }
}

// 대학 인증 상태 업데이트
export const modifyCollegeAuthState = async (id, authState) => {

  const result = {id: id, authState: authState}

  try {
    const res = await axios.put(`${consts.DOMAIN}/api/students/state`, result)

    return res.data
  } catch (e) {
    console.log(e)

    return
  }
}

// 자격/수상 인증 상태 업데이트
export const modifyCertificateAuthState = async (id, authState) => {

  const result = {id: id, authState: authState}

  try {
    const res = await axios.put(`${consts.DOMAIN}/api/certificate/state`, result)

    return res.data
  } catch (e) {
    console.log(e)

    return
  }
}

// 학생 정보 수정
export const modifyStudent = async (student) => {

  console.log("put Student", student)
  try {
    const res = await axios.put(`${consts.DOMAIN}/api/students/modify`, student)

    return res.data
  } catch (e) {
    console.log(e)

    return
  }
}

// 학생 삭제
export const removeStudent = async (id) => {

  try {
    const res = await axios.put(`${consts.DOMAIN}/api/students/remove/${id}`)

    return res.data

  } catch (e) {

    return
  }
}

export const getCertificateList = async (id) => {

  try {
    const res = await axios.get(`${consts.DOMAIN}/api/certificate/${id}`)

    return res.data
  } catch (e) {

    return
  }
}

// 자격증 추가
export const addCertificate = async (certificate) => {

console.log(certificate)

  try {
    const res = await axios.post(`${consts.DOMAIN}/api/certificate/form`, certificate)

    return res.data
  } catch (e) {
    console.log(e)
    return
  }
}

export const getAuthCount = async () => {

  try {
    const res = await axios.get(`${consts.DOMAIN}/api/students/authCount`)

    return res.data
  } catch (e) {

    return
  }
}

// 관리지 신고 조회
export const adminGetReport = async (result) => {

  try {
    const res = await axios.get(`${consts.DOMAIN}/api/report/list`, {
      params: {
        ...result
      }
    })

    return res.data
  } catch (e) {

    return
  }
}

// 신고 상태 업데이트
export const updateReportStatus = async (id) => {

  const result = {reportId: id, status: 'solved'}

  console.log(result)

  try {
    const res = await axios.put(`${consts.DOMAIN}/api/report/update/`, result)

    return res
  } catch (e) {

    return
  }
}

// 프로그램 리스트
export const getAdminProgramList = async (result) => {

  try {
    const res = await axios.get(`${consts.DOMAIN}/api/program/adminProgram/`, {
      params: {
        ...result
      }
    })

    return res.data
  } catch (e) {

    return
  }
}

// 레슨 리스트
export const getAdminLessonList = async (result) => {

  try {
    const res = await axios.get(`${consts.DOMAIN}/api/program/adminLesson/`, {
      params: {
        ...result
      }
    })

    return res.data
  } catch (e) {

    return
  }
}

// 프로그램 삭제
export const removeProgram = async (id) => {

  try {
    const res = await axios.put(`${consts.DOMAIN}/api/program/removeProgram/${id}`)

    return res.data
  } catch (e) {

    return
  }
}

// 레슨 삭제
export const removeLesson = async (id) => {

  try {
    const res = await axios.put(`${consts.DOMAIN}/api/program/removeLesson/${id}`)

    res.data
  } catch (e) {

    return
  }
}

// 레슨 마감
export const closeLessonStatus = async (id) => {

  try {
    const res = await axios.put(`${consts.DOMAIN}/api/program/closeLesson`, {
      id: id
    })
    return res.data
  } catch (e) {
    console.log(e)
    return
  }
}

// 프로그램 수정

export const modifyProgram = async (program) => {

  try {
    const res = await axios.put(`${consts.DOMAIN}/api/program/modiftProgram/`, program)

    return res.data
  } catch (e) {

    return
  }
}
