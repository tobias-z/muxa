import type * as Muxa from "../../../types";
import { getRealPathname } from ".";
import History from "../../cache/history";
import invariant from "../../invariant";

interface RouteParams {
  exact: boolean | undefined;
  route: Muxa.Route;
}

function isParamaterizedAndHasUndefinedParam({ route }: RouteParams): boolean {
  invariant(route.path, "Unknown error: No path was found for route");
  if (route.path.includes(":")) {
    let param = Object.values(route.params)[0];
    if (param === undefined || param === "") {
      return true;
    }
  }
  return false;
}

export function shouldRefetchLoader(
  props: RouteParams,
  history: History
): boolean {
  let { exact, route } = props;
  let willRender = false;
  let realPath = getRealPathname(route.path) as string;

  if (location.pathname === realPath) {
    willRender = true;
  }

  if (location.pathname.includes(realPath) && !exact) {
    willRender = true;
  }

  if (
    history.activePaths.has(route.path) &&
    !isParamaterizedAndHasUndefinedParam(props)
  ) {
    willRender = true;
  }

  if (isParamaterizedAndHasUndefinedParam(props)) {
    willRender = false;
  }

  return willRender;
}
