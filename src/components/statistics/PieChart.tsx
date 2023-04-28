import { defineComponent, onMounted, PropType, ref, watch } from "vue";
import style from "./PieChart.module.scss";
import * as echarts from "echarts";
import { getMoney } from "../../shared/Money";

const defaultOption = {
  // grid: [{ left: 0, top: 0, right: 0, bottom: 20 }],
  // series: [
  //   {
  //     name: "Access From",
  //     type: "pie",
  //     radius: "50%",
  //     emphasis: {
  //       itemStyle: {
  //         shadowBlur: 10,
  //         shadowOffsetX: 0,
  //         shadowColor: "rgba(0, 0, 0, 0.5)",
  //       },
  //     },
  //   },
  // ],
  tooltip: {
    trigger: "item",
    formatter: (x: { name: string; value: number; percent: number }) => {
      const { name, value, percent } = x;
      return `${name}: ￥${getMoney(value)} 占比 ${percent}%`;
    },
  },
  grid: [{ left: 0, top: 0, right: 0, bottom: 20 }],
  series: [
    {
      type: "pie",
      radius: "80%",
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};

export const PieChart = defineComponent({
  props: {
    data: {
      type: Array as PropType<{ name: string; value: number }[]>,
    },
  },
  setup: (props, context) => {
    const refDiv2 = ref<HTMLDivElement>();
    let chart: echarts.ECharts | undefined = undefined;
    onMounted(() => {
      if (refDiv2.value === undefined) {
        return;
      }
      chart = echarts.init(refDiv2.value);
      chart.setOption(defaultOption);
    });
    watch(
      () => props.data,
      () => {
        chart?.setOption({
          series: [
            {
              data: props.data,
            },
          ],
        });
      }
    );

    return () => <div ref={refDiv2} class={style.wrapper}></div>;
  },
});
