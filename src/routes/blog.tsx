export async function loader() {
  console.log("loader");
  return {
    something: "hello",
  };
}

export async function action({ redirect }: any) {
  console.log("action");
  return redirect("/");
}

export default function Blog() {
  return (
    <div>
      <h1>Blog</h1>
    </div>
  );
}
