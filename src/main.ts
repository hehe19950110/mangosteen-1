import { createApp } from "vue";
import { App } from "./App";
import { createRouter } from "vue-router";
import { history } from "./shared/history";
import { routes } from "./config/routes";
import "@svgstore";
import { createPinia, storeToRefs } from "pinia";
import { useMeStore } from "./stores/useMeStore";
import { Dialog } from "vant";

const router = createRouter({
  history,
  routes,
});

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");

// const app = createApp(App);
// app.use(router);
// app.mount("#app");
//app 先创建 后挂载

const meStore = useMeStore();
const { mePromise } = storeToRefs(meStore);
meStore.fetchMe();

// 设置登录验证的路由白名单：
const whiteList: Record<string, "exact" | "startsWith"> = {
  "/": "exact",
  "/items": "exact",
  "/welcome": "startsWith",
  "/sign_in": "startsWith",
};
/*
// 设置 一进去页面就先请求
// 后面 都会使用第一次发请求的结果
const promise = http.get('/me')

router.beforeEach(async(to, from) => {
  if(to.path === '/' || to.path.startsWith('/welcome') 
                    || to.path.startsWith('/sign_in') 
                    || to.path === '/items'){
    return true
  } else {
    const path = await mePromise.then( 
      // 成功，就可以获取用户信息，进入想去的路由
      // 失败，就 return 到登录的路由
      () => true,
      () =>  'sign_in?return_to' + to.path
    )
    return path
  }
})
*/
router.beforeEach((to, from) => {
  for (const key in whiteList) {
    const value = whiteList[key];
    if (value === "exact" && to.path === key) {
      return true;
    }
    if (value === "startsWith" && to.path.startsWith(key)) {
      return true;
    }
  }
  return mePromise!.value!.then(
    () => true,
    () => {
      "/sign_in?return_to=" + from.path;
    }
  );
});
