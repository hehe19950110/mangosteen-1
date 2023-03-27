import { defineComponent, PropType, reactive } from "vue";
import { LayoutNavBar } from "../../layouts/LayoutNavBar";
import { Button } from "../../shared/buttons/Button";
import { Icon } from "../../shared/Icon";
import { Rules, validate } from "../../shared/validate";
import style from "./Tag.module.scss";
import { TagForm } from "./TagForm";

export const TagEdit = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      name: "",
      sign: "",
    });
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({});
    const onSubmit = (e: Event) => {
      const rules: Rules<typeof formData> = [
        { key: "name", type: "required", message: "必填" },
        {
          key: "name",
          type: "pattern",
          regex: /^.{1,4}$/,
          message: "只能填 1 ~ 4 个字符",
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
          default: () => (
            <>
              <TagForm />

              <div class={style.actions}>
                <Button
                  level="danger"
                  class={style.removeTags}
                  onClick={() => {}}
                >
                  删除标签
                </Button>

                <Button
                  level="danger"
                  class={style.removeTagsAndItems}
                  onClick={() => {}}
                >
                  删除标签和记账
                </Button>
              </div>
            </>
          ),
        }}
      </LayoutNavBar>
    );
  },
});
