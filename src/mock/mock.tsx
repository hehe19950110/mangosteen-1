import { faker } from "@faker-js/faker";
import { AxiosRequestConfig } from "axios";

type Mock = (config: AxiosRequestConfig) => [number, any];

faker.setLocale("zh_CN");

export const mockSession: Mock = (config) => {
  return [
    200,
    {
      jwt: faker.random.word(),
    },
  ];
};

export const mockTagIndex: Mock = (config) => {
  let id = 0;
  const createId = () => {
    id += 1;
    return id;
  };
  const createTag = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      name: faker.lorem.word(), // 生成随机单词.文字
      sign: faker.internet.emoji(), // 生成随机的emoji
      kind: config.params.kind,
      ...attrs,
    }));

  if (config.params.kind === "expenses") {
    /*
    return [
      200,
      {
        resources: [
          { id: 1, name: "餐饮", sign: "￥", kind: "expenses" },
          { id: 2, name: "购物", sign: "￥", kind: "expenses" },
          { id: 3, name: "日用", sign: "￥", kind: "expenses" },
          { id: 4, name: "交通", sign: "￥", kind: "expenses" },
          { id: 5, name: "水果", sign: "￥", kind: "expenses" },
          { id: 6, name: "蔬菜", sign: "￥", kind: "expenses" },
          { id: 7, name: "零食", sign: "￥", kind: "expenses" },
          { id: 8, name: "运动", sign: "￥", kind: "expenses" },
          { id: 9, name: "娱乐", sign: "￥", kind: "expenses" },
          { id: 10, name: "通讯", sign: "￥", kind: "expenses" },
          { id: 11, name: "服饰", sign: "￥", kind: "expenses" },
          { id: 12, name: "家居", sign: "￥", kind: "expenses" },
          { id: 13, name: "孩子", sign: "￥", kind: "expenses" },
          { id: 14, name: "长辈", sign: "￥", kind: "expenses" },
          { id: 15, name: "社交", sign: "￥", kind: "expenses" },
          { id: 16, name: "旅行", sign: "￥", kind: "expenses" },
        ],
      },
    ];
    */
    return [200, { resources: createTag(7) }];
  } else {
    return [200, { resources: createTag(20) }];
  }
};
