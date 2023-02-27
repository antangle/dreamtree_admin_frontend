import axios from "axios";

export const getRequestList = async (keyword, page, size) => {

  if (keyword.condition == 'total') { keyword.condition = 'title,description,nickname,sub_category_name,category_name' }

  if (keyword.condition == 'description') { keyword.condition = 'description' }

  if (keyword.condition == 'nickname') { keyword.condition = 'nickname' }

  if (keyword.condition == 'subCategory') { keyword.condition = 'sub_category_name' }

  if (keyword.condition == 'category') { keyword.condition = 'category_name' }

  const res = await axios.get(`http://localhost:8081/api/request/list`, {
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

export const getRequestDetail = async (id) => {

  const res = await axios.get(`http://localhost:8081/api/request/list/${id}`)

  return res.data

}

export const postRequest = async (data) => {

  const res = await axios.post(`http://localhost:8081/api/request/`, data)

  return res.data

}

export const putRequest = async (data) => {

  const res = await axios.put(`http://localhost:8081/api/request/modify`, data)

  return res.data

}
