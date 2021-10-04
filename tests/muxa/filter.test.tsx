/**
 * @jest-environment jsdom
 */
import { Filter, Router } from "../../src";
import { screen, fireEvent, waitFor, render } from "@testing-library/react";
import { Link } from "react-router-dom";
import LoadedRoute from "../../src/core/react/loaded-route";

class AdminFilter extends Filter {
  constructor() {
    super("/admin");
  }
  doFilter(): boolean {
    console.log("running filter");
    return false;
  }
}

class TrueFilter extends Filter {
  // Doens't get run because our path is never /something
  doFilter(): boolean {
    return true;
  }
}

class OtherFilter extends Filter {
  // Doens't get run because our path is never /something
  constructor() {
    super("/something");
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
