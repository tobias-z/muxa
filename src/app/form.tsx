import type * as Muxa from "../types";
import { FormEvent, useRef } from "react";
import { useState } from "react";
import { useRouterCache } from "./router";
import invariant from "./utils/invariant";
import { useHistory, useLocation } from "react-router-dom";

export default function Form({
  method = "post",
  action,
  children,
}: Muxa.FormProps) {
  let cache = useRouterCache();
  let location = useLocation();
  let history = useHistory();
  let actionToUse = action ? action : location.pathname;
  let [route] = useState(() => {
    let route = cache.get(actionToUse);
    /* istanbul ignore next */
    if (!route) {
      throw new Error(
        `An action was made to path: '${actionToUse}' but that route was not found`
      );
    }
    return route;
  });
  let formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    /* istanbul ignore next */
    if (!route.action) {
      throw new Error(
        `You tried to do a ${method} to ${actionToUse}, but no ActionFunction was found for that route`
      );
    }

    invariant(formRef.current, "Form ref was not defined");
    let body = getFormBody(formRef.current);

    let redirect: Muxa.RedirectFunction = (path: string) => {
      return () => history.push(path);
    };

    let errors: Muxa.RouteErrors = {};
    function addError(key: string, value: any) {
      errors[key] = value;
    }

    let data: Muxa.RouteErrors = {};
    function addData(key: string, value: any) {
      data[key] = value;
    }

    let toRedirect = await route.action({
      body,
      method,
      params: route.params,
      redirect,
      addError,
      addData,
    });

    // Action has finished. Add the data and errors that was set on the action
    cache.updateRoute(actionToUse, { errors, routeData: data });

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
