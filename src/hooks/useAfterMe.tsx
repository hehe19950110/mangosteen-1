import { onMounted } from "vue";
import { useMeStore } from "../stores/useMeStore";

export const useAfterMe = (fn: () => void) => {
  const meStore = useMeStore();
  onMounted(async () => {
    // await meStore.mePromise;
    // mePromise 是一个报错的情况
    // fn();

    // try {
    //   await meStore.mePromise;
    // } catch (error) {
    //   return;
    // }
    // fn();
    // 或者：
    // const result = await meStore.mePromise!.catch((error) => new Error());
    // if (result instanceof Error) {
    //   return;
    // }
    // fn();
    // 又或者：
    meStore.mePromise!.then(fn, () => undefined);
  });
};
