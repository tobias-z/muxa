/**
 * @jest-environment jsdom
 */
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
import SSRRoute from "../src/app/ssr-route";
import { SSRRouter, useRouterContext } from "../src/app/ssr-router";

function App() {
  let { routes } = useRouterContext();
  const [count, setCount] = useState(321312);

  let reRender = () => setCount(count + 1);

  return (
    <div>
      <h1>This is a test</h1>
      <p>{routes.paths.map(path => path)}</p>
      <h2>{routes.paths.length}</h2>
      <button onClick={reRender}>ReRender</button>
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
  expect(screen.getByText("This is a test"));
});

test("when adding a route the path gets put into the route state", () => {
  render(
    <SSRRouter>
      <SSRRoute path="/" component={App} />
    </SSRRouter>
  );
  expect(screen.getByText("1"));
});

test("Will not add the same path after rerender", () => {
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
