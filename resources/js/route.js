import { createWebHistory, createRouter } from "vue-router";
import AllProduct from './components/AllProduct.vue';
import CreateProduct from './components/CreateProduct.vue';
import CreateTag from './components/CreateTag.vue';
import AllTag from './components/AllTag.vue';
import DataProduct from './components/DataProduct.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Dashboard from './components/Dashboard.vue';
import Home from './components/Home.vue';


const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'create',
    path: '/create',
    component: CreateProduct
  },
  {
    name: 'create',
    path: '/listarProdutos',
    component: AllProduct
  },
  {
    name: 'edit',
    path: '/edit/:id',
    component: CreateProduct
  },
  {
    name: 'listarTag',
    path: '/listarTag',
    component: AllTag
  },
  {
    name: 'createTag',
    path: '/createTag',
    component: CreateTag
  },
  {
    name: 'editarTag',
    path: '/editarTag/:id',
    component: CreateTag
  },
  {
      name: 'register',
      path: '/register',
      component: Register
  },
  {
      name: 'login',
      path: '/login',
      component: Login
  },
  {
      name: 'dashboard',
      path: '/dashboard',
      component: Dashboard
  },
  {
    name: 'dataProduct',
    path: '/dataProduct/:id',
    component: DataProduct
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;