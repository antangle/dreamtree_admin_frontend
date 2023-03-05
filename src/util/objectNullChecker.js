<!--이승윤 ver0.1-->

export default function objectNullChecker(obj){
  for(let key in obj){
    if(!obj[key]){
      return key;
    }
  }
}
