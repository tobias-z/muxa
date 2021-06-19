/**
 * @jest-environment jsdom
 */
import { render, cleanup, screen } from "@testing-library/react";
import SSRRoute from "../src/app/ssr-route";
import { SSRRouter, useRouterContext } from "../src/app/ssr-router";

function App() {
  let { routes } = useRouterContext();
  return (
    <div>
      <h1>This is a test</h1>
      <h2>{routes.paths.length}</h2>
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
