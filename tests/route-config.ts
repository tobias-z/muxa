import * as Componentabout from "../src/routes/about";
import * as Componentblog$slug$id from "../src/routes/blog/$slug/$id";
import * as Componentblog$slug from "../src/routes/blog/$slug";
import * as Componentblog from "../src/routes/blog";
import * as Component from "../src/routes/index";
import * as Componentuserprofilename$id from "../src/routes/user/profile/name/$id";
import * as Componentuserprofilename from "../src/routes/user/profile/name";
import * as Componentusersomething$slug from "../src/routes/user/something/$slug";
import * as Componentusersomething from "../src/routes/user/something";

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
        exact: false,
        routes: [{
        path: "/blog/:slug",
        Component: Componentblog$slug.default,
        loader: doesFunctionExist(Componentblog$slug, "loader"),
        action: doesFunctionExist(Componentblog$slug, "action"),
        exact: false,
        routes: [{
        path: "/blog/:slug/:id",
        Component: Componentblog$slug$id.default,
        loader: doesFunctionExist(Componentblog$slug$id, "loader"),
        action: doesFunctionExist(Componentblog$slug$id, "action"),
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
        exact: false,
        routes: [{
        path: "/user/profile/name/:id",
        Component: Componentuserprofilename$id.default,
        loader: doesFunctionExist(Componentuserprofilename$id, "loader"),
        action: doesFunctionExist(Componentuserprofilename$id, "action"),
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
        exact: false,
        routes: [{
        path: "/user/something/:slug",
        Component: Componentusersomething$slug.default,
        loader: doesFunctionExist(Componentusersomething$slug, "loader"),
        action: doesFunctionExist(Componentusersomething$slug, "action"),
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
        exact: true,
        routes: []
      },
      {
        path: "/",
        Component: Component.default,
        loader: doesFunctionExist(Component, "loader"),
        action: doesFunctionExist(Component, "action"),
        exact: true,
        routes: []
      },
      
]