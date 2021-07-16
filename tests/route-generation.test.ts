import { generateAllRoutes } from "../src/modules/route-generation/generate-all-routes";

test("route generation does not throw an error", () => {
  expect(() => generateAllRoutes(true)).not.toThrow();
});
