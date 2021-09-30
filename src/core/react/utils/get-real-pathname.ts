import type * as Muxa from "../../../types";

export function getRealPathname(path: Muxa.Path) {
  if (!path) return path;
  if (path.includes(":")) {
    const tmpPath = path as string;
    const idx = tmpPath.indexOf(":");
    let toReturn = window.location.pathname;
    if (toReturn.length < idx) {
      toReturn = tmpPath;
    }
    return toReturn;
  } else {
    return path;
  }
}
