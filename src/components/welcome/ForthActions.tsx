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
      <SkipAD class={style.fake} />

      <span onClick={onClick}>
        <RouterLink to="/items">完成</RouterLink>
      </span>

      <SkipAD class={style.fake} />
    </div>
  );
};

ForthActions.displayName = "ForthActions";
