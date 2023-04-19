import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { mockItemCreate, mockSession, mockTagIndex } from "../mock/mock";

// 把四个 config 类型提前； 使用 omit 删除 AxiosRequestConfig 中的 params,url,method 等字段
type GetConfig = Omit<AxiosRequestConfig, "params" | "url" | "method">;
type PostConfig = Omit<AxiosRequestConfig, "url" | "data" | "method">;
type PatchConfig = Omit<AxiosRequestConfig, "url" | "data">;
type DeleteConfig = Omit<AxiosRequestConfig, "params">;

export class Http {
  // 构造时 还是使用到了 axios，所以 添加实例 AxiosInstance
  instance: AxiosInstance;
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });
  }

  // read
  // <R = unknown>   R 可以传 也可以不传
  get<R = unknown>(
    url: string,
    query?: Record<string, JSONValue>,
    config?: GetConfig
  ) {
    return this.instance.request<R>({
      ...config,
      url: url,
      params: query,
      method: "get",
    });
  }

  // create
  post<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: PostConfig
  ) {
    return this.instance.request<R>({
      ...config,
      url,
      data,
      method: "post",
    });
  }
  // update
  patch<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: PatchConfig
  ) {
    return this.instance.request<R>({
      ...config,
      url,
      data,
      method: "patch",
    });
  }
  // delete
  delete<R = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: DeleteConfig
  ) {
    return this.instance.request<R>({
      ...config,
      url: url,
      params: query,
      method: "delete",
    });
  }
}

const mock = (response: AxiosResponse) => {
  if (
    // 如果是以下三个地址，就篡改；（这三个地址 为线上开发时的地址）
    location.hostname !== "localhost" &&
    location.hostname !== "127.0.0.1" &&
    location.hostname !== "192.168.3.57"
  ) {
    // 如果不是以上三个地址，就返回 FALSE，即不篡改
    return false;
  }
  // 排除线上地址的逻辑后，再查看请求参数里 有么有_mock的参数
  switch (response.config?.params?._mock) {
    case "tagIndex":
      [response.status, response.data] = mockTagIndex(response.config);
      return true;

    case "session":
      [response.status, response.data] = mockSession(response.config);
      return true;

    case "itemCreate":
      [response.status, response.data] = mockItemCreate(response.config);
      return true;
  }
  return false;
};

export const http = new Http("/api/v1");
{
  /* 
    对 http 进行封装：
    interceptors request/response 拦截器； https://juejin.cn/post/6844903569745788941

    http.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 429) {
            alert("你操作太频繁了");
          }
        }
        throw error; // 不处理错误，抛出错误；或者也可以使用 return Promise.reject(error)
      }
    );
  */
}
// 拦截器 两个：一个是 request，一个是response
http.instance.interceptors.request.use((config) => {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    // (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${jwt}`;
    // 等同于：
    config.headers!.Authorization = `Bearer ${jwt}`;
    // config.headers！表示：断言 config.headers不为空，该语法糖的好处就是不用在意他具体的类型，ts也不会报错
  }
  return config;
});
http.instance.interceptors.response.use(
  // 篡改 response
  (response) => {
    mock(response);
    return response;
  },
  (error) => {
    // 如果我能篡改失败，就可以把 error.response 篡改成成功的后 再返回出去
    if (mock(error.response)) {
      return error.response;
    } else {
      // 如果篡改不了 还是把 error 返回出去
      throw error;
    }
  }
);
http.instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 429) {
        alert("你太频繁了");
      }
    }
    throw error;
  }
);
