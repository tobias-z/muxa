/**
 * @jest-environment jsdom
 */
import {
  GetterFunction,
  SSRRoute,
  SSRRouter,
  SSRSwitch,
  useRouteData,
} from "../src";
import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { useHistory } from "react-router-dom";

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
  let { data: routeData, errors, getter } = useRouteData<Data, Errors>();
  let { push } = useHistory();
  return (
    <>
      <h1>App</h1>
      {routeData && <p>{routeData.info}</p>}
      {errors && <p>{errors.info}</p>}
      <button onClick={() => push("/other-app")}>Push</button>
      <button
        onClick={() => {
          getter();
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

let loader: GetterFunction = async () => {
  return {
    data: {
      info: "hello",
    },
    errors: {
      info: "This is an error",
    },
  };
};

test("will run get function when rendered and rerun it when called", async () => {
  await act(async () => {
    render(
      <SSRRouter fallback={<div>Loading...</div>}>
        <SSRRoute exact path="/" component={App} getter={loader} />
      </SSRRouter>
    );
  });
  expect(screen.getByText(/hello/i));
  expect(screen.getByText(/this is an error/i));
  fireEvent.click(screen.getByText(/fetch/i));
  await waitFor(() => expect(screen.getByText(/hello/i)));
});

test("will only run one get function in switch", async () => {
  await act(async () => {
    render(
      <SSRRouter fallback={<div>Loading...</div>}>
        <SSRSwitch>
          <SSRRoute path="/" component={App} exact getter={loader} />
          <SSRRoute
            path="/other-app"
            component={OtherApp}
            getter={async () => ({
              data: {
                info: "hello2",
              },
            })}
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

test("will not find data when given incorrect path", async () => {
  await act(async () => {
    render(
      <SSRRouter fallback={<div>Loading...</div>}>
        <SSRRoute exact path="/" component={ErrorApp} getter={loader} />
      </SSRRouter>
    );
  });
  expect(screen.queryByTestId(/hello/i)).toBeNull();
  expect(screen.queryByTestId(/error/i)).toBeNull();
});
