import { defineComponent, PropType, ref } from "vue";
import { RouterLink } from "vue-router";
import { Icon } from "./Icon";
import style from "./Overlay.module.scss";

export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>,
    },
  },

  setup: (props, context) => {
    const close = () => {
      props.onClose?.();
    };
    const onClickSignIn = () => {};

    return () => (
      <>
        <div class={style.mask} onClick={close}></div>

        <div class={style.overlay}>
          <section class={style.currentUser} onClick={onClickSignIn}>
            <h2>未登录</h2>
            <p>点击这里登录</p>
          </section>

          <nav>
            <ul class={style.action_list}>
              <li>
                <RouterLink to="/statistics" class={style.action}>
                  <Icon name="chartphoto" class={style.icon} />
                  <span>统计图表</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/export" class={style.action}>
                  <Icon name="export" class={style.icon} />
                  <span>导出数据</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/notify" class={style.action}>
                  <Icon name="notify" class={style.icon} />
                  <span>记账提醒</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  },
});

export const OverlayIcon = defineComponent({
  setup: (props, context) => {
    const refOverlayVisible = ref(false);
    const onClickMenu = () => {
      refOverlayVisible.value = !refOverlayVisible.value;
    };

    return () => (
      <>
        <Icon name="menu" class={style.icon} onClick={onClickMenu} />
        {refOverlayVisible.value && (
          <Overlay onClose={() => (refOverlayVisible.value = false)} />
        )}
      </>
    );
  },
});
