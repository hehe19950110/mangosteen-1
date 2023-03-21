import { defineComponent, onUpdated, PropType, ref  } from 'vue';
import { LayoutNavBar } from '../../layouts/LayoutNavBar';
import { Icon } from '../../shared/Icon';
import { Tab, Tabs } from '../../shared/Tabs';
import style from './ItemCreate.module.scss';

export const ItemCreate = defineComponent({ 
  props : { 
    name : { 
      type : String as PropType<string> 
    }
  },

  setup: (props, context) => {
    const refKind = ref('支出');  //默认是支出
    // const onUpdateSelected = (name : string) => refKind.value = name
    
    return () => (
      <LayoutNavBar>
        {{
          title: () => '记一笔',
          icon: () => <Icon name="left" class={style.navIcon} />,
          default: () => <>
            {/*<Tabs selected={refKind.value} onUpdateSelected = {name => refKind.value = name}>*/}
            <Tabs v-model:selected={refKind.value}>
              <Tab name="支出">
                <h3>支出列表</h3>
              </Tab>
              <Tab name="收入">
                <h3>收入列表</h3>
              </Tab>
            </Tabs>
          </>
        }}
      </LayoutNavBar>
    )
  }
})