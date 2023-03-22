import { LayoutNavBar } from "../../layouts/LayoutNavBar";
import { defineComponent, PropType, ref } from "vue";
import style from "./ItemCreate.module.scss";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refKind = ref("支出");
    return () => (
      <LayoutNavBar>
        {{
          title: () => "记一笔",
          icon: () => <Icon name="left" class={style.navIcon} />,
          default: () => (
            <>
              <Tabs v-model:selected={refKind.value}>
                <Tab name="支出">支出列表</Tab>
                <Tab name="收入">收入列表</Tab>
              </Tabs>
              <div class={style.inputPad_wrapper}>
                <InputPad />
              </div>
            </>
          ),
        }}
      </LayoutNavBar>
    );
  },
});
