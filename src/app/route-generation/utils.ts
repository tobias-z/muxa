import Directory from "./directory";
import File from "./file";

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

export function getRoute(fileName: string, theFile: number) {
  // If the fileName does not have an indicator
  // It is a directory
  if (isDirectory(fileName)) {
    let directory = new Directory(fileName, theFile);

    return {
      path: getPath(fileName),
      childRoutes: directory.getDirectory(),
    };
  }

  let file = new File(fileName, theFile);
  return file.appendRouteToFile();
}
