import type * as Muxa from "../../types";
import { getFileIdentifier } from "./utils/get-file-identifier";
import { getPath } from "./utils";
import Directory from "./directory";

export default class File {
  private readonly fileName: string;
  private readonly currentDir: Array<string>;
  private replacedFileIdentifier: string;

  constructor(fileName: string, currentDir: Array<string>) {
    this.fileName = fileName;
    this.currentDir = currentDir;
    this.replacedFileIdentifier = fileName.replace(
      getFileIdentifier(fileName),
      ""
    );
  }

  private getChildRoutes(
    route: Muxa.ConfigRouteToString
  ): Muxa.ConfigRouteToString {
    // Check for directory with the same name as file
    let routes: Muxa.RoutesToString = [];
    for (let fileName of this.currentDir) {
      let splitReplaced = this.replacedFileIdentifier.split("/");
      let hasDirectoryWithTheSameNameAsFile =
        fileName === splitReplaced[splitReplaced.length - 1];
      if (hasDirectoryWithTheSameNameAsFile) {
        // Removes the everything after the last slash
        let startOfDir = this.fileName.substr(
          0,
          this.fileName.lastIndexOf("/")
        );
        let dirName = `${startOfDir}/${fileName}`;
        let directory = new Directory(dirName, routes);
        routes = directory.getDirectory();
      }
    }
    route.routes = routes;
    return route;
  }

  getRoute() {
    let path = getPath(this.fileName);

    if (this.replacedFileIdentifier.startsWith("/")) {
      this.replacedFileIdentifier = this.replacedFileIdentifier.replace(
        "/",
        ""
      );
    }
    let theImport = `./routes/${this.replacedFileIdentifier}`;

    // Remove slashes and replace colon with dolor since it cannot be used as a name
    let uniqueEndOfName = path
      .replace(/\//g, "")
      .replace(/:\s*/g, "$")
      .replace(/-\s*/g, "");

    let route: Muxa.ConfigRouteToString = {
      path,
      import: theImport,
      Component: `Route${uniqueEndOfName}`,
    };

    return this.getChildRoutes(route);
  }
}
