/**
 * @jest-environment jsdom
 */
import { render, cleanup, screen } from "@testing-library/react";
import SSRRoute from "../src/app/ssr-route";
import { SSRRouter } from "../src/app/ssr-router";

function App() {
  return (
    <div>
      <h1>This is a test</h1>
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
