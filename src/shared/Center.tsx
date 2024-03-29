import { defineComponent, PropType } from "vue";
import style from "./Center.module.scss";

const directionMap = {
  "-": style.horizontal,
  "|": style.vertical,
  horizontal: style.horizontal,
  vertical: style.vertical,
};

export const Center = defineComponent({
  props: {
    direction: {
      type: String as PropType<"-" | "|" | "horizontal" | "vertical">,
      default: "horizontal",
    },
  },
  setup: (props, context) => {
    const extraClass = directionMap[props.direction];
    return () => (
      <div class={[style.center, extraClass]}>{context.slots.default?.()}</div>
    );
  },
});
