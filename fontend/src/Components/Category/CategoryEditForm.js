import React, { Component } from "react";
import Swal from "sweetalert2";

class CategoryEditForm extends Component {
    validateCategoryEditForm = () => {
    // validate tên danh mục
    let errorOfCateName = "";
    let cate_Name = document.getElementById("inputCateName").value;
    if (cate_Name === "") {
      errorOfCateName = errorOfCateName + "Tên danh mục không được bỏ trống!\n";
    }
    var format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    if (format.test(cate_Name)) {
      errorOfCateName += "Tên danh mục không được chứa ký tự đặc biệt";
    }
    // validate mô tả
    let errorOfCateDescibe = "";
    let cate_Descibe = document.getElementById("inputCateDescibe").value;
    if (cate_Descibe === "") {
        errorOfCateDescibe = errorOfCateDescibe + "Mô tả không được bỏ trống!\n";
    }
    var format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    if (format.test(cate_Name)) {
        errorOfCateDescibe += "Mô tả không được chứa ký tự đặc biệt";
    }
    if (errorOfCateName || errorOfCateDescibe) {
      Swal.fire(
        'Cảnh báo\n\n Dữ liệu không hợp lệ',
        '',
        'error'
      )
      document.getElementById("errorOfCateName").innerHTML = typeof errorOfCateName === "undefined" ? "" : errorOfCateName;
      document.getElementById("errorOfCateDescibe").innerHTML = typeof errorOfCateDescibe === "undefined" ? "" : errorOfCateDescibe;
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
    if (this.props.showEditFormCategory === false) return null;
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Sửa danh mục</h5>
          {/* Horizontal Form */}
          <form>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Tên hãng</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" id="inputCateName" value={this.props.cate_Name}
                  onChange={(event) =>
                    this.props.handleFormCateNameChange(event.target.value)
                  }
                />
                <label style={errorLabel} id="errorOfCateName"></label>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Mô tả</label>
              <div className="col-sm-6">
                <input type="text-area" className="form-control" id="inputCateDescibe" value={this.props.cate_Descibe}
                  onChange={(event) =>
                    this.props.handleFormCateDescibeChange(event.target.value)
                  } />
                  <label style={errorLabel} id="errorOfCateDescibe"></label>
              </div>
            </div>
            <div className="flex_right">
              <button className="ms-btn cancel_btn"  onClick={() => this.props.renderFormCategory()} >Hủy</button>
              <button type="button" className="ms-btn ms-btn_icon" onClick={() => this.validateCategoryEditForm()}><i className="far fa-save icon"/>Lưu</button>
            </div>
          </form>
        </div>
      </div>

    );
  }
}
export default CategoryEditForm;