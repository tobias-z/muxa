module.exports = {
  transform: {
    ".(ts|tsx)": "ts-jest",
  },
  preset: "ts-jest",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  roots: ["<rootDir>/tests"],
  testEnvironment: "node",
  coverageDirectory: "coverage",
  testPathIgnorePatterns: ["/node_modules"],
  verbose: true,
  // collectCoverage: true, <--Not needed because this would be applied/not by scripts in the package.json below
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverageFrom: [
    "**/*.{ts,tsx,js,jsx}",
    "!**/node_modules/**",
    "!**/src/routes/**",
    "!**/vendor/**",
    "!**/docs/**",
    "!**/tests/**",
  ],

  coveragePathIgnorePatterns: ["/node_modules"],
  coverageReporters: ["json", "lcov", "text", "clover"],
};
