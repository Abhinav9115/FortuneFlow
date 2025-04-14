/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // New futuristic color palette
        'electric-blue': '#5d5dff',
        'cyber-teal': '#0ff4c6',
        'neon-violet': '#b967ff',
        'deep-navy': '#0f172a',
        'midnight': '#080c1a',
        'silver': '#e2e8f0',
        'steel': '#94a3b8',
        
        // UI colors
        primary: {
          DEFAULT: '#5d5dff', // Electric blue
          focus: '#4b4bdd',
          content: '#ffffff',
        },
        accent: {
          DEFAULT: '#0ff4c6', // Cyber teal
          focus: '#0cd9ae',
          content: '#0f172a',
        },
        success: {
          DEFAULT: '#0ff4c6', // Cyber teal
          focus: '#0cd9ae',
          content: '#0f172a',
        },
        danger: {
          DEFAULT: '#ff4579', // Neon pink
          focus: '#e53d6d',
          content: '#ffffff',
        },
        warning: {
          DEFAULT: '#ffb01f', // Amber
          focus: '#f29d00',
          content: '#0f172a',
        },
        neutral: {
          DEFAULT: '#0f172a', // Deep navy
          focus: '#080c1a', // Midnight
          content: '#ffffff',
        },
      },
      backgroundColor: {
        dashboard: '#1a1d2b', // Very dark blue/black for main background
      },
      boxShadow: {
        'neon': '0 0 5px rgba(93, 93, 255, 0.5), 0 0 20px rgba(93, 93, 255, 0.3)',
        'neon-teal': '0 0 5px rgba(15, 244, 198, 0.5), 0 0 20px rgba(15, 244, 198, 0.3)',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
        'fadeIn': 'fadeIn 0.3s ease-in-out',
        'slideIn': 'slideIn 0.3s ease-in-out',
        'slideUp': 'slideUp 0.3s ease-in-out',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
} 