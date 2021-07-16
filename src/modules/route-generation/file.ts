import { test } from "./generate-all-routes.js";
import { getFileIdentifier, getPath } from "./utils.js";

export default class File {
  private readonly fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  async getRoute() {
    let path = getPath(this.fileName);

    let replacedFileIdentifier = this.fileName.replace(
      getFileIdentifier(this.fileName),
      ""
    );

    let theImport = `./routes/${replacedFileIdentifier}`;

    if (test) {
      theImport = `../src/routes/${replacedFileIdentifier}`;
    }

    // Remove slashes and replace colon with dolor since it cannot be used as a name
    let uniqueEndOfName = path.replace(/\//g, "").replace(/:\s*/g, "$");

    return {
      path,
      import: theImport,
      Component: `Component${uniqueEndOfName}`,
    };
  }
}
