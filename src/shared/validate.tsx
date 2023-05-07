interface FData {
  [k: string]: JSONValue;
}

type Rule<T> = {
  key: keyof T;
  message: string;
} & (
  | { type: "required" }
  | { type: "pattern"; regex: RegExp }
  | { type: "notEqual"; value: JSONValue }
);
type Rules<T> = Rule<T>[];

export type { Rules, Rule, FData };
export const validate = <T extends FData>(formData: T, rules: Rules<T>) => {
  type Errors = {
    [k in keyof T]?: string[];
  };
  const errors: Errors = {};
  rules.map((rule) => {
    const { key, type, message } = rule;
    const value = formData[key];

    switch (type) {
      // 必填：
      case "required":
        //if (value === null || value === undefined || value === "") {
        if (isEmpty(value)) {
          errors[key] = errors[key] ?? [];
          errors[key]?.push(message);
        }
        break;

      // 正则：
      case "pattern":
        //if (value && !rule.regex.test(value.toString())) {
        if (!isEmpty(value) && !rule.regex.test(value!.toString())) {
          errors[key] = errors[key] ?? [];
          errors[key]?.push(message);
        }
        break;

      // 不等于：
      case "notEqual":
        if (!isEmpty(value) && value === rule.value) {
          errors[key] = errors[key] ?? [];
          errors[key]?.push(message);
        }
        break;

      default:
        return;
    }
  });
  return errors;
};

function isEmpty(value: null | undefined | string | number | FData) {
  return value === null || value === undefined || value === "";
}

export function hasError(errors: Record<string, string[]>) {
  /* 
     errors 的类型是Record， key 是 string ，value 是 string[]
     也 可以写成：
     return Object.values(errors)
     .reduce((result, value) => result + value.length, 0) > 0
     但是 reduce 没有中断机制，一定会遍历每一项
  */
  let result = false;
  for (let key in errors) {
    if (errors[key]?.length > 0) {
      result = true;
      break;
    }
  }
  return result;
}
