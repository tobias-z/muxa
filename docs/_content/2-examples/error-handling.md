---
parent: "Examples"
title: "Error Handling"
description: "Handling errors in Loaders"
slug: "error-handling"
order: 2
---

# Error Handling

Error handling is a big part of loading data, so muxa has made it easy adding
errors to your routes state.

Here is an example of how you can handle errors in your loader:

```jsx
export async function loader({ addError }) {
  try {
    let res = await fetch("https://api.some-person-api.com");
    return await res.json();
  } catch (error) {
    // Adds the error message to an object of errors:
    // Ends up as errors = { person: "error message" }
    addError("person", error.message);
  }
}
```

You can then in your route take the error data like so:

```jsx
// At the top
import { useRouteData } from "muxa";

export default function People() {
  let { errors } = useRouteData();

  return (
    <>
      <h1>People</h1>
      {errors.person && <p>{errors.person}</p>}
    </>
  );
}
```
