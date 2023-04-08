import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { svgstore } from "./src/vite_plugins/svgstore";

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
  server: {
    proxy: {
      "/api/v1": {
        target: "http://121.196.36.94:3000",
      },
    },
  },
});
