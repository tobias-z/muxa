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

export default function Something() {
  return (
    <div>
      <h2>SOmethin</h2>
    </div>
  );
}
