function toFloat(event, source, key) {
  if (!event) return (source[key] = 0);

  let value = event.target.value;
  if (typeof value !== 'string') value = '';

  const preValue = value.slice(0, value.length - 1);

  if (value.length === 1 && value[0] === '-') return;

  if (value[value.length - 1] === '.') {
    if (preValue.includes('.')) event.target.value = preValue;
    return;
  }

  value = parseFloat(event.target.value);

  event.target.value = source[key] = isNaN(value) ? null : value;
}

function toInt(event, source, key, minValue = undefined, maxValue = undefined, defaultValue = null) {
  if (!event) return (source[key] = 0);

  let value = parseInt(event.target.value);

  if (minValue !== undefined) value = value < minValue ? minValue : value;
  if (maxValue !== undefined) value = value > maxValue ? maxValue : value;

  event.target.value = source[key] = isNaN(value) ? defaultValue : value;
}

export default () => ({
  toFloat,
  toInt,
});
