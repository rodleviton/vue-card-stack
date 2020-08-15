import { defineComponent, h } from "vue"

export default defineComponent({
  name: "VueCardStackCard",
  render() {
    return h("div", {}, this.$slots)
  }
})
