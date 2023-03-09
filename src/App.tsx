import { defineComponent} from "vue";

export const App = defineComponent({
  setup(){
    const count = ref(0)
    return () => 
    <>
      <div>{count.value}</div>
      <div>{{ count }}</div>
    </>
  }
})