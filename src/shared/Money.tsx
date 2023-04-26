import { defineComponent, PropType } from "vue";

export const Money = defineComponent({
  props: {
    value: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  setup: (props, context) => {
    const addZero = (n: number) => {
      const nString = n.toString();
      const dotIndex = nString.indexOf(".");
      if (dotIndex < 0) {
        // 如果 没有小数点 就在后面加 .00
        return nString + ".00";
      } else if (nString.substring(dotIndex).length === 2) {
        // 使用 substring() 截取小数点后面的数位
        return nString + "0";
      } else {
        return nString;
      }
    };
    return () => (
      /* <span>{props.value / 100}</span> */
      <span>{addZero(props.value / 100)}</span>
    );
  },
});
