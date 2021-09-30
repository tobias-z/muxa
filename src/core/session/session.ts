import type * as Muxa from "../../types";

export default class Session<
  Entries extends Record<string, unknown> = Record<string, any>
> {
  readonly data: Entries;
  private readonly options: Muxa.SessionOptions;

  constructor(options: Muxa.SessionOptions) {
    this.data = initializeSession(options.name);
    this.options = options;
  }

  set(key: keyof Entries, value: Entries[typeof key]) {
    this.data[key] = value;
    this.commit();
  }

  get(key: keyof Entries) {
    const sessionEntry = this.data[key];
    if (!sessionEntry) return null;
    return sessionEntry;
  }

  delete(key: keyof Entries) {
    delete this.data[key];
    this.commit();
  }

  has(key: keyof Entries) {
    const value = this.data[key];
    return value !== null && value !== undefined;
  }

  private commit() {
    const { name, domain, expires, maxAge, path, sameSite, secure } =
      this.options;
    let cookieString = `${name}=${JSON.stringify(this.data)}`;
    if (domain) cookieString += `; Domain=${domain}`;
    if (expires) cookieString += `; Expires=${expires.toUTCString()}`;
    if (maxAge) cookieString += `; Max-Age=${maxAge}`;
    if (path) cookieString += `; Path=${path}`;
    if (sameSite) cookieString += `; SameSite=${sameSite}`;
    if (secure) cookieString += `; Secure`;
    document.cookie = cookieString;
  }
}

function initializeSession<Entries>(name: string): Entries {
  const sessionCookie = document.cookie
    .split(";")
    .find(row => row.trim().startsWith(`${name}=`));

  if (!sessionCookie) return {} as Entries;

  return JSON.parse(sessionCookie.split("=")[1]);
}
