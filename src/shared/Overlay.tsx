import { Dialog } from "vant";
import { defineComponent, onMounted, PropType, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { Icon } from "./Icon/Icon";
import { mePromise } from "./me";
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
    const route = useRoute();
    const me = ref<User>();
    onMounted(async () => {
      const response = await mePromise;
      me.value = response?.data.resource;
    });
    const onSignOut = async () => {
      await Dialog.confirm({
        title: "确认",
        message: "你真的要退出登录吗？",
      });
      localStorage.removeItem("jwt");
    };

    return () => (
      <>
        <div class={style.mask} onClick={close}></div>

        <div class={style.overlay}>
          <section class={style.currentUser}>
            {me.value ? (
              <div>
                <h2 class={style.email}>{me.value.email}</h2>
                <p onClick={onSignOut}>点击这里退出登录</p>
              </div>
            ) : (
              <RouterLink to={`/sign_in?return_to=${route.fullPath}`}>
                <h2>未登录</h2>
                <p>点击这里登录</p>
              </RouterLink>
            )}
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

{
  /* 
  {refOverlayVisible.value &&
    <Overlay onClose={() => refOverlayVisible.value = !refOverlayVisible.value} />
  } 等同于：

  {refOverlayVisible.value && (
    <Overlay onClose={() => (refOverlayVisible.value = false)} />
  )}
*/
}
