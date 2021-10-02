import type * as Muxa from "../../types";

export default class History {
  // Enables us to know what we should refetch
  private _previousPath: Muxa.Path;
  private readonly _activePaths: Set<Muxa.Path>;

  constructor() {
    this._previousPath = undefined;
    this._activePaths = new Set();
  }

  public subscribe(path: Muxa.Path) {
    this.activePaths.add(path);
    return () => {
      // Keep track of the previous path
      this.activePaths.delete(path);
      this.previousPath = path;
    };
  }

  public set previousPath(path: Muxa.Path) {
    this._previousPath = path;
  }

  public get previousPath() {
    return this._previousPath;
  }

  public get activePaths(): Set<Muxa.Path> {
    return this._activePaths;
  }
}
