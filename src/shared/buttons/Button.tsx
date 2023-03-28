import { defineComponent, PropType } from "vue";
import style from "./Button.module.scss";

export const Button = defineComponent({
  props: {
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
    level: {
      type: String as PropType<"important" | "normal" | "danger">,
      default: "important",
    },
    type: {
      type: String as PropType<"submit" | "button">,
    },
  },

  setup: (props, context) => {
    return () => (
      <button class={[style.button, style[props.level]]}>
        {context.slots.default?.()}
      </button>
    );
  },
});
