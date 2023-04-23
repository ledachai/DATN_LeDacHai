import React, {Component} from "react";
import {Route, Routes } from "react-router";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
class RegisterForm extends Component{
  constructor() {
    super();
    this.state = {
        peo_Fullname: '',
        peo_Password: '',
        peo_Email: '',
        peo_Dateofbirth: '',
        peo_Address: '',
        peo_Sex: '',

        defaultUrl: "https://localhost:5001/api/V1/People"
    }
  }
  handleFormPeoFullnameChange = (value) => {
    this.setState({
        peo_Fullname: value,
    });
  };
  handleFormPeoEmailChange = (value) => {
      this.setState({
          peo_Email: value,
      });
  };
  handleFormPeoPasswordChange = (value) => {
      this.setState({
          peo_Password: value,
      });
  };
  handleFormPeoDateofbirthChange = (value) => {
      this.setState({
          peo_Dateofbirth: value,
      });
  };
  handleFormPeoSexChange = (value) => {
      this.setState({
          peo_Sex: value,
      });
  };
  handleFormPeoAddressChange = (value) => {
      this.setState({
          peo_Address: value,
      });
  };
  postData = () => {
    axios
        .post(this.state.defaultUrl, {
            peo_Fullname: this.state.peo_Fullname,
            peo_Password: this.state.peo_Password,
            peo_Email: this.state.peo_Email,
            peo_Dateofbirth: this.state.peo_Dateofbirth,
            peo_Address: this.state.peo_Address,
            peo_Sex: this.state.peo_Sex
        })
        .then(response => {
            if (response.data) {
                Swal.fire(
                    'Đăng ký thành công!',
                    'Bạn có thể đăng nhập bây giờ',
                    'success'
                )
            }
            else {
                Swal.fire(
                    'Không thể thực hiện thêm!',
                    'Đã xảy ra một vấn đề nào đó',
                    'error'
                )
            }
        })
        .catch(error => {
            Swal.fire(
                'Đăng ký thất bại!',
                'Đã xảy ra một vấn đề nào đó',
                'error'
            )
        });
  };
    validateEmployeeForm = () => {
      // validate text
      let errorOfPeoFullname = "";
      let peo_Fullname = document.getElementById("inputPeoFullname").value;
      if (peo_Fullname === "") {
          errorOfPeoFullname = errorOfPeoFullname + "Họ tên không được bỏ trống!\n";
      }
      var validRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      var format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
      if (format.test(peo_Fullname)) {
          errorOfPeoFullname += "Họ tên không được chứa ký tự đặc biệt";
      }
      let errorOfPeoEmail ="";
      let peo_Email = document.getElementById("inputPeoEmail").value;
      if(peo_Email===""){
          errorOfPeoEmail = errorOfPeoEmail + "Email không được để trống!\n";
      }
      else if (!validRegex.test(peo_Email)) {
        errorOfPeoEmail += "Email không hợp lệ!";
      }
      let errorOfPeoAddress ="";
      let peo_Address = document.getElementById("inputPeoAddress").value;
      if(peo_Address===""){
          errorOfPeoAddress = errorOfPeoAddress + "Địa chỉ không được để trống!\n";
      }
      let errorOfPeoPassword = "";
      let peo_Password = document.getElementById("inputPeoPassword").value;
      if (peo_Password === "") {
          errorOfPeoPassword = errorOfPeoPassword + "Password không được bỏ trống!\n";
      }
      let errorOfPeoDateofbirth = "";
      let peo_Dateofbirth = document.getElementById("inputPeoDateofbirth").value;
      if (peo_Dateofbirth === "") {
          errorOfPeoDateofbirth = errorOfPeoDateofbirth + "Ngày sinh không được bỏ trống!\n";
      }
      let errorOfPeoSex = "";
      let peo_Sex = document.getElementById("inputPeoSex").value;
      if (peo_Sex === "") {
          errorOfPeoSex = errorOfPeoSex + "Giới tính không được bỏ trống!\n";
      }
      if (errorOfPeoFullname || errorOfPeoEmail || errorOfPeoAddress || errorOfPeoPassword || errorOfPeoDateofbirth || errorOfPeoSex) {
        Swal.fire(
          'Cảnh báo\n\n Dữ liệu không hợp lệ',
          '',
          'error'
        )
        document.getElementById("errorOfPeoFullname").innerHTML = typeof errorOfPeoFullname === "undefined" ? "" : errorOfPeoFullname;
        document.getElementById("errorOfPeoEmail").innerHTML = typeof errorOfPeoEmail === "undefined" ? "" : errorOfPeoEmail;
        document.getElementById("errorOfPeoAddress").innerHTML = typeof errorOfPeoAddress === "undefined" ? "" : errorOfPeoAddress;
        document.getElementById("errorOfPeoPassword").innerHTML = typeof errorOfPeoPassword === "undefined" ? "" : errorOfPeoPassword;
        document.getElementById("errorOfPeoDateofbirth").innerHTML = typeof errorOfPeoDateofbirth === "undefined" ? "" : errorOfPeoDateofbirth;
        document.getElementById("errorOfPeoSex").innerHTML = typeof errorOfPeoSex === "undefined" ? "" : errorOfPeoSex;
      }
      else {
        this.postData();
      }
    };
    render() {
        const errorLabel = {
          color: "red",
          padding: "10px",
        }
        return (
          <div className="card">
            <div className="card-body">
              <h1 className="card-title" style={{textAlign:'center'}}>Đăng ký tài khoản</h1>
                  <form>
                    <div className="row mb-3">
                      <label htmlFor="inputPeoFullname" className="col-sm-2 col-form-label">Họ tên</label>
                      <div className="col-sm-6">
                        <input type="text" className="form-control" id="inputPeoFullname" value={this.props.peo_Fullname}
                          onChange={(event) =>
                            this.handleFormPeoFullnameChange(event.target.value)
                          }
                        />
                        <label style={errorLabel} id="errorOfPeoFullname"></label>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="inputPeoEmail" className="col-sm-2 col-form-label">Email</label>
                      <div className="col-sm-6">
                        <input type="email" className="form-control" id="inputPeoEmail" value={this.props.peo_Email}
                          onChange={(event) =>
                            this.handleFormPeoEmailChange(event.target.value)
                          } />
                          <label style={errorLabel} id="errorOfPeoEmail"></label>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="inputPeoPassword" className="col-sm-2 col-form-label">Password</label>
                      <div className="col-sm-6">
                        <input type="password" className="form-control" id="inputPeoPassword" value={this.props.peo_Password}
                          onChange={(event) =>
                            this.handleFormPeoPasswordChange(event.target.value)
                          } />
                          <label style={errorLabel} id="errorOfPeoPassword"></label>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="inputPeoDateofbirth" className="col-sm-2 col-form-label">Ngày sinh</label>
                      <div className="col-sm-6">
                        <input type="date" className="form-control" id="inputPeoDateofbirth" value={this.props.peo_Dateofbirth}
                          onChange={(event) =>
                            this.handleFormPeoDateofbirthChange(event.target.value)
                          } />
                          <label style={errorLabel} id="errorOfPeoDateofbirth"></label>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="inputPeoAddress" className="col-sm-2 col-form-label">Địa chỉ</label>
                      <div className="col-sm-6">
                        <input type="text" className="form-control" id="inputPeoAddress" value={this.props.peo_Address}
                          onChange={(event) =>
                            this.handleFormPeoAddressChange(event.target.value)
                          } />
                          <label style={errorLabel} id="errorOfPeoAddress"></label>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="inputPeoSex" className="col-sm-2 col-form-label">Giới tính</label>
                      <div className="col-sm-6">
                        <select className="form-control" id="inputPeoSex" value={this.props.peo_Sex}
                        onChange={(event) => this.handleFormPeoSexChange(event.target.value)}>
                            <option value={"Nam"}>Nam</option>
                            <option value={"Nữ"}>Nữ</option>
                        </select>
                        <label style={errorLabel} id="errorOfPeoSex"></label>
                        </div>
                    </div>
                    <div className="flex_right">
                      <button className="ms-btn cancel_btn">
                        <NavLink to="/Login">
                            <span>Đăng Nhập</span>
                        </NavLink>
                      </button>
                      <button type="button" className="ms-btn ms-btn_icon" onClick={() => this.validateEmployeeForm()}><i className="far fa-save icon"/>Đăng Ký</button>
                    </div>
                  </form>
          </div>
          </div>
        );
      }
}
export default RegisterForm