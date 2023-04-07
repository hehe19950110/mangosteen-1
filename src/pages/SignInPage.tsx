import { defineComponent, PropType, reactive } from "vue";
import { LayoutNavBar } from "../layouts/LayoutNavBar";
import { Button } from "../shared/buttons/Button";
import { Form, FormItem } from "../shared/Form";
import { Icon } from "../shared/Icon";
import { validate } from "../shared/validate";
import style from "./SignInPage.module.scss";

export const SignInPage = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      email: "",
      code: "",
    });
    const errors = reactive({
      email: [],
      code: [],
    });

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

    const onClickSendValidationCode = () => {
      console.log("1111");
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
                  label="验证码"
                  type="validationCode"
                  placeholder="请输入六位数字"
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
