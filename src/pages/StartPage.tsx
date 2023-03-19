import { defineComponent } from 'vue';
import { Button } from '../shared/buttons/Button';
import { FloatButton } from '../shared/buttons/FloatButton';
import { Center } from '../shared/Center';
import { Icon } from '../shared/Icon';
import { Navbar } from '../shared/Navbar';
import style from './StartPage.module.scss';

export const StartPage = defineComponent({ 
  setup : (props,context) => {
    const onClick = () => {
      console.log( 'hi')
    }
    
    return () => (
      <div>
        <Navbar>
          {
            {
              default: () => '山竹记账',
              icon: () => <Icon name='menu' class={style.navIcon} />
            }
          }
        </Navbar>

        <Center class={style.pig_wrapper}>
          <Icon name='pig' class={style.pig} />
        </Center>

        <div class={style.button_wrapper}>
          <Button class={style.button} onClick={onClick} >button测试</Button>
        </div>

        <FloatButton iconName='add' />
      </div>
    )
  }
})