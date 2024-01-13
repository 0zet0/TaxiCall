function spaced(string) {
  if (!string) return 0;
  return string.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

function doted(string) {
  if (!string) return 0;
  return string.toLocaleString('ru-RU').replace(/\s/g, '.');
}

export { spaced, doted };
