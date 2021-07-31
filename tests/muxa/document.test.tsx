/**
 * @jest-environment jsdom
 */
import { renderWithRouter } from "../test-utils";
import { Document } from "../../src";
import { routes } from "../../src/route-config";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { Link } from "react-router-dom";

test("document renders when given a route-config", async () => {
  await renderWithRouter(<Document routes={routes} />);
  expect(screen.getByText(/index page/i));
});

test("Meta changes the title on the index page", async () => {
  await renderWithRouter(<Document routes={routes} />, {
    container: document.head,
  });
  expect(document.title).toBe("index page");
});

function App() {
  return (
    <div>
      <header>
        <ul>
          {routes.map(route => (
            <li key={Math.random()}>
              <Link to={route.path}>{route.path}</Link>
            </li>
          ))}
        </ul>
        <Link to="/unknownpage">Go unknown</Link>
      </header>
      <Document routes={routes} />
    </div>
  );
}

test("routing works correctly", async () => {
  await renderWithRouter(<App />);
  expect(screen.getByText(/index page/i));

  // On the blog page
  fireEvent.click(screen.getByText("/blog"));
  await waitFor(() => {
    expect(screen.getByText(/the blog/i));
    // From loader
    expect(screen.getByText(/hello from loader/i));
  });

  // Go to a nested route
  fireEvent.click(screen.getByText("NestedBlog"));
  await waitFor(() => {
    expect(screen.getByText(/insane/i));
  });

  // Go even deeper in the nesting
  fireEvent.click(screen.getByText("NestedId"));
  await waitFor(() => {
    expect(screen.getByText(/hello/i));
  });

  // 404 page renders when going to an unknown route
  fireEvent.click(screen.getByText(/go unknown/i));
  await waitFor(() => screen.getByText(/page not found/i));

  // Action will redirect to the index page when submitted
  fireEvent.click(screen.getByText("/login"));
  await waitFor(async () => {
    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      // On the index page after action was called
      expect(screen.getByText(/index page/i));
    });
  });

  // Going to me page without beeing loged in will redirect me
  fireEvent.click(screen.getByText("/me"));
  await waitFor(() => screen.getByText(/index page/i));
});
