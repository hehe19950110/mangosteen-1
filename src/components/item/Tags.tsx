import { defineComponent, PropType, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { Button } from "../../shared/buttons/Button";
import { http } from "../../shared/HttpClient";
import { Icon } from "../../shared/Icon/Icon";
import { useTags } from "../../shared/useTags";
import style from "./Tags.module.scss";

export const Tags = defineComponent({
  props: {
    kind: {
      type: String as PropType<string>,
      required: true,
    },
    selected: Number,
  },
  emits: ["update:selected"],

  setup: (props, context) => {
    const { tags, hasMore, page, fetchTags } = useTags((page) => {
      return http.get<Resources<Tag>>(
        "/tags",
        {
          kind: props.kind,
          page: page + 1,
        },
        {
          _mock: "tagIndex",
          _autoLoading: true,
        }
      );
    });
    const onSelect = (tag: Tag) => {
      context.emit("update:selected", tag.id);
    };

    // const timer = number | undefined = undefined;
    // const currentTag = HTMLDivElement | undefined = undefined;
    const timer = ref<number>();
    const currentTag = ref<HTMLDivElement>();
    const router = useRouter();
    const onLongPress = (tagId: Tag["id"]) => {
      // 从 onTouchStart 里拿到 tagId
      router.push(`/tags/${tagId}/edit?kind=${props.kind}`);
    };
    const onTouchStart = (e: TouchEvent, tag: Tag) => {
      currentTag.value = e.currentTarget as HTMLDivElement;
      timer.value = setTimeout(() => {
        onLongPress(tag.id);
      }, 1000);
    };
    const onTouchEnd = (e: TouchEvent) => {
      clearTimeout(timer.value);
    };
    const onTouchMove = (e: TouchEvent) => {
      const pointedElement = document.elementFromPoint(
        e.touches[0].clientX,
        e.touches[0].clientY
      );
      // if (currentTag.value?.contains(pointedElement) || currentTag.value === pointedElement) else {clearTimeout(timer.value)} 等同于：
      if (
        currentTag.value !== pointedElement &&
        currentTag.value?.contains(pointedElement) === false
      ) {
        clearTimeout(timer.value);
      }
    };

    return () => (
      <>
        <div class={style.tags_wrapper} onTouchmove={onTouchMove}>
          <RouterLink to={`/tags/create?kind=${props.kind}`} class={style.tag}>
            <div class={style.sign}>
              <Icon name="add" class={style.createTag} />
            </div>
            <div class={style.name}>新增</div>
          </RouterLink>

          {tags.value.map((tag) => (
            <div
              class={[
                style.tag,
                props.selected === tag.id ? style.selected : "",
              ]}
              onClick={() => onSelect(tag)}
              onTouchstart={(e) => onTouchStart(e, tag)}
              onTouchend={onTouchEnd}
            >
              <div class={style.sign}>{tag.sign}</div>
              <div class={style.name}>{tag.name}</div>
            </div>
          ))}
        </div>

        <div class={style.more}>
          {hasMore.value ? (
            <Button class={style.loadMore} onClick={fetchTags}>
              加载更多
            </Button>
          ) : (
            <span class={style.noMore}>没有更多</span>
          )}
        </div>
      </>
    );
  },
});
