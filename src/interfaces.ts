import { Field, Version } from "./constants";
import { TCModel } from "./model/tc-model";

export interface Decoded<T> {
  numBits: number;
  decoded: T;
  rest?: string;
}

export interface Encoder<T> {
  encode(value: T, numBits?: number): string;
  decode(value: string, target?: T): Decoded<T>;
}

export interface IdMap<T> {
  [id: number]: T;
}

export type ValueResolver<T> = (model: TCModel) => T;

export interface FieldInfo<T> {
  bits?: number;
  encoder: Encoder<T>,
  value: ValueResolver<T>,
}

export type FieldMap = {
  [field in Field]?: FieldInfo<any>;
}

export type VersionMap = {
  [version in Version]: FieldMap;
}
