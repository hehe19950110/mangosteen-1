import { faker } from "@faker-js/faker";
import { AxiosRequestConfig } from "axios";

type Mock = (config: AxiosRequestConfig) => [number, any];

faker.setLocale("zh_CN");

export const mockItemCreate: Mock = (config) => {
  return [
    422,
    {
      // 错误提示 是后端给的
      errors: {
        tags_id: ["必须选择标签"],
        amount: ["金额不能为零"],
      },
    },
  ];
  // return [
  //   200,
  //   {
  //     resource: {
  //       id: 2264,
  //       user_id: 1312,
  //       amount: 9900,
  //       note: null,
  //       tags_id: [3508],
  //       happen_at: "2022-01-01T12:00:00.000Z",
  //       created_at: "2023-01-01T22:22:22.301Z",
  //       updated_at: "2023-01-01T22:22:22.301Z",
  //       kind: "expenses",
  //     },
  //   },
  // ];
};

export const mockTagEdit: Mock = (config) => {
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: "expenses",
    ...attrs,
  });
  return [200, { resource: createTag() }];
};

export const mockTagShow: Mock = (config) => {
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: "expenses",
    ...attrs,
  });
  return [200, { resource: createTag() }];
};

export const mockSession: Mock = (config) => {
  return [
    200,
    {
      jwt: faker.random.word(),
    },
  ];
};

let id = 0;
const createId = () => {
  id += 1;
  return id;
};
export const mockTagIndex: Mock = (config) => {
  const { kind, page } = config.params;
  const per_page = 25;
  const count = 26;

  const createPaper = (page = 1) => ({
    page,
    per_page,
    count,
  });

  const createTag = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      name: faker.lorem.word(), // 生成随机单词.文字
      sign: faker.internet.emoji(), // 生成随机的emoji
      kind: config.params.kind,
      ...attrs,
    }));

  const createBody = (n = 1, attrs?: any) => ({
    resources: createTag(n),
    pager: createPaper(page),
  });

  if (kind === "expenses" && (!page || page === 1)) {
    return [200, createBody(25)];
  } else if (kind === "expenses" && page === 2) {
    return [200, createBody(1)];
  } else if (kind === "income" && (!page || page === 1)) {
    return [200, createBody(25)];
  } else {
    return [200, createBody(1)];
  }
};
/*
  if (config.params.kind === "expenses") {
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
或者：
    return [200, { resources: createTag(25) }];
  } else {
    return [200, { resources: createTag(25) }];
  }
*/
