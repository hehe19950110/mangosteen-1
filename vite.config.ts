import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { svgstore } from "./src/vite_plugins/svgstore";
import styleImport, { VantResolve } from "vite-plugin-style-import";

export default defineConfig({
  // base: "/mangosteen-1/dist/",
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    svgstore(),
    // styleImport({
    //   resolves: [VantResolve()],
    // }),
  ],
});
