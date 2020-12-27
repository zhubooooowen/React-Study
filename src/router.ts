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
  },
  {
    title: '表格拖拽',
    path: '/dragTable',
    component: React.lazy(() => import('./pages/DragTable'))
  },
  {
    title: '进度条',
    path: '/progress',
    component: React.lazy(() => import('./pages/Progress'))
  },
  {
    title: '栅格',
    path: '/grid',
    component: React.lazy(() => import('./pages/Grid'))
  },
  {
    title: '分页',
    path: '/pagination',
    component: React.lazy(() => import('./pages/Pagination'))
  }
]

export default router
