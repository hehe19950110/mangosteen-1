import { Dialog } from "vant";
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { LayoutNavBar } from "../../layouts/LayoutNavBar";
import { Button } from "../../shared/buttons/Button";
import { http } from "../../shared/HttpClient";
import { BackIcon } from "../../shared/Icon/BackIcon";
import style from "./Tag.module.scss";
import { TagForm } from "./TagForm";

export const TagEdit = defineComponent({
  setup: (props, context) => {
    const route = useRoute();
    const router = useRouter();
    const numberId = parseInt(route.params.id!.toString());
    // 如果 失败了 那就是 NaN，输出错误； 即可保证： <TagForm id={numberId} />里的 numberId 是数字
    if (Number.isNaN(numberId)) {
      return () => <div>id 不存在</div>;
    }

    const onError = () => {
      Dialog.alert({ title: "提示", message: "删除失败" });
    };
    const onDeleteTag = async (options?: { withItems?: boolean }) => {
      await Dialog.confirm({
        title: "确认",
        message: "你真的要删除标签吗？",
      });
      await http
        .delete(
          `/tags/${numberId}`,
          {
            with_items: options?.withItems ? "true" : "false",
          },
          {
            _autoLoading: true,
          }
        )
        .catch(onError);
      router.back();
    };

    return () => (
      <LayoutNavBar>
        {{
          title: () => "新建标签",
          icon: () => <BackIcon />,
          default: () => (
            <>
              <TagForm id={numberId} />

              <div class={style.actions}>
                {/* <Button
                  level="danger"
                  class={style.removeTags}
                  onClick={() => onDeleteTag()}
                >
                  删除标签
                </Button> */}

                <Button
                  level="danger"
                  class={style.removeTagsAndItems}
                  onClick={() => onDeleteTag({ withItems: true })}
                >
                  删除标签及对应记账记录
                </Button>
              </div>
            </>
          ),
        }}
      </LayoutNavBar>
    );
  },
});
