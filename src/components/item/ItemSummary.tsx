import style from "./ItemSummary.module.scss";
import { defineComponent, PropType } from "vue";
import { FloatButton } from "../../shared/buttons/FloatButton";

export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: true,
    },
    endDate: {
      type: String as PropType<string>,
      required: true,
    },
  },

  setup: (props, context) => {
    return () => (
      <div class={style.wrapper}>
        <ul class={style.total}>
          <li>
            <span>收入</span>
            <span>100</span>
          </li>
          <li>
            <span>支出</span>
            <span>109</span>
          </li>
          <li>
            <span>净收入</span>
            <span>-9</span>
          </li>
        </ul>

        <ol class={style.list}>
          <li>
            <div class={style.sign}>
              <span> ￥ </span>
            </div>
            <div class={style.text}>
              <div class={style.tagAndAmount}>
                <span class={style.tag}>工资</span>
                <span class={style.amount}>￥1234</span>
              </div>
              <div class={style.time}>2020-01-01 12:00</div>
            </div>
          </li>

          <li>
            <div class={style.sign}>
              <span> ￥ </span>
            </div>
            <div class={style.text}>
              <div class={style.tagAndAmount}>
                <span class={style.tag}>工资</span>
                <span class={style.amount}>￥1234</span>
              </div>
              <div class={style.time}>2020-01-01 12:00</div>
            </div>
          </li>

          <li>
            <div class={style.sign}>
              <span> ￥ </span>
            </div>
            <div class={style.text}>
              <div class={style.tagAndAmount}>
                <span class={style.tag}>工资</span>
                <span class={style.amount}>￥1234</span>
              </div>
              <div class={style.time}>2020-01-01 12:00</div>
            </div>
          </li>

          <li>
            <div class={style.sign}>
              <span> ￥ </span>
            </div>
            <div class={style.text}>
              <div class={style.tagAndAmount}>
                <span class={style.tag}>工资</span>
                <span class={style.amount}>￥1234</span>
              </div>
              <div class={style.time}>2020-01-01 12:00</div>
            </div>
          </li>

          <li>
            <div class={style.sign}>
              <span> ￥ </span>
            </div>
            <div class={style.text}>
              <div class={style.tagAndAmount}>
                <span class={style.tag}>工资</span>
                <span class={style.amount}>￥1234</span>
              </div>
              <div class={style.time}>2020-01-01 12:00</div>
            </div>
          </li>

          <li>
            <div class={style.sign}>
              <span> ￥ </span>
            </div>
            <div class={style.text}>
              <div class={style.tagAndAmount}>
                <span class={style.tag}>工资</span>
                <span class={style.amount}>￥1234</span>
              </div>
              <div class={style.time}>2020-01-01 12:00</div>
            </div>
          </li>

          <li>
            <div class={style.sign}>
              <span> ￥ </span>
            </div>
            <div class={style.text}>
              <div class={style.tagAndAmount}>
                <span class={style.tag}>工资</span>
                <span class={style.amount}>￥1234</span>
              </div>
              <div class={style.time}>2020-01-01 12:00</div>
            </div>
          </li>
        </ol>

        <div class={style.more}>向下滑动加载更多</div>
        <FloatButton iconName="add" />
      </div>
    );
  },
});
