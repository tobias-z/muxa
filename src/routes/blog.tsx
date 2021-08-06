import { Link } from "react-router-dom";
import { useRouteData, Outlet, redirect } from "../";

export async function loader() {
  return {
    something: "hello from loader",
  };
}

export async function action() {
  return redirect("/");
}

export default function Blog() {
  let route = useRouteData();
  return (
    <div>
      <h1>The blog</h1>
      <p>{route.data.something}</p>
      <Link to="/blog/insane">NestedBlog</Link>
      <Outlet />
    </div>
  );
}
