export const getPropValue = (obj, path?: string) => {
  if (!obj) return undefined;
  if (!path) return obj;
  let key;
  let value = obj;
  let start = 0;
  for (let i = 1; i < path.length; i++) {
      console.log(i, key);
    if (path[i] === '.') {
      key = path.substring(start, i);
      start = i + 1;
    } else if (path[i] === '[') {
      key = path.substring(start, i);
      start = i;
    } else
      if (i === path.length - 1) {
        key = path.substring(start, path.length);
      } else key = undefined;
    if (key) {
      if (key[0] === '[') {
        value = value[parseInt(key.substring(1, key.length - 1))]
      } else {
        value = value[key]
      }
      if (!value) return value;
    }
  }
  return value;
}