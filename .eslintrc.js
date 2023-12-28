module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended"],
  ignorePatterns: ["dist/**"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ["src/**/*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        project: "./tsconfig.json",
      },
      extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
      rules: {
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_" },
        ],
      },
    },
    {
      env: {
        browser: true,
      },
      files: ["src/views/**/*.js"],
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
      rules: {
        quotes: "off",
        semi: ["error", "always"],
        "no-unused-vars": "off",
        "no-undef": "off",
      },
      extends: ["prettier", "plugin:prettier/recommended"],
    },
  ],
};
