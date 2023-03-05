<!--이승윤 ver0.1-->
//list 받아서 bit로 치환
/*
* 월:0
* 화:1
* 수:2
* 목:3
* 금:4
* 토:5
* 일:6
* */

export function dayToBitParser(day){
  let bit = 0
  day.map(item => {
    bit += 2**item
  })
  return bit
}

//bit 받아서 list로 치환
export function bitToDayParser(bit){
  const dayList = ['월', '화', '수', '목', '금', '토', '일']
  const res = []

  let count = 0

  while(bit > 0){
    if(bit % 2 == 1){
      res.push(dayList[count])
    }

    bit = parseInt(bit / 2)
    count += 1
  }

  return res
}

export function bitToDayParserInNumber(bit){
  const res = []

  let count = 0

  while(bit > 0){
    if(bit % 2 == 1){
      res.push(count)
    }

    bit = parseInt(bit / 2)
    count += 1
  }

  return res
}

/*회차구하기*/
export function getTurn(lesson){
  const now = new Date()
  const startDate = new Date(lesson.startDate)
  const endDate = new Date(lesson.endDate)
  const day = bitToDayParserInNumber(lesson.day)
  const times = lesson.times


  /*만약 끝난 강의라면 마지막 회차 반환*/
  if(now > endDate){
    return times
  }

  /*날짜 차이 계산*/
  const dateDiffMs = now.getTime() - startDate.getTime() ;
  const dateDiff = dateDiffMs / (1000*60*60*24) ;

  /*현재 날짜 기준으로 몇회차 진행했는지 계산 */
  const quotient = parseInt(dateDiff / 7)

  let curTimes = quotient * day.length

  for(let i=startDate.getDay();i!=now.getDay(); i = (i + 1) % 7){
    /*getDay()는 일요일이 0, vue에선 월요일이 0*/
    if(day.includes((i+6)%7)) curTimes++
  }

  /*today가 수업날 + 수업시간 이후일 경우 회차 +1*/
  if(day.includes((now.getDay()+6)%7) && now.getHours() >= lesson.lessonTime){
    curTimes++
  }

  return curTimes
}
