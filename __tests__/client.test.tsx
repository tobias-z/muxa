/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from "@testing-library/react";
import SSRRoute from "../src/app/ssr-route";

afterEach(cleanup);

test("renders on the screen", () => {
  render(<SSRRoute />);
  expect(screen.getByText("Something"));
});
