import { defineComponent, PropType } from "vue";
import { Charts } from "../components/statistics/Charts";
import { LayoutTimeTabs } from "../layouts/LayoutTimeTabs";
import style from "./StatisticsPage.module.scss";

export const StatisticsPage = defineComponent({
  setup: (props, context) => {
    return () => <LayoutTimeTabs component={Charts} />;
  },
});
