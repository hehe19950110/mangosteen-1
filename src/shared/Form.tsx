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

  setup: (props, context) => {
    const refDateVisible = ref(false);
    const content = computed(() => {
      switch (props.type) {
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

        case "emojiSelect":
          return (
            <EmojiSelect
              modelValue={props.modelValue?.toString()}
              onUpdateModelValue={(value) =>
                context.emit("update:modelValue", value)
              }
              class={[style.formItem, style.emojiList, style.error]}
            />
          );

        case "date":
          return (
            <>
              <input
                readonly={true}
                value={props.modelValue}
                onClick={() => {
                  refDateVisible.value = true;
                }}
                class={[style.formItem, style.input]}
              />

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
