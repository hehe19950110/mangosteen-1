import { defineComponent, PropType } from "vue";
import { RouteLocationNamedRaw, RouterLink } from "vue-router";
import style from "./Skip.module.scss";

export const Skip = defineComponent({
  setup: (props, context) => {
    const onClick = () => {
      localStorage.setItem("skip", "yes");
    };
    return () => (
      <span onClick={onClick}>
        <RouterLink to="/start">跳过</RouterLink>
      </span>
    );
  },
});
