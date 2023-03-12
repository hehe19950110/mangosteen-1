import { FunctionalComponent } from 'vue';
import style from './WelcomeLayout.module.scss';

export const WelcomeLayout: FunctionalComponent = (props, context) => {
  const { slots: { icon, title, buttons } } = context
  return (
    <div class={style.wrapper}>
      <div class={style.card}>
        {icon?.()}
        {title?.()}
      </div>
      <div class={style.actions}>
        {buttons?.()}
      </div>
    </div>
  )
}