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

Notice that we are still using React Router to do the actual routing.

```jsx
import { useRouteData, LoadedRoute } from "muxa";
import { useHistory } from "react-router-dom";

export function homeLoader() {
  let res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1118");
  let data = await res.json();
  return data.results;
}

export default function HomePage() {
  // When using nested routes, you have to specify which destination your parent is in
  let { data: pokemons } = useRouteData("/");
  let history = useHistory();

  {pokemons && (
      {/* Puts our links on the left of our pokemon */}
      <div style={{display: "flex"}}>
        <ul>
          {pokemons.map(pokemon => (
            <li
              key={pokemon.name}
              onClick={() => history.push(`/${pokemon.name}`)}>
              {pokemon.name}
            </li>
          ))}
        </ul>

        {/* Replace with LoadedRoute when implemented */}
        <p>The Pokemon</p>
      </div>
    );
  }
}
```

We are now able to see each of the pokemons names in a list. When a pokemon is
clicked the url path changes to the choosen pokemon

## Creating A Nested Route

We now want to have our nested route render the chosen pokemon's information. So
we setup a loader for our nested route, which will find the choosen pokemon.

`Create a file called pokemon.js`

```jsx
export async function pokemonLoader(helpers) {
  // The loader is given an object of helpers.
  // One of these helpers is the params
  let { params } = helpers;

  let res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.pokemonName}`
  );
  return await res.json();
}

export default function Pokemon() {
  let { data: pokemon } = useRouteData();

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

There you have it, this is how you can create routes in Muxa.

## Finished Product

This is the complete code of this example, with the implemented LoadedRoute

```jsx
import { useRouteData, LoadedRoute } from "muxa";
import { useHistory } from "react-router-dom";
import Pokemon, { pokemonLoader } from "./pokemon";

export function homeLoader() {
  let res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1118");
  let data = await res.json();
  return data.results;
}

export default function HomePage() {
  // When using nested routes, you have to specify which destination your parent is in
  let { data: pokemons } = useRouteData("/");
  let history = useHistory();

  {pokemons && (
      {/* Puts our links on the left of our pokemon */}
      <div style={{display: "flex"}}>
        <ul>
          {pokemons.map(pokemon => (
            <li
              key={pokemon.name}
              onClick={() => history.push(`/${pokemon.name}`)}>
              {pokemon.name}
            </li>
          ))}
        </ul>
        <LoadedRoute path="/:pokemonName" component={Pokemon} loader={pokemonLoader} />
      </div>
    );
  }
}


// In pokemon.js
export async function pokemonLoader(helpers) {
  // The loader is given an object of helpers.
  // One of these helpers is the params
  let { params } = helpers;

  let res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.pokemonName}`
  );
  return await res.json();
}

export default function Pokemon() {
  let { data: pokemon } = useRouteData();

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
