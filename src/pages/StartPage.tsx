import { defineComponent } from 'vue';
import { Button } from '../shared/buttons/Button';
import style from './StartPage.module.scss';

export const StartPage = defineComponent({ 
  setup : (props,context) => {
    const onClick = () => {
      console.log( 'hi')
    }
    
    return () => (
      <div>
        <div class={style.button_wrapper}>
          <Button class={style.button} onClick={onClick} >button测试</Button>
        </div>
      </div>
    )
  }
})