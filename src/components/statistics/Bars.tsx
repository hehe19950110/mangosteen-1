import { computed, defineComponent, PropType, reactive } from "vue";
import style from "./Bars.module.scss";

export const Bars = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const data3 = reactive([
      // reactive 可响应的数据； 需要确定以下数据 后端能提供，不能则需要修改代码
      { tag: { id: 1, name: "房租", sign: "￥" }, amount: 2300 },
      { tag: { id: 2, name: "吃饭", sign: "￥" }, amount: 1500 },
      { tag: { id: 3, name: "购物", sign: "￥" }, amount: 1000 },
      { tag: { id: 4, name: "日用", sign: "￥" }, amount: 500 },
      { tag: { id: 5, name: "通讯", sign: "￥" }, amount: 300 },
    ]);
    // betterData3 函数用来计算 data3 函数中 数据的百分比
    const betterData3 = computed(() => {
      // 求和整体金额
      const total = data3.reduce((sum, item) => sum + item.amount, 0);
      // Math.round() 方法 用来四舍五入
      return data3.map((item) => ({
        ...item,
        percent: Math.round((item.amount / total) * 100) + "%",
      }));
    });

    return () => (
      <div class={style.wrapper}>
        {betterData3.value.map(({ tag, amount, percent }) => {
          return (
            <div class={style.topItem}>
              <div class={style.sign}>{tag.sign}</div>

              <div class={style.bar_wrapper}>
                <div class={style.bar_text}>
                  <span>
                    {" "}
                    {tag.name} - {percent}{" "}
                  </span>
                  <span> ￥{amount} </span>
                </div>

                <div class={style.bar}>
                  <div class={style.bar_inner}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
});
