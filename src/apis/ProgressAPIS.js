import axios from "axios";

export const getProgressList = async (id) => {

  const res = await axios.get(`http://localhost:8081/api/progress/${id}`)

  return res.data

}

export const updatePayStatus = async (reqDTO) => {

  const res = await axios.put(`http://localhost:8081/api/progress/updatePayStatus`, reqDTO)

  return res.data

}
