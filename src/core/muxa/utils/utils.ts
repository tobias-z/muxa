import type * as Muxa from "../../../types";
import History from "../cache/history";

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

interface RouteParams {
  path: Muxa.Path;
  exact: boolean | undefined;
  params: Muxa.Params;
}

function isParamaterizedAndHasUndefinedParam(route: RouteParams): boolean {
  if (route.path?.includes(":")) {
    let param = Object.values(route.params)[0];
    if (param === undefined || param === "") {
      return true;
    }
  }
  return false;
}

export function shouldRefetchLoader(
  route: RouteParams,
  history: History
): boolean {
  let willRender = false;
  let realPath = getRealPathname(route.path) as string;

  if (location.pathname === realPath) {
    willRender = true;
  }

  if (location.pathname.includes(realPath) && !route.exact) {
    willRender = true;
  }

  if (
    history.activePaths.has(route.path) &&
    !isParamaterizedAndHasUndefinedParam(route)
  ) {
    willRender = true;
  }

  if (isParamaterizedAndHasUndefinedParam(route)) {
    willRender = false;
  }

  return willRender;
}
