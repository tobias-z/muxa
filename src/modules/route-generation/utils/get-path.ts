import { getFileIdentifier } from "./get-file-identifier";

export function getPath(fileName: string) {
  let removedFileIdentifier = fileName.replace(getFileIdentifier(fileName), "");

  if (removedFileIdentifier === "index") {
    return "/";
  }

  if (removedFileIdentifier.includes("$")) {
    removedFileIdentifier = removedFileIdentifier.replace(/\$/g, ":");
  }

  return "/" + removedFileIdentifier;
}
