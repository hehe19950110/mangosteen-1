import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export const SkipAD = defineComponent({
  setup: (props, context) => {
    const onClick = () => {
      localStorage.setItem("skipAD", "yes");
    };
    return () => (
      <span onClick={onClick}>
        <RouterLink to="/items">跳过</RouterLink>
      </span>
    );
  },
});
