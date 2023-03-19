import { defineComponent } from 'vue';
import  style  from './Button.module.scss'

interface Props {
  onClick?: (e: MouseEvent) => void;
};

export const Button = defineComponent<Props>({ 
  setup : (props,context) => {
    return () => (
      <button class={style.button}> 
        {context.slots.default?.()}
      </button>
    )
  }
})