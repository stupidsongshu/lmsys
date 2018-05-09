export function isEmptyStr(str) {
  if (str === undefined) str = ''
  return str.toString().trim() === ''
}
