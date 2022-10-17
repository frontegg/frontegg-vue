import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import App from "../../frontegg-vue/packages/sanity-check/App.vue"

test('Vue app run', () => {
    expect(App).toBeTruthy()

    const wrapper = mount(App)

    expect(wrapper.text()).toContain('Frontegg VUE')
})
