import { FunctionalComponent, useSlots } from 'vue';
import style from './WelcomeLayout.module.scss';

export const WelcomeLayout: FunctionalComponent = (props, context) => {
  // const { slots: { icon, title, buttons } } = context
  // return (
  //   <div class={style.wrapper}>
  //     <div class={style.card}>
  //       {icon?.()}    {/* {slots.icon && slots.icon()} 的缩写为：{icon?.()} ；定义的时候 需要变成函数： icon: () => <img src={pig}/>*/}
  //       {title?.()}
  //     </div>
  //     <div class={style.actions}>
  //       {buttons?.()}
  //     </div>
  //   </div>
  // )
}

WelcomeLayout.displayName = 'WelcomeLayout'