import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

type JSONValue =
  | string
  | number
  | null
  | boolean
  | JSONValue[]
  | { [key: string]: JSONValue };

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
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, "params" | "url" | "method">
    // 使用 omit 删除 AxiosRequestConfig 中的 params,url,method 字段
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
    config?: Omit<AxiosRequestConfig, "url" | "data" | "method">
  ) {
    return this.instance.request<R>({
      ...config,
      url: url,
      data,
      method: "post",
    });
  }
  // update
  patch<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: Omit<AxiosRequestConfig, "url" | "data">
  ) {
    return this.instance.request<R>({
      ...config,
      url: url,
      data,
      method: "patch",
    });
  }
  // delete
  delete<R = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, "params">
  ) {
    return this.instance.request<R>({
      ...config,
      url: url,
      params: query,
      method: "delete",
    });
  }
}

export const http = new Http("/api/v1");
// 对 http 进行封装：
// interceptors request/response 拦截器； https://juejin.cn/post/6844903569745788941
http.instance.interceptors.response.use(
  (response) => {
    console.log("response");
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
