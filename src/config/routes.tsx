import { RouteRecordRaw } from "vue-router";
import { First } from "../components/welcome/first";
import { Forth } from "../components/welcome/forth";
import { Second } from "../components/welcome/second";
import { Third } from "../components/welcome/third";
import { Bar } from "../pages/bar";
import { Foo } from "../pages/foo";
import { Welcome } from "../pages/Welcome";

export const routes: RouteRecordRaw[] = [
  { path: "/", component: Foo },
  { path: "/about", component: Bar },
  {
    path: "/welcome",
    component: Welcome,
    children: [
      { path: "1", component: First, },
      { path: "2", component: Second, },
      { path: "3", component: Third, },
      { path: "4", component: Forth, },
    ]
  }
];