export type Constructor<T> = new (...args: any[]) => T;

/**
 * Helper class to hold a single instance per implementaiton class.
 * (singleton pattern)
 */
export abstract class Singleton {

  /**
   * Variable to hold instance per class name.
   */
  private static instances: Record<string, any> = {};

  /**
   * Get instance per class.
   * Creates instance lazy on first request of an instance.
   *
   * @param ctor class to get instance of
   */
  public static of<T>(ctor: Constructor<T>): T {
    const name: string = ctor.name;
    if (!Singleton.instances[name]) {
      Singleton.instances[name] = new ctor();
    }
    return Singleton.instances[name];
  }
}
