import { defineComponent, PropType  } from 'vue';
import style from './Tabs.module.scss';

export const Tabs = defineComponent({ 
  props: {
    selected: {
      type: String as PropType<string>,
      required: false,
    },
    // onUpdateSelected: {
    //   type: Function as PropType<(name: string) => void>,
    //   required: false,
    // }
  },
  setup : (props,context) => { 
    return () => {
      /*
      const array = context.slots.default?.();
      if (!array) return () => null;
      for (let i = 0; i < array.length; i++) {
        if (array[i].type !== Tab) {
          throw new Error('<Tabs> only accepts <Tab> as children')
        }
      };
      return <div>tabs</div>
      */
      const tabs = context.slots.default?.()
      if (!tabs) return () => null
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].type !== Tab) {
          throw new Error('<Tabs> only accepts <Tab> as children')
        }
      };

      return (
        <div class={style.tabs}>
          <ol class={style.tabs_nav}>
            {tabs.map(item =>
              <li class={item.props?.name === props.selected ? style.selected : ''}
                  onClick={() => context.emit('update:selected', item.props?.name)}>
                {item.props?.name}
              </li>
            )}
          </ol>

          <div>
            {tabs.find(item => item.props?.name === props.selected)}
          </div>
        </div>
      );
    };
  }
});

export const Tab = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div>
        {context.slots.default?.()}
      </div>
    )
  }
})
