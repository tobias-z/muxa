import { appendFileSync } from "fs";
import { getFileIdentifier, getPath } from "./utils";

export default class File {
  private readonly fileName: string;
  private readonly theFile: number;

  constructor(fileName: string, theFile: number) {
    this.fileName = fileName;
    this.theFile = theFile;
  }

  appendRouteToFile() {
    let path = getPath(this.fileName);
    let theImport = `./routes/${this.fileName.replace(
      getFileIdentifier(this.fileName),
      ""
    )}`;

    appendFileSync(
      this.theFile,
      `{
      path: "${path}",
      import: "${theImport}"
    },
    `
    );
  }
}
