import React, { Component } from "react";
import Category from "./Category/Category";
import Order from "./Order/Order";
import { Route, Routes } from "react-router-dom";
import Product from "./Product/Product";
import OrderDetail from "./OrderDetail/OrderDetail";
import Customer from "./Customer/Customer";
import Employee from "./Employee/Employee";
import Admin1 from "./Customer/Admin";
import Guess from "./Guess/Guess";
import RegisterForm from "./RegisterForm";
import AccountSetting from "./AccountSetting";
import Login from "./Login";

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
            <Route path="/Guess" element={<Guess/>}></Route>
            <Route path="/Login" element={<Login/>}></Route>
            <Route path="/RegisterForm" element={<RegisterForm/>}></Route>
            <Route path="/AccountSetting" element={<AccountSetting/>}></Route>
        </Routes>
        );
    }
}
export default MainPageNav;