import { join } from "path";
import { readdirSync, openSync, appendFileSync } from "fs";
import { getRoute } from "./utils";

export let test = false;

function getRootRoutesDirectory() {
  let routesPath = join(process.cwd(), "dist/routes");
  if (test) routesPath = join(process.cwd(), "tests/routes");
  return readdirSync(routesPath);
}

export function generateAllRoutes(isTest: boolean) {
  test = isTest;

  try {
    let routesDir = getRootRoutesDirectory();

    let identifier = process.argv[2] === "typescript" ? "ts" : "js";

    let filePath = `${process.cwd()}/src/route-config.${identifier}`;

    if (test) {
      filePath = `${process.cwd()}/tests/route-config.ts`;
    }

    let file = openSync(filePath, "w");

    appendFileSync(
      file,
      `export default [
        `
    );

    for (let fileName of routesDir) {
      if (!fileName.includes(".d.ts")) {
        getRoute(fileName, file);
      }
    }

    appendFileSync(file, `]`);
  } catch (error) {
    /* istanbul ignore next */
    console.log(error.message);
  }
}
