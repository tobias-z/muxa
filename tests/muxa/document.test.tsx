/**
 * @jest-environment jsdom
 */
import { renderWithRouter } from "../test-utils";
import { Document } from "../../src";
import { routes } from "../../src/route-config";
import { screen } from "@testing-library/react";

test("document renders when given a route-config", async () => {
  await renderWithRouter(<Document routes={routes} />);
  expect(screen.getByText(/hello world/i));
});

test("Meta changes the title on the index page", async () => {
  await renderWithRouter(<Document routes={routes} />, {
    container: document.head,
  });
  expect(document.title).toBe("index page");
});
