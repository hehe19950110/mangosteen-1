import style from './welcome.module.scss';
import { RouterLink } from 'vue-router';

export const ForthActions = () => (
  <div class={style.actions}>
    <RouterLink class={style.fake} to="/start" >跳过</RouterLink>
    <RouterLink to="/start" >完成</RouterLink>
    <RouterLink class={style.fake} to="/start" >跳过</RouterLink>
  </div>
)

ForthActions.displayName = 'ForthActions'