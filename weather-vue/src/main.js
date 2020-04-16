import Vue from 'vue'
import App from './App.vue'
// import  addNewCity from './components/addNewCity.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // render: h => h(addNewCity),
}).$mount('#app')
