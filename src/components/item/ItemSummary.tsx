import style from "./ItemSummary.module.scss";
import { defineComponent, onMounted, PropType, ref } from "vue";
import { FloatButton } from "../../shared/buttons/FloatButton";
import { http } from "../../shared/HttpClient";
import { Button } from "../../shared/buttons/Button";

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
    const items = ref<Item[]>([]);
    const hasMore = ref(false);
    const page = ref(0);
    const fetchItems = async () => {
      if (!props.startDate || !props.endDate) {
        return;
      }
      const response = await http.get<Resources<Item>>("/items", {
        happen_after: props.startDate,
        happen_before: props.endDate,
        page: page.value + 1,
        _mock: "itemIndex",
      });
      const { resources, pager } = response.data;
      items.value?.push(...resources);
      hasMore.value =
        (pager.page - 1) * pager.per_page + resources.length < pager.count;
      page.value += 1;
    };
    onMounted(fetchItems);

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

        <div class={style.more}>
          {hasMore.value ? (
            <Button onClick={fetchItems}>向下滑动加载更多</Button>
          ) : (
            <span>没有更多</span>
          )}
        </div>
        <FloatButton iconName="add" />
      </div>
    );
  },
});
