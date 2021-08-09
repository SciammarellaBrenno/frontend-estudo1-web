import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/', redirect: '/home'},
  { path: '/login', name: 'Login', component: () => import("../views/Login.vue")},  
  { path: '/home', name: 'Home', component: () => import("../views/Home.vue")},  
  { path: '/casa', name: 'Casa', component: () => import("../views/geral/casa/Lista.vue")},  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
