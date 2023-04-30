import { defineComponent, PropType } from "vue";
import { Center } from "./Center";
import style from "./ComingSoon.module.scss";
import { Icon } from "./Icon/Icon";

export const ComingSoon = defineComponent({
  setup: (props, context) => {
    return () => (
      <div>
        <Center class={style.pig_wrapper}>
          <Icon name="pig" class={style.pig} />
        </Center>
        <p class={style.text}>敬请期待</p>
      </div>
    );
  },
});
