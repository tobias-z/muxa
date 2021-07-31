import { createSession, LoaderFunction, Session } from "../../src";

interface TestSession {
  test?: string;
  test2?: string;
  hello?: string;
}

export let { getSession, deleteSession } = createSession<TestSession>({
  name: "SESSIONID",
});

export function withSession(
  next: (session: Session<TestSession>) => ReturnType<LoaderFunction>
) {
  let session = getSession();
  return next(session);
}
