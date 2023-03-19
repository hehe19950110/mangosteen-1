import { defineComponent, PropType } from 'vue';
import style from './Icon.module.scss';

export type IconName = 'add' | 'chart' | 'clock' | 'cloud' | 'mangosteen' | 'pig' | 'menu' | 'chartphoto' | 'notify' | 'export'

export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<IconName>,
      required: true,
    },
    onClick: {
      type: Function as PropType<(e:MouseEvent) => void>
    }
  },

  setup: (props, context) => {
    return () => (
      <svg class={style.icon} onClick={props.onClick}>
        <use xlinkHref={'#' + props.name}></use>
      </svg>
    )
  }
})
