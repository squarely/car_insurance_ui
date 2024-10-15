import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import InspectionView from '@/views/InspectionView.vue'
import PolicyShowView from '@/views/PolicyShowView.vue'
import ImageUpload from '@/views/ImageUpload.vue'
import EstimationReport from '@/views/EstimationReport.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: InspectionView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/policies/:id',
      name: 'policy_details',
      component: PolicyShowView
    },
    {
      path: '/policies/:id/upload',
      name: 'image_upload',
      component: ImageUpload
    },
    {
      path: '/estimations/:id/report',
      name: 'estimation_report',
      component: EstimationReport
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('api_token')
  if (to.name !== 'login' && !token) next({ name: 'login' })
  else if(to.name === 'login' && token) next({ name: 'home' })
  else next()
})

export default router

// {
//   path: '/about',
//   name: 'about',
//   // route level code-splitting
//   // this generates a separate chunk (About.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () => import('../views/AboutView.vue')
// }
