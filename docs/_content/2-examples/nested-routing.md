---
parent: "Examples"
title: "Nested Routing"
description: "Nested routing in Muxa"
slug: "nested-routing"
order: 2
---

# Nested Routes

Lets imagine a list of pokemons. We want to display the names of our pokemons on
the side, and then clicked, it will push our path to the choosen pokemon, which
will show it's information.

## Creating the Links

In routes/pokemons.tsx

```tsx
import { useRouteData, Outlet } from "muxa";
import { Link } from "react-router-dom";

interface Pokemons {
  name: string
}

export function loader() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1118");
  const data = await res.json();
  return data.results;
}

export default function PokemonsPage() {
  const { data: pokemons } = useRouteData<Pokemons>();

  {pokemons && (
      {/* Puts our links on the left of our pokemon */}
      <div style={{display: "flex"}}>
        <ul>
          {pokemons.map(pokemon => (
            <li
              key={pokemon.name}>
              <Link to={`/pokemons/${pokemon.name}`}>{pokemon.name}</Link>
            </li>
          ))}
        </ul>

        {/* Outlet will display any child routes of pokemons  */}
        <Outlet />
      </div>
    );
  }
}
```

We are now able to see each of the pokemons names in a list. When a pokemon is
clicked the url path changes to the choosen pokemon

## Creating A Nested Route

Nested routes in Muxa are created when you create a folder called the same as
your route.

We now want to have our nested route render the chosen pokemon's information. So
we setup a loader for our nested route, which will find the choosen pokemon.

`Create a folder called pokemons with a file called $name.tsx inside it`

The folder name makes this a nested route since we have a file called
pokemons.tsx and the $ infont of $name.tsx tells Muxa that there will be a
paramater called name in it.

```tsx
import type { LoaderFunction } from "muxa";

export const loader: LoaderFunction<{ name: string }> = async ({ params }) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
  return await res.json();
};

export default function PokemonPage() {
  const { data: pokemon } = useRouteData<{ name: string }>();

  return (
    <div>
      {pokemon ? (
        <h3>Pokemon {pokemon.name}</h3>
      ) : (
        <h3>No Pokemon was found</h3>
      )}
    </div>
  );
}
```

There you have it, this is how you can create nested routes in Muxa.

## Finished Product

This is the complete code of this example, with the implemented LoadedRoute

```jsx
// in pokemons.tsx
import { useRouteData, Outlet } from "muxa";
import { Link } from "react-router-dom";

interface Pokemons {
  name: string
}

export function loader() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1118");
  const data = await res.json();
  return data.results;
}

export default function PokemonsPage() {
  const { data: pokemons } = useRouteData<Pokemons>();

  {pokemons && (
      <div style={{display: "flex"}}>
        <ul>
          {pokemons.map(pokemon => (
            <li
              key={pokemon.name}>
              <Link to={`/pokemons/${pokemon.name}`}>{pokemon.name}</Link>
            </li>
          ))}
        </ul>

        <Outlet />
      </div>
    );
  }
}


// In pokemons/$name.tsx
import type { LoaderFunction } from "muxa";

export const loader: LoaderFunction<{ name: string }> = async ({ params }) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
  return await res.json();
};

export default function PokemonPage() {
  const { data: pokemon } = useRouteData<{ name: string }>();

  return (
    <div>
      {pokemon ? (
        <h3>Pokemon {pokemon.name}</h3>
      ) : (
        <h3>No Pokemon was found</h3>
      )}
    </div>
  );
}
```
