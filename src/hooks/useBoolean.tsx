import { ref } from "vue";

export const useBoolean = (initialValue: boolean) => {
  const bool = ref(initialValue);
  return {
    ref: bool,
    // 把 布尔值变成一个反值
    toggle: () => (bool.value = !bool.value),
    // 把 布尔值 变成 TRUE
    on: () => (bool.value = true),
    // 把 布尔值 变成 FALSE
    off: () => (bool.value = false),
  };
};
