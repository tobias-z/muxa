import { act, render } from "@testing-library/react";
import type { ReactElement } from "react";
import { SSRRouter } from "../src";

export async function renderWithRouter(ui: ReactElement) {
  await act(async () => {
    render(<SSRRouter fallback={<h1>Loading...</h1>}>{ui}</SSRRouter>);
  });
}
