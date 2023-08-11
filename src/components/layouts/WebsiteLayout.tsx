import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const WebsiteLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          onClick={({key}) => {
            navigate(key)
          }}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['/']}
          items={[
            {
              label: "Home",
              key: "/"
            },
            {
              label: "Product",
              key: "/product"
            },
            {
              icon: <ShoppingCartOutlined />,
              key: "/cart"
            }
          ]}
        />
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}><Outlet /></div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
};

export default WebsiteLayout;