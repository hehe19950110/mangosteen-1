import { defineComponent, PropType } from "vue";
import { Charts } from "../components/statistics/Charts";
import { LayoutTimeTabs } from "../layouts/LayoutTimeTabs";

export const StatisticsPage = defineComponent({
  setup: (props, context) => {
    return () => (
      <LayoutTimeTabs
        rerenderOnSwitchTab={true}
        component={Charts}
        hideThisYear={true}
      />
    );
  },
});
