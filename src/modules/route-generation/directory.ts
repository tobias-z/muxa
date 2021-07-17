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

  async getDirectory() {
    let pathToDir = join(process.cwd(), `src/routes/${this.dirName}`);

    let directory = readdirSync(pathToDir);

    for (let fileName of directory) {
      let newName = `${this.dirName}/${fileName}`;
      let returned = await getRoute(newName, this.routes);
      handleReturnedRoute(this.routes, returned);
    }
    return this.routes;
  }
}
