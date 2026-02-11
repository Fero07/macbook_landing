const js = require("@eslint/js");
const reactPlugin = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const reactRefresh = require("eslint-plugin-react-refresh"); // for extends only
const globals = require("globals");
const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },

    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      // do NOT include react-refresh here
    },

    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite, // adds plugin automatically
    ],

    rules: {
      "no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^[A-Z_]",
          args: "after-used",
          ignoreRestSiblings: true,
        },
      ],
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/jsx-no-undef": "error", // <-- add this line
    },
  },
]);
