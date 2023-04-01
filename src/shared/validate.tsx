interface FData {
  [k: string]: string | number | null | undefined | FData;
} //interface 可以循环调用自身

type Rule<T> = {
  // 共通的：
  key: keyof T;
  message: string;
} & ({ type: "required" } | { type: "pattern"; regex: RegExp }); // 二选一的：
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
      case "required":
        //if (value === null || value === undefined || value === "") {
        if (isEmpty(value)) {
          errors[key] = errors[key] ?? [];
          errors[key]?.push(message);
        }
        break;
      case "pattern":
        //if (value && !rule.regex.test(value.toString())) {
        if (!isEmpty(value) && !rule.regex.test(value!.toString())) {
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