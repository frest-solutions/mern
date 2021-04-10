export const getStatus = (date) => {
  const dateNow = new Date(new Date(date).getTime())
  const clientTime1 = new Date(Date.now() - 60000) //one minute

  if (dateNow >= clientTime1) {
    return 'Онлайн'
  } else {
    return `Был в сети в ${dateNow.getHours()}:${dateNow.getMinutes() < 10
      ? '0' + dateNow.getMinutes()
      : dateNow.getMinutes()}`
  }
}

export const getCreatedTime = (milliseconds) => {
  let date = new Date(milliseconds);
  let y = date.getFullYear()
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours()
  let min = date.getMinutes()
  m = (m < 10) ? '0' + m : m;
  d = (d < 10) ? '0' + d : d;
  min = (min < 10) ? '0' + min : min

  const dateNow = new Date(Date.now())

  if ((dateNow - date) < 8.64e+7) {
    return h + ':' + min
  }
  return y + '/' + m + '/' + d + ' ' + h + ':' + min;
}

export const getPaidTime = (date) => {
  if (!date) {
    return
  }
  const paidUntil = new Date(new Date(date).getTime())
  const timeNow = new Date(Date.now())
  const timeLeft = paidUntil - timeNow

  if (timeLeft <= 0) {
    return {
      isPaid: false,
      paidUntil: 'Ваш пакет был активирован до: '
        + paidUntil.getFullYear()
        + '/' + (paidUntil.getMonth() + 1)
        + '/' + paidUntil.getDate()
        + ' ' + paidUntil.getHours()
        + ':' + (paidUntil.getMinutes() < 10
          ? '0' + paidUntil.getMinutes()
          : paidUntil.getMinutes())
    }
  }

  return {
    isPaid: true,
    timeLeft: 'Осталось: ' + parseMillisecondsIntoReadableTime(timeLeft),
    paidUntil: 'Ваш пакет активирован до: '
      + paidUntil.getFullYear()
      + '/' + (paidUntil.getMonth() + 1)
      + '/' + paidUntil.getDate()
      + ' ' + paidUntil.getHours()
      + ':' + (paidUntil.getMinutes() < 10
        ? '0' + paidUntil.getMinutes()
        : paidUntil.getMinutes())
  }
}

function parseMillisecondsIntoReadableTime(milliseconds) {
  //Get hours from milliseconds
  const hours = milliseconds / (1000 * 60 * 60);
  const absoluteHours = Math.floor(hours);
  const h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

  //Get remainder from hours and convert to minutes
  const minutes = (hours - absoluteHours) * 60;
  const absoluteMinutes = Math.floor(minutes);
  const m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;

  //Get remainder from minutes and convert to seconds
  const seconds = (minutes - absoluteMinutes) * 60;
  const absoluteSeconds = Math.floor(seconds);
  const s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;


  return h + ':' + m + ':' + s;
}
