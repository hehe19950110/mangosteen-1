import { defineComponent, reactive, ref } from "vue";
import { LayoutNavBar } from "../layouts/LayoutNavBar";
import { Button } from "../shared/buttons/Button";
import { Form, FormItem } from "../shared/Form";
import { Icon } from "../shared/Icon/Icon";
import { hasError, validate } from "../shared/validate";
import style from "./SignInPage.module.scss";
import { http } from "../shared/HttpClient";
import { useBoolean } from "../hooks/useBoolean";
import { useRoute, useRouter } from "vue-router";
import { BackIcon } from "../shared/Icon/BackIcon";
import { useMeStore } from "../stores/useMeStore";

export const SignInPage = defineComponent({
  setup: (props, context) => {
    const meStore = useMeStore();

    const formData = reactive({
      email: "18807378000@139.com",
      code: "",
    });
    const errors = reactive({
      email: [],
      code: [],
    });

    const refValidationCode = ref<any>();
    const {
      ref: refDisabled,
      toggle,
      on: disabled,
      off: enable,
    } = useBoolean(false);

    // router 是路由器，有一个方法是 .push 可以改变路由
    // route 是路由信息 里面只包含信息
    const router = useRouter();
    const route = useRoute();

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
        const response = await http
          .post<{ jwt: string }>("/session", formData, { _autoLoading: true })
          .catch(onError); // 不确定前端展示的校验逻辑 能覆盖后端逻辑 所以 还是需要展示后端报错
        localStorage.setItem("jwt", response.data.jwt);
        //  history.push("/");  错误 只切换地址栏、不切换页面 改为：router.push("/");
        const returnTo = route.query.return_to?.toString(); // 也可以写成 router.push('/sign_in?return_to='+ encodeURIComponent(route.fullPath))
        meStore.refreshMe();
        router.push(returnTo || "/");
      }
    };

    const onError = (error: any) => {
      if (error.response.status === 422) {
        Object.assign(errors, error.response.data.errors);
      }
      throw error;
    };
    /* 因为 后端报错的 eroor 与前端的 error 一样，所以 .catch（onSubmitError）也可以写成 .catch（onError）
      const onSubmitError = (error: any) => {
        if (error.response.status === 422) {
          Object.assign(errors, error.response.data.errors);
        }
        throw error;
      };
    */

    const onClickSendValidationCode = async () => {
      disabled(); // 把 布尔值 变成 TRUE; on: disabled,  on: () => (bool.value = true),
      await http
        .post(
          "/validation_codes",
          { email: formData.email },
          {
            _autoLoading: true,
          }
        )
        .catch(onError) // 有业务逻辑需要处理，所以 需要加 .catch()
        .finally(enable); // 失败了 也需要把 布尔值 变成 FALSE; off: enable,  off: () => (bool.value = false),
      // 成功:
      refValidationCode.value.startCount();
    };

    return () => (
      <LayoutNavBar>
        {{
          title: () => "登录",
          icon: () => <BackIcon />,
          default: () => (
            <>
              <div class={style.logo}>
                <Icon class={style.icon} name="mangosteen" />
                <h1 class={style.appName}>月月记账</h1>
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
                  countFrom={15}
                  disabled={refDisabled.value}
                  onClick={onClickSendValidationCode}
                  v-model={formData.code}
                  error={errors.code?.[0]}
                />

                <FormItem style={{ paddingTop: "16px" }}>
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
