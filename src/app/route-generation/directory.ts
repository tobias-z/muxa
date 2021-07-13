import { join } from "path";
import { readdirSync } from "fs";
import File from "./file";

export default class Directory {
  private readonly dirName: string;
  private readonly theFile: number;

  constructor(dirName: string, theFile: number) {
    this.dirName = dirName;
    this.theFile = theFile;
  }

  async getDirectory() {
    let pathToDir = join(process.cwd(), `dist/routes/${this.dirName}`);
    let directory = readdirSync(pathToDir);

    for (let fileName of directory) {
      if (!fileName.includes(".d.ts")) {
        let file = new File(`${this.dirName}/${fileName}`, this.theFile);
        file.appendRouteToFile();
      }
    }
  }
}
