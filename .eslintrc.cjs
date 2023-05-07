/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "project": "./tsconfig.json"
  },
  plugins: [
    "@typescript-eslint"
  ],
  rules: {
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/consistent-type-imports": "warn"
  },
  root: true
};