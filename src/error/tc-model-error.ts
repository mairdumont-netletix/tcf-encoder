export class TCModelError extends Error {

  public constructor(property: string, value: any) {
    super(`invalid value ${value} passed for ${property}`);
    this.name = 'TCModelError';
  }
}
