import type { LoaderFunction, ActionFunction } from "./types";
import Outlet from "./core/muxa/outlet";
import { Router } from "./core/muxa/router";
import Form from "./core/muxa/form";
import Document from "./core/muxa/document";
import useRouteData from "./core/muxa/use-route-data";
import useGlobalData from "./core/muxa/use-global-data";

export {
  Router,
  Document,
  Outlet,
  Form,
  useRouteData,
  useGlobalData,
  LoaderFunction,
  ActionFunction,
};
