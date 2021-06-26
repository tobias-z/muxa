---
parent: "Getting Started"
title: "Router Setup"
slug: "router-setup"
---

# Router Setup

The only difference when defining a route with muxa compared to
[React Router](https://reactrouter.com/) is two components.

Simple router example:

```jsx
import { LoadedRoute, Router } from "muxa";
import { Route } from "react-router-dom";
import { HomePage, homeGetter } from "./routes";

export default function App() {
  return (
    <Router fallback={<h1>Loading...</h1>}>
      <LoadedRoute path="/" getter={homeGetter}>
        <HomePage />
      </LoadedRoute>
      <Route path="/some-other-page">
        <SomeOtherPage />
      </Route>
    </Router>
  );
}
```

As you can see instead of using the `BrowserRouter` and `Route` from
react-router-dom, we instead use the Router and LoadedRoute from muxa (Which is
build on top of the BrowserRouter and Route)

You are also able to use the LoadedRoute and Route interchangeably so that not
all of your routes are using a getter on when rendered

_If you are interested in more detailed routing examples please checkout
[React Router](https://reactrouter.com/)_
