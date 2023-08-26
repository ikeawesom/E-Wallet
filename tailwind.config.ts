import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'login':
          'linear-gradient(to bottom, rgba(0, 0, 0, 0.312), rgba(0, 0, 0, 0.5)),url("/images/login-banner.jpg")',
      },
      colors: {
        'font-primary': "var(--primary-font-color)",
        'font-secondary':"var(--secondary-font-color)",
        'font-para': "var(--p-font-color)",
        'primary-color': "var(--primary-color)",
        'sec-color': "var(--sec-color)",
        'light-sec-color': "var(--light-sec-color)",
        'grey':"var(--grey)"
      },
    },
  },
  plugins: [],
}
export default config
