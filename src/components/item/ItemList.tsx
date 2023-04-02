import { Overlay } from "vant";
import { defineComponent, reactive, ref, watchEffect } from "vue";
import { LayoutNavBar } from "../../layouts/LayoutNavBar";
import { Form, FormItem } from "../../shared/Form";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { Time } from "../../shared/time";
import style from "./ItemList.module.scss";
import { ItemSummary } from "./ItemSummary";

export const ItemList = defineComponent({
  setup: (props, context) => {
    const refSelected = ref("本月");
    const time = new Time();
    const customTime = reactive({
      // 设定自定义时间是一个字符串：
      start: new Time().format(),
      end: new Time().format(),
    });
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
    watchEffect(() => {
      if (refSelected.value === "自定义时间") {
        refOverlayVisible.value = true;
      }
    });
    const refOverlayVisible = ref(false);
    const onSubmitCustomTime = (e: Event) => {
      e.preventDefault();
      refOverlayVisible.value = false;
    };

    return () => (
      <LayoutNavBar>
        {{
          title: () => "山竹记账",
          icon: () => <Icon name="menu" />,
          default: () => (
            <>
              <Tabs
                classPrefix={"customTabs"}
                v-model:selected={refSelected.value}
              >
                <Tab name="本月">
                  <ItemSummary
                    startDate={timeList[0].start.format()}
                    endDate={timeList[0].end.format()}
                  />
                </Tab>

                <Tab name="上月">
                  <ItemSummary
                    startDate={timeList[1].start.format()}
                    endDate={timeList[1].end.format()}
                  />
                </Tab>

                <Tab name="今年">
                  <ItemSummary
                    startDate={timeList[2].start.format()}
                    endDate={timeList[2].end.format()}
                  />
                </Tab>

                <Tab name="自定义时间">
                  <ItemSummary
                    startDate={customTime.start}
                    endDate={customTime.end}
                  />
                </Tab>
              </Tabs>

              {/*使用 vant 的 Overlay组件 实现自定义时间部分的弹窗对话框:*/}
              <Overlay show={refOverlayVisible.value} class={style.overlay}>
                <div class={style.overlay_inner}>
                  <header>请选择时间</header>
                  <main>
                    <Form onSubmit={onSubmitCustomTime}>
                      <FormItem
                        label="开始时间"
                        v-model={customTime.start}
                        type="date"
                      />
                      <FormItem
                        label="结束时间"
                        v-model={customTime.end}
                        type="date"
                      />

                      {/*
                     假设 上面的 FormItem标签 可以回车， 
                     那么 Form 标签默认 会在任何一个 FormItem标签 回车时，会自动触发 type是"submit" 的 button按钮，
                     所以 有多个button时，需要区分的type来实现不同的指令。
                     */}
                      <FormItem>
                        <div class={style.actions}>
                          <button type="button">取消</button>
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
