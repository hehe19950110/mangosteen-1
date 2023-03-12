import { defineComponent } from 'vue';
import style from './WelcomeLayout.module.scss';
import { RouterLink } from 'vue-router';
import pig from '../../assets/icons/pig.svg'
import { FunctionalComponent } from 'vue';
import { WelcomeLayout } from './WelcomeLayout';

export const First: FunctionalComponent = () => {
  return <WelcomeLayout>
    {{
      icon: () => <img src={pig}/>,
      title: () => <h2>会挣钱<br/>还会省钱</h2>,
      buttons: () => <>
        <RouterLink class={style.fake} to="/start">跳过</RouterLink>   {/* 在样式中设置隐藏 */}
        <RouterLink to="/welcome/2" >下一页</RouterLink>
        <RouterLink to="/start">跳过</RouterLink>
      </>
    }}
  </WelcomeLayout>
}

First.displayName = 'First'