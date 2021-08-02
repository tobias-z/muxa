import * as Route404 from "./routes/404";
import * as Routeabout from "./routes/about";
import * as Routeblog$slug$id from "./routes/blog/$slug/$id";
import * as Routeblog$slug from "./routes/blog/$slug";
import * as Routeblog from "./routes/blog";
import * as Route from "./routes/index";
import * as Routelogin from "./routes/login";
import * as Routeme from "./routes/me";
import * as Routeuserprofilename$id from "./routes/user/profile/name/$id";
import * as Routeuserprofilename from "./routes/user/profile/name";
import * as Routeusersomething$slug from "./routes/user/something/$slug";
import * as Routeusersomething from "./routes/user/something";

function doesFunctionExist(route, fn) {
  if (typeof route[fn] === "function") {
    return route[fn];
  }
  return undefined;
}
  
export const routes = [
  {
        path: "/blog",
        Component: Routeblog.default,
        loader: doesFunctionExist(Routeblog, "loader"),
        action: doesFunctionExist(Routeblog, "action"),
        meta: doesFunctionExist(Routeblog, "meta"),
        exact: false,
        routes: [{
        path: "/blog/:slug",
        Component: Routeblog$slug.default,
        loader: doesFunctionExist(Routeblog$slug, "loader"),
        action: doesFunctionExist(Routeblog$slug, "action"),
        meta: doesFunctionExist(Routeblog$slug, "meta"),
        exact: false,
        routes: [{
        path: "/blog/:slug/:id",
        Component: Routeblog$slug$id.default,
        loader: doesFunctionExist(Routeblog$slug$id, "loader"),
        action: doesFunctionExist(Routeblog$slug$id, "action"),
        meta: doesFunctionExist(Routeblog$slug$id, "meta"),
        exact: true,
        routes: []
      },
      ]
      },
      ]
      },
      {
        path: "/user/profile/name",
        Component: Routeuserprofilename.default,
        loader: doesFunctionExist(Routeuserprofilename, "loader"),
        action: doesFunctionExist(Routeuserprofilename, "action"),
        meta: doesFunctionExist(Routeuserprofilename, "meta"),
        exact: false,
        routes: [{
        path: "/user/profile/name/:id",
        Component: Routeuserprofilename$id.default,
        loader: doesFunctionExist(Routeuserprofilename$id, "loader"),
        action: doesFunctionExist(Routeuserprofilename$id, "action"),
        meta: doesFunctionExist(Routeuserprofilename$id, "meta"),
        exact: true,
        routes: []
      },
      ]
      },
      {
        path: "/user/something",
        Component: Routeusersomething.default,
        loader: doesFunctionExist(Routeusersomething, "loader"),
        action: doesFunctionExist(Routeusersomething, "action"),
        meta: doesFunctionExist(Routeusersomething, "meta"),
        exact: false,
        routes: [{
        path: "/user/something/:slug",
        Component: Routeusersomething$slug.default,
        loader: doesFunctionExist(Routeusersomething$slug, "loader"),
        action: doesFunctionExist(Routeusersomething$slug, "action"),
        meta: doesFunctionExist(Routeusersomething$slug, "meta"),
        exact: true,
        routes: []
      },
      ]
      },
      {
        path: "/about",
        Component: Routeabout.default,
        loader: doesFunctionExist(Routeabout, "loader"),
        action: doesFunctionExist(Routeabout, "action"),
        meta: doesFunctionExist(Routeabout, "meta"),
        exact: true,
        routes: []
      },
      {
        path: "/",
        Component: Route.default,
        loader: doesFunctionExist(Route, "loader"),
        action: doesFunctionExist(Route, "action"),
        meta: doesFunctionExist(Route, "meta"),
        exact: true,
        routes: []
      },
      {
        path: "/login",
        Component: Routelogin.default,
        loader: doesFunctionExist(Routelogin, "loader"),
        action: doesFunctionExist(Routelogin, "action"),
        meta: doesFunctionExist(Routelogin, "meta"),
        exact: true,
        routes: []
      },
      {
        path: "/me",
        Component: Routeme.default,
        loader: doesFunctionExist(Routeme, "loader"),
        action: doesFunctionExist(Routeme, "action"),
        meta: doesFunctionExist(Routeme, "meta"),
        exact: true,
        routes: []
      },
      {
        path: "*",
        Component: Route404.default,
        loader: doesFunctionExist(Route404, "loader"),
        action: doesFunctionExist(Route404, "action"),
        meta: doesFunctionExist(Route404, "meta"),
        exact: false,
        routes: []
      },
      
]