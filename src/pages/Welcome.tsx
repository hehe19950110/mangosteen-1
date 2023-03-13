import { defineComponent, ref, VNode, Transition, watchEffect, } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView, useRoute, useRouter } from 'vue-router';
import style from './Welcome.module.scss';
import { useSwipe } from '../hooks/useSwipe';
import { throttle } from '../shared/throttle';

const pushMap: Record<string, string> = {
  'Welcome1': '/welcome/2',
  'Welcome2': '/welcome/3',
  'Welcome3': '/welcome/4',
  'Welcome4': '/start',
}

export const Welcome = defineComponent({
  setup: (props, context) => {
    const main = ref<HTMLElement>();
    const { direction, swiping } = useSwipe(main, { beforeStart: e => e.preventDefault() });
    const route = useRoute();
    const router = useRouter();
    const replace = throttle( () => {
      const name = (route.name || 'Welcome1').toString();
      router.replace(pushMap[name]);
    }, 500);
    watchEffect( () => {
      if (swiping.value && direction.value === 'left') {
        replace();
      }
    }
    );

    return () => (
      <div class={style.wrapper}>
        <header>
          {/* <img src={logo} /> */}
          <svg>
            <use xlinkHref='#mangosteen'></use>
          </svg>
          <h1>山竹app</h1>
        </header>

        <main class={style.main} ref={main}>
          <RouterView name='main'>
            {({ Component: X, route: R }: { Component: VNode, route: RouteLocationNormalizedLoaded }) =>
              <Transition enterFromClass={style.slide_fade_enter_from} 
                          enterActiveClass={style.slide_fade_enter_active}
                          leaveToClass={style.slide_fade_leave_to} 
                          leaveActiveClass={style.slide_fade_leave_active}>
                {X}
              </Transition>
            }
          </RouterView>
        </main>

        <footer>
          <RouterView name="footer" />
        </footer>
      </div>
    )
  }
})
