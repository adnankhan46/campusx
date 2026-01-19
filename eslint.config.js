import globals from "globals";
import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";

export default [
    js.configs.recommended,
    {
        files: ["**/*.js", "**/*.mjs"],
        languageOptions: {
            globals: {
                ...globals.node,
            },
            sourceType: "module",
            ecmaVersion: 2022,
        },
        plugins: {
            import: importPlugin,
        },
        settings: {
            "import/resolver": {
                node: {
                    extensions: [".js", ".mjs"],
                },
            },
        },
        rules: {
            "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "import/no-unresolved": "error",
            "import/named": "error",
            "import/default": "error",
            "import/namespace": "error",
            "import/export": "error",
        },
    },
    { // this is spcial rule only for vitest.config.js which uses virtual modules
        files: ["vitest.config.js"],
        rules: {
            "import/no-unresolved": "off",
        },
    },
];
