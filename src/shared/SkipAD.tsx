import { defineComponent, PropType } from "vue";
import { RouteLocationNamedRaw, RouterLink } from "vue-router";

export const SkipAD = defineComponent({
  setup: (props, context) => {
    const onClick = () => {
      localStorage.setItem("skipAD", "yes");
    };
    return () => (
      <span onClick={onClick}>
        <RouterLink to="/start">跳过</RouterLink>
      </span>
    );
  },
});
