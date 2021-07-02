/**
 * @jest-environment jsdom
 */
import { LoaderFunction, LoadedRoute, useRouteData } from "../src";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { useHistory, Switch } from "react-router-dom";
import { renderWithRouter } from "./test-utils";

type Data = {
  info: string;
};

type Errors = {
  info: string;
};

function ErrorApp() {
  let { data: routeData, errors } = useRouteData<Data, Errors>("/some-error");
  return (
    <>
      {routeData && <p data-testid="hello">{routeData.info}</p>}
      {errors && <p data-testid="error">{errors.info}</p>}
    </>
  );
}

function App() {
  let { data: routeData, errors, runLoader } = useRouteData<Data, Errors>();
  let { push } = useHistory();
  return (
    <>
      <h1>App</h1>
      {routeData && <p>{routeData.info}</p>}
      {errors && <p>{errors.info}</p>}
      <button onClick={() => push("/other-app")}>Push</button>
      <button
        onClick={() => {
          runLoader();
        }}>
        Fetch again
      </button>
    </>
  );
}

function OtherApp() {
  let { data: routeData } = useRouteData<{ info: string }>("/other-app");

  return (
    <>
      <h1>Other app</h1>
      {routeData && <p>{routeData.info}</p>}
    </>
  );
}

let loader: LoaderFunction = async ({ addError }) => {
  addError("info", "This is an error");
  return {
    info: "hello",
  };
};

test("will run loader function when rendered and rerun it when called", async () => {
  await renderWithRouter(
    <LoadedRoute exact path="/" component={App} loader={loader} />
  );
  expect(screen.getByText(/hello/i));
  expect(screen.getByText(/this is an error/i));
  fireEvent.click(screen.getByText(/fetch/i));
  await waitFor(() => expect(screen.getByText(/hello/i)));
});

test("will only run one get function in switch", async () => {
  await renderWithRouter(
    <Switch>
      <LoadedRoute path="/" component={App} exact loader={loader} />
      <LoadedRoute
        path="/other-app"
        component={OtherApp}
        loader={async () => ({
          info: "hello2",
        })}
      />
    </Switch>
  );
  expect(screen.getByText(/hello/i));
  fireEvent.click(screen.getByText(/push/i));
  await waitFor(() => expect(screen.getByText(/hello2/i)));
});

test("will not find data when given incorrect path", async () => {
  await renderWithRouter(
    <LoadedRoute exact path="/" component={ErrorApp} loader={loader} />
  );
  expect(screen.queryByTestId(/hello/i)).toBeNull();
  expect(screen.queryByTestId(/error/i)).toBeNull();
});
