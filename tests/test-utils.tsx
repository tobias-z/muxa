import { act, render } from "@testing-library/react";
import type { ReactElement } from "react";
import { Router } from "../src";

export async function renderWithRouter(ui: ReactElement) {
  await act(async () => {
    render(<Router fallback={<h1>Loading...</h1>}>{ui}</Router>);
  });
}
