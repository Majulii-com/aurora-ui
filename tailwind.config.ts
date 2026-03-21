import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './playground/**/*.{js,ts,jsx,tsx}',
    './examples/dsl-host-app/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--aurora-primary-50)',
          100: 'var(--aurora-primary-100)',
          200: 'var(--aurora-primary-200)',
          300: 'var(--aurora-primary-300)',
          400: 'var(--aurora-primary-400)',
          500: 'var(--aurora-primary-500)',
          600: 'var(--aurora-primary-600)',
          700: 'var(--aurora-primary-700)',
          800: 'var(--aurora-primary-800)',
          900: 'var(--aurora-primary-900)',
        },
        secondary: {
          50: 'var(--aurora-secondary-50)',
          100: 'var(--aurora-secondary-100)',
          500: 'var(--aurora-secondary-500)',
          600: 'var(--aurora-secondary-600)',
          700: 'var(--aurora-secondary-700)',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'aurora-sm': 'var(--aurora-radius-sm)',
        'aurora-md': 'var(--aurora-radius-md)',
        'aurora-lg': 'var(--aurora-radius-lg)',
      },
      boxShadow: {
        'aurora-sm': 'var(--aurora-shadow-sm)',
        'aurora-md': 'var(--aurora-shadow-md)',
        'aurora-lg': 'var(--aurora-shadow-lg)',
      },
    },
  },
  plugins: [],
};

export default config;
