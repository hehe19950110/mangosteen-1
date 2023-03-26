import { defineComponent, PropType, reactive } from "vue";
import { LayoutNavBar } from "../../layouts/LayoutNavBar";
import { Button } from "../../shared/buttons/Button";
import { EmojiSelect } from "../../shared/EmojiSelect";
import { Icon } from "../../shared/Icon";
import { Rules, validate } from "../../shared/validate";
import style from "./TagCreate.module.scss";

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
      const rules: Rules<typeof formData> = [
        { key: "name", type: "required", message: "必填" },
        {
          key: "name",
          type: "pattern",
          regex: /^.{1,4}$/,
          message: "只能填1到4个字符",
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
            <form class={style.form}>
              <div class={style.formRow}>
                <label class={style.formLabel}>
                  <span class={style.formItem_name}>标签名</span>
                  <div class={style.formItem_value}>
                    <input
                      v-model={formData.name}
                      class={[style.formItem, style.input, style.error]}
                    ></input>
                  </div>
                  <div class={style.formItem_errorHint}>
                    <span>
                      必填:{errors["name"] ? errors["name"][0] : "　"}
                    </span>
                  </div>
                </label>
              </div>

              <div class={style.formRow}>
                <label class={style.formLabel}>
                  <span class={style.formItem_name}>符号{formData.sign}</span>
                  <div class={style.formItem_value}>
                    <EmojiSelect
                      v-model={formData.sign}
                      class={[style.formItem, style.emojiList, style.error]}
                    />
                  </div>
                </label>
              </div>

              <p class={style.tips}>记账时,长按标签进行编辑</p>
              <div class={style.formRow}>
                <div class={style.formItem_value}>
                  <Button class={[style.formItem, style.button]}>确定</Button>
                </div>
              </div>
            </form>
          ),
        }}
      </LayoutNavBar>
    );
  },
});
