import { join } from "path";
import { readdirSync, openSync, appendFileSync } from "fs";
import { getRoute } from "./utils";

function getRootRoutesDirectory(isTest: boolean) {
  let routesPath = join(process.cwd(), "dist/routes");
  if (isTest) routesPath = join(process.cwd(), "tests/routes");
  return readdirSync(routesPath);
}

export async function generateAllRoutes(isTest: boolean) {
  try {
    let routesDir = getRootRoutesDirectory(isTest);

    let identifier = process.argv[2] === "typescript" ? "ts" : "js";

    let filePath = `${process.cwd()}/src/route-config.${identifier}`;

    if (isTest) {
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

generateAllRoutes(false);
