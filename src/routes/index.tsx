import { MetaFunction } from "../types";

export async function action({ redirect }: any) {
  console.log("action");
  return redirect("/");
}

export let meta: MetaFunction = () => {
  return {
    title: "index page",
  };
};

export default function IndexPage() {
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
}
