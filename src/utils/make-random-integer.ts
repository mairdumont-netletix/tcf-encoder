/**
 * Helper function to get random integer between low and high number boundary.
 *
 * @param betweenStart lower boundary
 * @param betweenEnd higher boundary
 */
export const makeRandomInteger = (betweenStart: number, betweenEnd: number): number => {
  return Math.round(Math.random() * (betweenEnd - betweenStart)) + betweenStart;
}
