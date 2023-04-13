import style from "./welcome.module.scss";
import { RouterLink } from "vue-router";
import { FunctionalComponent } from "vue";
import { Skip } from "../../shared/Skip";

export const FirstActions: FunctionalComponent = () => {
  return (
    <div class={style.actions}>
      {/* <RouterLink class={style.fake} to="/start">跳过</RouterLink> */}
      <Skip class={style.fake} />

      <RouterLink to="/welcome/2">下一页</RouterLink>

      {/* <RouterLink to="/start">跳过</RouterLink> */}
      <Skip />
    </div>
  );
};

FirstActions.displayName = "FirstActions";
