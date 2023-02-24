import axios from "axios";
import consts from "@/consts/const";
import {searchOptionMapper} from "@/consts/searchOptionMapper";

export const getLayoutInfo = async (id, role) => {
  try{
    const res = await axios.get(`${consts.DOMAIN}/api/category/layout`, {
      params: {
        id: id ? id : 0,
        role: role ? role : "none"
      }
    })

    return res.data
  } catch (e){
    console.log(e)
    return
  }
}

export const getProgramLists = async (searchOptions, pageInfo) => {
  try{
    const params = {
      ...searchOptions,
      page: pageInfo.pageNum,
      size: pageInfo.pageSize
    }
    params.condition = searchOptionMapper[searchOptions.condition]

    console.log(params)
    const res = await axios.get(`${consts.DOMAIN}/api/program/`, {
      params: params
    })

    return res.data
  } catch (e){
    console.log(e)
    return
  }
}

export const getStudentProgramLists = async (studentId) => {
  try{
    const params = {
      studentId: studentId
    }
    const res = await axios.get(`${consts.DOMAIN}/api/program/student`, {
      params: params
    })

    return res.data
  } catch (e){
    console.log(e)
    return
  }
}

export const getWordCloudInfo = async () => {
  try {
    const res = await axios.get(`${consts.DOMAIN}/api/program/wordcloud/`)

    return res.data
  } catch (e){
    console.log(e)
    return
  }
}

export const getProgramDetailInfo = async (programId) => {
  try{
    const res = await axios.get(`${consts.DOMAIN}/api/program/details/${programId}`)

    return res.data
  } catch (e){
    console.log(e)
    return
  }
}

export const postProgramForm = async (programFormDTO) => {
  try {
    console.log(programFormDTO)
    const res = await axios.post(`${consts.DOMAIN}/api/program/form/`, programFormDTO)
    return res.data
  } catch (e){
    console.log(e)
    return
  }
}

export const postLessonForm = async (lessonFormDTO) => {
  try {
    const res = await axios.post(`${consts.DOMAIN}/api/lesson/form/`, lessonFormDTO)
    return res.data
  } catch (e){
    console.log(e)
    return
  }
}

export const postUpload = async (formData) => {
  try {
    console.log(formData)
    const res = await axios.post(`${consts.DOMAIN}/api/minio/upload`, formData)
    return res.data
  } catch (e){
    console.log(e)
    return
  }
}

export const deleteMinioImage = async (fileNameList) => {
  try {
    const res = await axios.delete(`${consts.DOMAIN}/api/minio`, {
      data: fileNameList
    })
    return res.data
  } catch (e){
    console.log(e)
    return
  }
}
export const getLessonApplyInfo = async (lessonId) => {
  try {
    const res = await axios.get(`${consts.DOMAIN}/api/lesson/apply`, {
      params: {
        lessonId: lessonId
      }
    })
    return res.data
  } catch (e){
    console.log(e)
    return
  }
}

/*
*   const addMail = {
    toEmail: studentEmail.value,
    fromEmail: memberInfo.email,
    title: requestForm.value.title,
    content: makeContent(requestForm.value)
  }

  const progressDTO = {
    childName: requestForm.value.childName,
    parent_id: requestForm.value.parent_id,
    lesson_id: route.query.lesson_id
  }
*/
export const postLessonApply = async (addMail, progressDTO) => {
  try {
    const dto = {
      mail: addMail,
      progress: progressDTO
    }

    const res = await axios.post(`${consts.DOMAIN}/api/lesson/apply`, dto)
    return res.data
  } catch (e){
    console.log(e)
    return
  }
}

