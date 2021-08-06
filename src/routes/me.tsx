import type { LoaderFunction, MetaFunction } from "../";
import { redirect } from "../";

export let loader: LoaderFunction = async () => {
  return redirect("/");
};

export let meta: MetaFunction = () => {
  return {
    expires: new Date(),
  };
};

export default function Me() {
  return (
    <main>
      <h1>Me page</h1>
    </main>
  );
}
