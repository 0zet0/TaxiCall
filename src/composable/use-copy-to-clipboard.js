function copyToClipboard(str) {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.opacity = '0';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

function setCopyCoords(event, source, vectorX, vectorY, vectorZ) {
  let text = event?.clipboardData?.getData('text/plain');

  event?.preventDefault();

  if (typeof text !== 'string') return;

  text = text.replaceAll(' ', '');
  const [x, y, z] = text.split(',');

  source[vectorX] = +x || source[vectorX];
  source[vectorY] = +y || source[vectorY];
  source[vectorZ] = +z || source[vectorZ];
}

export { copyToClipboard, setCopyCoords };
