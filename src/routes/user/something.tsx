import { redirect } from "../..";

export function loader() {
  console.log("loader");
  return {
    something: "hello",
  };
}

export async function action() {
  console.log("action");
  return redirect("/");
}

export default function Me() {
  return (
    <div>
      <h2>Me</h2>
    </div>
  );
}
