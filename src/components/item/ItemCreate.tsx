import { LayoutNavBar } from "../../layouts/LayoutNavBar";
import { defineComponent, PropType, reactive } from "vue";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import style from "./ItemCreate.module.scss";
import { http } from "../../shared/HttpClient";
import { Tags } from "./Tags";
import { useRoute, useRouter } from "vue-router";
import { AxiosError } from "axios";
import { Dialog } from "vant";
import { BackIcon } from "../../shared/Icon/BackIcon";
import { hasError, validate } from "../../shared/validate";

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    // Partial<Item> 需要一部分的item
    const formData = reactive<Partial<Item>>({
      kind: "expenses",
      tag_ids: [],
      amount: 0,
      happen_at: new Date().toISOString(),
      //happen_at的类似是string，不能表示整时间，new Date() 可以接受字符串，所以 需要date.toISOString()，他是一个JavaScript Date对象的方法，用于将日期对象转换为 ISO 格式的字符串表示。
    });

    const router = useRouter();

    const errors = reactive<FormErrors<typeof formData>>({
      kind: [],
      tag_ids: [],
      amount: [],
      happen_at: [],
    });
    const onError = (error: AxiosError<ResourceError>) => {
      if (error.response?.status === 422) {
        // 没有地方显示错误，因此 选择dialog弹窗的形式展示
        Dialog.alert({
          title: "错误",
          message: Object.values(error.response.data.errors).join("\n"),
        });
      }
      throw error;
    };

    const onSubmit = async () => {
      // 先清空 errors
      Object.assign(errors, {
        kind: [],
        tag_ids: [],
        amount: [],
        happen_at: [],
      });
      Object.assign(
        errors,
        validate(formData, [
          { key: "kind", type: "required", message: "类型必填" },
          { key: "tag_ids", type: "required", message: "标签必填" },
          { key: "amount", type: "required", message: "金额必填" },
          {
            key: "amount",
            type: "notEqual",
            value: 0,
            message: "金额不能为0",
          },
          { key: "happen_at", type: "required", message: "时间必填" },
        ])
      ); //效验规则后 会得到一个新的errors

      // 如果有错误 就弹窗打印错误：
      if (hasError(errors)) {
        Dialog.alert({
          title: "错误",
          message: Object.values(errors)
            .filter((i) => i.length > 0)
            .join("\n"),
        });
        return;
      }
      await http
        .post<Resource<Item>>("/items", formData, {
          _mock: "itemCreate",
          _autoLoading: true,
        })
        .catch(onError);
      router.push("/items");
    };

    return () => (
      <LayoutNavBar class={style.layout}>
        {{
          title: () => "记一笔",
          icon: () => <BackIcon />,
          default: () => (
            <>
              <div class={style.wrapper}>
                <Tabs v-model:selected={formData.kind} class={style.tabs}>
                  <Tab value="expenses" name="支出">
                    <Tags
                      kind="expenses"
                      v-model:selected={formData.tag_ids![0]}
                    />
                  </Tab>

                  <Tab value="income" name="收入">
                    <Tags
                      kind="income"
                      v-model:selected={formData.tag_ids![0]}
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
