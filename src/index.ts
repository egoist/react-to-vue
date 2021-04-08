import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import {
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
} from 'vue'

export const toVue = (Component: React.FC<any>) =>
  defineComponent({
    inheritAttrs: false,

    setup(_, context) {
      const el = ref()
      onMounted(() => {
        render(React.createElement(Component, context.attrs), el.value)
      })

      onUpdated(() => {
        render(React.createElement(Component, context.attrs), el.value)
      })

      onBeforeUnmount(() => {
        unmountComponentAtNode(el.value)
      })

      return () => h('div', { ref: el })
    },
  })
