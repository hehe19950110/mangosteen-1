import { DatetimePicker, Popup } from "vant";
import { computed, defineComponent, PropType, ref } from "vue";
import { EmojiSelect } from "./EmojiSelect";
import style from "./Form.module.scss";
import { Time } from "./time";

export const Form = defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>,
    },
  },

  setup: (props, context) => {
    return () => (
      <form class={style.form} onSubmit={props.onSubmit}>
        {context.slots.default?.()}
      </form>
    );
  },
});

export const FormItem = defineComponent({
  props: {
    label: {
      type: String,
    },
    modelValue: {
      type: [String, Number],
    },
    type: {
      type: String as PropType<"text" | "emojiSelect" | "date">,
    },
    error: {
      type: String,
    },
  },
  emits: ["update:modelValue"],

  setup: (props, context) => {
    const refDateVisible = ref(false);
    const content = computed(() => {
      switch (props.type) {
        // 如果 type 是 text，那么 content 就是 return 出 <input>
        case "text":
          return (
            <input
              value={props.modelValue}
              onInput={(e: any) =>
                context.emit("update:modelValue", e.target.value)
              }
              class={[style.formItem, style.input]}
            />
          );

        // 如果 type 是 emojiSelect，那么 content 就是 return 出 <EmojiSelect>
        case "emojiSelect":
          return (
            <EmojiSelect
              /*v-modal={props.modelValue}      报错：props的值是只读的，不能修改props的值；
                所以 定义 onUpdateModelValue 来获取 modelValue 的更新
              */
              modelValue={props.modelValue?.toString()}
              onUpdateModelValue={(value) =>
                context.emit("update:modelValue", value)
              }
              class={[style.formItem, style.emojiList, style.error]}
            />
          );

        // 如果 type 是 date，那么 content 就是 return 出 日期组件
        case "date":
          return (
            <>
              <input
                readonly={true}
                value={props.modelValue}
                onClick={() => {
                  // 点击时，调出 弹窗时间框
                  refDateVisible.value = true;
                }}
                class={[style.formItem, style.input]}
              />
              {/*
                <input>里的 value={props.modelValue} 与 <Popup - DatetimePicker> 里的 value={props.modelValue} 展示的是同一个值；
                onConfirm 确认的时候 就把这个值输出去， 同时 关掉 Popup；
                onCancel 取消的时候，就只是 关掉 Popup
              */}
              <Popup position="bottom" v-model:show={refDateVisible.value}>
                <DatetimePicker
                  value={props.modelValue}
                  type="date"
                  title="选择年月日"
                  onConfirm={(date: Date) => {
                    context.emit("update:modelValue", new Time(date).format());
                    refDateVisible.value = false;
                  }}
                  onCancel={() => (refDateVisible.value = false)}
                />
              </Popup>
            </>
          );

        // 如果 type 没写，那么 直接展出插槽 context.slots.default?.();
        case undefined:
          return context.slots.default?.();
      }
    });

    return () => {
      return (
        <div class={style.formRow}>
          <label class={style.formLabel}>
            {props.label && (
              <span class={style.formItem_name}>{props.label}</span>
            )}

            <div class={style.formItem_value}>{content.value}</div>

            {props.error && (
              <div class={style.formItem_errorHint}>
                <span>{props.error}</span>
              </div>
            )}
          </label>
        </div>
      );
    };
  },
});
