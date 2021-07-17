// Find a way to test .jsx and .js files
// without it being mad when the route-config tries to import them
export function isDirectory(fileName: string) {
  let isDir = true;
  /* istanbul ignore next */
  if (fileName.includes(".jsx")) {
    isDir = false;
    /* istanbul ignore next */
  } else if (fileName.includes(".js")) {
    isDir = false;
  } else if (fileName.includes(".tsx")) {
    isDir = false;
  }
  return isDir;
}
