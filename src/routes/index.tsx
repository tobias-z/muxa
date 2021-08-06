import { MetaFunction } from "../types";
import { redirect } from "../";

export async function action() {
  console.log("action");
  return redirect("/");
}

export let meta: MetaFunction = () => {
  return {
    title: "index page",
    description: "The index page for testing routes",
    expires: new Date(Date.now() + 60),
  };
};

export default function IndexPage() {
  return (
    <div>
      <h1>index page</h1>
    </div>
  );
}
