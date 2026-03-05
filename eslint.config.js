import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import unusedImports from "eslint-plugin-unused-imports";
import perfectionist from "eslint-plugin-perfectionist";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: [
      "dist/**",
      "coverage/**",
      "node_modules/**",
      "*.config.js",
      "*.config.ts",
      "jest.config.js",
      "vite.config.ts",
      "tsconfig*.json",
      "public/**",
      "src/__tests__/__mocks__/**",
    ],
    languageOptions: {
      parser: tsparser,
      sourceType: "module",
      ecmaVersion: "latest",
      parserOptions: {
        ecmaFeatures: { jsx: true },
        tsconfigRootDir: import.meta.dirname,
        projectService: true,
      },
      globals: {
        browser: true,
        es2020: true,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "unused-imports": unusedImports,
      prettier: prettierPlugin,
      perfectionist: perfectionist,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // general
      "no-alert": 0,
      camelcase: 0,
      "no-console": 0,
      "no-unused-vars": 0,
      "no-nested-ternary": 0,
      "no-param-reassign": 0,
      "no-underscore-dangle": 0,
      "no-restricted-exports": 0,
      "no-promise-executor-return": 0,
      "import/prefer-default-export": 0,
      "prefer-destructuring": [1, { object: true, array: false }],
      // typescript
      "@typescript-eslint/naming-convention": 0,
      "@typescript-eslint/no-use-before-define": 0,
      "@typescript-eslint/consistent-type-exports": 1,
      "@typescript-eslint/consistent-type-imports": 1,
      "@typescript-eslint/no-unused-vars": [1, { args: "none" }],
      "@typescript-eslint/no-explicit-any": [1, { ignoreRestArgs: true }],
      // react
      "react/no-children-prop": 0,
      "react/react-in-jsx-scope": 0,
      "react/no-array-index-key": 0,
      "react/require-default-props": 0,
      "react/jsx-props-no-spreading": 0,
      "react/function-component-definition": 0,
      "react/jsx-no-duplicate-props": [1, { ignoreCase: false }],
      "react/jsx-no-useless-fragment": [1, { allowExpressions: true }],
      "react/no-unstable-nested-components": [1, { allowAsProps: true }],
      "react/prop-types": 0,
      // react-hooks
      "react-hooks/rules-of-hooks": 2,
      "react-hooks/exhaustive-deps": 1,
      // unused imports
      "unused-imports/no-unused-imports": 1,
      "unused-imports/no-unused-vars": [
        0,
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      // perfectionist
      "perfectionist/sort-exports": [1, { order: "asc", type: "line-length" }],
      "perfectionist/sort-named-imports": [
        1,
        { order: "asc", type: "line-length" },
      ],
      "perfectionist/sort-named-exports": [
        1,
        { order: "asc", type: "line-length" },
      ],
      "perfectionist/sort-imports": [1, { order: "asc", type: "line-length" }],
    },
  },
];
