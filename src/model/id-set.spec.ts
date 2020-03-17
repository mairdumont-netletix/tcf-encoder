import { IdSet } from './id-set';

describe('IdSet', (): void => {

  it('should set a single id using the set method', (): void => {
    const idSet: IdSet = new IdSet();
    idSet.set(2, true);
    expect(idSet.has(2)).toBeTruthy();
    expect(idSet.maxId).toBe(2);
  });

  it('should set ids array passed into set method', (): void => {
    const ids: number[] = [1, 3, 5, 7, 9, 12, 15];
    const idSet: IdSet = new IdSet();
    idSet.set(ids, true);
    ids.forEach((id: number): void => {
      expect(idSet.has(id)).toBeTruthy();
    });
  });

  it('should set ids array passed into constructor', (): void => {
    const ids = [1, 11, 15, 12];
    const idSet = new IdSet(ids);
    expect(idSet.size).toBe(ids.length);
    ids.forEach((id: number): void => {
      expect(idSet.has(id)).toBeTruthy();
    });
  });

  it('should reset on clear', (): void => {
    const ids = [1, 11, 15, 12];
    const idSet = new IdSet(ids);
    expect(idSet.size).toBe(ids.length);
    expect(idSet.maxId).toBe(15);
    idSet.clear();
    expect(idSet.size).toBe(0);
    expect(idSet.maxId).toBe(0);
  });

  it('should add a single id', (): void => {
    const idSet = new IdSet();
    idSet.add(2);
    expect(idSet.has(2)).toBeTruthy();
    expect(idSet.size).toBe(1);
    expect(idSet.maxId).toBe(2);
  });

  it('should add multiple ids', (): void => {
    const ids = [2, 6, 12];
    const idSet = new IdSet();
    idSet.add(ids);
    ids.forEach((id: number): void => {
      expect(idSet.has(id)).toBeTruthy();
    });
    expect(idSet.size).toBe(ids.length);
    expect(idSet.maxId).toBe(12);
  });

  it('should deduplicate', (): void => {
    const idSet = new IdSet();
    idSet.add(1);
    idSet.add(2);
    idSet.add(2);
    expect(idSet.maxId).toBe(2);
    expect(idSet.size).toBe(2);
  });

  it('should throw an error for non positive integers', (): void => {
    const idSet = new IdSet();
    expect(() => idSet.add(-2)).toThrowError();
    expect(idSet.has(-2)).toBeFalsy();
    expect(idSet.maxId).not.toBe(-2);
  });

  it('should delete a single id (which is not maxId)', (): void => {
    const idSet = new IdSet([1]);
    idSet.add(2);
    expect(idSet.has(2)).toBeTruthy();
    expect(idSet.maxId).toBe(2);
    idSet.delete(1);
    expect(idSet.has(1)).toBeFalsy();
    expect(idSet.maxId).toBe(2);
  });

  it('should delete a single id (which is maxId)', (): void => {
    const idSet = new IdSet([1]);
    idSet.add(2);
    expect(idSet.has(2)).toBeTruthy();
    expect(idSet.maxId).toBe(2);
    idSet.delete(2);
    expect(idSet.has(2)).toBeFalsy();
    expect(idSet.maxId).toBe(1);
  });

  it('should delete multiple ids', (): void => {
    const idSet = new IdSet([1]);
    idSet.add([2, 7, 12]);
    expect(idSet.has(1)).toBeTruthy();
    expect(idSet.has(2)).toBeTruthy();
    expect(idSet.has(7)).toBeTruthy();
    expect(idSet.has(12)).toBeTruthy();
    expect(idSet.maxId).toBe(12);
    idSet.delete([1, 7]);
    expect(idSet.has(1)).toBeFalsy();
    expect(idSet.has(2)).toBeTruthy();
    expect(idSet.has(7)).toBeFalsy();
    expect(idSet.has(12)).toBeTruthy();
    expect(idSet.maxId).toBe(12);
  });

  it('should get entries', (): void => {
    const idSet = new IdSet([12, 3, 7]);
    const iterator = idSet.entries();
    expect(iterator.next().value).toStrictEqual([12, 12]);
    expect(iterator.next().value).toStrictEqual([3, 3]);
    expect(iterator.next().value).toStrictEqual([7, 7]);
  });

  it('should get keys', (): void => {
    const idSet = new IdSet([12, 3, 7]);
    const iterator = idSet.keys();
    expect(iterator.next().value).toBe(12);
    expect(iterator.next().value).toBe(3);
    expect(iterator.next().value).toBe(7);
  });

  it('should get values', (): void => {
    const idSet = new IdSet([12, 3, 7]);
    const iterator = idSet.values();
    expect(iterator.next().value).toBe(12);
    expect(iterator.next().value).toBe(3);
    expect(iterator.next().value).toBe(7);
  });

  it('should iterate', (): void => {
    const idSet = new IdSet([12, 3, 7]);
    for (const id of idSet) {
      expect(idSet.has(id)).toBeTruthy();
    }
  });

  it('should implement forEach', (): void => {
    const idSet = new IdSet([12, 3, 7]);
    idSet.forEach(id => expect(idSet.has(id)).toBeTruthy());
  });

  it('should calculate ranges', (): void => {
    const idSet = new IdSet([1, 7, 3, 6, 2, 8, 101, 102, 103, 104]);
    const ranges = idSet.getRanges();
    expect(ranges).toStrictEqual([[1, 3], [6, 8], [101, 104]]);
  })

  it('should calculate ranges with default value true', (): void => {
    // if default value is true, 2..10 become true and specified ids 3..4 are set to false
    const idSet = new IdSet([3, 4], true, 2, 10);
    const ranges = idSet.getRanges();
    expect(ranges).toStrictEqual([[2], [5, 10]]);
  });

  it('should calculate ranges of a single id with default value true', (): void => {
    // if default value is true, 6..6 become true
    const idSet = new IdSet([], true, 6, 6);
    const ranges = idSet.getRanges();
    expect(ranges).toStrictEqual([[6]]);
  });

  it('should calculate ranges with default value false', (): void => {
    // if default value is false, 2..6 become false and specified ids 3..4 are set to true
    const idSet = new IdSet([3, 4], false, 2, 6);
    const ranges = idSet.getRanges();
    expect(ranges).toStrictEqual([[3, 4]]);
  });

  it('should calculate ranges of a single id with default value false', (): void => {
    // if default value is false, 6..6 become false
    const idSet = new IdSet([], false, 6, 6);
    const ranges = idSet.getRanges();
    expect(ranges).toStrictEqual([]);
  });
});
