import Vue from "vue";
import Router, { Route } from "vue-router";
import Layout from "./components/Layout/index.vue";

Vue.use(Router);

const router: Router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      name: "404",
      path: "/404",
      component: () => import("@/views/404/index.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/login/index.vue")
    },
    {
      path: "/welcome",
      name: "welcome",
      component: () => import("./views/welcome/index.vue")
    },
    {
      path: "/checkin",
      name: "checkin",
      component: Layout,
      redirect: "/checkin/show-html",
      children: [
        {
          path: "/checkin/test",
          name: "checkinTest",
          component: () => import("./views/Home.vue")
        },
        {
          path: "/checkin/admission-info",
          name: "admission-info",
          meta: { title: "录取信息" },
          component: () => import("./views/admission-info/index.vue")
        },
        {
          path: "/checkin/student-info",
          name: "student-info",
          meta: { title: "个人信息" },
          component: () => import("./views/student-info/index.vue")
        },
        {
          path: "/checkin/registration",
          name: "registration",
          meta: { title: "报道登记" },
          component: () => import("./views/registration/index.vue")
        },
        {
          path: "/checkin/upload-picture",
          name: "upload-picture",
          meta: { title: "上传照片" },
          component: () => import("./views/upload-picture/index.vue")
        },
        {
          path: "/checkin/green-channel",
          name: "green-channel",
          meta: { title: "绿色通道" },
          component: () => import("./views/green-channel/index.vue")
        },
        {
          path: "/checkin/leave",
          name: "leave",
          meta: { title: "请假申请" },
          component: () => import("./views/leave/index.vue")
        },
        {
          path: "/checkin/show-html",
          name: "show-html",
          meta: { title: "展示富文本" },
          component: () => import("./views/show-html/index.vue")
        }
      ]
    },
    {
      path: "*", // 此处需特别注意至于最底部
      redirect: "/404"
    }
  ]
});

// 简单权限控制
const whiteList: string[] = ["login", "signup", "home", "about"];
const isLogin: boolean = false;
router.beforeEach((to: Route, form: Route, next: Function) => {
  // 不在白名单内，没有登陆
  // if (whiteList.indexOf(to.name as string) === -1 && !isLogin) {
  //   next("/login");
  // }
  if (!localStorage.getItem("token") && to.path !== "/login") {
    next("/login");
  }
  next();
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
