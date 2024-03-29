import { Overlay } from "vant";
import { defineComponent, PropType, reactive, ref } from "vue";
import { Form, FormItem } from "../shared/Form";
import { OverlayIcon } from "../shared/Overlay";
import { Tab, Tabs } from "../shared/Tabs";
import { Time } from "../shared/time";
import { LayoutNavBar } from "./LayoutNavBar";
import style from "./LayoutTimeTabs.module.scss";

const demo = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false,
    },
    endDate: {
      type: String as PropType<string>,
      required: false,
    },
  },
});

export const LayoutTimeTabs = defineComponent({
  props: {
    component: {
      type: Object as PropType<typeof demo>,
      required: true,
    },
    rerenderOnSwitchTab: {
      type: Boolean,
      default: false,
    },
    hideThisYear: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props, context) => {
    const refSelected = ref("本月");
    const time = new Time();
    const tempTime = reactive({
      start: new Time().format(),
      end: new Time().format(),
    });
    // 设定自定义时间是一个字符串：
    const customTime = reactive<{
      start?: string;
      end?: string;
    }>({});
    const timeList = [
      {
        // 本月：
        start: time.firstDayOfMonth(),
        end: time.lastDayOfMonth(),
      },
      {
        // 上月：
        start: time.add(-1, "month").firstDayOfMonth(),
        end: time.add(-1, "month").lastDayOfMonth(),
      },
      {
        // 今年：
        start: time.firstDayOfYear(),
        end: time.lastDayOfYear(),
      },
    ];
    const refOverlayVisible = ref(false);
    const onSubmitCustomTime = (e: Event) => {
      e.preventDefault();
      refOverlayVisible.value = false;
      // 在提交的时候 多做一件事情：把customTime 赋值给tempTime
      Object.assign(customTime, tempTime);
    };
    const onSelect = (value: string) => {
      if (value === "自定义时间") {
        refOverlayVisible.value = true;
      }
    };

    return () => (
      <LayoutNavBar>
        {{
          title: () => "月月记账",
          icon: () => <OverlayIcon />,
          default: () => (
            <>
              {props.hideThisYear ? (
                <Tabs
                  classPrefix="customTabs"
                  v-model:selected={refSelected.value}
                  onUpdate:selected={onSelect}
                  rerenderOnSelect={props.rerenderOnSwitchTab}
                >
                  <Tab value="本月" name="本月">
                    <props.component
                      startDate={timeList[0].start.format()}
                      endDate={timeList[0].end.format()}
                    />
                  </Tab>
                  <Tab value="上月" name="上月">
                    <props.component
                      startDate={timeList[1].start.format()}
                      endDate={timeList[1].end.format()}
                    />
                  </Tab>
                  <Tab value="自定义时间" name="自定义时间">
                    <props.component
                      startDate={customTime.start}
                      endDate={customTime.end}
                    />
                  </Tab>
                </Tabs>
              ) : (
                <Tabs
                  classPrefix="customTabs"
                  v-model:selected={refSelected.value}
                  onUpdate:selected={onSelect}
                  rerenderOnSelect={props.rerenderOnSwitchTab}
                >
                  <Tab value="本月" name="本月">
                    <props.component
                      startDate={timeList[0].start.format()}
                      endDate={timeList[0].end.format()}
                    />
                  </Tab>
                  <Tab value="上月" name="上月">
                    <props.component
                      startDate={timeList[1].start.format()}
                      endDate={timeList[1].end.format()}
                    />
                  </Tab>
                  <Tab value="今年" name="今年">
                    <props.component
                      startDate={timeList[2].start.format()}
                      endDate={timeList[2].end.format()}
                    />
                  </Tab>
                  <Tab value="自定义时间" name="自定义时间">
                    <props.component
                      startDate={customTime.start}
                      endDate={customTime.end}
                    />
                  </Tab>
                </Tabs>
              )}
              {/*使用 vant 的 Overlay组件 实现自定义时间部分的弹窗对话框:*/}
              <Overlay show={refOverlayVisible.value} class={style.overlay}>
                <div class={style.overlay_inner}>
                  <header>请选择时间</header>
                  <main>
                    <Form onSubmit={onSubmitCustomTime}>
                      <FormItem
                        label="开始时间"
                        v-model={tempTime.start}
                        type="date"
                      />
                      <FormItem
                        label="结束时间"
                        v-model={tempTime.end}
                        type="date"
                      />
                      <FormItem>
                        <div class={style.actions}>
                          <button
                            type="button"
                            onClick={() => (refOverlayVisible.value = false)}
                          >
                            取消
                          </button>
                          <button type="submit">确认</button>
                        </div>
                      </FormItem>
                    </Form>
                  </main>
                </div>
              </Overlay>
            </>
          ),
        }}
      </LayoutNavBar>
    );
  },
});
