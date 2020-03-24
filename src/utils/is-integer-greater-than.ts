/**
 * Helper function to check if an input is an integer number which is greater than a reference value.
 *
 * @param input an variable to check
 * @param above reference value to compare to
 */
export const isIntegerGreaterThan = (input: any, above: number): boolean => (Number.isInteger(input) && input > above);
