import { Field, Version } from './constants';
import { TCModel } from './model/tc-model';

/**
 * Return type / value-object of a decoding step.
 */
export interface Decoded<T> {
  /**
   * Number of bits which were processed.
   */
  numBits: number;
  /**
   * Decoded value of a processed bit sequence.
   */
  decoded: T;
  /**
   * Optional unproccessed bit sequence, which can be processed by another decoder.
   */
  rest?: string;
}

/**
 * Generic interface of an encoder implementation.
 */
export interface Encoder<T, ENCODING_OPTIONS, DECODING_OPTIONS> {
  /**
   * Encodes a value object to an string.
   *
   * @param value the value to be encoded
   * @param options optional options to configure how to encode the value
   */
  encode(value: T, options?: ENCODING_OPTIONS): string;
  /**
   * Decodes a string into an value object.
   *
   * @param value the string to be decoded
   * @param options optional options to configure how to decode the string
   */
  decode(value: string, options?: DECODING_OPTIONS): Decoded<T>;
}

/**
 * A Map which maps IDs to value objects.
 */
export interface IdMap<T> {
  [id: number]: T;
}

/**
 * A function to resolve an encoder for a specific value type.
 */
export type EncoderResolver<T> = () => Encoder<T, unknown, unknown>;
/**
 * A function to get a field value of the TCModel.
 */
export type ValueGetter<T> = (model: TCModel) => T;
/**
 * A function to set a field value to the TCModel.
 */
export type ValueSetter<T> = (model: TCModel, value: T) => void;

/**
 * Meta data of a field to be encoded in the consent string.
 */
export interface FieldInfo<T> {
  /**
   * The specified number of bits to encode a value.
   * Might be undefined, if the number of bits is evaluated at runtime.
   */
  bits?: number;
  /**
   * Resolves an encoder of a specific value type.
   */
  getEncoder: EncoderResolver<T>,
  /**
   * Gets a field value of the TCModel.
   */
  getValue: ValueGetter<T>,
  /**
   * Set a field value of the TCModel.
   */
  setValue: ValueSetter<T>,
}

/**
 * Stores meta data (FieldInfo) per field.
 */
export type FieldMap = {
  [field in Field]?: FieldInfo<any>;
}

export type VersionMap = {
  [version in Version]: FieldMap;
}
