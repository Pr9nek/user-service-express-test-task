import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginTs from "@typescript-eslint/eslint-plugin";
import pluginImport from "eslint-plugin-import";
import tsParser from "@typescript-eslint/parser";

export default [
{
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
    globals: { ...globals.node },
    parser: tsParser,
    parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest"
    }
    },
    plugins: {
    import: pluginImport,
    "@typescript-eslint": pluginTs
    },
    rules: {
    ...pluginJs.configs.recommended.rules,
    ...tseslint.configs.recommended.rules,
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "import/extensions": [
        "error",
        "ignorePackages",
        {
        "js": "never",
        "ts": "never"
        }
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"]
    },
    settings: {
"import/resolver": {
        typescript: {
alwaysTryTypes: true
        }
    }
    }
}
];