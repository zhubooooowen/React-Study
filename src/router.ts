import React from 'react';


const router =  [
  {
    title: '首页',
    path: '/counter',
    component: React.lazy(() => import('./pages/Counter/Counter'))
  },
  {
    title: '订单管理',
    path: '/order',
    component: React.lazy(() => import('./pages/OrderManage'))
  }
]

export default router
