/**
 * alter-date-format에 대한 문제 풀이 과정입니다.
 * 
 * @param {Time} Time에는 "AM 12:27:35"와 같이 문자열로 들어가야 합니다.
 * @param {N} N에는 10과 같이 숫자나 '10'을 넣어주면 됩니다. 
 * 
 * 그리고 함수를 호출할때는 convert24H('Time', N)이런식으로 호출해주시면 됩니다.
 */
const convert24H = (Time, N) => {
  let arr = Time.split(/ |:/);
  let strHours12H = arr[0];
  let getHours = Number(arr[1]);
  let getMinutes = Number(arr[2]);
  let getSeconds = Number(arr[3]);
  
  strHours12H === 'PM' ? (getHours >= 12 ? getHours = "12" : getHours = getHours + 12) : (getHours >= 12 ? getHours = '00' : getHours);  

  const timeToSeconds = (getHours * 3600) + (getMinutes * 60) + getSeconds;

  N !== undefined ? seconds = timeToSeconds + Number(N) : seconds = timeToSeconds;
  
  let timeRule = (x) => {
    return (x < 10) ? "0" + x : x;
  }
  return timeRule(parseInt(seconds / 3600) % 24) + ":" + timeRule(parseInt(seconds / 60 % 60)) + ":" + timeRule(parseInt(seconds % 60));
} 
console.log(convert24H('PM 01:00:00', 10));
console.log(convert24H('PM 11:59:59', 1));
console.log(convert24H('AM 12:10:00', 40));
console.log(convert24H('AM 05:23:03', 102392));
console.log(convert24H('AM 12:00:00', 102392));
console.log(convert24H('PM 12:00:00', 102392));


console.log(parseInt(102392 / 3600) % 24 + ":" +(parseInt(102392 / 60 % 60)) + ":" + parseInt(102392 % 60));
