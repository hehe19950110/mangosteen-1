import { defineComponent, PropType, reactive } from "vue";
import { LayoutNavBar } from "../../layouts/LayoutNavBar";
import { Button } from "../../shared/buttons/Button";
import { EmojiSelect } from "../../shared/EmojiSelect";
import { Icon } from "../../shared/Icon";
import { Rules, validate } from "../../shared/validate";
import style from "./Tag.module.scss";
import { TagForm } from "./TagForm";

export const TagCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const formData = reactive({
      name: "",
      sign: "",
    });
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({});
    const onSubmit = (e: Event) => {
      // 明确效验规则：
      const rules: Rules<typeof formData> = [
        // 每一种规则 只能描述一种信息
        { key: "name", type: "required", message: "必填" },
        {
          key: "name",
          type: "pattern",
          regex: /^.{1,4}$/,
          message: "只能填1 ~ 4个字符",
        },
        { key: "sign", type: "required", message: "必填" },
      ];
      Object.assign(errors, {
        name: undefined,
        sign: undefined,
      });
      Object.assign(errors, validate(formData, rules));
      e.preventDefault();
    };

    return () => (
      <LayoutNavBar>
        {{
          title: () => "新建标签",
          icon: () => <Icon name="left" onClick={() => {}} />,
          default: () => <TagForm />,
        }}
      </LayoutNavBar>
    );
  },
});
