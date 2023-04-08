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
      default: "button",
    }, // 明确指定 type的值是"submit" | "button"，默认值是button

    // 有条件地禁用button中的元素，可以动态地将属性绑定disable到计算结果为布尔值true（禁用按钮）或false（启用按钮）的表达式
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
