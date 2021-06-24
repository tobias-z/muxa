/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import { Get, SSRRoute } from "../src";

let getter: Get = async () => {
  return {
    data: {
      info: "hello",
    },
    errors: {
      info: "error",
    },
  };
};
function ErrorApp() {
  return <p>Will not be here</p>;
}

test("will throw error if not wrapped with a router", () => {
  expect(() =>
    render(<SSRRoute path="/" component={ErrorApp} get={getter} />)
  ).toThrow("You must wrap your SSRRoutes inside of a SSRRouter");
});
