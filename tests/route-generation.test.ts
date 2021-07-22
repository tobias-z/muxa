import { generateAllRoutes } from "../src/core/route-generation/generate-all-routes";

test("can create a typescript route config", () => {
  process.argv.push("typescript");
  expect(() => generateAllRoutes()).not.toThrow();
});

test("can create a javascript route config", () => {
  process.argv[2] = "";
  expect(() => generateAllRoutes()).not.toThrow();
});
