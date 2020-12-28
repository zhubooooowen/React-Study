import React, { Suspense } from 'react';
import './App.less';
// HashRouter 打包 不能用 BrowserRouter
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { Breadcrumb, Skeleton } from "antd";
import {
  HomeOutlined
} from '@ant-design/icons';
import routerList from "./router";
import Navbar from "@components/Navbar";

interface Irouter {
  title?: string,
  path: string,
  component: any,
  icon?: string,
  children?: Irouter[]
}

const routeArr: any[] = []

const App: React.FC = () => {

  // 把 routerList 的每一项和每一项的 children 都注册到路由上
  const setRoute = (arr: Irouter[]): any[] => {
    arr.forEach(item => {
      // 递归处理
      // Switch 总是渲染第一个匹配到的组件 所以把子组件路由放到前面
      // home/about 可以匹配到 /home 和 /home/about
      // 如果 <Route path="/home" component={Home} /> 在上 点击 home/about 就直接匹配了 Home 组件
      // 如果我们在每个路由上都添加 exact 那么它们的顺序可以随意调整
      if (item.children) {
        setRoute(item.children);
      }
      routeArr.push(
        <Route
          key={item.path}
          exact // 精确匹配
          path={item.path}
          component={item.component}
        />
      );
    });
    return routeArr;
  }

  const hash = window.location.hash.substr(2);
  let titleList = hash.split("/");
  routerList.forEach(item => {
    if (item.path.substr(1) === titleList[0]) {
      titleList[0] = item.title;
    }
  });

  return (
    <div id="app">
      <div className="title">
        <span>
          React Study
        </span>
      </div>
      <div className="app">
        <Navbar />
        <div className="content">
          <Breadcrumb>
            <Breadcrumb.Item>
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>{titleList[0]}</Breadcrumb.Item>
          </Breadcrumb>
          <Suspense fallback={<Skeleton active />}>
            <Switch>
              {setRoute(routerList)}
              <Redirect from="/" to="/counter" />
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default withRouter(App);

