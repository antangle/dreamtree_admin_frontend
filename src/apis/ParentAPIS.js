import axios from "axios";

export const getParentList = async (keyword, page, size) => {

  if (keyword.condition == 'total') { keyword.condition = 'email,nickname' }

  if (keyword.condition == 'email') { keyword.condition = 'email' }

  if (keyword.condition == 'nickname') { keyword.condition = 'nickname' }

  const res = await axios.get(`http://localhost:8081/api/parent/list`, {
    params: {
      keyword: keyword.keyword,
      condition: keyword.condition,
      order: keyword.order,
      page: page,
      size: size
    }
  })

  return res.data

}

export const getParentInfo = async (id) => {

  const res = await axios.get(`http://localhost:8081/api/parent/${id}`)

  return res.data

}

export const updateParentInfo = async (data) => {

  const res = await axios.put(`http://localhost:8081/api/parent/modify`, data)

  return res.data

}

export const softDeleteParentInfo = async (id) => {

  const res = await axios.delete(`http://localhost:8081/api/parent/delete/${id}`)

  return res.data

}
