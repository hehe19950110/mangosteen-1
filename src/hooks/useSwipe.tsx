import { computed, onMounted, onUnmounted, ref, Ref } from "vue";

type Point = {
  x: number;
  y: number;
}  //声明坐标

interface Options {
  beforeStart?: (e: TouchEvent) => void;
  afterStart?: (e: TouchEvent) => void;
  beforeMove?: (e: TouchEvent) => void;
  afterMove?: (e: TouchEvent) => void;
  beforeEnd?: (e: TouchEvent) => void;
  afterEnd?: (e: TouchEvent) => void;
}

export const useSwipe = (element: Ref<HTMLElement | undefined>, options?: Options) => {
  //记录开始与结束时的坐标：
  const start = ref<Point>();
  const end = ref<Point>();

  //判断手指在屏幕是否移动，默认false：
  const swiping = ref(false);
  //已知初始值、结束值，来确定移动的距离：
  const distance = computed(
    () => {
      if (!start.value || !end.value) { return null };
      return {
        x: end.value.x - start.value.x,
        y: end.value.y - start.value.y,
      };
    }
  );
  //已知start、end，来确定移动的方向：
  const direction = computed(
    () => {
      if (!distance.value) { return undefined };   //距离不存在，输出空
      const { x, y } = distance.value;
        if (Math.abs(x) > Math.abs(y)) {   //通过绝对值判断X、Y的大小
          return x > 0 ? 'right' : 'left'
        } else {
          return y > 0 ? 'down' : 'up';
        };
    }
  );

  const onStart = (e: TouchEvent) => {
    options?.beforeStart?.(e);
    swiping.value = true;
    end.value = start.value = { x: e.touches[0].screenX, y: e.touches[0].screenY };   //touches 指用户触碰到键盘的第一个指头
    options?.afterStart?.(e);
  };

  const onMove = (e: TouchEvent) => {
    options?.beforeMove?.(e);
    if (!start.value) { return };
    end.value = end.value = { x: e.touches[0].screenX, y: e.touches[0].screenY, };
    options?.afterMove?.(e);
  };

  const onEnd = (e: TouchEvent) => {
    options?.beforeEnd?.(e);
    swiping.value = false;
    options?.afterEnd?.(e);
  };

  //onMounted、onUnmounted是vue提供的一个hook:
  onMounted(
    () => {
      if (!element.value) { return };
      element.value.addEventListener('touchstart', onStart);
      element.value.addEventListener('touchmove', onMove);
      element.value.addEventListener('touchend', onEnd);
    }
  );
  onUnmounted(
    () => {
      if (!element.value) { return };
      element.value.removeEventListener('touchstart', onStart);
      element.value.removeEventListener('touchmove', onMove);
      element.value.removeEventListener('touchend', onEnd);
    }
  );

  return {
    swiping,
    direction,
    distance,
  };
}