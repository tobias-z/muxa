import type * as Muxa from "../../../types";

export function getParams(path: Muxa.Path) {
  let params: Muxa.Params = {};
  if (typeof path === "string") {
    let splitPath = path.split("/");
    let splitActualPath = location.pathname.split("/");
    for (let i = 0; i < splitPath.length; i++) {
      if (
        splitActualPath[i] !== splitPath[i] &&
        splitActualPath[i] !== undefined &&
        splitPath[i] !== ""
      ) {
        let key = splitPath[i].replace(":", "");
        params = {
          ...params,
          [key]: splitActualPath[i],
        };
      }
    }
  }
  return params;
}
