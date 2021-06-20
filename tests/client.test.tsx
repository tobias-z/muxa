/**
 * @jest-environment jsdom
 */
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
import { SSRRoute, SSRRouter, SSRSwitch } from "../src";
import { useRouterContext } from "../src/app/ssr-router";
import { useHistory } from "react-router-dom";

function OtherApp() {
  let { routes } = useRouterContext();
  return (
    <>
      <h1>Other app</h1>
      <p>{routes.paths.find(path => path === "/other-app")}</p>
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
      <p>{routes.paths.map(path => path)}</p>
      <h2>{routes.paths.length}</h2>
      <button onClick={reRender}>ReRender</button>
      <button onClick={changePath}>Push</button>
    </div>
  );
}

afterEach(cleanup);

test("renders on the screen", () => {
  render(
    <SSRRouter>
      <SSRRoute path="/" component={App} />
    </SSRRouter>
  );
  expect(screen.getByText("First app"));
});

test("when adding a route the path gets put into the route state", () => {
  render(
    <SSRRouter>
      <SSRRoute path="/" component={App} />
    </SSRRouter>
  );
  expect(screen.getByText("1"));
});

test("will not add the same path after rerender", () => {
  render(
    <SSRRouter>
      <SSRRoute exact path="/" component={App} />
      <SSRRoute path="/other-app" component={App} />
    </SSRRouter>
  );
  let reRender = screen.getByText("ReRender");
  fireEvent.click(reRender);
  expect(screen.getByText("2"));
});

test("will only render one inside a switch", () => {
  render(
    <SSRRouter>
      <SSRSwitch>
        <SSRRoute exact path="/" component={App} />
        <SSRRoute path="/other-app" component={OtherApp} />
      </SSRSwitch>
    </SSRRouter>
  );
  expect(screen.getByText("2"));
  fireEvent.click(screen.getByText("Push"));
  expect(screen.getByText("Other app"));
  expect(screen.getByText("/other-app"));
});
