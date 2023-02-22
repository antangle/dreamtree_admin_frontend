import axios from "axios";
import consts from "@/consts/const";

export const postKakaoPayRequest = async (kakaoPayRequestDTO) => {
  try {
    const res = await axios.post(`${consts.DOMAIN}/api/kakaopay/`,kakaoPayRequestDTO)
    return res.data
  } catch (e){
    console.log(e)
    return
  }
}
