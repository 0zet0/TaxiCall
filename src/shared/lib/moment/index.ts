import moment from 'moment';

function useMoment(value: string | number, format: string, showStrTime = false) {
  value = +value;
  
  const someDate = moment(+value).format(format);

  if (showStrTime) {
    const _moment = moment(value);
    const diff = _moment.diff(moment.now(), 'days', true);

    diff < -2 ? someDate : diff < -1 ? 'Вчера' : diff < 1 ? 'Сегодня' : diff < 2 ? 'Завтра' : someDate;
  }

  return someDate;
}

export { useMoment }