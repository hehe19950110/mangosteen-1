import style from "./welcome.module.scss";
import { RouterLink } from "vue-router";
import { FunctionalComponent } from "vue";
import { SkipAD } from "../../shared/SkipAD";

const onClick = () => {
  localStorage.setItem("skipAD", "yes");
};

export const ForthActions: FunctionalComponent = () => {
  return (
    <div class={style.actions}>
      {/* <RouterLink class={style.fake} to="/start">跳过</RouterLink> */}
      <SkipAD class={style.fake} />

      <span onClick={onClick}>
        <RouterLink to="/start">完成</RouterLink>
      </span>

      {/* <RouterLink class={style.fake} to="/start">跳过</RouterLink> */}
      <SkipAD class={style.fake} />
    </div>
  );
};

ForthActions.displayName = "ForthActions";
