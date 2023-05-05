import { defineComponent, PropType, reactive } from "vue";
import { LayoutNavBar } from "../../layouts/LayoutNavBar";
import { BackIcon } from "../../shared/Icon/BackIcon";
import { TagForm } from "./TagForm";

export const TagCreate = defineComponent({
  setup: (props, context) => {
    return () => (
      <LayoutNavBar>
        {{
          title: () => "新建标签",
          icon: () => <BackIcon />,
          default: () => <TagForm />,
        }}
      </LayoutNavBar>
    );
  },
});
