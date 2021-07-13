import { generateAllRoutes } from "../src/app/route-generation";

test("route generation does not throw an error", () => {
  expect(generateAllRoutes(true)).not.toThrow;
});
