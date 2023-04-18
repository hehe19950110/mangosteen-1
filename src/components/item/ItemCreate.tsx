import { LayoutNavBar } from "../../layouts/LayoutNavBar";
import { defineComponent, onMounted, PropType, ref } from "vue";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import style from "./ItemCreate.module.scss";
import { http } from "../../shared/HttpClient";

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refKind = ref("支出");
    onMounted(async () => {
      // response 除了接受普通的字符串函数 "/tags", 还接受类型参数<{ resources: Tag[] }>
      const response = await http.get<{ resources: Tag[] }>("/tags", {
        kind: "expenses",
        _mock: "tagIndex",
      });
      refExpensesTags.value = response.data.resources;
    });
    const refExpensesTags = ref<Tag[]>([
      /* 类型 尽量不要用type，是很多编程语言内置的一个API，而是使用 kind、kind 等来表示类型
      { id: 1, name: "餐饮", sign: "￥", kind: "expenses" },
      { id: 2, name: "购物", sign: "￥", kind: "expenses" },
      { id: 3, name: "日用", sign: "￥", kind: "expenses" },
      { id: 4, name: "交通", sign: "￥", kind: "expenses" },
      { id: 5, name: "水果", sign: "￥", kind: "expenses" },
      { id: 6, name: "蔬菜", sign: "￥", kind: "expenses" },
      { id: 7, name: "零食", sign: "￥", kind: "expenses" },
      { id: 8, name: "运动", sign: "￥", kind: "expenses" },
      { id: 9, name: "娱乐", sign: "￥", kind: "expenses" },
      { id: 10, name: "通讯", sign: "￥", kind: "expenses" },
      { id: 11, name: "服饰", sign: "￥", kind: "expenses" },
      { id: 12, name: "家居", sign: "￥", kind: "expenses" },
      { id: 13, name: "孩子", sign: "￥", kind: "expenses" },
      { id: 14, name: "长辈", sign: "￥", kind: "expenses" },
      { id: 15, name: "社交", sign: "￥", kind: "expenses" },
      { id: 16, name: "旅行", sign: "￥", kind: "expenses" },
*/
    ]);

    onMounted(async () => {
      const response = await http.get<{ resources: Tag[] }>("/tags", {
        kind: "income",
        _mock: "tagIndex",
      });
      refIncomeTags.value = response.data.resources;
    });
    const refIncomeTags = ref<Tag[]>([
      /*
      { id: 1, name: "工资", sign: "￥", kind: "income" },
      { id: 2, name: "兼职", sign: "￥", kind: "income" },
      { id: 3, name: "彩票", sign: "￥", kind: "income" },
      { id: 4, name: "基金", sign: "￥", kind: "income" },
      { id: 5, name: "礼金", sign: "￥", kind: "income" },
      { id: 6, name: "其他", sign: "￥", kind: "income" },
      */
    ]);

    return () => (
      <LayoutNavBar class={style.layout}>
        {{
          title: () => "记一笔",
          icon: () => <Icon name="left" class={style.navIcon} />,
          default: () => (
            <>
              <div class={style.wrapper}>
                <Tabs v-model:selected={refKind.value} class={style.tabs}>
                  <Tab name="支出" class={style.tags_wrapper}>
                    <div class={style.tag}>
                      <div class={style.sign}>
                        <Icon name="add" class={style.createTag} />
                      </div>
                      <div class={style.name}>新增</div>
                    </div>
                    {refExpensesTags.value.map((tag) => (
                      <div class={[style.tag, style.selected]}>
                        <div class={style.sign}> {tag.sign} </div>
                        <div class={style.name}> {tag.name} </div>
                      </div>
                    ))}
                  </Tab>

                  <Tab name="收入" class={style.tags_wrapper}>
                    <div class={style.tag}>
                      <div class={style.sign}>
                        <Icon name="add" class={style.createTag} />
                      </div>
                      <div class={style.name}>新增</div>
                    </div>
                    {refIncomeTags.value.map((tag) => (
                      <div class={[style.tag, style.selected]}>
                        <div class={style.sign}> {tag.sign} </div>
                        <div class={style.name}> {tag.name} </div>
                      </div>
                    ))}
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
