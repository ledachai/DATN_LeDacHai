import React, { Component } from "react";
import Swal from "sweetalert2";

class EmployeeEditForm extends Component {
    validateEmployeeEditForm = () => {
    // validate text
    let errorOfPeoFullname = "";
    let peo_Fullname = document.getElementById("inputPeoFullname").value;
    if (peo_Fullname === "") {
        errorOfPeoFullname = errorOfPeoFullname + "Họ tên không được bỏ trống!\n";
    }
    var format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    if (format.test(peo_Fullname)) {
        errorOfPeoFullname += "Họ tên không được chứa ký tự đặc biệt";
    }
    let errorOfPeoAddress ="";
    let peo_Address = document.getElementById("inputPeoAddress").value;
    if(peo_Address===""){
        errorOfPeoAddress = errorOfPeoAddress + "Địa chỉ không được để trống!\n";
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
    if (errorOfPeoFullname || errorOfPeoAddress || errorOfPeoDateofbirth || errorOfPeoSex) {
      Swal.fire(
        'Cảnh báo\n\n Dữ liệu không hợp lệ',
        '',
        'error'
      )
      document.getElementById("errorOfPeoFullname").innerHTML = typeof errorOfPeoFullname === "undefined" ? "" : errorOfPeoFullname;
      document.getElementById("errorOfPeoAddress").innerHTML = typeof errorOfPeoAddress === "undefined" ? "" : errorOfPeoAddress;
      document.getElementById("errorOfPeoDateofbirth").innerHTML = typeof errorOfPeoDateofbirth === "undefined" ? "" : errorOfPeoDateofbirth;
      document.getElementById("errorOfPeoSex").innerHTML = typeof errorOfPeoSex === "undefined" ? "" : errorOfPeoSex;
    }
    else {
      this.props.putData();
    }
  };

  

  render() {
    const errorLabel = {
      color: "red",
      padding: "10px",
    }
    if (this.props.showFormEditEmployee === false) return null;
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Sửa thông tin nhân viên</h5>
          {/* Horizontal Form */}
          <form>
            <div className="row mb-3">
              <label htmlFor="inputPeoFullname" className="col-sm-2 col-form-label">Họ tên</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" id="inputPeoFullname" value={this.props.peo_Fullname}
                  onChange={(event) =>
                    this.props.handleFormPeoFullnameChange(event.target.value)
                  }
                />
                <label style={errorLabel} id="errorOfPeoFullname"></label>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputPeoDateofbirth" className="col-sm-2 col-form-label">Ngày sinh</label>
              <div className="col-sm-6">
                <input type="date" className="form-control" id="inputPeoDateofbirth" value={this.props.peo_Dateofbirth}
                  onChange={(event) =>
                    this.props.handleFormPeoDateofbirthChange(event.target.value)
                  } />
                  <label style={errorLabel} id="errorOfPeoDateofbirth"></label>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputPeoAddress" className="col-sm-2 col-form-label">Địa chỉ</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" id="inputPeoAddress" value={this.props.peo_Address}
                  onChange={(event) =>
                    this.props.handleFormPeoAddressChange(event.target.value)
                  } />
                  <label style={errorLabel} id="errorOfPeoAddress"></label>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputPeoSex" className="col-sm-2 col-form-label">Giới tính</label>
              <div className="col-sm-6">
                <select className="form-control" id="inputPeoSex" value={this.props.peo_Sex}
                 onChange={(event) => this.props.handleFormPeoSexChange(event.target.value)}>
                    <option value={"Nam"}>Nam</option>
                    <option value={"Nữ"}>Nữ</option>
                </select>
                <label style={errorLabel} id="errorOfPeoSex"></label>
                </div>
            </div>
            <div className="flex_right">
              <button className="ms-btn cancel_btn"  onClick={() => this.props.openEditFormEmployee()} >Hủy</button>
              <button type="button" className="ms-btn ms-btn_icon" onClick={() => this.validateEmployeeEditForm()}><i className="far fa-save icon"/>Lưu</button>
            </div>
          </form>
        </div>
      </div>

    );
  }
}
export default EmployeeEditForm;