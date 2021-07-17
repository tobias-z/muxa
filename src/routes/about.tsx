export async function loader() {
  console.log("loader");
  return {
    something: "hello",
  };
}

export default function AboutPage() {
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
}
