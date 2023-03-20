import { defineComponent, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { LayoutNavBar } from '../layouts/LayoutNavBar';
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
      <LayoutNavBar>
        {
          {
            title: () => '山竹记账',
            icon: () => <Icon name="menu" class={style.navIcon} onClick={onClickMenu} />,
            default: () => (
              <>
                <Center class={style.pig_wrapper}>
                  <Icon name="pig" class={style.pig} />
                </Center>

                <div class={style.button_wrapper}>
                  <RouterLink to="/items/create">
                    <Button class={style.button}> 开始记账 </Button>
                  </RouterLink>
                </div>
                <RouterLink to="/items/create">
                  <FloatButton iconName='add' />
                </RouterLink>

                {/* 
                {refOverlayVisible.value &&
                  <Overlay onClose={() => refOverlayVisible.value = !refOverlayVisible.value} />
                } 等同于：
                */}
                {refOverlayVisible.value &&
                  <Overlay onClose={() => refOverlayVisible.value = false} />
                }
              </>
            ),
          }
        }
      </LayoutNavBar>
    )
  }
})