export default function objectNullChecker(obj){
  for(let key in obj){
    if(!obj[key]){
      return key;
    }
  }
}
