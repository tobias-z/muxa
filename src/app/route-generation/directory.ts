import { join } from "path";
import { readdirSync } from "fs";
import File from "./file";
import { isDirectory } from "./utils";
import { test } from "./generate-all-routes";

export default class Directory {
  private readonly dirName: string;
  private readonly theFile: number;

  constructor(dirName: string, theFile: number) {
    this.dirName = dirName;
    this.theFile = theFile;
  }

  getDirectory() {
    let pathToDir = join(process.cwd(), `dist/routes/${this.dirName}`);

    if (test) {
      pathToDir = join(process.cwd(), `tests/routes/${this.dirName}`);
    }

    let directory = readdirSync(pathToDir);

    for (let fileName of directory) {
      if (!fileName.includes(".d.ts")) {
        let newName = `${this.dirName}/${fileName}`;

        if (isDirectory(fileName)) {
          console.log(newName);
          new Directory(newName, this.theFile).getDirectory();
        } else {
          let file = new File(newName, this.theFile);
          file.appendRouteToFile();
        }
      }
    }
  }
}
