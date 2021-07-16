import * as Componentabout from "./routes/about";
import * as Componentblog from "./routes/blog";
import * as Component from "./routes/index";
import * as Componentuser$id$slug from "./routes/user/$id/$slug";
import * as Componentuser$id from "./routes/user/$id";
import * as Componentuserme from "./routes/user/me";
import * as Componentusersomething$id from "./routes/user/something/$id";

export const routes = [
  {
    path: "/about",
    Component: Componentabout.default,
    // @ts-ignore
    loader: Componentabout.loader,
    // @ts-ignore
    action: Componentabout.action,
  },
  {
    path: "/blog",
    Component: Componentblog.default,
    // @ts-ignore
    loader: Componentblog.loader,
    // @ts-ignore
    action: Componentblog.action,
  },
  {
    path: "/",
    Component: Component.default,
    // @ts-ignore
    loader: Component.loader,
    // @ts-ignore
    action: Component.action,
  },
  {
    path: "/user/:id/:slug",
    Component: Componentuser$id$slug.default,
    // @ts-ignore
    loader: Componentuser$id$slug.loader,
    // @ts-ignore
    action: Componentuser$id$slug.action,
  },
  {
    path: "/user/:id",
    Component: Componentuser$id.default,
    // @ts-ignore
    loader: Componentuser$id.loader,
    // @ts-ignore
    action: Componentuser$id.action,
  },
  {
    path: "/user/me",
    Component: Componentuserme.default,
    // @ts-ignore
    loader: Componentuserme.loader,
    // @ts-ignore
    action: Componentuserme.action,
  },
  {
    path: "/user/something/:id",
    Component: Componentusersomething$id.default,
    // @ts-ignore
    loader: Componentusersomething$id.loader,
    // @ts-ignore
    action: Componentusersomething$id.action,
  },
];
