import { DatetimePicker, Popup } from "vant";
import { computed, defineComponent, PropType, ref } from "vue";
import { Button } from "./buttons/Button";
import { EmojiSelect } from "./EmojiSelect";
import style from "./Form.module.scss";
import { getFriendlyError } from "./getFriendlyError";
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
      type: String as PropType<
        "text" | "emojiSelect" | "date" | "validationCode" | "select"
      >,
    },
    error: {
      type: String,
    },
    placeholder: String,
    options: Array as PropType<Array<{ value: string; text: string }>>,
    onClick: Function as PropType<() => void>,
    countFrom: {
      type: Number,
      default: 60,
    }, // 默认值是60
    disabled: Boolean,
  },
  emits: ["update:modelValue"],
  /*     v-model 中 "update:modelValue"
vue中子传父参数的方法共有两种：
1、子组件通过emit传输
2、通过自定义组件传输

vue3中，v-model绑定的不再是value，而是modelValue，接收的方法也不再是input，而是update:modelValue
指的是 “发射” 一个修改 props 的通知，告诉父组件自己去修改 props
  export default {
    props: ['modelValue'],
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      return () =>
        h(SomeComponent, {
          modelValue: props.modelValue,
          'onUpdate:modelValue': (value) => emit('update:modelValue', value)
        })
    }
  }
*/

  setup: (props, context) => {
    const refDateVisible = ref(false);

    /*倒计时：
    状态1：点击发送                      timer 不为空 就是状态2 
    状态2：
          60 ——> 0                     count
          disable true ——> falsse 
    结束后
    又恢复到发送 状态1
    */
    const timer = ref<number>();
    const count = ref<number>(props.countFrom);
    const isCounting = computed(() => !!timer.value); // 判断是否在倒计时
    const startCount = () =>
      (timer.value = setInterval(() => {
        count.value -= 1;
        if (count.value === 0) {
          clearInterval(timer.value); // 等于0时，清空倒计时
          timer.value = undefined; // 置空timer.value，让 isCounting 进入判断
          count.value = props.countFrom; // 把 count.value 重新归置为 默认值60
        }
      }, 1000));
    context.expose({ startCount: startCount });

    const content = computed(() => {
      switch (props.type) {
        // 如果 type 是 text，那么 content 就是 return 出 <input>
        case "text":
          return (
            <input
              value={props.modelValue}
              placeholder={props.placeholder}
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
                placeholder={props.placeholder}
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

        // 如果 type 是 validationCode，那么 content 就是 验证码输入码框 与 发送验证的button 组合。
        case "validationCode":
          return (
            <>
              <input
                class={[style.formItem, style.input, style.validationCodeInput]}
                placeholder={props.placeholder}
              />
              <Button
                disabled={isCounting.value || props.disabled}
                onClick={props.onClick}
                class={[
                  style.formItem,
                  style.button,
                  style.validationCodeButton,
                ]}
              >
                {isCounting.value
                  ? `${count.value}秒后可重新发送`
                  : "发送验证码"}
              </Button>
            </>
          );

        // 如果 type 是 select，那么 content 可以监听 onchange 事件， 更新事件名为 modelValue 的 option 变量
        case "select":
          return (
            <select
              class={[style.formItem, style.select]}
              value={props.modelValue}
              onChange={(e: any) => {
                context.emit("update:modelValue", e.target.value);
              }}
            >
              {props.options?.map((option) => (
                <option value={option.value}>{option.text}</option>
              ))}
            </select>
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
            {/* 如果error存在 就展示error 
                {props.error && (
                  <div class={style.formItem_errorHint}>
                    <span>{props.error ?? " "}</span>
                  </div>
                )}
                更改为 一直展示error:
                <span>{props.error ?? " "}</span>
            */}
            {props.error && (
              <div class={style.formItem_errorHint}>
                <span>
                  {props.error ? getFriendlyError(props.error) : "　"}
                </span>
              </div>
            )}
          </label>
        </div>
      );
    };
  },
});
