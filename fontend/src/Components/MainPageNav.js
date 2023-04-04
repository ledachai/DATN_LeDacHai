import React, { Component } from "react";
import Category from "./Category/Category";
import Order from "./Order/Order";
import { Route, Routes } from "react-router-dom";
import Product from "./Product/Product";
import OrderDetail from "./OrderDetail/OrderDetail";
import Customer from "./Customer/Customer";

class MainPageNav extends Component{
    render(){

        return(
        <Routes>
            {/* <Route path="/HomePage" element={<HomePage/>}></Route>
            <Route path="/guests" element={<Guest/>}></Route>
            <Route path="/OrderRoom" element={<OrderRoom/>}></Route>
            <Route path="/OrderService" element={<OrderService/>}></Route>
            <Route path="/Services" element={<Service/>}></Route>
            <Route path="/Rooms" element={<Room/>}></Route>
            <Route path="/Bills" element={<Bill/>}></Route>
            <Route path="/Accounts" element={<Account/>}></Route> */}
            <Route path="/Categories" element={<Category/>}></Route>
            <Route path="/Products" element={<Product/>}></Route>
            <Route path="/Orders" element={<Order/>}></Route>
            <Route path="/Reports" element={<OrderDetail/>}></Route>
            <Route path="/Customers" element={<Customer/>}></Route>
        </Routes>
        );
    }
}
export default MainPageNav;