import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  // base: "/mangosteen-1/dist/",
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
  ],
});
