import { IdSet } from './id-set';

describe('IdSet', (): void => {

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
    expect(idSet.maxId).toBe(2);
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

  it('should delete a single id', (): void => {
    const idSet = new IdSet();
    idSet.add(2);
    expect(idSet.has(2)).toBeTruthy();
    expect(idSet.maxId).toBe(2);
    idSet.delete(2);
    expect(idSet.has(2)).toBeFalsy();
    expect(idSet.maxId).toBe(0);
  });
});
