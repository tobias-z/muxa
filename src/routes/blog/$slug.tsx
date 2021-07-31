import { Link } from "react-router-dom";
import type { LoaderFunction } from "../..";
import { useRouteData, Outlet } from "../..";

export let loader: LoaderFunction<{ slug: string }> = async ({ params }) => {
  return { slug: params.slug };
};

export async function action({ redirect }: any) {
  console.log("action");
  return redirect("/");
}

export default function Blog() {
  let { data } = useRouteData<{ slug: string }>();
  return (
    <div>
      <h1>{data.slug}</h1>
      <Link to={`/blog/${data.slug}/hello`}>NestedId</Link>
      <Outlet />
    </div>
  );
}
