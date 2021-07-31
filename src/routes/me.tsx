import type { LoaderFunction } from "../";

export let loader: LoaderFunction = async ({ redirect }) => {
  return redirect("/");
};

export default function Me() {
  return (
    <main>
      <h1>Me page</h1>
    </main>
  );
}
