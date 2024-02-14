import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from '../pages/home';
import ProductsManagement from "../pages/productsManagement";
import EmployeesManagement from "../pages/employeesManagement";
import Logout from '../pages/logout';
import ErrorNotFoundPage from '../pages/errorNotFoundPage';
import Dashboard from '../pages/dashboard';
import ProductDetails from '../pages/productDetails';

const Router = () => {
    return (
      <>
        <Routes>
          <Route path="/" element={<Home/>}>
            <Route index path="/dashboard" element={<Dashboard />} />
            <Route path="/employeesManagement" element={<EmployeesManagement />} />
            <Route path="/productsManagement" element={<ProductsManagement />} />
            <Route path="/productsManagement/:id" element={<ProductDetails />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<ErrorNotFoundPage />} />
          </Route>
        </Routes>
      </>
    )
}

export default Router;