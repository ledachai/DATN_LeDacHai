import React, {Component} from "react";
import $ from "jquery";
import axios from "axios";
import Index from ".";
import Admin from "./Admin";
import Swal from "sweetalert2";
import Home from "./Home";
import { NavLink } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./RegisterForm";

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            "isLogin": false,
            "Name": "Watch",
        }
    }
    validateLogin(Peo_Email, Peo_Password){
        let isValid = true;
        // Thêm validate username
        let errorOfPeoEmail = "";
        if (Peo_Email === "") {
            errorOfPeoEmail = errorOfPeoEmail + "Email không được bỏ trống!\n";
        }
        // Thêm validate password
        let errorOfPassword = "";
        if (Peo_Password === "") {
            errorOfPassword = errorOfPassword + "Mật khẩu không được bỏ trống!\n";
        }
        // Thêm hiện các dòng validate
        if (errorOfPeoEmail || errorOfPassword) {
            Swal.fire(
                'Cảnh báo\n\n Dữ liệu không hợp lệ',
                '',
                'error'
            )
            document.getElementById("errorOfPeoEmail").innerHTML = typeof errorOfPeoEmail === "undefined" ? "" : errorOfPeoEmail;
            document.getElementById("errorOfPassword").innerHTML = typeof errorOfPassword === "undefined" ? "" : errorOfPassword;
            isValid = false;
        }
        return isValid;
    }
    handleLogin(Peo_Email, Peo_Password){
        if(this.validateLogin(Peo_Email, Peo_Password)){
            var acc = {peo_Email: Peo_Email, peo_Password: Peo_Password}
            axios.post("https://localhost:5001/api/V1/People/login", acc, { "Content-Type": "json" })
            .then((response) => {
                localStorage.setItem("Token", response.data.token);
                localStorage.setItem("Role", response.data.per_Name);
                localStorage.setItem("FullName", response.data.peo_Fullname);
                localStorage.setItem("Email", response.data.peo_Email);
                localStorage.setItem("Peo_ID", response.data.peo_ID);
                this.setState({
                    isLogin: true,
                    Name: response.data.peo_Fullname
                })
            })
            .catch((err) => {
                Swal.fire(
                    '',
                    'Sai tên đăng nhập hoặc Mật khẩu!',
                    'error'
                )
            });
        }
    }
    
    render(){
        const errorLabel = {
            color: "red",
            padding: "10px",
        }
        if(this.state.isLogin){
            if(localStorage.getItem("Role") === "Nhân viên"){
                return(
                    <Index/>
                );
            }
            else if(localStorage.getItem("Role") === "Khách hàng"){
                return(
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
            return (
                <div>
                    <Routes>
                        <Route path="/RegisterForm" element={<RegisterForm/>}></Route>
                    </Routes>
                    <section className="vh-100" style={{backgroundColor: '#9A616D'}}>
                        <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-xl-10">
                            <div className="card" style={{borderRadius: '1rem'}}>
                                <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src="./img/logo1.jpg" alt="login form" className="img-fluid" style={{borderRadius: '1rem 0 0 1rem'}} />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                    <form>
                                        <div className="d-flex align-items-center mb-3 pb-1">
                                        <i className="fas fa-clock fa-2x me-3" style={{color: '#ff6219'}} />
                                        <span className="h1 fw-bold mb-0">Watch Store</span>
                                        </div>
                                        <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
                                        <div className="form-outline mb-4">
                                            {/* <input type="email" id="form2Example17" className="form-control form-control-lg" /> */}
                                            {/* <label className="form-label" htmlFor="form2Example17">Email address</label> */}
                                            <input type="email" name="Peo_Email" className="form-control" id="Peo_Email" 
                                            onChange={(e) => $(e.target).removeClass("active")}/>
                                            {/* Thêm validate tên đăng nhập */}
                                            <label htmlFor="Peo_Email" className="form-label">Email address</label>
                                            <label style={errorLabel} id="errorOfPeoEmail"></label>
                                        </div>
                                        <div className="form-outline mb-4">
                                            {/* <input type="password" id="form2Example27" className="form-control form-control-lg" /> */}
                                            <input type="password" name="Peo_Password" className="form-control" id="Peo_Password" 
                                            onChange={(e) => $(e.target).removeClass("active")} />
                                            {/* Thêm validate Mật khẩu */}
                                            <label htmlFor="Peo_Password" className="form-label">Password</label>
                                            <label style={errorLabel} id="errorOfPassword"></label>
                                        </div>
                                        <div className="pt-1 mb-4">
                                        <button className="btn btn-dark btn-lg btn-block" type="button"
                                            onClick={() => this.handleLogin($("#Peo_Email").val(), $("#Peo_Password").val())}>Login
                                        </button>
                                        </div>
                                        {/* <a className="small text-muted" href="#!">Forgot password?</a> */}
                                        <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account?
                                            <NavLink to="/RegisterForm" className="nav-link collapsed">
                                                <span>Register here</span>
                                            </NavLink>
                                        </p>
                                        <text href="#!" className="small text-muted">Terms of use.</text>
                                        <text href="#!" className="small text-muted">Privacy policy</text>
                                    </form>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </section>
                </div>
            );
        }
    }
}
export default Login;