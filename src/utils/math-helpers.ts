
export function getWholeNumberPart(num: number) {
  return Math.floor(num);
}

export function getFractionalPart(num: number) {
  return num - Math.floor(num);
}

export function roundDownToNearestEigth(num: number) {
  return Math.floor(num * 8) / 8;
}
