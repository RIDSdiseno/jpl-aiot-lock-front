/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primario: {
          50: "#eff6ff",
          600: "#2563eb",
          700: "#1d4ed8",
          900: "#0f172a",
        },
      },
      boxShadow: {
        suave: "0 10px 30px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
}
