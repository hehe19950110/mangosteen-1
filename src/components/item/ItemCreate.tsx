import { LayoutNavBar } from "../../layouts/LayoutNavBar";
import { defineComponent, onMounted, PropType, ref } from "vue";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import style from "./ItemCreate.module.scss";
import { http } from "../../shared/HttpClient";
import { useTags } from "../../shared/useTags";
import { Tags } from "./Tags";

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refKind = ref("支出");

    const {
      tags: incomeTags,
      hasMore: hasMore2,
      fetchTags: fetchTags2,
    } = useTags((page) => {
      return http.get<Resources<Tag>>("/tags", {
        kind: "income",
        page: page + 1,
        _mock: "tagIndex",
      });
    });

    /*
    onMounted(async () => {
      // response 除了接受普通的字符串函数 "/tags", 还接受类型参数<{ resources: Tag[] }>
      const response = await http.get<{ resources: Tag[] }>("/tags", {
        kind: "expenses",
        _mock: "tagIndex",
      });
      refExpensesTags.value = response.data.resources;
    });
    const refExpensesTags = ref<Tag[]>([
      { id: 1, name: "餐饮", sign: "￥", kind: "expenses" },  //类型 尽量不要用type，是很多编程语言内置的一个API，而是使用 kind、kind 等来表示类型
    ]);

    onMounted(async () => {
      const response = await http.get<{ resources: Tag[] }>("/tags", {
        kind: "income",
        _mock: "tagIndex",
      });
      refIncomeTags.value = response.data.resources;
    });
    const refIncomeTags = ref<Tag[]>([
      { id: 1, name: "工资", sign: "￥", kind: "income" },
    ]);
*/

    return () => (
      <LayoutNavBar class={style.layout}>
        {{
          title: () => "记一笔",
          icon: () => <Icon name="left" class={style.navIcon} />,
          default: () => (
            <>
              <div class={style.wrapper}>
                <Tabs v-model:selected={refKind.value} class={style.tabs}>
                  <Tab name="支出">
                    <Tags kind="expenses" />
                  </Tab>

                  <Tab name="收入">
                    <Tags kind="income" />
                  </Tab>
                </Tabs>

                <div class={style.inputPad_wrapper}>
                  <InputPad />
                </div>
              </div>
            </>
          ),
        }}
      </LayoutNavBar>
    );
  },
});
