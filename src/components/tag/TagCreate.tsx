import { defineComponent, PropType, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { LayoutNavBar } from "../../layouts/LayoutNavBar";
import { BackIcon } from "../../shared/Icon/BackIcon";
import { Icon } from "../../shared/Icon/Icon";
import { Rules, validate } from "../../shared/validate";
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
