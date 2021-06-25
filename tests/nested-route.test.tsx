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
import { SSRRoute, SSRRouter, useRouteData } from "../src";
import type { GetterFunction } from "../src";
import { useHistory } from "react-router-dom";

let parentGetter: GetterFunction = async () => {
  return {
    data: {
      info: "Info from dad",
    },
  };
};

function Parent() {
  let { data } = useRouteData<{ info?: string }>("/");
  let { push } = useHistory();
  return (
    <>
      <h1>Parent</h1>
      {data?.info && <p>{data.info}</p>}
      <button onClick={() => push("/bob")}>Go to child</button>
      <SSRRoute path="/:name" component={Child} getter={childGetter} />
    </>
  );
}

let childGetter: GetterFunction = async () => {
  return {
    data: {
      info: "Info from kid",
    },
  };
};

function Child() {
  let { data } = useRouteData<{ info: string }>();
  return (
    <>
      <h2 data-testid="child">Child</h2>
      {data?.info && <p>{data.info}</p>}
    </>
  );
}

async function renderRoutes(exact: boolean) {
  await act(async () => {
    render(
      <SSRRouter fallback={<h1>Loading...</h1>}>
        <SSRRoute
          path="/"
          component={Parent}
          getter={parentGetter}
          exact={exact}
        />
      </SSRRouter>
    );
  });
}

test("renders only the parent", async () => {
  await renderRoutes(false);
  expect(screen.getByText(/parent/i));
  expect(screen.queryByTestId(/child/i)).toBeNull();
});

test("parent has data from getter", async () => {
  await renderRoutes(false);
  expect(screen.getByText(/info from dad/i));
});

test("child is rendered when path is pushed to it", async () => {
  await renderRoutes(false);
  fireEvent.click(screen.getByText(/go to child/i));
  await waitFor(() => {
    expect(screen.queryByTestId(/child/i));
  });
});

test("parent and child data are present at the same time", async () => {
  await renderRoutes(false);
  fireEvent.click(screen.getByText(/go to child/i));
  await waitFor(() => {
    expect(screen.getByText(/info from dad/i));
    expect(screen.getByText(/info from kid/i));
  });
});
