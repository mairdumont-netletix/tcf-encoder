
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

  forEach(callback: (value: number, index: number, set: Set<number>) => void, thisArg?: any): void {
    return this.set_.forEach(callback);
  }

  // forEach - to traverse from id=1 to id=maxId in a sequential non-sparse manner
  forEachBit(callback: (value: boolean, id: number) => void): void {
    for (let i = 1; i <= this.maxId; i++) {
      callback(this.has(i), i);
    }
  }

  getRanges(): number[][] {
    const ranges: number[][] = [];
    let range: number[] = [];
    for (let i = 1; i <= this.maxId; i++) {
      const curValue = this.has(i);
      if (curValue) {
        const nextValue = this.has(i + 1);
        if (!nextValue) {
          range.push(i);
          ranges.push(range);
          range = [];
        } else if (range.length === 0) {
          range.push(i);
        }
      }
    }
    return ranges;
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
