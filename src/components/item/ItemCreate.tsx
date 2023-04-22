import { LayoutNavBar } from "../../layouts/LayoutNavBar";
import { defineComponent, onMounted, PropType, reactive, ref } from "vue";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import style from "./ItemCreate.module.scss";
import { http } from "../../shared/HttpClient";
import { useTags } from "../../shared/useTags";
import { Tags } from "./Tags";
import { useRouter } from "vue-router";
import { AxiosError } from "axios";
import { Dialog } from "vant";

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    /*
    const refKind = ref("支出");
    const {
      tags: incomeTags,
      hasMore: hasMore2,
      fetchTags: fetchTags2,
    } = useTags((page) => {
      return http.get<Resources<Tag>>("/tags", {
        kind: "income",
        page: page + 1, // tag 的 page 需要更新
        _mock: "tagIndex",
      });
    });
    */

    /*
    onMounted(async () => {
      // response 除了接受普通的字符串函数 "/tags", 还接受类型参数<{ resources: Tag[] }>
      const response = await http.get<{ resources: Tag[] }>("/tags", {
        kind: "expenses",
        _mock: "tagIndex",
      });
      refExpensesTags.value = response.data.resources;
    });
    const refExpensesTags = ref<Tag[]>([
      { id: 1, name: "餐饮", sign: "￥", kind: "expenses" },  //类型 尽量不要用type，是很多编程语言内置的一个API，而是使用 kind、kind 等来表示类型
    ]);

    onMounted(async () => {
      const response = await http.get<{ resources: Tag[] }>("/tags", {
        kind: "income",
        _mock: "tagIndex",
      });
      refIncomeTags.value = response.data.resources;
    });
    const refIncomeTags = ref<Tag[]>([
      { id: 1, name: "工资", sign: "￥", kind: "income" },
    ]);
    */
    const formData = reactive({
      kind: "支出",
      tags_id: [],
      amount: 0,
      happen_at: new Date().toISOString(),
      // new Date() 可以接受字符串，date.toISOString() 是一个 JavaScript Date对象的方法，用于将日期对象转换为 ISO 格式的字符串表示。
    });

    const router = useRouter();

    const onError = (error: AxiosError<ResourceError>) => {
      if (error.response?.status === 422) {
        // 没有地方显示错误，因此 选择dialog弹窗的形式展示
        Dialog.alert({
          title: "错误",
          message: Object.values(error.response.data.errors).join(","),
        });
      }
      throw error;
    };

    const onSubmit = async () => {
      await http
        .post<Resource<Item>>("/items", formData, {
          params: { _mock: "itemCreate" },
        })
        .catch(onError);
      router.push("/items");
    };

    return () => (
      <LayoutNavBar class={style.layout}>
        {{
          title: () => "记一笔",
          icon: () => <Icon name="left" class={style.navIcon} />,
          default: () => (
            <>
              <div class={style.wrapper}>
                <Tabs v-model:selected={formData.kind} class={style.tabs}>
                  <Tab name="支出">
                    <Tags
                      kind="expenses"
                      v-model:selected={formData.tags_id[0]}
                    />
                  </Tab>

                  <Tab name="收入">
                    <Tags
                      kind="income"
                      v-model:selected={formData.tags_id[0]}
                    />
                  </Tab>
                </Tabs>

                <div class={style.inputPad_wrapper}>
                  <InputPad
                    v-model:happenAt={formData.happen_at}
                    v-model:amount={formData.amount}
                    onSubmit={onSubmit}
                  />
                </div>
              </div>
            </>
          ),
        }}
      </LayoutNavBar>
    );
  },
});
