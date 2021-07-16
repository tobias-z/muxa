/**
 * @jest-environment jsdom
 */
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { useState } from "react";
import { LoadedRoute } from "../../src";
import { useHistory, Switch } from "react-router-dom";
import { renderWithRouter } from "../test-utils";

function OtherApp() {
  return (
    <>
      <h1>Other app</h1>
    </>
  );
}

function App() {
  const [count, setCount] = useState(321312);
  let { push } = useHistory();

  let reRender = () => setCount(count + 1);
  let changePath = () => push("/other-app");

  return (
    <div>
      <h1 data-testid="first app">First app</h1>
      <button onClick={reRender}>ReRender</button>
      <button onClick={changePath}>Push</button>
    </div>
  );
}

async function loader() {
  return { hello: "hello" };
}

test("renders on the screen", async () => {
  await renderWithRouter(
    <LoadedRoute loader={loader} path="/" component={App} />
  );
  await waitFor(() => expect(screen.getByText("First app")));
});

test("will not add the same path after rerender", async () => {
  await renderWithRouter(
    <>
      <LoadedRoute loader={loader} exact path="/" component={App} />
      <LoadedRoute loader={loader} path="/other-app" component={App} />
    </>
  );
  await waitFor(() => {
    let reRender = screen.getByText("ReRender");
    fireEvent.click(reRender);
  });
});

test("will only render one inside a switch", async () => {
  await renderWithRouter(
    <Switch>
      <LoadedRoute loader={loader} exact path="/" component={App} />
      <LoadedRoute loader={loader} path="/other-app" component={OtherApp} />
    </Switch>
  );
  fireEvent.click(screen.getByText("Push"));
  await waitFor(() => {
    expect(screen.getByText("Other app"));
    expect(screen.queryByTestId(/first app/i)).toBe(null);
  });
});
