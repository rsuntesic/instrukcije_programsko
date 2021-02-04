import Vue from 'vue'
import VueRouter from 'vue-router'
import Naslovna from '../views/naslovna.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'naslovna',
    component: Naslovna
  },
  {
    path: '/naslovna',
    name:'naslovna',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/naslovna.vue')
  },
  {
    path: '/zahtjevi_instrukcija',
    name:'zahtjevi_instrukcija',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/zahtjevi_instrukcija.vue')
  },
  {
    path: '/predmeti',
    name:'Predmeti',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/predmeti.vue')
  },
  {
    path: '/profesor',
    name: 'Profesor',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/profesor.vue')
  },
  {
    path: '/student',
    name: 'Student',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/student.vue')
  },
  {
    path: '/registracija',
    name: 'Registracija', 
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/registracija.vue')
  },
  {
    path: '/prijava',
    name: 'Prijava',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/prijava.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
