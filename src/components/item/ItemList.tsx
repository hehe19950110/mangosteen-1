import { Overlay } from "vant";
import { defineComponent, reactive, ref, watchEffect } from "vue";
import { LayoutNavBar } from "../../layouts/LayoutNavBar";
import { LayoutTimeTabs } from "../../layouts/LayoutTimeTabs";
import { Form, FormItem } from "../../shared/Form";
import { Icon } from "../../shared/Icon";
import { OverlayIcon } from "../../shared/Overlay";
import { Tab, Tabs } from "../../shared/Tabs";
import { Time } from "../../shared/time";
import style from "./ItemList.module.scss";
import { ItemSummary } from "./ItemSummary";

export const ItemList = defineComponent({
  setup: (props, context) => {
    return () => <LayoutTimeTabs component={ItemSummary} />;
  },
});
