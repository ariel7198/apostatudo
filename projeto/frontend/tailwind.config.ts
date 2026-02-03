import type { Config } from "tailwindcss";

export default <Config>{
  content: [
    "./app.vue",
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./composables/**/*.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
