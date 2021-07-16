import type * as Muxa from "../../types";
import Directory from "./directory.js";
import File from "./file.js";

export let getUsersFileIdentifier = () =>
  process.argv[2] === "typescript" ? "ts" : "js";

export function getFileIdentifier(fileName: string) {
  let identifier = ".js";

  if (fileName.includes(".jsx")) {
    identifier = ".jsx";
  } else if (fileName.includes(".js")) {
    identifier = ".js";
  } else if (fileName.includes(".tsx")) {
    identifier = ".tsx";
  }

  return identifier;
}

export function getPath(fileName: string) {
  let removedFileIdentifier = fileName.replace(getFileIdentifier(fileName), "");

  if (removedFileIdentifier === "index") {
    return "/";
  }

  if (removedFileIdentifier.startsWith("/")) {
    return removedFileIdentifier;
  }

  if (removedFileIdentifier.includes("$")) {
    removedFileIdentifier = removedFileIdentifier.replace(/\$/g, ":");
  }

  return "/" + removedFileIdentifier;
}

export function isDirectory(fileName: string) {
  let isDir = true;
  if (fileName.includes(".jsx")) {
    isDir = false;
  } else if (fileName.includes(".js")) {
    isDir = false;
  } else if (fileName.includes(".tsx")) {
    isDir = false;
  }
  return isDir;
}

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
