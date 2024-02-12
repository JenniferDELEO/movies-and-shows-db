module.exports = {
  root: true,
  extends: [
    "plugin:tailwindcss/recommended",
    "next/core-web-vitals",
    "eslint:recommended",
  ],
  globals: {
    JSX: "readonly",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js"],
      parser: "@typescript-eslint/parser",
    },
  ],
  rules: {
    "no-unused-vars": "warn",
  },
};
