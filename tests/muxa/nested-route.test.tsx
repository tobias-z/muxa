/**
 * @jest-environment jsdom
 */
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { LoadedRoute, useRouteData } from "../../src";
import type { LoaderFunction } from "../../src";
import { useHistory } from "react-router-dom";
import { renderWithRouter } from "../test-utils";

let parentLoader: LoaderFunction = async () => {
  return {
    info: "Info from dad",
  };
};

function Parent() {
  let { data } = useRouteData<{ info?: string }>();
  let { push } = useHistory();
  return (
    <>
      <h1>Parent</h1>
      {data?.info && <p>{data.info}</p>}
      <button onClick={() => push("/bob")}>Go to child</button>
      <LoadedRoute path="/:name" component={Child} loader={childLoader} />
    </>
  );
}

let childLoader: LoaderFunction<{ name: string }> = async ({ params }) => {
  return {
    info: "Info from kid",
    name: params.name,
  };
};

function Child() {
  let { data } = useRouteData<{ info: string; name: string }>();
  return (
    <>
      <h2 data-testid="child">Child</h2>
      {data?.info && <p>{data.info}</p>}
      {data?.name && <p>{data.name}</p>}
    </>
  );
}

async function renderRoutes(exact: boolean) {
  await renderWithRouter(
    <LoadedRoute
      path="/"
      component={Parent}
      loader={parentLoader}
      exact={exact}
    />
  );
}

test("renders only the parent", async () => {
  await renderRoutes(false);
  expect(screen.getByText(/parent/i));
  expect(screen.queryByTestId(/child/i)).toBeNull();
});

test("parent has data from loader", async () => {
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
  expect(screen.getByText(/info from dad/i));
  fireEvent.click(screen.getByText(/go to child/i));
  await waitFor(() => {
    expect(screen.getByText(/info from dad/i));
    expect(screen.getByText(/info from kid/i));
  });
});

test("child shows the param comming from loader", async () => {
  await renderRoutes(false);
  fireEvent.click(screen.getByText(/go to child/i));
  await waitFor(() => {
    expect(screen.getByText(/bob/i));
  });
});
