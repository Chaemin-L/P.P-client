module.exports = {
  root: true,
  env: { 
    browser: true, 
    es2020: true 
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: [
    "prettier", 
    "react"
  ],
  rules: {
    "prettier/prettier": "error",
  },
};
