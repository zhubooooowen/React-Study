import React from "react";
import "./index.less";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";
import routerList from "../../router";

const Navbar: React.FC = () => {

  let selectedKeys = "0";
  const hash = window.location.hash.substr(1);
  routerList.forEach((item: any, i: number) => {
    if (hash.includes(item.path)) {
      selectedKeys = i.toString();
    }
  });
  return (
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={[selectedKeys]}
      selectedKeys={[selectedKeys]}
      mode="inline"
    >
      {routerList.map((item: any, i: number) => (
        <Menu.Item key={`${i}`}>
          <Link to={item.path}>{item.title}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
}

// withRouter 使组件的 props 里加入 history location match 属性
export default withRouter(Navbar);
