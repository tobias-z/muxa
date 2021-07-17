export function getFileIdentifier(fileName: string) {
  let identifier = ".js";

  /* istanbul ignore next */
  if (fileName.includes(".jsx")) {
    identifier = ".jsx";
    /* istanbul ignore next */
  } else if (fileName.includes(".js")) {
    identifier = ".js";
  } else if (fileName.includes(".tsx")) {
    identifier = ".tsx";
  }

  return identifier;
}

export function getUsersFileIdentifier() {
  let identifier = process.argv[2] === "typescript" ? "ts" : "js";
  return identifier;
}
