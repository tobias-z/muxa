export default class GlobalData<
  T extends Record<string, any> = any
> extends Map<keyof T, any> {
  constructor() {
    super(new Map());
  }

  get(key: keyof T): T[typeof key] {
    return super.get(key);
  }
}
