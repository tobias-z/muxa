export function loader() {
  console.log("loader");
}

export function action() {
  console.log("action");
}

export default function User() {
  return (
    <div>
      <h2>User!</h2>
    </div>
  );
}
