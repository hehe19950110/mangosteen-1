import { AxiosResponse } from "axios";
import { defineStore } from "pinia";
import { http } from "../shared/HttpClient";

// export let mePromise: Promise<AxiosResponse<Resource<User>>> | undefined;
type MeState = {
  me?: User;
  mePromise?: Promise<AxiosResponse<Resource<User>>>;
};
type MeActions = {
  refreshMe: () => void;
  fetchMe: () => void;
};

export const useMeStore = defineStore<string, MeState, {}, MeActions>("me", {
  state: () => ({
    me: undefined,
    mePromise: undefined,
  }),
  actions: {
    //更新mePromise：
    refreshMe() {
      this.mePromise = http.get<Resource<User>>("/me");
      // 因为获取到的是一个 /me 的结果
      // 所以 get获取的对象里面 会有 resource字段，字段里至少有一个ID
      // 从而可以反推 mePromise类型
      // mePromise = http.get<{ resource: { id: number } }>("/me");
    },

    // 获取用户、更新用户 都是做同样的事情：
    // get("/me") 发一个请求，然后把得到的请求 放到 mePromise上
    fetchMe() {
      this.refreshMe();
    },
  },
});
