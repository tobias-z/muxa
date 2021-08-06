import { History } from "history";
import RouterCache from "../cache/router-cache";

/**
 * Only to be used in actions and loaders.
 */
export default function redirect(path: string) {
  return (
    cache: RouterCache,
    history: History,
    runLoader?: () => Promise<unknown>
  ) => {
    if (path !== history.location.pathname) {
      cache.sendRedirect(path);
      return history.push(path);
    }
    runLoader && runLoader();
  };
}
