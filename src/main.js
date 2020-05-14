import Vue from 'vue'
import VueRoter from 'vue-router'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import Pokemonlist from './components/Pokemonlist.vue'

Vue.use(VueRoter)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

const routes = [
  { 
    path: '/',
    name: 'list',
    component: Pokemonlist,
    props: true
  },
  { 
    path: '/pokemon/:name/:index/:img/:url',
    name: 'pokemon',
    component: () => import(/* webpackChunkName:"PokemonDescription"*/ './components/PokemonDescription.vue'),
    props: true
  },
  {
    path:'/*',
    name:'notFound',
    component: () => import(/* webpackChunkName:"NotFound"*/ './components/NotFound.vue')
  }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
