/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				primary: "#1D4ED8",
				secondary: "#6b7280",
				accent: "#f3f4f6",
				neutral: "#6b7280",
				info: "#0ea5e9",
				success: "#84cc16",
				warning: "#eab308",
				error: "#dc2626",
			},
		},
	},
	plugins: [],
};
