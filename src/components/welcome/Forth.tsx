import { defineComponent } from 'vue';
import style from './WelcomeLayout.module.scss';
import cloud from '../../assets/icons/cloud.svg';
import { RouterLink } from 'vue-router';
import { WelcomeLayout } from './WelcomeLayout';

export const Forth = () => (
  <WelcomeLayout>
    {{
      icon: () => <img class={style.icon} src={cloud}/>,
      title: () => <h2>每日提醒<br/>不遗漏每一笔账单</h2>,
      buttons: () => <>
        <RouterLink class={style.fake} to="/start">跳过</RouterLink>   {/* 在样式中设置隐藏 */}
        <RouterLink to="/start" >完成</RouterLink>
        <RouterLink class={style.fake} to="/start">跳过</RouterLink>
      </>
    }}
  </WelcomeLayout>
)

Forth.displayName = 'Forth'