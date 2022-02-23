//引入组件
// import Home from "@/Pages/Home/index.vue"
import Search from "@/Pages/Search/index.vue"
import Login from "@/Pages/Login/index.vue"
import Register from "@/Pages/Register/index.vue"
// import Detail from "@/Pages/Detail/index.vue"
// import AddCartSuccess from "@/Pages/AddCartSuccess/index.vue"
// import ShopCart from '@/Pages/ShopCart/index.vue'
// import Trade from '@/Pages/Trade/index.vue'
import Pay from '@/Pages/Pay/index.vue'
// import PaySuccess from '@/Pages/PaySuccess/index.vue'
import Center from '@/Pages/Center/index.vue'
// 引入二级路由组件
import MyOrder from '@/Pages/Center/myOrder'
import GroupOrder from '@/Pages/Center/groupOrder'
export default [
  {
    path: "/center",
    component: Center,
    meta: { show: true },
    // 二级路由组件
    children:[
      {
        path:'myorder',
        component:MyOrder
      },
      {
        path:'grouporder',
        component:GroupOrder
      },
      {
        path:'/center',
        redirect:'/center/myorder'
      }
    ]
  },
  {
    path: "/paysuccess",
    // 该写法是路由懒加载
    component: () => import('@/Pages/PaySuccess'),
    meta: { show: true }
  },
  {
    path: "/pay",
    component: Pay,
    meta: { show: true },
    beforeEnter:(to,from,next) => {
      if(from.path == '/trade') {
        next()
      }else {
        // 从哪来回哪去 页面不跳转
        next(false)
      }
    }
  },
  {
    path: "/trade",
    component: () => import('@/Pages/Trade'),
    meta: { show: true },
    beforeEnter:(to,from,next) => {
      if(from.path == '/shopcart') {
        next();
      }else {
        next(false)
      }
    }
  },
  {
    path: "/shopcart",
    component: () => import('@/Pages/ShopCart'),
    meta: { show: true }
  },
  {
    path: "/addcartsuccess",
    component: () => import('@/Pages/AddCartSuccess'),
    name:"AddCartSuccess",
    meta: { show: true }
  },
  {
    path: "/detail/:skuid",
    component: () => import('@/Pages/Detail'),
    meta: { show: true }
  },
  {
    path: "/home",
    component: () => import('@/Pages/Home'),
    meta: { show: true }
  },
  {
    /* 加问号 可传可不传 */
    path: "/search/:keyword?",
    component: Search,
    meta: { show: true },
    name: "search",
    // 路由组件能不能传递props数据?
    //  布尔值写法:只能传params
    // props: true,
    // 对象写法 :额外的给路由传递一些props
    // props:{a:1,b:2}
    // 函数写法：可以params参数、query参数、通过props传递给路由组件
    props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k })
  },
  {
    path: "/login",
    component: Login,
    meta: { show: false }
  },
  {
    path: "/register",
    component: Register,
    meta: { show: false }
  },
  //重定向 在项目跑起来的时候 访问/，立马让他定向到首页
  {
    path: "*",
    redirect: "/home"
  }
]