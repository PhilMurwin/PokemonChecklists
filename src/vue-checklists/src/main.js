import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Vuetify 3 setup
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify()

createApp(App).use(vuetify).mount('#app')
