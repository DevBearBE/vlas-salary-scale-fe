module.exports = {
  testEnvironment: "jest-environment-jsdom", // This is necessary because you're testing a React app
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // Jest setup
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest", // Use babel-jest to transpile modern JS and JSX files
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
  },
  moduleFileExtensions: ["js", "jsx"],
  testPathIgnorePatterns: ["/node_modules/"], // Ignore node_modules
  collectCoverage: true, // Enable coverage
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/main.jsx", // Exclude entry files from coverage
    "!src/vite-env.d.ts",
  ],
};
