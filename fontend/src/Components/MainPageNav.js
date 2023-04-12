import React, { Component } from "react";
import Category from "./Category/Category";
import Order from "./Order/Order";
import { Route, Routes } from "react-router-dom";
import Product from "./Product/Product";
import OrderDetail from "./OrderDetail/OrderDetail";
import Customer from "./Customer/Customer";
import Employee from "./Employee/Employee";
import Admin1 from "./Customer/Admin";

class MainPageNav extends Component{
    render(){

        return(
        <Routes>
            <Route path="/Categories" element={<Category/>}></Route>
            <Route path="/Products" element={<Product/>}></Route>
            <Route path="/Orders" element={<Order/>}></Route>
            <Route path="/Reports" element={<OrderDetail/>}></Route>
            <Route path="/Customers" element={<Customer/>}></Route>
            <Route path="/Employees" element={<Employee/>}></Route>
            <Route path="/Admins" element={<Admin1/>}></Route>
        </Routes>
        );
    }
}
export default MainPageNav;