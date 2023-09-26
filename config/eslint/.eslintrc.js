module.exports = {
  ignorePatterns: ["node_modules"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  plugins: [
    "react",
    "simple-import-sort",
    "unused-imports",
    "@typescript-eslint",
    "react-hooks",
  ],
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    "import/no-cycle": "error",
    "unused-imports/no-unused-imports": "warn",
    "no-unused-vars": "warn",
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".tsx"] },
    ],
    "react/display-name": "off",
    "react/require-default-props": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "warn",
    "react/function-component-definition": "off",
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "import/extensions": "off",
    "import/no-duplicates": "error",
    "import/no-extraneous-dependencies": ["warn", { devDependencies: true }],
    "no-param-reassign": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "warn",
    "max-len": ["error", { ignoreComments: true, code: 150 }],
    "react-hooks/rules-of-hooks": "error", //  Checks rules of Hooks
    "react-hooks/exhaustive-deps": "error", //  Checks effect dependencies,
    "react/jsx-max-props-per-line": ["error", { maximum: 4 }],
    "react/no-unstable-nested-components": "warn",
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
  },
};
