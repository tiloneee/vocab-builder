import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/tailwind.css';

Vue.config.productionTip = false

Vue.use(Toast, {
  timeout: 3000,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
