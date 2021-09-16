import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/HelloWorld.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:type',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/section/:id',
  //   name: 'Section',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Section.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
