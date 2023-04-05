import { RouteRecordRaw } from "vue-router";
import { First } from "../components/welcome/First";
import { FirstActions } from "../components/welcome/FirstActions";
import { Forth } from "../components/welcome/Forth";
import { ForthActions } from "../components/welcome/ForthActions";
import { Second } from "../components/welcome/Second";
import { SecondActions } from "../components/welcome/SecondActions";
import { Third } from "../components/welcome/Third";
import { ThirdActions } from "../components/welcome/ThirdActions";
import { ItemCreate } from "../components/item/ItemCreate";
import { TagCreate } from "../components/tag/TagCreate";
import { TagEdit } from "../components/tag/TagEdit";
import { ItemList } from "../components/item/ItemList";
import { ItemPage } from "../pages/ItemPage";
import { StartPage } from "../pages/StartPage";
import { WelcomePage } from "../pages/WelcomePage";
import { TagPage } from "../pages/TagPage";
import { SignInPage } from "../pages/SignInPage";
import { StatisticsPage } from "../pages/StatisticsPage";

export const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/welcome" },
  {
    path: "/welcome",
    component: WelcomePage,
    children: [
      { path: "", redirect: "/welcome/1" }, //默认到/welcome/1
      {
        path: "1",
        name: "Welcome1",
        components: { main: First, footer: FirstActions },
      },
      {
        path: "2",
        name: "Welcome2",
        components: { main: Second, footer: SecondActions },
      },
      {
        path: "3",
        name: "Welcome3",
        components: { main: Third, footer: ThirdActions },
      },
      {
        path: "4",
        name: "Welcome4",
        components: { main: Forth, footer: ForthActions },
      },
    ],
  },
  { path: "/start", component: StartPage },
  {
    path: "/items",
    component: ItemPage,
    children: [
      { path: "", component: ItemList },
      { path: "create", component: ItemCreate },
    ],
  },
  {
    path: "/tags",
    component: TagPage,
    children: [
      { path: "create", component: TagCreate },
      { path: ":id/edit", component: TagEdit },
    ],
  },
  {
    path: "/sign_in",
    component: SignInPage,
  },
  {
    path: "/statistics",
    component: StatisticsPage,
  },
];
