module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es2020": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended"
  ],
  "ignorePatterns": ["dist", ".eslintrc.cjs"],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "settings": {
    "react": {
      "version": "18.2"
    }
  },
  "plugins": ["react-refresh"],
  "rules": {
    "strict": ["error", "safe"],
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { "allowConstantExport": true }
    ],
    "semi": ["error", "always"], 
    "quotes": ["error", "double"], 
    "no-unused-vars": "error", 
    "react/react-in-jsx-scope": "off", 
    "react/jsx-uses-react": "off", 
    "react/jsx-uses-vars": "error" 
  }
}
