import type * as Muxa from "../../types";
import { FormEvent, useRef } from "react";
import { useRouterCache } from "./router";
import invariant from "../invariant";
import { useHistory } from "react-router-dom";
import { useRoutePath } from "./route-props";
import useRouteData from "./use-route-data";

export default function Form({
  method = "post",
  action,
  children,
}: Muxa.FormProps) {
  const cache = useRouterCache();
  const history = useHistory();
  const formRef = useRef<HTMLFormElement>(null);
  const path = useRoutePath();
  const { runLoader } = useRouteData();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const actionToUse = action ? action : path;
    const route = cache.get(actionToUse);

    invariant(
      route,
      `An action was made to path: '${actionToUse}' but that route was not found`
    );
    invariant(
      route.action,
      `You tried to do a ${method} to ${actionToUse}, but no ActionFunction was found for that route`
    );

    invariant(formRef.current, "Form ref was not defined");
    const body = getFormBody(formRef.current);

    const errors: Muxa.RouteErrors = {};
    function addError(key: string, value: any) {
      errors[key] = value;
    }

    const toRedirect = await route.action({
      body,
      method,
      params: route.params,
      addError,
      globalData: cache.globalData,
    });

    // Action has finished. Add the errors that was set on the action
    cache.updateRoute(actionToUse, { errors });

    //Redirect to new route
    toRedirect(cache, history, runLoader);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

function getFormBody(formRef: HTMLFormElement) {
  const formData = new FormData(formRef);
  const body: Record<string, FormDataEntryValue> = {};

  for (const [key, value] of formData.entries()) {
    body[key] = value;
  }

  return body;
}
