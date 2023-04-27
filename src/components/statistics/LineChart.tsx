import { defineComponent, onMounted, PropType, ref, watch } from "vue";
import * as echarts from "echarts";
import style from "./LineChart.module.scss";
import { Time } from "../../shared/time";
import { getMoney } from "../../shared/Money";

const echartsOption = {
  tooltip: {
    show: true,
    trigger: "axis",
    formatter: ([item]: any) => {
      const [x, y] = item.data;
      return `${new Time(new Date(x)).format("YYYY年MM月DD日")} ￥${getMoney(
        y
      )}`;
    },
  },
  grid: [{ left: 16, top: 20, right: 16, bottom: 20 }],
  xAxis: {
    type: "time",
    boundaryGap: ["3%", "0%"],
    axisLabel: {
      formatter: (value: string) => new Time(new Date(value)).format("MM-DD"),
    },
    axisTick: {
      alignWithLabel: true,
    },
  },
  yAxis: {
    show: true,
    type: "value",
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
      },
    },
    axisLabel: {
      show: false,
    },
  },
};

export const LineChart = defineComponent({
  props: {
    data: {
      type: Array as PropType<[string, number][]>,
      required: true,
    },
  },

  setup: (props, context) => {
    const refDiv = ref<HTMLDivElement>();
    let chart: echarts.ECharts | undefined = undefined;

    onMounted(() => {
      if (refDiv.value === undefined) {
        return;
      }
      /*
      // 初始化 echarts 数据：
      var myChart = echarts.init(refDiv.value);
      // 绘制图表（直接在 echarts 里找模板）
      myChart.setOption({
        grid: [{ left: 0, top: 0, right: 0, bottom: 20 }],
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      });
    });
*/
      // 初始化 echarts 数据：
      chart = echarts.init(refDiv.value);
      // 绘制图表
      chart.setOption({
        ...echartsOption,
        series: [
          {
            data: props.data,
            type: "line",
          },
        ],
      });
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
    return () => <div ref={refDiv} class={style.wrapper}></div>;
  },
});
