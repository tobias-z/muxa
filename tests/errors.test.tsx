/**
 * @jest-environment jsdom
 */
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { GetterFunction, useRouteData } from "../src";
import { SSRRouter, SSRRoute } from "../src";

let getter: GetterFunction = async () => {
  return Promise.reject("Some error happended");
};

function App() {
  let { getter } = useRouteData();
  return (
    <>
      <p>Is showing</p>
      <button onClick={getter}>Call getter</button>
    </>
  );
}

test("will catch error when thrown by getter", async () => {
  await act(async () => {
    render(
      <SSRRouter fallback={<h1>Loading...</h1>}>
        <SSRRoute path="/" getter={getter} component={App} />
      </SSRRouter>
    );
  });
  // Is not seeing an error screen after initial render
  expect(screen.getByText(/is showing/i));
  fireEvent.click(screen.getByText(/call getter/i));
  await waitFor(() => {
    // Is not seeing an error screen after call of manual getter
    expect(screen.getByText(/is showing/i));
  });
});
