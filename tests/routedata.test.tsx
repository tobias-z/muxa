/**
 * @jest-environment jsdom
 */
import { SSRRoute, SSRRouter, SSRSwitch, useRouteData } from "../src";
import {
  act,
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { useHistory } from "react-router-dom";

function App() {
  let [routeData] = useRouteData<{ info: string }>("/");
  let { push } = useHistory();
  return (
    <>
      <h1>App</h1>
      {routeData && <p>{routeData.info}</p>}
      <button onClick={() => push("/other-app")}>Push</button>
    </>
  );
}

function OtherApp() {
  let [routeData] = useRouteData<{ info: string }>("/other-app");
  return (
    <>
      <h1>Other app</h1>
      {routeData && <p>{routeData.info}</p>}
    </>
  );
}

afterEach(cleanup);

test("will run get function when rendered", async () => {
  await act(async () => {
    render(
      <SSRRouter fallback={<div>Loading...</div>}>
        <SSRRoute
          exact
          path="/"
          component={App}
          get={async () => ({ info: "hello" })}
        />
      </SSRRouter>
    );
  });
  expect(screen.getByText(/hello/i));
});

test("will only run one get function in switch", async () => {
  await act(async () => {
    render(
      <SSRRouter fallback={<div>Loading...</div>}>
        <SSRSwitch>
          <SSRRoute
            path="/"
            component={App}
            exact
            get={async () => ({ info: "hello" })}
          />
          <SSRRoute
            path="/other-app"
            component={OtherApp}
            get={async () => ({ info: "hello2" })}
          />
        </SSRSwitch>
      </SSRRouter>
    );
  });
  expect(screen.getByText(/hello/i));
  screen.getByText(/hello/i);
  fireEvent.click(screen.getByText(/push/i));
  await waitFor(() => expect(screen.getByText(/hello2/i)));
});
