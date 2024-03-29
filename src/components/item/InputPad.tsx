import { DatetimePicker, Popup } from "vant";
import { defineComponent, PropType, ref } from "vue";
import { Icon } from "../../shared/Icon/Icon";
import { Time } from "../../shared/time";
import style from "./InputPad.module.scss";

export const InputPad = defineComponent({
  props: {
    happenAt: String,
    amount: Number,
    onSubmit: {
      type: Function as PropType<() => void>,
    },
  },

  setup: (props, context) => {
    const appendText = (n: number | string) => {
      const nString = n.toString();
      const dotIndex = refAmount.value.indexOf("."); //小数点的位置
      if (refAmount.value.length >= 15) {
        return;
      }
      if (dotIndex >= 0 && refAmount.value.length - dotIndex > 2) {
        return;
      }

      if (nString === ".") {
        // 有小数点的情况：
        if (dotIndex >= 0) {
          return;
        }
      } else if (nString === "0") {
        // 没有小数点的情况：
        if (dotIndex === -1) {
          // 没小数点，但有0：
          if (refAmount.value === "0") {
            return;
          }
        }
      } else {
        if (refAmount.value === "0") {
          refAmount.value = "";
        }
      }
      refAmount.value += n.toString();
    };

    const buttons = [
      {
        text: "1",
        onClick: () => {
          appendText(1);
        },
      },
      {
        text: "2",
        onClick: () => {
          appendText(2);
        },
      },
      {
        text: "3",
        onClick: () => {
          appendText(3);
        },
      },
      {
        text: "4",
        onClick: () => {
          appendText(4);
        },
      },
      {
        text: "5",
        onClick: () => {
          appendText(5);
        },
      },
      {
        text: "6",
        onClick: () => {
          appendText(6);
        },
      },
      {
        text: "7",
        onClick: () => {
          appendText(7);
        },
      },
      {
        text: "8",
        onClick: () => {
          appendText(8);
        },
      },
      {
        text: "9",
        onClick: () => {
          appendText(9);
        },
      },
      {
        text: ".",
        onClick: () => {
          appendText(".");
        },
      },
      {
        text: "0",
        onClick: () => {
          appendText(0);
        },
      },
      {
        text: "清空",
        onClick: () => {
          refAmount.value = "0";
        },
      },
      // 将 "99.1" ==> 9910 ： parseFloat(refAmount.value) * 100)
      {
        text: "提交",
        onClick: () => {
          context.emit("update:amount", parseFloat(refAmount.value) * 100);
          props.onSubmit?.();
        },
      },
    ];

    const refDatePickerVisible = ref(false);
    const showDatePicker = () => (refDatePickerVisible.value = true);
    const hideDatePicker = () => (refDatePickerVisible.value = false);
    const setDate = (date: Date) => {
      context.emit("update:happenAt", date.toISOString()); //date.toISOString() 将日期对象转换为 ISO 格式的字符串
      hideDatePicker();
    };

    // 将 9900 ==> "99" ： (props.amount / 100).toString()
    const refAmount = ref(props.amount ? (props.amount / 100).toString() : "0");

    return () => (
      <>
        <div class={style.dateAndAmount}>
          <span class={style.date}>
            <Icon name="date" class={style.icon} />

            <span>
              <span onClick={showDatePicker}>
                {new Time(props.happenAt).format()}
              </span>
              <Popup
                position="bottom"
                v-model:show={refDatePickerVisible.value}
              >
                <DatetimePicker
                  modellValue={
                    props.happenAt ? new Date(props.happenAt) : new Date()
                  }
                  type="date"
                  title="选择年月日"
                  onConfirm={setDate}
                  onCancel={hideDatePicker}
                />
              </Popup>
            </span>
          </span>

          <span class={style.amount}>{refAmount.value}</span>
        </div>

        <div class={style.buttons}>
          {buttons.map((button) => (
            <button onClick={button.onClick}> {button.text} </button>
          ))}
        </div>
      </>
    );
  },
});
