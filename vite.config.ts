import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { svgstore } from "./src/vite_plugins/svgstore";
import styleImport, { VantResolve } from "vite-plugin-style-import";

export default defineConfig({
  base: "	https://accounting-2023-4-1313510194.cos-website.ap-shanghai.myqcloud.com",
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
  build: {
    rollupOptions: {
      external: [
        "react", // ignore react stuff
        "react-dom",
      ],
    },
  },
  server: {
    proxy: {
      "/api/v1": {
        target: "http://121.196.236.94:3000/",
      },
    },
    port: 8888,

    // 本机默认的 ip :
    // 127.0.0.1
    // === localhost
    // === 0.0.0.0
  },
});
