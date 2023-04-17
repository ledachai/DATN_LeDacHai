import './App.css';
import React, { Component } from 'react';
import Index from './Components';
import Login from './Components/Login';
import Admin from './Components/Admin';
import Home from './Components/Home';


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
          <Home/>
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
