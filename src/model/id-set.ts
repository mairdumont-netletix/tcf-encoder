
/**
 * A Set which keeps track of the uses maximum.
 */
export class IdSet implements Set<number> {

  /**
   * track of the maximum id
   */
  private maxId_: number = 0;

  /**
   * keep a set for faster lookup
   */
  private set_: Set<number> = new Set<number>();

  public constructor(ids?: number[]) {
    if (ids && ids.length) {
      ids.forEach(id => this.add(id));
    }
  }

  public get maxId(): number {
    return this.maxId_;
  }

  public get size(): number {
    return this.set_.size;
  }

  add(value: number): this {
    if (!(Number.isInteger(value) && value > 0)) {
      throw new Error('value must be positive integer');
    }
    this.maxId_ = Math.max(this.maxId_, value);
    this.set_.add(value);
    return this;
  }

  clear(): void {
    this.maxId_ = 0;
    this.set_ = new Set<number>();
  }

  delete(value: number): boolean {
    const result = this.set_.delete(value);
    if (value === this.maxId_) {
      this.maxId_ = 0;
      this.set_.forEach((id: number): void => {
        this.maxId_ = Math.max(this.maxId_, id);
      });
    }
    return result;
  }

  forEach(callbackfn: (value: number, value2: number, set: Set<number>) => void, thisArg?: any): void {
    return this.set_.forEach(callbackfn);
  }

  has(value: number): boolean {
    return this.set_.has(value);
  }

  entries(): IterableIterator<[number, number]> {
    return this.set_.entries();
  }

  keys(): IterableIterator<number> {
    return this.set_.keys();
  }

  values(): IterableIterator<number> {
    return this.set_.values();
  }

  [Symbol.iterator](): IterableIterator<number> {
    return this.set_.values();
  }

  [Symbol.toStringTag]: string;
}
