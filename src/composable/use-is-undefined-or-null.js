export const isUndefinedOrNull = (value) => value === undefined || value === null;
export const isEmptyObject = (obj) => {
  if (isUndefinedOrNull(obj) || typeof obj !== 'object') return true;

  return Object.keys(obj).length === 0;
};
