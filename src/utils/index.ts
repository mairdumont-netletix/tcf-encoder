
export * from './singleton';

export const isIntegerGreaterThan = (input: any, above: number): boolean => (Number.isInteger(input) && input > above);
