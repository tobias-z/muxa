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
      loader: Componentabout.loader,
      action: Componentabout.action,
    },
    {
      path: "/blog",
      Component: Componentblog.default,
      loader: Componentblog.loader,
      action: Componentblog.action,
    },
    {
      path: "/",
      Component: Component.default,
      loader: Component.loader,
      action: Component.action,
    },
    {
      path: "/user/:id/:slug",
      Component: Componentuser$id$slug.default,
      loader: Componentuser$id$slug.loader,
      action: Componentuser$id$slug.action,
    },
    {
      path: "/user/:id",
      Component: Componentuser$id.default,
      loader: Componentuser$id.loader,
      action: Componentuser$id.action,
    },
    {
      path: "/user/me",
      Component: Componentuserme.default,
      loader: Componentuserme.loader,
      action: Componentuserme.action,
    },
    {
      path: "/user/something/:id",
      Component: Componentusersomething$id.default,
      loader: Componentusersomething$id.loader,
      action: Componentusersomething$id.action,
    },
    
]