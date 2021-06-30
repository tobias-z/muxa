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

## Creating a getter

A getter is simply an asynchronous function that that which can return any data
that you want. You can look at a getter as all of the data, that your page needs
to function correctly.

In `routes/index.js`:

```jsx
export async function homeGetter() {
  let res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  let data = await res.json();
  return {
    data: {
      pokemon: ditto,
    },
  };
}
```

Whatever you return as your data will be set as your page's state.

## Using data from your getter

Still in `routes/index.js` create a HomePage component:

```jsx
// At the top
import { useRouteData } from "muxa";

export default function HomePage() {
  let { data } = useRouteData();

  return (
    <div>
      {data && data.pokemon && (
        <h1>Pokemon</h1>
        <p>Our pokemon is {data.pokemon.name}</p>
      )}
    </div>
  );
}
```
