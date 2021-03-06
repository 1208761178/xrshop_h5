import Vue from 'vue';
import { RouteConfig } from 'vue-router';
import VueRouter from '@/library/VueRouterPlus';
import Index from '@/views/Index.vue';
import Home from '@/views/Index/Home.vue';
import { loadViewScrollPosition, saveViewScrollPosition } from '@/utils/view-scroll-behavior';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: '/index/home',
    children: [
      {
        path: '/index/home',
        name: 'Home',
        component: Home, // 首屏同依赖包一起一次性加载完
      },
      {
        path: '/index/category',
        name: 'Category',
        component: () => import(/* webpackChunkName: "Category" */ '@/views/Index/Category.vue'),
      },
      {
        path: '/index/cart',
        name: 'Cart',
        component: () => import(/* webpackChunkName: "Cart" */ '@/views/Index/Cart.vue'), // 其余页分包加载
      },
      {
        path: '/index/my',
        name: 'My',
        component: () => import(/* webpackChunkName: "My" */ '@/views/Index/My.vue'),
        meta: {
          auth: 1,
        },
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "About" */ '../views/About.vue'),
  },
  {
    path: '/news',
    name: 'News',
    component: () => import(/* webpackChunkName: "News" */ '../views/News.vue'),
  },
  {
    path: '/news-details',
    name: 'NewsDetails',
    component: () => import(/* webpackChunkName: "NewsDetails" */ '../views/NewsDetails.vue'),
  },
  {
    path: '/category-details',
    name: 'CategoryDetails',
    component: () => import(/* webpackChunkName: "CategoryDetails" */ '../views/CategoryDetails.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      if (loadViewScrollPosition(to)) {
        return undefined;
      }
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  saveViewScrollPosition(from);
  next();
});

export default router;
