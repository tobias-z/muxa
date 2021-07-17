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
  let identifier = getUsersFileIdentifier();
  return routes
    .map(route => {
      if (identifier === "js") {
        return `{
      path: "${route.path}",
      Component: ${route.Component}.default,
      loader: ${route.Component}.loader,
      action: ${route.Component}.action,
    },
    `;
      }
      return `{
      path: "${route.path}",
      Component: ${route.Component}.default,
      // @ts-ignore
      loader: ${route.Component}.loader,
      // @ts-ignore
      action: ${route.Component}.action,
      },
      `;
    })
    .join("");
}

function createRouteConfig(routes: Muxa.RoutesToString) {
  let filePath = getFilePath();
  let file = openSync(filePath, "w");

  for (let route of routes) {
    appendFileSync(
      file,
      `import * as ${route.Component} from "${route.import}";
`
    );
  }
  appendFileSync(
    file,
    `
export const routes = [
  ${generateExportedRoutes(routes)}
]`
  );
}

function getRootRoutesDirectory() {
  let routesPath = join(process.cwd(), "src/routes");
  return readdirSync(routesPath);
}

export async function generateAllRoutes(isTest: boolean) {
  try {
    test = isTest;

    console.log(process.argv);

    let routesDir = getRootRoutesDirectory();

    let routes: Muxa.RoutesToString = [];

    for (let fileName of routesDir) {
      // Can return an array of routes if it hit a directory
      let returned = await getRoute(fileName, routes);
      handleReturnedRoute(routes, returned);
    }

    createRouteConfig(routes);
  } catch (error) {
    /* istanbul ignore next */
    console.log(error.message);
  }
}
