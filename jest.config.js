require("dotenv").config({ path: ".env.development" });

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
  // This is the base directory for the project, where the package.json is located.
  // It is used to resolve the root directory for Jest.
  // If you have a different structure, you can change this to point to your root directory.
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
});

module.exports = jestConfig;
