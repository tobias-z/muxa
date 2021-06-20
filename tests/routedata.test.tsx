/**
 * @jest-environment jsdom
 */
import { SSRRoute, SSRRouter, SSRSwitch } from "../src";
import { act, cleanup, render, screen } from "@testing-library/react";

function App() {
  return (
    <>
      <h1>App</h1>
    </>
  );
}

function OtherApp() {
  return (
    <>
      <h1>Other app</h1>
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
  screen.debug();
});

test("will only run one get function in switch", async () => {
  await act(async () => {
    render(
      <SSRRouter fallback={<div>Loading...</div>}>
        <SSRSwitch>
          <SSRRoute
            path="/"
            component={App}
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
  screen.debug();
});
