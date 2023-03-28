import { defineComponent } from "vue";
import { Navbar } from "../shared/Navbar";
import style from "./LayoutNavBar.module.scss";

export const LayoutNavBar = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={style.wrapper}>
        <Navbar class={style.navbar}>
          {{
            default: () => context.slots.title?.(),
            icon: () => context.slots.icon?.(),
          }}
        </Navbar>

        {context.slots.default?.()}
      </div>
    );
  },
});
