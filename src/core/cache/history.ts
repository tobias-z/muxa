import type * as Muxa from "../../types";

export default class History {
  // Enables us to know what we should refetch
  private _previousPath: Muxa.Path;
  private _activePaths: Set<Muxa.Path>;

  constructor() {
    this._previousPath = undefined;
    this._activePaths = new Set();
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

  addActivePath(path: Muxa.Path) {
    this._activePaths.add(path);
  }

  removeActivePath(path: Muxa.Path) {
    this._activePaths.delete(path);
  }
}
