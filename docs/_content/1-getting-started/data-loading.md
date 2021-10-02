---
parent: "Getting Started"
title: "Data Loading"
description: "Data loading in Muxa"
slug: "data-loading"
order: 3
---

# Loading Data

When loading data the usual react way, is to keep track of multiple states such
as "isLoading". Muxa tries to fix this by handing you all the data through a
useRouteData function.

## Creating a loader

A loader is simply an asynchronous function that that which can return any data
that you want. You can look at a loader as all of the data, that your route
needs to function correctly.

In `routes/index.tsx`:

```jsx
export function loader() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  const data = await res.json();
  return data;
}
```

Whatever you return as your data will be set as your routes's state.

## Using data from your loader

Still in `routes/index.js` lets make our home page use that data

```jsx
export default function HomePage() {
  const { data: pokemon } = useRouteData();

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

## Meta

Muxa provides a meta function which lets you set a title, description and
expires. Expires allows you to choose when you want your loader to be called
again.

Lets make our homepage use this

```tsx
// MetaFunction imported from muxa
export const meta: MetaFunction = () => {
  return {
    title: "Home page",
    description: "This is the home page",
  };
};
```

## Finished Product

```tsx
import type { MetaFunction } from "muxa";

export const meta: MetaFunction = () => {
  return {
    title: "Home page",
    description: "This is the home page",
  };
};

export function loader() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  const data = await res.json();
  return data;
}

export default function HomePage() {
  const { data: pokemon } = useRouteData();

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
