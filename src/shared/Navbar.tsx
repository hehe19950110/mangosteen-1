import { defineComponent, PropType } from "vue";
import style from "./Navbar.module.scss";

export const Navbar = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },

  setup: (props, context) => {
    const { slots } = context;
    return () => (
      <div class={style.navbar}>
        <span class={style.icon_wrapper}>{slots.icon?.()}</span>

        <span class={style.title_wrapper}>{slots.default?.()}</span>
      </div>
    );
  },
});
