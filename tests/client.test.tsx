/**
 * @jest-environment jsdom
 */
import {
  render,
  cleanup,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { useState } from "react";
import { SSRRoute, SSRRouter, SSRSwitch } from "../src";
import { useRouterContext } from "../src/app/ssr-router";
import { useHistory } from "react-router-dom";

function OtherApp() {
  let { routes } = useRouterContext();
  let route = routes.paths.find(path => path.path === "/other-app");
  return (
    <>
      <h1>Other app</h1>
      {route && <p>{route.path}</p>}
    </>
  );
}

function App() {
  let { routes } = useRouterContext();
  const [count, setCount] = useState(321312);
  let { push } = useHistory();

  let reRender = () => setCount(count + 1);
  let changePath = () => push("/other-app");

  return (
    <div>
      <h1>First app</h1>
      <p>{routes.paths.map(path => path.path)}</p>
      <h2>{routes.paths.length}</h2>
      <button onClick={reRender}>ReRender</button>
      <button onClick={changePath}>Push</button>
    </div>
  );
}

afterEach(cleanup);

async function loader() {
  return {
    data: "hello",
  };
}

test("renders on the screen", async () => {
  render(
    <SSRRouter fallback={<div>Loading...</div>}>
      <SSRRoute get={loader} path="/" component={App} />
    </SSRRouter>
  );
  await waitFor(() => expect(screen.getByText("First app")));
});

test("when adding a route the path gets put into the route state", async () => {
  render(
    <SSRRouter fallback={<div>Loading...</div>}>
      <SSRRoute get={loader} path="/" component={App} />
    </SSRRouter>
  );
  await waitFor(() => expect(screen.getByText("1")));
});

test("will not add the same path after rerender", async () => {
  render(
    <SSRRouter fallback={<div>Loading...</div>}>
      <SSRRoute get={loader} exact path="/" component={App} />
      <SSRRoute get={loader} path="/other-app" component={App} />
    </SSRRouter>
  );
  await waitFor(() => {
    let reRender = screen.getByText("ReRender");
    fireEvent.click(reRender);
  });
  expect(screen.getByText("2"));
});

test("will only render one inside a switch", async () => {
  render(
    <SSRRouter fallback={<div>Loading...</div>}>
      <SSRSwitch>
        <SSRRoute get={loader} exact path="/" component={App} />
        <SSRRoute get={loader} path="/other-app" component={OtherApp} />
      </SSRSwitch>
    </SSRRouter>
  );
  await waitFor(() => expect(screen.getByText("2")));
  fireEvent.click(screen.getByText("Push"));
  await waitFor(() => {
    expect(screen.getByText("Other app"));
    expect(screen.getByText("/other-app"));
  });
});
