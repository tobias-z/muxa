import type * as Muxa from "../../types";
import { join } from "path";
import { readdirSync, openSync, appendFileSync } from "fs";
import { getRoute, getUsersFileIdentifier, handleReturnedRoute } from "./utils";

export let test = false;

function getFilePath() {
  let identifier = getUsersFileIdentifier();
  let filePath = `${process.cwd()}/src/route-config.${identifier}`;

  if (test) {
    filePath = `${process.cwd()}/tests/route-config.ts`;
  }
  return filePath;
}

function generateExportedRoutes(routes: Muxa.RoutesToString) {
  return routes
    .map(route => {
      return `{
      path: "${route.path}",
      Component: ${route.Component}.default,
      loader: doesFunctionExist(${route.Component}, "loader"),
      action: doesFunctionExist(${route.Component}, "action"),
    },
    `;
    })
    .join("");
}

function isUsedImport(usedImports: Array<string>, theImport: string) {
  return usedImports.find(usedImport => theImport === usedImport);
}

function createRouteConfig(routes: Muxa.RoutesToString) {
  let filePath = getFilePath();
  let file = openSync(filePath, "w");
  let identifier = getUsersFileIdentifier();

  let usedImports: Array<string> = [];

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
      for (let childRoute of route.routes) {
        let isUsed = isUsedImport(usedImports, childRoute.import);
        if (!isUsed) {
          appendImportAndCheckForChildRoute(childRoute);
        }
      }
    }
  }

  for (let route of routes) {
    let isUsed = isUsedImport(usedImports, route.import);
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
  let routesPath = join(process.cwd(), "src/routes");
  return readdirSync(routesPath);
}

export function generateAllRoutes(isTest: boolean) {
  try {
    test = isTest;

    let routesDir = getRootRoutesDirectory();

    let routes: Muxa.RoutesToString = [];

    for (let fileName of routesDir) {
      // Can return an array of routes if it hit a directory
      let returned = getRoute(fileName, routes, routesDir);
      handleReturnedRoute(routes, returned);
    }

    createRouteConfig(routes);
  } catch (error) {
    /* istanbul ignore next */
    console.log(error.message);
  }
}
