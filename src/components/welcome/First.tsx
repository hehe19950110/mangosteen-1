import { defineComponent } from 'vue';
import style from './First.module.scss';
import { RouterLink } from 'vue-router';
import pig from '../../assets/icons/pig.svg'

export const First = defineComponent({ 
  setup : (props,context) => {
    return () => (
      <div class={style.wrapper}>
        
      <div class={style.card}>
        <img class={style.pig} src={pig} />
        <h2>会挣钱<br/>还要会省钱</h2>
      </div>

      <div class={style.actions}>
         {/* <router-link to="home">Home</router-link> */}
        <RouterLink class={style.fake} to="/start" >跳过</RouterLink>
        <RouterLink to="/welcome/2" >下一页</RouterLink>
        <RouterLink to="/start" >跳过</RouterLink>
      </div>
    </div>
    )
  }
})