/*前端路由配置*/
import Vue from 'vue'
import Router from 'vue-router'
/*引入用到的组件*/
import login from '../components/login.vue'
import nav1 from '../components/nav1.vue'
import nav1_1 from '../components/nav1_1.vue'
import nav1_2 from '../components/nav1_2.vue'
import nav1_3 from '../components/nav1_3.vue'
import nav1_4 from '../components/nav1_4.vue'
import nav1_5 from '../components/nav1_5.vue'
import nav1_6 from '../components/nav1_6.vue'
import nav2 from '../components/nav2.vue'
import nav2_1 from '../components/nav2_1.vue'
import nav2_2 from '../components/nav2_2.vue'
import nav2_2_1 from '../components/nav2_2_1.vue'
import nav2_2_2 from '../components/nav2_2_2.vue'
import nav2_2_3 from '../components/nav2_2_3.vue'
import nav2_3 from '../components/nav2_3.vue'
import nav2_3_1 from '../components/nav2_3_1.vue'
import nav2_3_2 from '../components/nav2_3_2.vue'
import nav2_4 from '../components/nav2_4.vue'
import nav2_5 from '../components/nav2_5.vue'
import nav2_6 from '../components/nav2_6.vue'
import nav2_7 from '../components/nav2_7.vue'
import nav2_7_1 from '../components/nav2_7_1.vue'
import nav2_7_2 from '../components/nav2_7_2.vue'
import nav2_8 from '../components/nav2_8.vue'
import nav2_9 from '../components/nav2_9.vue'
import nav3 from '../components/nav3.vue'
import nav3_1 from '../components/nav3_1.vue'
import nav3_2 from '../components/nav3_2.vue'
import nav4 from '../components/nav4.vue'
import nav4_1 from '../components/nav4_1.vue'
import nav4_2 from '../components/nav4_2.vue'
import nav4_3 from '../components/nav4_3.vue'
import nav4_4 from '../components/nav4_4.vue'
import nav4_5 from '../components/nav4_5.vue'
import nav5 from '../components/nav5.vue'
import nav5_1 from '../components/nav5_1.vue'
import nav5_2 from '../components/nav5_2.vue'
import nav5_3 from '../components/nav5_3.vue'
import nav5_4 from '../components/nav5_4.vue'
import nav6 from '../components/nav6.vue'
import nav6_1 from '../components/nav6_1.vue'
import nav6_2 from '../components/nav6_2.vue'
import nav7 from '../components/nav7.vue'
import nav7_1 from '../components/nav7_1.vue'
import nav7_2 from '../components/nav7_2.vue'
import nav7_3 from '../components/nav7_3.vue'
import nav7_4 from '../components/nav7_4.vue'
import nav7_5 from '../components/nav7_5.vue'
import nav7_6 from '../components/nav7_6.vue'
import nav7_7 from '../components/nav7_7.vue'
import nav8 from '../components/nav8.vue'
import nav8_1 from '../components/nav8_1.vue'
import nav8_2 from '../components/nav8_2.vue'
import nav8_3 from '../components/nav8_3.vue'
import nav8_4 from '../components/nav8_4.vue'
Vue.use(Router)

var router = new Router({
  routes: [
    {
      name:'login',
      path: '/login',  /*路由地址，前端路由，界面引用时 + “#” */
      component: login,  /* 这个hello是引入组件的真正意义*/
      meta: { showframe: false },
    },
    {
      name:'nav1', path: '/nav1',component: nav1,meta: { showframe: true},
      children: [
        {
          name:'nav1_1',
          path: '/nav1/nav1_1',
          component: nav1_1,
          meta: { showframe: true },
        },
        {
          name:'nav1_2',
          path: '/nav1/nav1_2',
          component: nav1_2,
          meta: { showframe: true },
        },
        {
          name:'nav1_3',
          path: '/nav1/nav1_3',
          component: nav1_3,
          meta: { showframe: true },
        },
        {
          name:'nav1_4',
          path: '/nav1/nav1_4',
          component: nav1_4,
          meta: { showframe: true },
        },
        {
          name:'nav1_5',
          path: '/nav1/nav1_5',
          component: nav1_5,
          meta: { showframe: true },
        },
        {
          name:'nav1_6',
          path: '/nav1/nav1_6',
          component: nav1_6,
          meta: { showframe: true },
        },
      ]
    },
    {
      name:'nav2', path: '/nav2',component: nav2,
      children: [
        {
          name:'nav2_1',
          path: '/nav2/nav2_1',
          component: nav2_1,
          meta: { showframe: true },
        },
        {
          name:'nav2_2',
          path: '/nav2/nav2_2',
          component: nav2_2,
          children: [
            {
              name:'nav2_2_1',
              path: '/nav2/nav2_2/nav2_2_1',
              component: nav2_2_1,
              meta: { showframe: true },
            },
            {
              name:'nav2_2_2',
              path: '/nav2/nav2_2/nav2_2_2',
              component: nav2_2_2,
              meta: { showframe: true },
            },
            {
              name:'nav2_2_3',
              path: '/nav2/nav2_2/nav2_2_3',
              component: nav2_2_3,
              meta: { showframe: true },
            },
          ],
        },
        {
          name:'nav2_3',
          path: '/nav2/nav2_3',
          component: nav2_3,
          children: [
            {
              name:'nav2_3_1',
              path: '/nav2/nav2_3/nav2_3_1',
              component: nav2_3_1,
              meta: { showframe: true },
            },
            {
              name:'nav2_3_2',
              path: '/nav2/nav2_3/nav2_3_2',
              component: nav2_3_2,
              meta: { showframe: true },
            },
          ],
        },    {
          name:'nav2_4',
          path: '/nav2/nav2_4',
          component: nav2_4,
          meta: { showframe: true },
        },
        {
          name:'nav2_5',
          path: '/nav2/nav2_5',
          component: nav2_5,
          meta: { showframe: true },
        },
        {
          name:'nav2_6',
          path: '/nav2/nav2_6',
          component: nav2_6,
          meta: { showframe: true },
        },
        {
          name:'nav2_7',
          path: '/nav2/nav2_7',
          component: nav2_7,
          children:[
            {
              name:'nav2_7_1',
              path: '/nav2/nav2_7/nav2_7_1',
              component: nav2_7_1,
              meta: { showframe: true },
            },
            {
              name:'nav2_7_2',
              path: '/nav2/nav2_7/nav2_7_2',
              component: nav2_7_2,
              meta: { showframe: true },
            },
          ]
        },
        {
          name:'nav2_8',
          path: '/nav2/nav2_8',
          component: nav2_8,
          meta: { showframe: true },
        },
        {
          name:'nav2_9',
          path: '/nav2/nav2_9',
          component: nav2_9,
          meta: { showframe: true },
        },

      ]
    },
    {
      name:'nav3', path: '/nav3',component: nav3,
      children: [
        {
          name:'nav3_1',
          path: '/nav3/nav3_1',
          component: nav3_1,
          meta: { showframe: true },
        },
        {
          name:'nav3_2',
          path: '/nav3/nav3_2',
          component: nav3_2,
          meta: { showframe: true },
        },
      ]
    },
    {
      name:'nav4', path: '/nav4',component: nav4,
      children: [
        {
          name:'nav4_1',
          path: '/nav4/nav4_1',
          component: nav4_1,
          meta: { showframe: true },
        },
        {
          name:'nav4_2',
          path: '/nav4/nav4_2',
          component: nav4_2,
          meta: { showframe: true },
        },
        {
          name:'nav4_3',
          path: '/nav4/nav4_3',
          component: nav4_3,
          meta: { showframe: true },
        },
        {
          name:'nav4_4',
          path: '/nav4/nav4_4',
          component: nav4_4,
          meta: { showframe: true },
        },
        {
          name:'nav4_5',
          path: '/nav4/nav4_5',
          component: nav4_5,
          meta: { showframe: true },
        },
      ]
    },
    {
      name:'nav5', path: '/nav5',component: nav5,
      children: [
        {
          name:'nav5_1',
          path: '/nav5/nav5_1',
          component: nav5_1,
          meta: { showframe: true },
        },
        {
          name:'nav5_2',
          path: '/nav5/nav5_2',
          component: nav5_2,
          meta: { showframe: true },
        },
        {
          name:'nav5_3',
          path: '/nav5/nav5_3',
          component: nav5_3,
          meta: { showframe: true },
        },
        {
          name:'nav5_4',
          path: '/nav5/nav5_4',
          component: nav5_4,
          meta: { showframe: true },
        },
      ]
    },
    {
      name:'nav6', path: '/nav6',component: nav6,
      children: [
        {
          name:'nav6_1',
          path: '/nav6/nav6_1',
          component: nav6_1,
          meta: { showframe: true },
        },
        {
          name:'nav6_2',
          path: '/nav6/nav6_2',
          component: nav6_2,
          meta: { showframe: true },
        },
      ]
    },
    {
      name:'nav7', path: '/nav7',component: nav7,
      children: [
        {
          name:'nav7_1',
          path: '/nav7/nav7_1',
          component: nav7_1,
          meta: { showframe: true },
        },
        {
          name:'nav7_2',
          path: '/nav7/nav7_2',
          component: nav7_2,
          meta: { showframe: true },
        },
        {
          name:'nav7_3',
          path: '/nav7/nav7_3',
          component: nav7_3,
          meta: { showframe: true },
        },
        {
          name:'nav7_4',
          path: '/nav7/nav7_4',
          component: nav7_4,
          meta: { showframe: true },
        },
        {
          name:'nav7_5',
          path: '/nav7/nav7_5',
          component: nav7_5,
          meta: { showframe: true },
        },
        {
          name:'nav7_6',
          path: '/nav7/nav7_6',
          component: nav7_6,
          meta: { showframe: true },
        },
        {
          name:'nav7_7',
          path: '/nav7/nav7_7',
          component: nav7_7,
          meta: { showframe: true },
        },
      ]
    },
    {
      name:'nav8', path: '/nav8',component: nav8,
      children: [
        {
          name:'nav8_1',
          path: '/nav8/nav8_1',
          component: nav8_1,
          meta: { showframe: true },
        },
        {
          name:'nav8_2',
          path: '/nav8/nav8_2',
          component: nav8_2,
          meta: { showframe: true },
        },
        {
          name:'nav8_3',
          path: '/nav8/nav8_3',
          component: nav8_3,
          meta: { showframe: true },
        },
        {
          name:'nav8_4',
          path: '/nav8/nav8_4',
          component: nav8_4,
          meta: { showframe: true },
        },
      ]
    },
  ]
})
export default  router
