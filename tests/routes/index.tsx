export function loader() {
  console.log("loader");
}

export function action() {
  console.log("action");
}

export default function IndexPage() {
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
}
