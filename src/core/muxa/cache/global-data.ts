export default class GlobalData<T extends Record<string, any> = any> {
  private readonly data: Map<keyof T, any>;

  constructor() {
    this.data = new Map();
  }

  set(key: keyof T, value: any) {
    this.data.set(key, value);
  }

  get(key: keyof T): T[typeof key] {
    return this.data.get(key);
  }
}
