import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';
import './assets/tailwind.css';



Vue.config.productionTip = false

Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 3000,
    pauseOnInteract: true,
  },
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
