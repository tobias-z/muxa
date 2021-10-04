---
parent: "Examples"
title: "Filters"
description: "Adding custom filters to your muxa project"
slug: "filters"
order: 3
---

# Custom Filters

Muxa allows you to add filters which will be run before any route.

## What are filters

The basic functionality of a filter, is that it's something that will be called
before your routes. This makes you able to do validation logic and so on in
them.

## Adding a user filter

Lets create a filter which will only allow a client to access a route if they
are logged in.

In `filters/user-filter.ts`

```ts
import { Filter } from "muxa";
import type { User } from "../user";

export default class UserFilter extends Filter {
  private readonly user: User;

  constructor(user: User) {
    // Any route after and equal value, this filter will be called
    // Will default to / if none is given
    super("/profile");
    this.user = user;
  }

  doFilter(): boolean {
    // Returning true will make the route render
    return this.user !== null;
  }
}
```

We now have our filter. This will make sure that anyone who tries to go to any
route at profile and after, will simply not see the route

## Adding the filter to our app

Now that we have our filter, we need to hand it to Muxa. This is done whereever
you render the Router.

```tsx
import { Router, Document } from "muxa";
import UserFilter from "./filters/user-filter";
import { useMemo } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const filters = useMemo(() => [new UserFilter(user)], [user]);

  return (
    <Router filters={filters}>
      <Document routes={routes} />
    </Router>
  );
}
```

There you go, this is how you can implement a filter! You can add as many of
them as you would like, just add them to the filters array 💪
