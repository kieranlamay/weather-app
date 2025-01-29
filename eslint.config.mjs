import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    extends: "airbnb-base", // i domnt think this works with flat config i.e. this file
  },

  eslintConfigPrettier, // keep this as the last in the array always
];
