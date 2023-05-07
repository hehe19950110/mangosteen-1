import { computed, defineComponent, PropType, ref } from "vue";
import { emojiList } from "./EmojiList";
import style from "./EmojiSelect.module.scss";

export const EmojiSelect = defineComponent({
  props: {
    modelValue: {
      type: String,
    },
    // 定义 onUpdateModelValue 的类型:
    onUpdateModelValue: {
      type: Function as PropType<(emoji: string) => void>,
    },
  },

  setup: (props, context) => {
    const refSelected = ref(1);
    const table: [string, string[]][] = [
      [
        "表情",
        [
          "face-smiling",
          "face-affection",
          "face-tongue",
          "face-hand",
          "face-neutral-skeptical",
          "face-sleepy",
          "face-unwell",
          "face-hat",
          "face-glasses",
          "face-concerned",
          "face-negative",
          "face-costume",
        ],
      ],
      [
        "手势",
        [
          "hand-fingers-open",
          "hand-fingers-partial",
          "hand-single-finger",
          "hand-fingers-closed",
          "hands",
          "hand-prop",
          "body-parts",
        ],
      ],
      [
        "人物",
        [
          "person",
          "person-gesture",
          "person-role",
          "person-fantasy",
          "person-activity",
          "person-sport",
          "person-resting",
        ],
      ],
      ["衣服", ["clothing"]],
      [
        "动物",
        [
          "cat-face",
          "monkey-face",
          "animal-mammal",
          "animal-bird",
          "animal-amphibian",
          "animal-reptile",
          "animal-marine",
          "animal-bug",
        ],
      ],
      ["植物", ["plant-flower", "plant-other"]],
      ["自然", ["sky & weather", "science"]],
      [
        "食物",
        [
          "food-fruit",
          "food-vegetable",
          "food-prepared",
          "food-asian",
          "food-marine",
          "food-sweet",
        ],
      ],
      ["运动", ["sport", "game"]],
    ];

    const onClickTab = (index: number) => {
      refSelected.value = index;
    };
    const onClickEmoji = (emoji: string) => {
      //如果 onUpdateModelValue 传了props ，就不去 emit ；如果没传 props，就去 emit
      if (props.onUpdateModelValue) {
        props.onUpdateModelValue(emoji);
      } else {
        context.emit("update:modelValue", emoji);
      }
    };

    const emojis = computed(() => {
      const selectedItem = table[refSelected.value][1];
      return selectedItem.map((category) =>
        emojiList
          .find((item) => item[0] === category)?.[1]
          .map((item) => (
            <li
              class={item === props.modelValue ? style.selectedEmoji : ""}
              onClick={() => onClickEmoji(item)}
            >
              {item}
            </li>
          ))
      );
    });

    return () => (
      <div class={style.emojiList}>
        <nav>
          {table.map((item, index) => (
            <span
              class={index === refSelected.value ? style.selected : ""}
              onClick={() => onClickTab(index)}
            >
              {item[0]}
            </span>
          ))}
        </nav>

        <ol> {emojis.value} </ol>
      </div>
    );
  },
});
