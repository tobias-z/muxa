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
    for (const fileName of this.currentDir) {
      const splitReplaced = this.replacedFileIdentifier.split("/");
      const hasDirectoryWithTheSameNameAsFile =
        fileName === splitReplaced[splitReplaced.length - 1];
      if (hasDirectoryWithTheSameNameAsFile) {
        // Removes the everything after the last slash
        const startOfDir = this.fileName.substr(
          0,
          this.fileName.lastIndexOf("/")
        );
        const dirName = `${startOfDir}/${fileName}`;
        const directory = new Directory(dirName, routes);
        routes = directory.getDirectory();
      }
    }
    route.routes = routes;
    return route;
  }

  getRoute() {
    const path = getPath(this.fileName);

    if (this.replacedFileIdentifier.startsWith("/")) {
      this.replacedFileIdentifier = this.replacedFileIdentifier.replace(
        "/",
        ""
      );
    }
    const theImport = `./routes/${this.replacedFileIdentifier}`;

    // Remove slashes and replace colon with dolor since it cannot be used as a name
    const uniqueEndOfName = path
      .replace(/\//g, "")
      .replace(/:\s*/g, "$")
      .replace(/-\s*/g, "");

    const route: Muxa.ConfigRouteToString = {
      path,
      import: theImport,
      Component: `Route${uniqueEndOfName}`,
    };

    return this.getChildRoutes(route);
  }
}
