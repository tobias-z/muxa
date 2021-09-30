import type * as Muxa from "../../types";
import { join } from "path";
import { readdirSync, openSync, appendFileSync } from "fs";
import { getRoute, getUsersFileIdentifier, handleReturnedRoute } from "./utils";

function getFilePath() {
  const identifier = getUsersFileIdentifier();
  const filePath = `${process.cwd()}/src/route-config.${identifier}`;

  return filePath;
}

function generateExportedRoutes(routes: Muxa.RoutesToString) {
  const usedImports: Array<string> = [];

  function getRouteString(route: Muxa.ConfigRouteToString): string {
    usedImports.push(route.import);
    const childRoutes = getChildRoutes(route);
    let isExact = childRoutes === "routes: []";

    if (route.path === "/404") {
      route.path = "*";
      isExact = false;
    }

    return `{
        path: "${route.path}",
        Component: ${route.Component}.default,
        loader: doesFunctionExist(${route.Component}, "loader"),
        action: doesFunctionExist(${route.Component}, "action"),
        meta: doesFunctionExist(${route.Component}, "meta"),
        exact: ${isExact},
        ${childRoutes}
      },
      `;
  }

  function getChildRoutes(route: Muxa.ConfigRouteToString): string {
    if (!route.routes) return "routes: []";
    if (route.routes.length < 1) return "routes: []";
    let toReturn = "routes: [";
    toReturn = toReturn + goThroughAllWithChildRoute(route.routes);
    for (const childRoute of route.routes) {
      if (isUsedImport(usedImports, childRoute.import)) continue;
      toReturn = toReturn + getRouteString(childRoute);
    }
    toReturn = toReturn + "]";
    return toReturn;
  }

  function shouldWaitForChildPath(
    currentRoute: Muxa.ConfigRouteToString,
    allRoutes: Muxa.RoutesToString
  ) {
    let waitForChildPath = false;
    for (const r of allRoutes) {
      const splitChild = r.path.split("/");
      const splitParent = currentRoute.path.split("/");
      const child = splitChild[splitChild.length - 1];
      const parent = splitParent[splitParent.length - 2];
      if (child === parent) {
        if (child) {
          waitForChildPath = true;
        }
      }
    }
    return waitForChildPath;
  }

  let toReturn = "";

  function goThroughAllWithChildRoute(routes: Muxa.RoutesToString) {
    let toReturn = "";
    for (const route of routes) {
      if (route.routes && route.routes.length > 0) {
        const waitForChildPath = shouldWaitForChildPath(route, routes);

        const used = isUsedImport(usedImports, route.import);
        if (!used && !waitForChildPath) {
          toReturn = toReturn + getRouteString(route);
        }
      }
    }
    return toReturn;
  }

  function getSpecificRoutes(routes: Muxa.RoutesToString) {
    let result = "";
    for (const route of routes) {
      if (route.path === "/404") {
        result = getRouteString(route);
      }
    }
    return result;
  }

  toReturn = goThroughAllWithChildRoute(routes);

  for (const route of routes) {
    if (!isUsedImport(usedImports, route.import)) {
      if (route.path === "/404") continue;
      toReturn = toReturn + getRouteString(route);
    }
  }

  toReturn = toReturn + getSpecificRoutes(routes);

  return toReturn;
}

function isUsedImport(usedImports: Array<string>, theImport: string) {
  return usedImports.find(usedImport => theImport === usedImport);
}

function createRouteConfig(routes: Muxa.RoutesToString) {
  const filePath = getFilePath();
  const file = openSync(filePath, "w");
  const identifier = getUsersFileIdentifier();

  const usedImports: Array<string> = [];

  function appendImportAndCheckForChildRoute(route: Muxa.ConfigRouteToString) {
    usedImports.push(route.import);
    appendFileSync(
      file,
      `import * as ${route.Component} from "${route.import}";
`
    );

    checkForChildren(route);
  }

  function checkForChildren(route: Muxa.ConfigRouteToString) {
    if (route.routes) {
      for (const childRoute of route.routes) {
        const isUsed = isUsedImport(usedImports, childRoute.import);
        if (!isUsed) {
          appendImportAndCheckForChildRoute(childRoute);
        }
      }
    }
  }

  for (const route of routes) {
    const isUsed = isUsedImport(usedImports, route.import);
    if (!isUsed) {
      appendImportAndCheckForChildRoute(route);
    }
  }

  appendFileSync(
    file,
    `
function doesFunctionExist(route${identifier === "ts" ? ": any" : ""}, fn${
      identifier === "ts" ? ": any" : ""
    }) {
  if (typeof route[fn] === "function") {
    return route[fn];
  }
  return undefined;
}
  
export const routes = [
  ${generateExportedRoutes(routes)}
]`
  );
}

function getRootRoutesDirectory() {
  const routesPath = join(process.cwd(), "src/routes");
  return readdirSync(routesPath);
}

export function generateAllRoutes() {
  try {
    const routesDir = getRootRoutesDirectory();

    const routes: Muxa.RoutesToString = [];

    for (const fileName of routesDir) {
      // Can return an array of routes if it hit a directory
      const returned = getRoute(fileName, routes, routesDir);
      if (returned) {
        handleReturnedRoute(routes, returned);
      }
    }

    createRouteConfig(routes);
  } catch (_error) {
    const error = _error as Error;
    /* istanbul ignore next */
    console.log(error.message);
  }
}
