import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/customerConfirmRecording',
    name: 'CustomerConfirmRecording',
    component: () => import(/* webpackChunkName: "about" */ '../views/CustomerConfirmRecording.vue')
  },
  {
    path: '/selectItem',
    name: 'SelectItem',
    component: () => import(/* webpackChunkName: "about" */ '../views/SelectItem.vue')
  },
  {
    path: '/unitOperation',
    name: 'UnitOpeartion',
    component: () => import(/* webpackChunkName: "about" */ '../views/UnitOperation.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
