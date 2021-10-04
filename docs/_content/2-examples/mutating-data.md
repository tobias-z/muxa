---
parent: "Examples"
title: "Mutating data"
description: "Data mutations in Muxa"
slug: "mutating-data"
order: 3
---

# Mutating data

In muxa they way we can mutate data is through an action function. The basic
functinallity works like a post if we looking at serverside frameworks.

Lets imagine that we have a some field with a message. You want this message
stored for later use.

Our would look something like this.

```tsx
import { Form } from "muxa";

export default function MessagePage() {
  return (
    <Form>
      <input name="message" required />
      <button type="submit">Submit</button>
    </Form>
  );
}
```

The Form component from Muxa, will by default post to the current route that you
are in.

So how do we catch this post? Well we can define an action function, which will
do just that.

```tsx
// at the top
import type { ActionFunction } from "muxa";
import { redirect } from "muxa";

interface ActionBody {
  message: string;
}

// body now contains message in it.
export const action: ActionFunction<ActionBody> = async ({ body }) => {
  await fetch("some-endpoint.com", {
    body: JSON.stringify(body),
  });
  // will redirect to the given route, and recall the loader if it exists
  return redirect("/message");
};
```

There we go, this is all you need to mutate data.

There are multiple things you could do if an error happens. One example would be
to use the addError function

Lets add abit of error handling in the action function and show any errors that
may happen in our ui.

```tsx
import type { ActionFunction } from "muxa";
import { Form, redirect, useRouteData } from "muxa";

interface ActionBody {
  message: string;
}

// body now contains message in it.
export const action: ActionFunction<ActionBody> = async ({
  body,
  addError,
}) => {
  try {
    const res = await fetch("some-endpoint.com", {
      body: JSON.stringify(body),
    });
    if (res.status !== 200) addError("error", "Message could not be generated");
  } catch (e) {
    addError("error", "Some unknown error happend");
  }

  // will redirect to the given route, and recall the loader if it exists
  return redirect("/message");
};

export default function MessagePage() {
  const { errors } = useRouteData<any, { error: string }>();

  return (
    <>
      {errors.error && <p>{errors.error}</p>}
      <Form>
        <input name="message" required />
        <button type="submit">Submit</button>
      </Form>
    </p>
  );
}
```

Thats it! You are now inserting the message to a database, while you could image
loading the messages in your loader aswell.
