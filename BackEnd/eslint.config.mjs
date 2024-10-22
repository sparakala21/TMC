import globals from "globals";

export default [
  {
    languageOptions: { globals: globals.browser },
    plugins: {
      prettier: require("eslint-plugin-prettier"),
    },
    rules: {
      // Enable prettier rules
      "prettier/prettier": "error",
    },
  },
  {
    // This disables ESLint rules that conflict with Prettier
    extends: ["eslint-config-prettier"],
  },
];
