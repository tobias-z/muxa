import * as Componentabout from "./routes/about";
import * as Componentblog from "./routes/blog";
import * as Component from "./routes/index";
import * as Componentuser$id$slug from "./routes/user/$id/$slug";
import * as Componentuser$id from "./routes/user/$id";
import * as Componentuserme from "./routes/user/me";
import * as Componentusersomething$id from "./routes/user/something/$id";

function doesFunctionExist(route, fn) {
  if (typeof route[fn] === "function") {
    return route[fn];
  }
  return undefined;
}
  
export const routes = [
  {
      path: "/about",
      Component: Componentabout.default,
      loader: doesFunctionExist(Componentabout, "loader"),
      action: doesFunctionExist(Componentabout, "action"),
    },
    {
      path: "/blog",
      Component: Componentblog.default,
      loader: doesFunctionExist(Componentblog, "loader"),
      action: doesFunctionExist(Componentblog, "action"),
    },
    {
      path: "/",
      Component: Component.default,
      loader: doesFunctionExist(Component, "loader"),
      action: doesFunctionExist(Component, "action"),
    },
    {
      path: "/user/:id/:slug",
      Component: Componentuser$id$slug.default,
      loader: doesFunctionExist(Componentuser$id$slug, "loader"),
      action: doesFunctionExist(Componentuser$id$slug, "action"),
    },
    {
      path: "/user/:id",
      Component: Componentuser$id.default,
      loader: doesFunctionExist(Componentuser$id, "loader"),
      action: doesFunctionExist(Componentuser$id, "action"),
    },
    {
      path: "/user/me",
      Component: Componentuserme.default,
      loader: doesFunctionExist(Componentuserme, "loader"),
      action: doesFunctionExist(Componentuserme, "action"),
    },
    {
      path: "/user/something/:id",
      Component: Componentusersomething$id.default,
      loader: doesFunctionExist(Componentusersomething$id, "loader"),
      action: doesFunctionExist(Componentusersomething$id, "action"),
    },
    
]