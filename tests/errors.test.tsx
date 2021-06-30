/**
 * @jest-environment jsdom
 */
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { LoaderFunction, useRouteData } from "../src";
import { Router, LoadedRoute } from "../src";
import { renderWithRouter } from "./test-utils";

let loader: LoaderFunction = async () => {
  return Promise.reject("Some error happended");
};

function App() {
  let { runLoader } = useRouteData();
  return (
    <>
      <p>Is showing</p>
      <button onClick={runLoader}>Call loader</button>
    </>
  );
}

test("will catch error when thrown by loader", async () => {
  await renderWithRouter(
    <Router fallback={<h1>Loading...</h1>}>
      <LoadedRoute path="/" loader={loader} component={App} />
    </Router>
  );
  // Is not seeing an error screen after initial render
  expect(screen.getByText(/is showing/i));
  fireEvent.click(screen.getByText(/call loader/i));
  await waitFor(() => {
    // Is not seeing an error screen after call of manual loader
    expect(screen.getByText(/is showing/i));
  });
});
