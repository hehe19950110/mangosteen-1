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
      default: "buttonß",
    }, // 明确指定 type的值是"submit" | "button"，默认值是button
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup: (props, context) => {
    return () => (
      <button
        disabled={props.disabled}
        type={props.type}
        class={[style.button, style[props.level]]}
        onClick={props.onClick}
      >
        {context.slots.default?.()}
      </button>
    );
  },
});
