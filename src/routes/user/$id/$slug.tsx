export function loader() {
  console.log("loader");
  return {
    something: "hello",
  };
}

export function action({ redirect }: any) {
  console.log("action");
  return redirect("/");
}

export default function Slug() {
  return <h1>Hello</h1>;
}
