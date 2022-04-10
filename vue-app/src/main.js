import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import components from '@/components/imports.js'

const app = createApp(App)

components.forEach(component => {
  app.component(component.name, component)
})

app.use(router).mount('#app')
