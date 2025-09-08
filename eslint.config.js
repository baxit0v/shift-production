import js from "@eslint/js"
import globals from "globals"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tsEslint from "typescript-eslint"
import unusedImports from "eslint-plugin-unused-imports"

export default tsEslint.config(
	{ ignores: ["dist"] },
	{
		extends: [js.configs.recommended, ...tsEslint.configs.recommended],
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser
		},
		plugins: {
			react: react,
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
			"unused-imports": unusedImports
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"unused-imports/no-unused-imports": "error",
			"unused-imports/no-unused-vars": [
				"warn",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_"
				}
			],
			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true }
			],

			"no-tabs": 0,
			"no-console": "warn",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_" }
			],
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-explicit-any": "warn",
			// "react/no-array-index-key": ["error"],
		
			semi: ["error", "never"],
			quotes: ["error", "double", { allowTemplateLiterals: true }]
		}
	}
)
