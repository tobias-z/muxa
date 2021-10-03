/**
 * @jest-environment jsdom
 */
import { Filter, Router } from "../../src";
import { screen, fireEvent, waitFor, render } from "@testing-library/react";
import { Link } from "react-router-dom";
import LoadedRoute from "../../src/core/react/loaded-route";

class AdminFilter implements Filter {
  getFilterPath(): string {
    return "/admin";
  }
  doFilter(): boolean {
    console.log("running filter");
    return false;
  }
}

class TrueFilter implements Filter {
  // Doens't get run because our path is never /something
  getFilterPath(): string {
    return "/";
  }
  doFilter(): boolean {
    return true;
  }
}

class OtherFilter implements Filter {
  // Doens't get run because our path is never /something
  getFilterPath(): string {
    return "/something";
  }
  doFilter(): boolean {
    return true;
  }
}

function HomePage() {
  return (
    <Router filters={[new OtherFilter(), new TrueFilter(), new AdminFilter()]}>
      <Link to="/admin">filter</Link>
      <LoadedRoute path="/admin" component={Admin} />
    </Router>
  );
}

function Admin() {
  return <h1 data-testid="admin">Admin page</h1>;
}

test("cannot go to admin page because of filter", async () => {
  render(<HomePage />);
  fireEvent.click(screen.getByText(/filter/i));
  await waitFor(() => {
    screen.debug();
    expect(screen.queryByTestId("admin")).toBeNull();
  });
});
