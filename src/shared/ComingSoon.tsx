import { defineComponent, PropType } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { LayoutNavBar } from "../layouts/LayoutNavBar";
import { Button } from "./buttons/Button";
import { FloatButton } from "./buttons/FloatButton";
import { Center } from "./Center";
import style from "./ComingSoon.module.scss";
import { Icon } from "./Icon/Icon";
import { OverlayIcon } from "./Overlay";

export const ComingSoon = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const router = useRouter();
    const onClick = () => {
      router.back();
    };
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
              <p class={style.link}>
                <Button onClick={onClick}>返回</Button>
              </p>

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
