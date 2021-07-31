import type * as Muxa from "../../types";

export default class Session<
  Entries extends Record<string, unknown> = Record<string, any>
> {
  readonly data: Entries;
  private readonly name: string;

  constructor(options: Muxa.SessionOptions) {
    this.name = options.name;
    this.data = this.initializeSession();
  }

  private initializeSession(): Entries {
    let sessionCookie = document.cookie
      .split(";")
      .find(row => row.trim().startsWith(`${this.name}=`));

    if (!sessionCookie) return {} as Entries;

    return JSON.parse(sessionCookie.split("=")[1]);
  }

  set(key: keyof Entries, value: Entries[typeof key]) {
    this.data[key] = value;
    this.updateSession();
  }

  get(key: keyof Entries) {
    let sessionEntry = this.data[key];
    if (!sessionEntry) return null;
    return sessionEntry;
  }

  delete(key: keyof Entries) {
    delete this.data[key];
    this.updateSession();
  }

  private updateSession() {
    document.cookie = `${this.name}=${JSON.stringify(this.data)}`;
  }
}
