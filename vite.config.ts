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
        // 再出错 先用 postman 调用API地址
        target: "http://121.196.236.94:3000/",
      },
    },
    port: 8888,
    // ip + port

    // 本机默认的 ip :
    // 127.0.0.1
    // === localhost
    // === 0.0.0.0
  },
});
