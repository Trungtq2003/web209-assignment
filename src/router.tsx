import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import WebsiteLayout from './components/layouts/WebsiteLayout'
import AdminLayout from './components/layouts/AdminLayout'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import ProductDetailPage from './pages/ProductDetailPage'
import DashBoard from './pages/admin/DashBoard'
import ProductManager from './pages/admin/ProductManager'
import AddProduct from './pages/admin/AddProduct'
import EditProduct from './pages/admin/EditProduct'
import UserManagement from './pages/admin/UserManagement'

export const router = createBrowserRouter([
  {
    path: "/", element: <WebsiteLayout/>, children: [
        { index: true, element: <Navigate to="homepage" /> },
        { path: "homepage", element: <HomePage/> },
        { path: "product", element: <ProductPage/> },
        { path: "product/:id", element: <ProductDetailPage/> },
    ]
  },
  {
    path: "/admin", element: <AdminLayout/>, children: [
        { index: true, element: <Navigate to="dashboard"/> },
        { path: "dashboard", element: <DashBoard/> },
        { path: "product", element: <ProductManager/> },
        { path: "product/add", element: <AddProduct/> },
        { path: "product/:idProduct/edit", element: <EditProduct/> },

        { path: "user", element: <UserManagement/> }
    ]
  }
])