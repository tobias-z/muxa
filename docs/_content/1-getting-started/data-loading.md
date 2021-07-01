---
parent: "Getting Started"
title: "Data Loading"
description: "Data loading in Muxa"
slug: "data-loading"
order: 3
---

# Loading Data

When loading data the usual react way, is to keep track of multiple states such
as "isLoading". Muxa tries to fix this issue by showing the fallback component
given to your "Router" when you first load the page. The second time someone
visits the page, the old data will be returned immediately. Meanwhile a
background fetch is happening to get an updated version of your data.

## Creating a loader

A loader is simply an asynchronous function that that which can return any data
that you want. You can look at a loader as all of the data, that your route
needs to function correctly.

In `routes/index.js`:

```jsx
export async function homeLoader() {
  let res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  let data = await res.json();
  return data;
}
```

Whatever you return as your data will be set as your routes's state.

## Using data from your loader

Still in `routes/index.js` create a HomePage component:

```jsx
// At the top
import { useRouteData } from "muxa";

export default function HomePage() {
  let { data: pokemon } = useRouteData();

  return (
    <div>
      {pokemon && (
        <h1>Pokemon</h1>
        <p>Our pokemon is {pokemon.name}</p>
      )}
    </div>
  );
}
```
