# Todo

- [ ] SourceCode

  - [ ] Add more options to createSession domain: "remix.run", expires: new
        Date(Date.now() + 60), httpOnly: true, maxAge: 60, path: "/", sameSite:
        "lax", secrets: ["s3cret1"], secure: true

  - [ ] Add 'has' function on Session
  - [ ] Caching option on route (default to 1 minute)
    - [ ] export function 'meta' that returns properties for the LoadedRoute
          such as 'title', 'meta' and 'cacheFor'
  - [ ] 'usePendingFormSubmit'
  - [ ] Make only the route which changes call loader
  - [ ] Refactor addError function
  - [ ] Try to implement route-config with a getRoute function (webpack import)

- [ ] Tests

  - [ ] Different props given to the Form

- [ ] Package

  - [ ] Readme.md / Docs website
  - [ ] Deploy to NPM

- [ ] Docs

  - [ ] API Reference
  - [ ] Make Examples
    - [ ] Typescript
    - [ ] Nested routing
    - [ ] Error handling
    - [ ] Caching
  - [ ] Craete `Muxa` Image
