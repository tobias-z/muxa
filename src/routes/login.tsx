import { Form } from "../";
import type { ActionFunction } from "../";

export let action: ActionFunction = async ({ redirect }) => {
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
