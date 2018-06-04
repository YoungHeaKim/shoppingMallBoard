/**
 * 밑에와 같이 넣어 주어야 실행시켜주어야 한다.
 * provideTime('weekend' ,9, 18);
 * provideTime('weekly', 9, 18);
 * 
 * @param {String} Toggle 필수 조건이고 조건은 두개('weekend' or 'weekly')이다.
 * @param {Number} StartTime 필수 조건이고 0보다 크고 24보다 작아야하며 EndTime보다 작은수여야한다.
 * @param {Number} EndTime 필수 조건이고 0보다 크고 24보다 작아야하며 StartTime보다 큰 수여야 한다.
 */
const provideTime = (Toggle, StartTime, EndTime) => {
  const dayOfWeek = new Date().getDay();
  const currentHour = new Date().getHours();
  if (StartTime > 24 || EndTime > 24 || StartTime < 0 || EndTime < 0 || StartTime >= EndTime || typeof StartTime !== 'number' || typeof EndTime !== 'number' || typeof Toggle !== 'string') {
    return false;
  }
  if (Toggle === "weekend") {
    if ((dayOfWeek === 6 && StartTime <= currentHour && currentHour < EndTime) || (dayOfWeek === 0 && StartTime <= currentHour && currentHour < EndTime)) {
      return true;
    }
    return false;
  }
  if(Toggle === "weekly") {
    if ((dayOfWeek === 6 && StartTime > currentHour && (EndTime - 5) <= currentHour) || (dayOfWeek === 0) || (dayOfWeek !== 0 && StartTime > currentHour && EndTime <= currentHour)) {
      return false;
    }
    return true;
  }
  return false;
}
provideTime('weekend' ,9, 18);
provideTime('weekly', 9, 18);