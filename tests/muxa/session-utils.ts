import { createSession, LoaderFunction, Session } from "../../src";

interface TestSession {
  test?: string;
  test2?: string;
  hello?: string;
}

export const COOKIE_NAME = "__secure-test";

export let { getSession, deleteSession } = createSession<TestSession>({
  name: COOKIE_NAME,
  secure: true,
  maxAge: 60,
  expires: new Date(Date.now() + 60),
  sameSite: "Strict",
  domain: "http://localhost:3000",
  path: "/",
});

export function withSession(
  next: (session: Session<TestSession>) => ReturnType<LoaderFunction>
) {
  let session = getSession();
  return next(session);
}
