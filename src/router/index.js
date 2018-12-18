import Vue from 'vue'
import Router from 'vue-router'
import player from '@/components/in-chimee'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'player',
      component: player,
    }
  ]
})
