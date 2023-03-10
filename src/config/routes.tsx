import { RouteRecordRaw } from "vue-router";
import { First } from "../components/welcome/First";
import { FirstActions } from "../components/welcome/FirstActions";
import { Forth } from "../components/welcome/Forth";
import { ForthActions } from "../components/welcome/ForthActions";
import { Second } from "../components/welcome/Second";
import { SecondActions } from "../components/welcome/SecondActions";
import { Third } from "../components/welcome/Third";
import { ThirdActions } from "../components/welcome/ThirdActions";
import { Welcome } from "../pages/Welcome";

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome',
    component: Welcome,
    children: [
      { path: '', redirect: '/welcome/1', },   //默认到/welcome/1
      /*
      { path: '1', component: First},
      { path: '2', component:Second},
      { path: '3', component:Third},
      { path: '4', component:Forth}, 
      */
      /*
      路由中 一个组件多个部分：
      { path: '1', components: { main: First, footer: FirstActions }, }, 
      { path: '2', components: { main: Second, footer: SecondActions }, },
      { path: '3', components: { main: Third, footer: ThirdActions }, },
      { path: '4', components: { main: Forth, footer: ForthActions }, },
      */
      { path: '1', name: "Welcome1", components: { main: First, footer: FirstActions }, },
      { path: '2', name: "Welcome2", components: { main: Second, footer: SecondActions }, },
      { path: '3', name: "Welcome3", components: { main: Third, footer: ThirdActions }, },
      { path: '4', name: "Welcome4", components: { main: Forth, footer: ForthActions }, },

    ]
  }
]