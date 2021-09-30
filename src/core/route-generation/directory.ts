import type * as Muxa from "../../types";
import { join } from "path";
import { readdirSync } from "fs";
import { getRoute, handleReturnedRoute } from "./utils";

export default class Directory {
  private readonly dirName: string;
  private routes: Muxa.RoutesToString;

  constructor(dirName: string, routes: Muxa.RoutesToString) {
    this.dirName = dirName;
    this.routes = routes;
  }

  getDirectory() {
    const pathToDir = join(process.cwd(), `src/routes/${this.dirName}`);

    const directory = readdirSync(pathToDir);

    for (const fileName of directory) {
      const newName = `${this.dirName}/${fileName}`;
      const returned = getRoute(newName, this.routes, directory);
      handleReturnedRoute(this.routes, returned);
    }
    return this.routes;
  }
}
