/**
 * @jest-environment jsdom
 */
import { renderWithRouter } from "../test-utils";
import { Document } from "../../src";
import { routes } from "../route-config";
import { screen } from "@testing-library/react";

test("document renders when given a route-config", async () => {
  await renderWithRouter(<Document routes={routes} />);
  screen.debug();
});
