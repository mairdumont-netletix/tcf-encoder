export const makeRandomInteger = (betweenStart: number, betweenEnd: number): number => {
  return Math.round(Math.random() * (betweenEnd - betweenStart)) + betweenStart;
}
