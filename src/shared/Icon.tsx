import { defineComponent, PropType } from 'vue';
import style from './Icon.module.scss';

// interface Props {
//   name: 'add' | 'chart' | 'clock' | 'cloud' | 'mangosteen' | 'pig';
// }

export type IconName = 'add' | 'chart' | 'clock' | 'cloud' | 'mangosteen' | 'pig'

export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<IconName>,
      required: true,
    }
  },
  setup: (props, context) => {
    return () => (
      <svg class={style.icon}>
        <use xlinkHref={'#' + props.name}></use>
      </svg>
    )
  }
})
