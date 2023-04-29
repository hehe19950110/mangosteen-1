import { Toast } from "vant";
import { defineComponent, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { LayoutNavBar } from "../layouts/LayoutNavBar";
import { Button } from "../shared/buttons/Button";
import { FloatButton } from "../shared/buttons/FloatButton";
import { Center } from "../shared/Center";
import { Icon } from "../shared/Icon/Icon";
import { Overlay, OverlayIcon } from "../shared/Overlay";
import style from "./StartPage.module.scss";

export const StartPage = defineComponent({
  setup: (props, context) => {
    onMounted(() => {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        // duration	展示时长(ms)，值为 0 时，toast 不会消失
        duration: 0,
      });
    });

    return () => (
      <LayoutNavBar>
        {{
          title: () => "月月记账",
          icon: () => <OverlayIcon />,
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
                <FloatButton iconName="add" />
              </RouterLink>
            </>
          ),
        }}
      </LayoutNavBar>
    );
  },
});
