const doFormat = (value, pattern, mask) => {
  const strippedValue = value.replace(/[^0-9]/g, '');

  const chars = strippedValue.split('');

  let count = 0;
  let formatted = '';

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    if (chars[count]) {
      if (/\*/.test(char)) {
        formatted += chars[count];
        count++;
      } else {
        formatted += char;
      }
    } else if (mask) {
      const splittedMask = mask.split('');

      if (splittedMask[i]) {
        formatted += splittedMask[i];
      }
    }
  }

  return formatted;
};

const useMaskFormat = (target, format, mask) => {
  const val = doFormat(target.value, format);
  target.value = doFormat(target.value, format, mask);

  if (target.createTextRange) {
    const range = target.createTextRange();
    range.move('character', val.length);
    range.select();
  } else if (target.selectionStart) {
    target.focus();
    target.setSelectionRange(val.length, val.length);
  }
};

export { useMaskFormat };
