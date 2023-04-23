export const cache: string[] = [];
export const trySetCache = (val: string): boolean => {
  if (cache.indexOf(val) === -1) {
    cache.push(val);
    return true;
  }
  return false;
};
