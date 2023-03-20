import { defineComponent, PropType  } from 'vue';

export const ItemList = defineComponent({ 
  props : { 
    name : { 
      type : String as PropType<string> 
    }
  },
  setup : (props,context) => { 
    return () => ( 
      <div> hi </div>
    )
  }
})