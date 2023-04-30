import style from "./welcome.module.scss";
import { RouterLink } from "vue-router";
import { FunctionalComponent } from "vue";
import { SkipAD } from "../../shared/SkipAD";

export const FirstActions: FunctionalComponent = () => {
  return (
    <div class={style.actions}>
      <SkipAD class={style.fake} />
      <RouterLink to="/welcome/2">下一页</RouterLink>
      <SkipAD />
    </div>
  );
};

FirstActions.displayName = "FirstActions";
