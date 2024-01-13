export function cloneDeep(obj) {
  if (typeof obj !== 'object') return obj;

  const clone = Array.isArray(obj) ? [] : {};

  Object.keys(obj).forEach((key) => (clone[key] = cloneDeep(obj[key])));

  return clone;
}