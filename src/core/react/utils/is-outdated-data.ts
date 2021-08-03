import type * as Muxa from "../../../types";

export function isOutdatedData(route: Muxa.Route) {
  let outdated = false;
  if (route.expires < new Date()) {
    outdated = true;
  }
  if (!route.routeData) {
    outdated = true;
  }
  if (route.isRedirect) {
    outdated = true;
  }
  return outdated;
}
