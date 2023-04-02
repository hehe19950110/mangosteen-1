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
    }, // 默认级别：重要
    type: {
      type: String as PropType<"submit" | "button">,
    }, // 明确指定 type的值是"submit" | "button"，不要使用默认值
  },

  setup: (props, context) => {
    return () => (
      <button type={props.type} class={[style.button, style[props.level]]}>
        {context.slots.default?.()}
      </button>
    );
  },
});
