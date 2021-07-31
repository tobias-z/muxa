/**
 * @jest-environment jsdom
 */
import { Link } from "react-router-dom";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { Outlet } from "../../src";
import LoadedRoute from "../../src/core/react/loaded-route";
import { renderWithRouter } from "../test-utils";

function Parent() {
  return (
    <>
      <h1>Parent</h1>
      <Link to="/child">
        <p>Go first</p>
      </Link>
      <Link to="/other">
        <p>Go other</p>
      </Link>
      <Outlet />
    </>
  );
}

function Child() {
  return <h2>layout one</h2>;
}

function OtherChild() {
  return <h2>layout two</h2>;
}

test("outlet renders child routes when redirected to them", async () => {
  await renderWithRouter(
    <LoadedRoute
      path="/"
      component={Parent}
      routes={[
        {
          path: "/child",
          exact: true,
          Component: Child,
        },
        {
          path: "/other",
          exact: true,
          Component: OtherChild,
        },
      ]}
    />
  );

  expect(screen.getByText(/parent/i));

  fireEvent.click(screen.getByText(/go first/i));
  // Child component shows up when rendered through the Outlet
  await waitFor(() => expect(screen.getByText(/layout one/i)));

  fireEvent.click(screen.getByText(/go other/i));
  await waitFor(() => expect(screen.getByText(/layout two/i)));
});
