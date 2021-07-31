import TheSession from "../core/session/session";

export interface SessionEntry {
  key: string;
  value: string;
}

export interface SessionOptions {
  name: string;
}

export type Session<
  Entries extends Record<string, any> = Record<string, unknown>
> = TheSession<Entries>;
