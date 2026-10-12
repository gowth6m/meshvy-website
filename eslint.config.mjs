import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import simpleImportSort from "eslint-plugin-simple-import-sort"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Side-effect imports.
            ["^\\u0000"],
            // Node builtins.
            ["^node:"],
            // External packages — react/next first, then everything else.
            ["^react", "^next", "^@?\\w"],
            // Internal aliases.
            ["^@/"],
            // Parent / sibling / index relative imports.
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Style imports.
            ["^.+\\.(css|scss|sass)$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
  globalIgnores([
    "_archive/**",
    ".next/**",
    "out/**",
    "build/**",
    ".source/**",
    "next-env.d.ts",
  ]),
])

export default eslintConfig
