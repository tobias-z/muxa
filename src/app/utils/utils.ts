import type * as Muxa from "../../types";

export function getRealPathname(path: Muxa.Path) {
  if (!path) return path;
  if (path.includes(":")) {
    let tmpPath = path as string;
    let idx = tmpPath.indexOf(":");
    let toReturn = window.location.pathname;
    if (toReturn.length < idx) {
      toReturn = tmpPath;
    }
    return toReturn;
  } else {
    return path;
  }
}

type Params = {
  [K in keyof string]?: string;
};

export function getParams(path: Muxa.Path) {
  let params: Params = {};
  if (typeof path === "string") {
    let splitPath = path.split("/");
    let splitActualPath = location.pathname.split("/");
    for (let i = 0; i < splitActualPath.length; i++) {
      if (splitActualPath[i] !== splitPath[i]) {
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

export function isGoingToRenderRoute(
  path: Muxa.Path,
  exact: boolean | undefined,
  params: Params
): boolean {
  let willRender = false;
  let realPath = getRealPathname(path) as string;

  if (location.pathname === realPath) {
    willRender = true;
  }

  if (location.pathname.includes(realPath) && !exact) {
    willRender = true;
  }

  // Done to fix renders of paramaterized routes when it's not on the page
  if (Object.values(params)[0] === "") {
    willRender = false;
  }

  return willRender;
}
