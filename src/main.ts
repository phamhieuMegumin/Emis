import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'
import store from "./stores/stores"

const app = createApp(App)

installElementPlus(app)
app.use(router)
    .use(store)
    .mount('#app')