import './App.css';
import React, { Component } from 'react';
import Index from './Components';
import Login from './Components/Login';
import Admin from './Components/Admin';

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
