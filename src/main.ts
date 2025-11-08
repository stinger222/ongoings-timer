import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'
import 'vue-sonner/style.css'
import '@/styles/style.css'
import { VueFire, VueFireAuth } from 'vuefire'
import { app as firebaseApp } from '@/firebase' 

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth(),
  ]
})

app.mount('#app')

// console.success
Object.getPrototypeOf(console).success = function (...args: any[]) {
  console.log('%c✔ SUCCESS:', 'background-color: #25bc453b; border-radius: 3px; padding: 1px 3px; color: green; font-weight: bold; font-family: monospace;', ...args)
}

// console.fail
Object.getPrototypeOf(console).fail = function (...args: any[]) {
  console.log('%c✘ FAIL:', 'background-color: #c81d1d3b; border-radius: 3px; padding: 1px 3px; color: #eb4141; font-weight: bold; font-family: monospace;', ...args)
}