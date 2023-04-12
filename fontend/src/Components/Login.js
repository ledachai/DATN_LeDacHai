import React, {Component} from "react";
import $ from "jquery";
import axios from "axios";
import Index from ".";
import Admin from "./Admin";
import Swal from "sweetalert2";

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            "isLogin": false,
            "Name": "Watch"
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
            else{
                return(
                    <Admin/>
                );
            }
        }
        else{
            return(
                <div className="container">
                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                            <div className="d-flex justify-content-center py-4">
                            <a href="index.html" className="logo d-flex align-items-center w-auto">
                                <img src="assets/img/logo.png" alt="" />
                                <span className="d-none d-lg-block">Watch Store</span>
                            </a>
                            </div>{/* End Logo */}
                            <div className="card mb-3">
                            <div className="card-body">
                                <div className="pt-4 pb-2">
                                <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                <p className="text-center small">Enter your email &amp; password to login</p>
                                </div>
                                {/* form */}
                                <form className="row g-3 needs-validation" noValidate>
                                <div className="col-12">
                                    <label htmlFor="Peo_Email" className="form-label">Email</label>
                                    {/* <span className="input-group-text" id="inputGroupPrepend">@</span> */}
                                    <input type="email" name="Peo_Email" className="form-control" id="Peo_Email" 
                                    onChange={(e) => $(e.target).removeClass("active")}/>
                                    {/* Thêm validate tên đăng nhập */}
                                    <label style={errorLabel} id="errorOfPeoEmail"></label>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="Peo_Password" className="form-label">Password</label>
                                    <input type="password" name="Peo_Password" className="form-control" id="Peo_Password" 
                                    onChange={(e) => $(e.target).removeClass("active")} />
                                    {/* Thêm validate Mật khẩu */}
                                    <label style={errorLabel} id="errorOfPassword"></label>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary w-100" type="button" onClick={() => this.handleLogin($("#Peo_Email").val(), $("#Peo_Password").val())}>Login</button>
                                </div>
                                </form>
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