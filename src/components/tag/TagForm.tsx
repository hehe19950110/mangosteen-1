import { defineComponent, onMounted, PropType, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Button } from "../../shared/buttons/Button";
import { Form, FormItem } from "../../shared/Form";
import { http } from "../../shared/HttpClient";
import { onFormError } from "../../shared/onFormError";
import { hasError, Rules, validate } from "../../shared/validate";
import style from "./Tag.module.scss";

export const TagForm = defineComponent({
  props: {
    id: Number, // 选填
  },

  setup: (props, context) => {
    const route = useRoute();
    const router = useRouter();
    const formData = reactive({
      id: undefined,
      name: "",
      sign: "",
      kind: route.query.kind!.toString() as "expenses" | "income",
    });

    const errors = reactive<FormErrors<typeof formData>>({});
    const onSubmit = async (e: Event) => {
      e.preventDefault();
      const rules: Rules<typeof formData> = [
        { key: "name", type: "required", message: "标签名必填" },
        {
          key: "name",
          type: "pattern",
          regex: /^.{1,4}$/,
          message: "标签名只能填 1 ~ 4 个字符",
        },
        { key: "sign", type: "required", message: "符号必填" },
      ];
      Object.assign(errors, {
        name: [],
        sign: [],
      });
      Object.assign(errors, validate(formData, rules));
      if (!hasError(errors)) {
        // 用 promise 拿到请求结果
        // 如果 formData.id 存在，就 await http.patch() ； 否则 await http.post()
        const promise = (await formData.id)
          ? http.patch(`/tags/${formData.id}`, formData, {
              _mock: "tagEdit",
              _autoLoading: true,
            })
          : http.post("/tags", formData, {
              _mock: "tagCreate",
              _autoLoading: true,
            });
        await promise.catch((error) =>
          onFormError(error, (data) => Object.assign(errors, data.errors))
        );

        router.back();
      }
    };

    onMounted(async () => {
      // 如果 props 没有传id，就 return
      if (!props.id) {
        return;
      }
      const response = await http.get<Resource<Tag>>(
        `/tags/${props.id}`,
        {},
        { _mock: "tagShow" }
      );
      Object.assign(formData, response.data.resource);
    });

    return () => (
      <Form onSubmit={onSubmit}>
        {/* FormItem里，内容是自定义的，就不需要写type，如 <p>里 写的固定提示语 */}
        <FormItem
          label="标签名"
          type="text"
          v-model={formData.name}
          error={errors["name"]?.[0]}
        />

        <FormItem
          label={"符号 " + formData.sign}
          type="emojiSelect"
          v-model={formData.sign}
          error={errors["sign"]?.[0]}
        />

        <FormItem>
          <p class={style.tips}>记账时长按标签 即可进行编辑</p>
        </FormItem>

        <FormItem>
          <Button type="submit" class={[style.button]}>
            确定
          </Button>
        </FormItem>
      </Form>
    );
  },
});
