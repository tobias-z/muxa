export function loader() {
  console.log("loader");
  return {
    something: "hello",
  };
}

export async function action({ redirect }: any) {
  console.log("action");
  return redirect("/");
}
export default function User() {
  return (
    <div>
      <h2>User!</h2>
    </div>
  );
}
