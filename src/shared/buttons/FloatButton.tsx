import { defineComponent, PropType } from "vue";
import { Icon, IconName } from "../Icon/Icon";
import style from "./FloatButton.module.scss";

export const FloatButton = defineComponent({
  props: {
    iconName: {
      type: String as PropType<IconName>,
      required: true,
    },
  },

  setup: (props, context) => {
    return () => (
      <div class={style.floatButton}>
        <Icon name={props.iconName} class={style.icon} />
      </div>
    );
  },
});
