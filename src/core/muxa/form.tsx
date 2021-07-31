import type * as Muxa from "../../types";
import { FormEvent, useRef } from "react";
import { useRouterCache } from "./router";
import { invariant } from "./utils/";
import { useHistory } from "react-router-dom";
import { useRoutePath } from "./route-props";
import useRouteData from "./use-route-data";

export default function Form({
  method = "post",
  action,
  children,
}: Muxa.FormProps) {
  let cache = useRouterCache();
  let history = useHistory();
  let formRef = useRef<HTMLFormElement>(null);
  let path = useRoutePath();
  let { runLoader } = useRouteData();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let actionToUse = action ? action : path;
    let route = cache.get(actionToUse);

    invariant(
      route,
      `An action was made to path: '${actionToUse}' but that route was not found`
    );
    invariant(
      route.action,
      `You tried to do a ${method} to ${actionToUse}, but no ActionFunction was found for that route`
    );

    invariant(formRef.current, "Form ref was not defined");
    let body = getFormBody(formRef.current);

    // Create functions for the action
    let redirect: Muxa.RedirectFunction = (path: string) => {
      return () => {
        if (path !== history.location.pathname) {
          return history.push(path);
        }
        runLoader();
      };
    };

    let errors: Muxa.RouteErrors = {};
    function addError(key: string, value: any) {
      errors[key] = value;
    }

    let toRedirect = await route.action({
      body,
      method,
      params: route.params,
      redirect,
      addError,
      globalData: cache.globalData,
    });

    // Action has finished. Add the errors that was set on the action
    cache.updateRoute(actionToUse, { errors });

    //Redirect to new route
    toRedirect();
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

function getFormBody(formRef: HTMLFormElement) {
  let formData = new FormData(formRef);
  let body: Record<string, FormDataEntryValue> = {};

  for (let [key, value] of formData.entries()) {
    body[key] = value;
  }

  return body;
}
