/**
 * @jest-environment jsdom
 */
import { SSRRoute, SSRRouter } from "../src";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  cleanup,
  act,
} from "@testing-library/react";
import { useHistory } from "react-router-dom";
import { useRouteData } from "../src";

async function loader() {
  return {
    info: "hello there",
  };
}

function Parent() {
  let { push } = useHistory();
  return (
    <>
      <h1>Parent</h1>
      <button onClick={() => push("/something")}>Push</button>
      <SSRRoute path="/:name" component={Child} get={loader} />
    </>
  );
}

function Child() {
  let [routeData] = useRouteData<{ info: string }>();
  return (
    <>
      <h1 data-testid="child">Child</h1>
      {routeData && <p>{routeData.info}</p>}
    </>
  );
}

afterEach(cleanup);

test("renders only parent route when child routes doesn't match", async () => {
  await act(async () => {
    render(
      <SSRRouter fallback={<div>loading...</div>}>
        <SSRRoute path="/">
          <Parent />
        </SSRRoute>
      </SSRRouter>
    );
  });
  expect(screen.getByText(/parent/i));
});

test("renders child route when path changes to it", async () => {
  await act(async () => {
    render(
      <SSRRouter fallback={<div>loading...</div>}>
        <SSRRoute path="/" component={Parent} />
      </SSRRouter>
    );
    expect(screen.getByText(/parent/i));
    fireEvent.click(screen.getByText(/push/i));
    await waitFor(() => expect(screen.getByText(/child/i)));
  });
});

test("renders child route with data from getter", async () => {
  await act(async () => {
    render(
      <SSRRouter fallback={<div>loading...</div>}>
        <SSRRoute path="/" component={Parent} />
      </SSRRouter>
    );
    expect(screen.getByText(/parent/i));
    fireEvent.click(screen.getByText(/push/i));
    await waitFor(() => {
      expect(screen.getByText(/child/i));
      expect(screen.getByText(/hello there/i));
    });
  });
});
