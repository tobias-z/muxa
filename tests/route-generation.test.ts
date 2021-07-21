import { generateAllRoutes } from "../src/core/route-generation/generate-all-routes";

test("route generation does not throw an error", () => {
  process.argv.push("typescript");
  expect(() => generateAllRoutes(true)).not.toThrow();
});

test("Will create js route config in src/routes", () => {
  process.argv[2] = "";
  expect(() => generateAllRoutes(false)).not.toThrow();
});
