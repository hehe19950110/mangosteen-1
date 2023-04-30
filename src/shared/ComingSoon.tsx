import { defineComponent, PropType } from "vue";
import { RouterLink } from "vue-router";
import { LayoutNavBar } from "../layouts/LayoutNavBar";
import { FloatButton } from "./buttons/FloatButton";
import { Center } from "./Center";
import style from "./ComingSoon.module.scss";
import { Icon } from "./Icon/Icon";
import { Navbar } from "./Navbar";
import { OverlayIcon } from "./Overlay";

export const ComingSoon = defineComponent({
  setup: (props, context) => {
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

              <p class={style.text}> 敬请期待 </p>

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
