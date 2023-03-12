import { defineComponent, ref, VNode, Transition, } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView } from 'vue-router';
import style from './Welcome.module.scss';
import logo from '../assets/icons/mangosteen.svg'

export const Welcome = defineComponent({
  setup: (props, context) => {
    const main = ref<HTMLElement | null>(null)

    return () => (
      <div class={style.wrapper}>
        <header>
          {/* <img src={logo} /> */}
        <svg>
          <use xlinkHref='#mangosteen'></use>
        </svg>
          <h1>山竹app</h1>
        </header>

        <main class={style.main}>
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
