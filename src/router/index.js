import {createRouter, createWebHistory} from 'vue-router'
import middlewarePipeline from "@/router/middlewarePipeline";
import tokenAuth from "@/router/middleware/tokenAuth";
import checkAdmin from "@/router/middleware/checkAdmin";
import checkAuth from "@/router/middleware/checkAuth";
import loadProducts from "@/router/middleware/loadProducts";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    redirect: '/main',
    children: [
      {
        path: 'main',
        name: 'Main',
        component: () => import(/* webpackChunkName: "main" */ '@/views/Main.vue'),
        meta: {
          middleware: [tokenAuth, loadProducts]
        },
      },
      {
        path: 'products',
        name: 'ProductsPage',
        component: () => import(/* webpackChunkName: "products-page" */ '@/views/Products.vue'),
        meta: {
          middleware: [tokenAuth, loadProducts]
        },
      },
      {
        path: 'product/:id',
        name: 'ProductPage',
        component: () => import(/* webpackChunkName: "product-page" */ '@/views/Product.vue'),
        meta: {
          middleware: [tokenAuth, loadProducts]
        },
      },
      {
        path: 'login',
        name: 'LoginPage',
        component: () => import(/* webpackChunkName: "login-page" */ '@/views/Login.vue'),
        meta: {
          middleware: [tokenAuth, checkAuth]
        },
      },
      {
        path: 'register',
        name: 'RegisterPage',
        component: () => import(/* webpackChunkName: "register-page" */ '@/views/Registration.vue'),
        meta: {
          middleware: [tokenAuth, checkAuth]
        },
      },{
        path: 'cart',
        name: 'CartPage',
        component: () => import(/* webpackChunkName: "cart-page" */ '@/views/Cart.vue'),
        meta: {
          middleware: [tokenAuth, loadProducts]
        },
      },
      {
        path: 'admin/',
        component: () => import('@/layouts/default/Admin.vue'),
        children: [
          {
            path: 'products',
            name: 'AdminProducts',
            component: () => import(/* webpackChunkName: "admin-products" */ '@/views/AdminProducts.vue'),
            meta: {
              middleware: [tokenAuth, checkAdmin, loadProducts]
            },
          },
          {
            path: 'products/:id',
            name: 'AdminProduct',
            component: () => import(/* webpackChunkName: "admin-product" */ '@/views/AdminProduct.vue'),
            meta: {
              middleware: [tokenAuth, checkAdmin]
            },
          },
          {
            path: 'products/create',
            name: 'AdminProductCreate',
            component: () => import(/* webpackChunkName: "admin-product" */ '@/views/AdminCreateProduct.vue'),
            meta: {
              middleware: [tokenAuth, checkAdmin]
            },
          },
        ]
      }
    ],

  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach(async (to, from, next) => {
  const { middleware } = to.meta;
  const context = {
    to,
    from,
    next,
    router
  };

  if (!middleware) return next();

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router
