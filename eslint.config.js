import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {languageOptions: { globals: globals.browser }},
  {
    ...pluginJs.configs.recommended,
    files: ["src/**/*.{js,mjs,cjs,ts}"],
  },
  ...tseslint.configs.recommended.map(config => ({
    ...config,
    files: ["src/**/*.{js,mjs,cjs,ts}"],
  })),
];
