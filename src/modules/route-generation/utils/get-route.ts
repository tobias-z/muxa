import type * as Muxa from "../../../types";
import Directory from "../directory";
import File from "../file";
import { isDirectory } from "./is-directory";

export async function getRoute(fileName: string, routes: Muxa.RoutesToString) {
  // If the fileName does not have an indicator
  // It is a directory
  if (isDirectory(fileName)) {
    let directory = new Directory(fileName, routes);
    return await directory.getDirectory();
  }

  let file = new File(fileName);
  return await file.getRoute();
}

export function handleReturnedRoute(
  routes: Muxa.RoutesToString,
  returned:
    | Muxa.RoutesToString
    | {
        path: string;
        import: string;
        Component: string;
      }
): Muxa.RoutesToString {
  if (Array.isArray(returned)) {
    routes = returned;
  } else {
    routes.push(returned);
  }
  return routes;
}
