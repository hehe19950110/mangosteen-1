import { defineComponent, PropType, reactive, ref } from "vue";
import { LayoutNavBar } from "../layouts/LayoutNavBar";
import { Button } from "../shared/buttons/Button";
import { Form, FormItem } from "../shared/Form";
import { Icon } from "../shared/Icon";
import { hasError, validate } from "../shared/validate";
import style from "./SignInPage.module.scss";
import axios, { AxiosResponse } from "axios";
import { http } from "../shared/HttpClient";
import { useBoolean } from "../hooks/useBoolean";

export const SignInPage = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      email: "18807378000@139.com",
      code: "",
    });
    const errors = reactive({
      email: [],
      code: [],
    });

    const {
      ref: refDisabled,
      toggle,
      on: disabled,
      off: enable,
    } = useBoolean(false);

    //效验规则：
    const onSubmit = async (e: Event) => {
      // 阻止默认事件：
      e.preventDefault();
      // 清空errors：
      Object.assign(errors, {
        email: [],
        code: [],
      });
      Object.assign(
        errors,
        validate(formData, [
          { key: "email", type: "required", message: "必填" },
          {
            key: "email",
            type: "pattern",
            regex: /.+@.+/,
            message: "必须是邮箱地址",
          },
          { key: "code", type: "required", message: "必填" },
        ])
      );

      // 校验不通过，不可以发请求：
      // 因为errors 是个对象，不为空，只是里面的每一个数组可以为空 Object.assign (errors, {email: [],code: [], });
      // 所以 需要遍历数组 从未判断 每一个key对应的value为空
      // 只有在没有错误的情况下 才能发请求：
      if (!hasError(errors)) {
        const response = await http.post<{ jwt: string }>("/session", formData);
        // localStorage.setItem("jwt", response.data.jwt);
        // history.push("/");
      }
    };

    const onError = (error: any) => {
      if (error.response.status === 422) {
        Object.assign(errors, error.response.data.errors);
      }
      throw error;
    };

    const refValidationCode = ref<any>();
    const onClickSendValidationCode = async () => {
      disabled(); // 把 布尔值 变成 TRUE; on: disabled,  on: () => (bool.value = true),
      const response = await http
        .post("/validation_codes", { email: formData.email })
        .catch(onError) // 有业务逻辑需要处理，所以 需要加 .catch()
        .finally(enable); // 失败了 也需要把 布尔值 变成 FALSE; off: enable,  off: () => (bool.value = false),
      // 成功
      refValidationCode.value.startCount();
    };

    return () => (
      <LayoutNavBar>
        {{
          title: () => "登录",
          icon: () => <Icon name="left" />,
          default: () => (
            <>
              <div class={style.logo}>
                <Icon class={style.icon} name="mangosteen" />
                <h1 class={style.appName}>山竹记账</h1>
              </div>

              <div>{JSON.stringify(formData)}</div>

              <Form onSubmit={onSubmit}>
                <FormItem
                  label="邮箱地址"
                  type="text"
                  placeholder="请输入邮箱地址"
                  v-model={formData.email}
                  error={errors.email?.[0]}
                />

                <FormItem
                  ref={refValidationCode}
                  label="验证码"
                  type="validationCode"
                  placeholder="请输入六位数字"
                  countFrom={3}
                  disabled={refDisabled.value}
                  onClick={onClickSendValidationCode}
                  v-model={formData.code}
                  error={errors.code?.[0]}
                />

                <FormItem style={{ paddingTop: "6px" }}>
                  <Button type="submit">登录</Button>
                </FormItem>
              </Form>
            </>
          ),
        }}
      </LayoutNavBar>
    );
  },
});
