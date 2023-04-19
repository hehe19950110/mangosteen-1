import { defineComponent } from "vue";
import { LayoutTimeTabs } from "../../layouts/LayoutTimeTabs";
import { ItemSummary } from "./ItemSummary";

export const ItemList = defineComponent({
  setup: (props, context) => {
    return () => <LayoutTimeTabs component={ItemSummary} />;
  },
});
