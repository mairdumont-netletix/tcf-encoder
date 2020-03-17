
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

  public constructor(ids?: number[], defaultValue: boolean = false, minId: number = 1, maxId: number = 0) {
    let idsToAdd = ids;
    if (defaultValue) {
      idsToAdd = Array.from(Array(maxId - minId + 1).keys(), i => i + minId);
      if (ids && ids.length) {
        idsToAdd = idsToAdd.filter(id => ids.indexOf(id) === -1);
      }
    }
    if (idsToAdd && idsToAdd.length) {
      idsToAdd.forEach(id => this.add(id));
    }
  }

  public get maxId(): number {
    return this.maxId_;
  }

  public get size(): number {
    return this.set_.size;
  }

  set(value: number | number[], enabled: boolean) {
    if (enabled) {
      this.add(value);
    } else {
      this.delete(value);
    }
  }

  add(value: number | number[]): this {
    if (Array.isArray(value)) {
      return value.reduce((that, v) => that.add(v), this);
    }
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

  delete(value: number | number[]): boolean {
    if (Array.isArray(value)) {
      return value.map(v => this.delete(v)).reduce((p, v) => p || v, false);
    }
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
        // look ahead to check if curValue is the last value in current range
        const nextValue = this.has(i + 1);
        // if there is no next value, we found the end of the range
        if (!nextValue) {
          // add the current number as range end to current range
          range.push(i);
          // push the completed range to the ranges result
          ranges.push(range);
          // clear the range array to be used in the next iteration
          range = [];
        }
        // if range is empty and curValue is high, we found the start of a new range
        else if (range.length === 0) {
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

  toArray(): number[] {
    return Array.from(this);
  }

  clone(): IdSet {
    return new IdSet(this.toArray());
  }
}
