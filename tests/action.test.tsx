/**
 * @jest-environment jsdom
 */
import { renderWithRouter } from "./test-utils";
import {
  LoadedRoute,
  Form,
  ActionFunction,
  LoaderFunction,
  useRouteData,
} from "../src";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";

let action: ActionFunction<{ name?: string }> = async ({
  body,
  method,
  redirect,
  addError,
  addData,
}) => {
  console.log(`body: ${JSON.stringify(body, null, " ")}, method: ${method}`);
  addError("error", "Error from action");
  addData("action", "Data from action");
  return redirect("/");
};

let loader: LoaderFunction = async () => {
  console.log("running loader");
  return { hello: "hello" };
};

function App() {
  let { errors, data } = useRouteData();
  return (
    <>
      <Form>
        <input name="name" defaultValue="bob" />
        <button type="submit">Submit</button>
      </Form>
      {errors.error && <p>{errors.error}</p>}
      {data.action && <p>{data.action}</p>}
    </>
  );
}

test("action will be called when form is submitted", async () => {
  await renderWithRouter(
    <LoadedRoute path="/" action={action} loader={loader} component={App} />
  );
  let input = screen.getByDisplayValue(/bob/i) as HTMLInputElement;
  expect(input);
  fireEvent.change(input, { target: { value: "bob the builder" } });
  expect(input.value).toBe("bob the builder");
  fireEvent.click(screen.getByText(/submit/i));
  await act(async () => {
    await waitFor(() => {
      expect(screen.getByDisplayValue(/bob/i));
    });
  });
});

test("Data and errors can be added in the action function", async () => {
  await renderWithRouter(
    <LoadedRoute path="/" action={action} loader={loader} component={App} />
  );
  fireEvent.click(screen.getByText(/submit/i));
  await act(async () => {
    await waitFor(() => {
      expect(screen.getByText(/error from action/i));
      expect(screen.getByText(/data from action/i));
    });
  });
});
