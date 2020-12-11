import React from 'react';


export default [
  {
    title: '首页',
    path: '/counter',
    component: React.lazy(() => import('./features/counter/Counter'))
  }
]
