import style from "./ItemSummary.module.scss";
import {
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
  watch,
} from "vue";
import { FloatButton } from "../../shared/buttons/FloatButton";
import { http } from "../../shared/HttpClient";
import { Button } from "../../shared/buttons/Button";
import { Money } from "../../shared/Money";
import { Datetime } from "../../shared/DateTime";
import { Center } from "../../shared/Center";
import { Icon } from "../../shared/Icon/Icon";
import { RouterLink } from "vue-router";

export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false,
    },
    endDate: {
      type: String as PropType<string>,
      required: false,
    },
  },

  setup: (props, context) => {
    const items = ref<Item[]>([]);
    const hasMore = ref(false);
    const page = ref(0);
    const fetchItems = async () => {
      // 先检查 如果 startDate 或者 endDate 不存在，直接return
      if (!props.startDate || !props.endDate) {
        return;
      }
      const response = await http.get<Resources<Item>>(
        "/items",
        {
          happen_after: props.startDate,
          happen_before: props.endDate,
          page: page.value + 1,
        },
        // get中 第二个参数是查询参数， 第三个参数 才是 config：
        { _mock: "itemIndex" }
      );
      const { resources, pager } = response.data;
      items.value?.push(...resources);
      hasMore.value =
        (pager.page - 1) * pager.per_page + resources.length < pager.count;
      page.value += 1;
    };
    onMounted(fetchItems);

    watch(
      () => [props.startDate, props.endDate],
      // 重置 items、hasMore、page：
      () => {
        items.value = [];
        hasMore.value = false;
        page.value = 0;
        fetchItems();
      }
    );

    const itemsBalance = reactive({
      expenses: 0,
      income: 0,
      balance: 0,
    });
    const fetchItemsBalance = async () => {
      if (!props.startDate || !props.endDate) {
        return;
      }
      const response = await http.get(
        "/items/balance",
        {
          happen_after: props.startDate,
          happen_before: props.endDate,
          page: page.value + 1,
        },
        {
          _mock: "itemIndexBalance",
          _autoLoading: true,
        }
      );
      Object.assign(itemsBalance, response.data);
    };
    onMounted(fetchItemsBalance);
    watch(
      () => [props.startDate, props.endDate],
      // 先把itemBalance 中的数据 重置为0：
      () => {
        Object.assign(itemsBalance, {
          expenses: 0,
          income: 0,
          balance: 0,
        });
        fetchItemsBalance();
      }
    );

    return () => (
      <div class={style.wrapper}>
        {items.value && items.value.length > 0 ? (
          <>
            <ul class={style.total}>
              <li>
                <span>收入</span>
                <Money value={itemsBalance.income} />
              </li>
              <li>
                <span>支出</span>
                <Money value={itemsBalance.expenses} />
              </li>
              <li>
                <span>净收入</span>
                <Money value={itemsBalance.balance} />
              </li>
            </ul>

            <ol class={style.list}>
              {items.value.map((item) => (
                <li>
                  <div class={style.sign}>
                    <span>{item.tags![0].sign} </span>
                  </div>
                  <div class={style.text}>
                    <div class={style.tagAndAmount}>
                      <span class={style.tag}>{item.tags![0].name}</span>
                      <span class={style.amount}>
                        ￥<Money value={item.amount} />
                      </span>
                    </div>
                    <div class={style.time}>
                      <Datetime value={item.happen_at} />
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <div class={style.more}>
              {hasMore.value ? (
                <Button onClick={fetchItems}>向下滑动加载更多</Button>
              ) : (
                <span>没有更多</span>
              )}
            </div>
          </>
        ) : (
          //<div>没有历史记录</div>
          <>
            <Center class={style.pig_wrapper}>
              <Icon name="pig" class={style.pig} />
            </Center>

            <div class={style.button_wrapper}>
              <RouterLink to="/items/create">
                <Button class={style.button}> 开始记账 </Button>
              </RouterLink>
            </div>
          </>
        )}

        <RouterLink to="/items/create">
          <FloatButton iconName="add" />
        </RouterLink>
      </div>
    );
  },
});
