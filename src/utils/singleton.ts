export type Constructor<T> = new (...args: any[]) => T;

export abstract class Singleton {

  private static instances: Record<string, any> = {};

  public static of<T>(ctor: Constructor<T>): T {
    const name: string = ctor.name;
    if (!Singleton.instances[name]) {
      Singleton.instances[name] = new ctor();
    }
    return Singleton.instances[name];
  }
}
