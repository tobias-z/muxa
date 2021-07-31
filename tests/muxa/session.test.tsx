/**
 * @jest-environment jsdom
 */
import LoadedRoute from "../../src/core/muxa/loaded-route";
import { useRouteData } from "../../src";
import type { LoaderFunction } from "../../src";
import { cleanup, screen } from "@testing-library/react";
import { renderWithRouter } from "../test-utils";
import { withSession, deleteSession, getSession } from "./session-utils";

afterEach(cleanup);

let loader: LoaderFunction = async () => {
  return withSession(async session => {
    session.set("test", "this is a test");
    session.set("test2", "second");
    return {
      data: session.data,
      test: session.get("test2"),
    };
  });
};

function App() {
  let session = useRouteData();
  return (
    <div>
      <p>{session.data.data.test}</p>
      <p>{session.data.test}</p>
      <p>{session.data.data.hello}</p>
    </div>
  );
}

test("routeData has values from session after beeing set in the loader", async () => {
  await renderWithRouter(
    <LoadedRoute path="/" component={App} loader={loader} />
  );
  expect(screen.getByText(/this is a test/i));
  expect(screen.getByText(/second/i));
});

let secondLoader: LoaderFunction = async () => {
  return withSession(async session => {
    return {
      data: session.data,
    };
  });
};

test("session loads data from cookie when rendered", async () => {
  let data = {
    hello: "hello there",
  };
  document.cookie = `SESSIONID=${JSON.stringify(data)}`;
  await renderWithRouter(
    <LoadedRoute path="/" component={App} loader={secondLoader} />
  );
  expect(screen.getByText(/hello there/i));
});

function initTest(message: string) {
  let session = getSession();
  session.set("test", message);
  return session;
}

test("session is gone after calling deleteSession", () => {
  let message = "hello there";
  let session = initTest(message);
  expect(session.get("test")).toBe(message);

  deleteSession();
  expect(getSession().get("test")).not.toBe(message);
});

test("delete will remove an entry in the session", () => {
  let message = "hello there";
  let session = initTest(message);

  session.delete("test");

  // within the same session
  expect(session.get("test")).not.toBe(message);
  // within a new session
  expect(getSession().get("test")).not.toBe(message);
});
