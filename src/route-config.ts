import * as Component404 from "./routes/404";
import * as Componentabout from "./routes/about";
import * as Componentblog$slug$id from "./routes/blog/$slug/$id";
import * as Componentblog$slug from "./routes/blog/$slug";
import * as Componentblog from "./routes/blog";
import * as Component from "./routes/index";
import * as Componentuserprofilename$id from "./routes/user/profile/name/$id";
import * as Componentuserprofilename from "./routes/user/profile/name";
import * as Componentusersomething$slug from "./routes/user/something/$slug";
import * as Componentusersomething from "./routes/user/something";

function doesFunctionExist(route: any, fn: any) {
  if (typeof route[fn] === "function") {
    return route[fn];
  }
  return undefined;
}
  
export const routes = [
  {
        path: "/blog",
        Component: Componentblog.default,
        loader: doesFunctionExist(Componentblog, "loader"),
        action: doesFunctionExist(Componentblog, "action"),
        meta: doesFunctionExist(Componentblog, "meta"),
        exact: false,
        routes: [{
        path: "/blog/:slug",
        Component: Componentblog$slug.default,
        loader: doesFunctionExist(Componentblog$slug, "loader"),
        action: doesFunctionExist(Componentblog$slug, "action"),
        meta: doesFunctionExist(Componentblog$slug, "meta"),
        exact: false,
        routes: [{
        path: "/blog/:slug/:id",
        Component: Componentblog$slug$id.default,
        loader: doesFunctionExist(Componentblog$slug$id, "loader"),
        action: doesFunctionExist(Componentblog$slug$id, "action"),
        meta: doesFunctionExist(Componentblog$slug$id, "meta"),
        exact: true,
        routes: []
      },
      ]
      },
      ]
      },
      {
        path: "/user/profile/name",
        Component: Componentuserprofilename.default,
        loader: doesFunctionExist(Componentuserprofilename, "loader"),
        action: doesFunctionExist(Componentuserprofilename, "action"),
        meta: doesFunctionExist(Componentuserprofilename, "meta"),
        exact: false,
        routes: [{
        path: "/user/profile/name/:id",
        Component: Componentuserprofilename$id.default,
        loader: doesFunctionExist(Componentuserprofilename$id, "loader"),
        action: doesFunctionExist(Componentuserprofilename$id, "action"),
        meta: doesFunctionExist(Componentuserprofilename$id, "meta"),
        exact: true,
        routes: []
      },
      ]
      },
      {
        path: "/user/something",
        Component: Componentusersomething.default,
        loader: doesFunctionExist(Componentusersomething, "loader"),
        action: doesFunctionExist(Componentusersomething, "action"),
        meta: doesFunctionExist(Componentusersomething, "meta"),
        exact: false,
        routes: [{
        path: "/user/something/:slug",
        Component: Componentusersomething$slug.default,
        loader: doesFunctionExist(Componentusersomething$slug, "loader"),
        action: doesFunctionExist(Componentusersomething$slug, "action"),
        meta: doesFunctionExist(Componentusersomething$slug, "meta"),
        exact: true,
        routes: []
      },
      ]
      },
      {
        path: "/about",
        Component: Componentabout.default,
        loader: doesFunctionExist(Componentabout, "loader"),
        action: doesFunctionExist(Componentabout, "action"),
        meta: doesFunctionExist(Componentabout, "meta"),
        exact: true,
        routes: []
      },
      {
        path: "/",
        Component: Component.default,
        loader: doesFunctionExist(Component, "loader"),
        action: doesFunctionExist(Component, "action"),
        meta: doesFunctionExist(Component, "meta"),
        exact: true,
        routes: []
      },
      {
        path: "/",
        Component: Component404.default,
        loader: doesFunctionExist(Component404, "loader"),
        action: doesFunctionExist(Component404, "action"),
        meta: doesFunctionExist(Component404, "meta"),
        exact: false,
        routes: []
      },
      
]