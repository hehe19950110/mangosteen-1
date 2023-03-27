import { LayoutNavBar } from "../../layouts/LayoutNavBar";
import { defineComponent, PropType, ref } from "vue";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import style from "./ItemCreate.module.scss";

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refKind = ref("支出");
    const refExpensesTags = ref([
      // 类型 尽量不要用type，是很多编程语言内置的一个API，而是使用 category、kind 等来表示类型
      { id: 1, name: "餐饮", sign: "￥", category: "expenses" },
      { id: 2, name: "购物", sign: "￥", category: "expenses" },
      { id: 3, name: "日用", sign: "￥", category: "expenses" },
      { id: 4, name: "交通", sign: "￥", category: "expenses" },
      { id: 5, name: "水果", sign: "￥", category: "expenses" },
      { id: 6, name: "蔬菜", sign: "￥", category: "expenses" },
      { id: 7, name: "零食", sign: "￥", category: "expenses" },
      { id: 8, name: "运动", sign: "￥", category: "expenses" },
      { id: 9, name: "娱乐", sign: "￥", category: "expenses" },
      { id: 10, name: "通讯", sign: "￥", category: "expenses" },
      { id: 11, name: "服饰", sign: "￥", category: "expenses" },
      { id: 12, name: "美容", sign: "￥", category: "expenses" },
      { id: 13, name: "租房", sign: "￥", category: "expenses" },
      { id: 14, name: "家居", sign: "￥", category: "expenses" },
      { id: 15, name: "孩子", sign: "￥", category: "expenses" },
      { id: 16, name: "长辈", sign: "￥", category: "expenses" },
      { id: 17, name: "社交", sign: "￥", category: "expenses" },
      { id: 18, name: "旅行", sign: "￥", category: "expenses" },
      { id: 19, name: "烟酒", sign: "￥", category: "expenses" },
      { id: 20, name: "数码", sign: "￥", category: "expenses" },
      { id: 21, name: "汽车", sign: "￥", category: "expenses" },
      { id: 22, name: "医疗", sign: "￥", category: "expenses" },
      { id: 23, name: "书籍", sign: "￥", category: "expenses" },
      { id: 24, name: "学习", sign: "￥", category: "expenses" },
      { id: 25, name: "宠物", sign: "￥", category: "expenses" },
      { id: 26, name: "礼金", sign: "￥", category: "expenses" },
      { id: 27, name: "礼物", sign: "￥", category: "expenses" },
      { id: 28, name: "办公", sign: "￥", category: "expenses" },
      { id: 29, name: "维修", sign: "￥", category: "expenses" },
      { id: 30, name: "捐赠", sign: "￥", category: "expenses" },
      { id: 31, name: "彩票", sign: "￥", category: "expenses" },
      { id: 32, name: "快递", sign: "￥", category: "expenses" },
      { id: 33, name: "设置", sign: "￥", category: "expenses" },
    ]);
    const refIncomeTags = ref([
      { id: 1, name: "工资", sign: "￥", category: "income" },
      { id: 2, name: "兼职", sign: "￥", category: "income" },
      { id: 3, name: "彩票", sign: "￥", category: "income" },
      { id: 4, name: "基金", sign: "￥", category: "income" },
      { id: 5, name: "礼金", sign: "￥", category: "income" },
      { id: 6, name: "其他", sign: "￥", category: "income" },
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
