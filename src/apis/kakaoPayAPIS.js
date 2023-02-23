import axios from "axios";
import consts from "@/consts/const";

export const postKakaoPayReadyRequest = async (kakaoPayRequestDTO) => {
  try {
    const res = await axios.post(`${consts.DOMAIN}/api/payment/ready/`,kakaoPayRequestDTO)
    return res.data
  } catch (e){
    console.log(e)
    return
  }
}

export const postKakaoPayApproveRequest = async (pgToken, orderId) => {
  try {
    const res = await axios.post(`${consts.DOMAIN}/api/payment/approve/`, {
      pgToken: pgToken,
      payId: orderId
    })
    return res.data
  } catch (e){
    console.log(e)
    return
  }
}
