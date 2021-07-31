import type * as Muxa from "../../../types";
import { getRealPathname } from ".";
import History from "../../cache/history";

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
