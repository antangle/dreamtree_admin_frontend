/*
* to, from은 nested된 object가 아닌 기본 object여야 한다.
* */
export default function objectMapper(to, from){
  for(let key in from){
    if(Object.keys(to).includes(key)){
      to[key] = from[key]
    }
  }
  return null
}
