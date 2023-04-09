import { defineComponent, PropType, reactive, ref } from "vue";
import { LayoutNavBar } from "../layouts/LayoutNavBar";
import { Button } from "../shared/buttons/Button";
import { Form, FormItem } from "../shared/Form";
import { Icon } from "../shared/Icon";
import { validate } from "../shared/validate";
import style from "./SignInPage.module.scss";
import axios, { AxiosResponse } from "axios";
import { http } from "../shared/HttpClient";

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

    const refValidationCode = ref<any>();
    const onClickSendValidationCode = async () => {
      const response = await http
        .post("/validation_codes", { email: formData.email })
        .catch(onError); // 有业务逻辑需要处理，所以 需要加 .catch()
      refValidationCode.value.startCount();
    };

    //效验规则：
    const onSubmit = (e: Event) => {
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
    };

    const onError = (error: any) => {
      if (error.response.status === 422) {
        Object.assign(errors, error.response.data.errors);
      }
      throw error;
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
                  onClick={onClickSendValidationCode}
                  v-model={formData.code}
                  error={errors.code?.[0]}
                />

                <FormItem style={{ paddingTop: "6px" }}>
                  <Button>登录</Button>
                </FormItem>
              </Form>
            </>
          ),
        }}
      </LayoutNavBar>
    );
  },
});
