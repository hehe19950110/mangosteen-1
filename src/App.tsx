import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import "./App.scss";
import "vant/lib/index.css";

export const App = defineComponent({
  setup() {
    return () => (
      <div class="page">
        <RouterView />
      </div>
    );
  },
});
