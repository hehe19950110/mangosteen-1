import { computed, defineComponent, PropType, ref } from "vue";
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
    // 用户传的 disable：
    disabled: {
      type: Boolean,
      default: false,
    },
    // 自动的 自我沉默，默认关闭。
    autoSelfDisabled: {
      type: Boolean,
      default: false,
    },
  },

  setup: (props, context) => {
    // 声明 自我沉默：默认是 FALSE
    const selfDisabled = ref(false);
    const _disabled = computed(() => {
      // 让用户选择 是否关闭 自我沉默功能
      if (props.autoSelfDisabled === false) {
        return props.disabled;
      }
      if (selfDisabled.value) {
        return true;
      } else {
        return props.disabled;
      }
    });
    const onClick = () => {
      props.onClick?.(); // onclick 存在 就调用
      selfDisabled.value = true;
      // 1秒后 将自我沉默 selfDisable 的值改回去：
      setTimeout(() => {
        selfDisabled.value = false;
      }, 1000);
    };

    return () => (
      <button
        disabled={_disabled.value}
        type={props.type}
        class={[style.button, style[props.level]]}
        onClick={onClick}
      >
        {context.slots.default?.()}
      </button>
    );
  },
});
