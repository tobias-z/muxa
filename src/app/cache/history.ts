import type * as Muxa from "../../types";

export default class History {
  // Enables us to know what we should refetch
  private _previousPath: Muxa.Path;

  constructor() {
    this._previousPath = undefined;
  }

  public set previousPath(path: Muxa.Path) {
    this._previousPath = path;
  }

  public get previousPath() {
    return this._previousPath;
  }
}
