import './App.css';
import React, { Component } from 'react';
import Index from './Components';
import Login from './Components/Login';
import Admin from './Components/Admin';
import Home from './Components/Home';
import { Routes, Route } from 'react-router';
import AccountSetting from './Components/AccountSetting';
import Watches from './Components/Watches/Watches';
// import RegisterForm from './Components/RegisterForm';
import ProductDetail from './Components/Watches/ProductDetail';
import Cart from './Components/Watches/Cart';
import OrderKH from './Components/Watches/OrderKH.js';


class App extends Component {
  constructor(pros){
    super(pros)
    
    this.state = {
      "target": ""
    }
  }
  render(){
    if(localStorage.getItem("Token")){
      if(localStorage.getItem("Role") === "Nhân Viên"){
        return (
          // <Index/>
          <Routes>
                <Route path='/Index' element={<Index/>}></Route>
          </Routes>
        );
      }
      else if(localStorage.getItem("Role") === "Khách hàng"){
        return (
          <div>
            <Routes>
                <Route path='/Home' element={<Home/>}></Route>
                <Route path="/AccountSetting" element={<AccountSetting/>}></Route>
                <Route path="/Watches" element={<Watches/>}></Route>
                <Route path="/ProductDetail" element={<ProductDetail/>}></Route>
                <Route path="/Cart" element={<Cart/>}></Route>
                <Route path="/ListOrder" element={<OrderKH/>}></Route>
            </Routes>
          </div>
        );
      }
      else{
        return(
        // <Admin/>
        <Routes>
                <Route path='/Admin' element={<Admin/>}></Route>
        </Routes>
        );
      }
    }
    else{
      return(
          <Login/>
      );
    }
    // return(
    //   <Login/>
    // )
  }
}

export default App;
