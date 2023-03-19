import { defineComponent, ref } from 'vue';
import { Button } from '../shared/buttons/Button';
import { FloatButton } from '../shared/buttons/FloatButton';
import { Center } from '../shared/Center';
import { Icon } from '../shared/Icon';
import { Navbar } from '../shared/Navbar';
import { Overlay } from '../shared/Overlay';
import style from './StartPage.module.scss';

export const StartPage = defineComponent({ 
  setup : (props,context) => {
    const refOverlayVisible = ref(false);
    const onClickMenu = () => {
      refOverlayVisible.value = !refOverlayVisible.value   // 取反refOverlayVisible.value
    };
    
    return () => (
      <div>
        <Navbar>
          {
            {
              default: () => '山竹记账',
              icon: () => <Icon name='menu' class={style.navIcon} onClick={onClickMenu} />
            }
          }
        </Navbar>

        <Center class={style.pig_wrapper}>
          <Icon name='pig' class={style.pig} />
        </Center>

        <div class={style.button_wrapper}>
          <Button class={style.button} > 开始记账啦 </Button>
        </div>

        <FloatButton iconName='add' />

        {/* {refOverlayVisible.value &&
          <Overlay onClose={() => refOverlayVisible.value = !refOverlayVisible.value} />
        } */}
        {refOverlayVisible.value &&
          <Overlay onClose={() => refOverlayVisible.value = false} />
        }
      </div>
    )
  }
})