import { Form, redirect } from "../";
import type { ActionFunction } from "../";

export let action: ActionFunction = async () => {
  return redirect("/");
};

export default function Login() {
  return (
    <main>
      <Form>
        <button type="submit">Submit</button>
      </Form>
    </main>
  );
}
