import type { LoaderFunction } from "../../..";
import { useRouteData } from "../../..";

export let loader: LoaderFunction<{ id: string; slug: string }> = async ({
  params,
}) => {
  return params;
};

export default function Something() {
  let { data } = useRouteData();
  return <h1>{data.id}</h1>;
}
