import Vue from 'vue'
import App from '@/components/App'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import Router from 'vue-router'

window.vue = new Vue()

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App
    },
    {
    	path:'/:keyword',
    	name:'App',
    	component: App
    },
  ]
})

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1 // getMonth() is zero-based
  var dd = this.getDate()

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('')
}