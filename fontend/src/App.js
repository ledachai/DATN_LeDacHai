import './App.css';
import React, { Component } from 'react';
import Index from './Components';
import Login from './Components/Login';
import Admin from './Components/Admin';
import Home from './Components/Home';
import { Routes, Route } from 'react-router';
import AccountSetting from './Components/AccountSetting';
import Watches from './Components/Watches/Watches';
import RegisterForm from './Components/RegisterForm';


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
          <Index/>
        );
      }
      else if(localStorage.getItem("Role") === "Khách hàng"){
        return (
          <div>
            <Routes>
                <Route path='/Home' element={<Home/>}></Route>
                <Route path="/AccountSetting" element={<AccountSetting/>}></Route>
                <Route path="/Watches" element={<Watches/>}></Route>
            </Routes>
          </div>
        );
      }
      else{
        return(
        <Admin/>
        );
      }
    }
    else{
      return(
          <Login/>
      );
    }
  }
}

export default App;
