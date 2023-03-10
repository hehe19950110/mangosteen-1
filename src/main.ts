import { createApp } from "vue";
import { App } from "./App";
import { Bar } from "./pages/bar";
import { Foo } from "./pages/foo";
import { createRouter } from "vue-router";
import { history } from "./shared/history";

const routes = [
  { path: "/", component: Foo },
  { path: "/about", component: Bar },
];

const router = createRouter({ history, routes });

const app = createApp(App);
app.use(router);
app.mount("#app");
//app 先创建 后挂载
