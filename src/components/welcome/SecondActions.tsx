import style from "./welcome.module.scss";
import { RouterLink } from "vue-router";
import { FunctionalComponent } from "vue";
import { SkipAD } from "../../shared/SkipAD";

export const SecondActions: FunctionalComponent = () => {
  return (
    <div class={style.actions}>
      <SkipAD class={style.fake} />
      <RouterLink to="/welcome/3">下一页</RouterLink>
      <SkipAD />
    </div>
  );
};

SecondActions.displayName = "SecondActions";
