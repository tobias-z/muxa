/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { GetterFunction, SSRRoute, useRouteData } from "../src";
import { renderWithRouter } from "./test-utils";
import { Switch, useHistory } from "react-router-dom";

let getter: GetterFunction = async () => {
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

function App() {
  let { push } = useHistory();
  let { data } = useRouteData<{ info: string }>();

  return (
    <>
      <p data-testid="first">App</p>
      {data?.info && <p data-testid="first-data">{data.info}</p>}
      <button onClick={() => push("/other-app")}>Push</button>
    </>
  );
}

function OtherApp() {
  let { data } = useRouteData<{ info: string }>();

  return (
    <>
      <p data-testid="otherapp">OtherApp</p>
      {data?.info && <p data-testid="other-data">{data.info}</p>}
    </>
  );
}

test("will throw error if not wrapped with a router", () => {
  expect(() =>
    render(<SSRRoute path="/" component={ErrorApp} getter={getter} />)
  ).toThrow("You must wrap your SSRRoutes inside of a SSRRouter");
});

test("works with switch from react-router-dom", async () => {
  await renderWithRouter(
    <Switch>
      <SSRRoute path="/" exact component={App} getter={getter} />
      <SSRRoute path="/other-app" component={OtherApp} getter={getter} />
    </Switch>
  );
  expect(screen.queryByTestId("first"));
  expect(screen.queryByTestId("otherapp")).toBeNull();

  fireEvent.click(screen.getByText(/push/i));

  //Switch should only be showing the other app now
  await waitFor(() => {
    expect(screen.queryByTestId("first")).toBeNull();
    expect(screen.queryByTestId("otherapp"));
  });
});

test("has data from both rendered routes in switch", async () => {
  await renderWithRouter(
    <Switch>
      <SSRRoute path="/" component={App} getter={getter} />
      <SSRRoute path="/other-app" component={OtherApp} getter={getter} />
    </Switch>
  );
  fireEvent.click(screen.getByText(/push/i));
  await waitFor(() => {
    expect(screen.queryByTestId("first-data"));
    expect(screen.queryByTestId("other-data"));
  });
});
