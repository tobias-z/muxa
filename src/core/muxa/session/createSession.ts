import type * as Muxa from "../../../types";
import Session from "./session";
import { sessionExists } from "./utils";

interface CreatedSession<Entries extends Record<string, any>> {
  getSession: () => Session<Entries>;
  deleteSession: () => void;
}

export default function createSession<
  Entries extends Record<string, any> = Record<string, any>
>(options: Muxa.SessionOptions): CreatedSession<Entries> {
  function getSession(): Session<Entries> {
    return new Session<Entries>(options);
  }

  function deleteSession() {
    if (sessionExists(options.name)) {
      document.cookie = `${options.name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    }
  }

  return {
    getSession,
    deleteSession,
  };
}
