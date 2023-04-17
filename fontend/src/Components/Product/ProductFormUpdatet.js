import React, { Component } from "react";
import Swal from "sweetalert2";

class ProductFormUpdate extends Component {
    validateProductUpdateForm = () => {
    // validate tên danh mục
    let errorOfProName = "";
    let pro_Name = document.getElementById("inputProName").value;
    if (pro_Name === "") {
        errorOfProName = errorOfProName + "Tên sản phẩm không được bỏ trống!\n";
    }
    // validate mô tả
    let errorOfProDescribe = "";
    let pro_Describe = document.getElementById("inputProDescribe").value;
    if (pro_Describe === "") {
        errorOfProDescribe = errorOfProDescribe + "Mô tả không được bỏ trống!\n";
    }
    // validate giá và số lượng
    let errorOfProPrice = "";
    let pro_Price = document.getElementById("inputProPrice").value;
    if(pro_Price<=0)
    {
        errorOfProPrice = errorOfProPrice + "Giá phải là số dương!\n";
    }
    let errorOfProNumber = "";
    let pro_Number = document.getElementById("inputProNumber").value;
    if(pro_Number<=0)
    {
        errorOfProNumber = errorOfProNumber + "Số lượng phải là số dương!\n";
    }
    if (errorOfProName || errorOfProDescribe || errorOfProPrice || errorOfProNumber) {
      Swal.fire(
        'Cảnh báo\n\n Dữ liệu không hợp lệ',
        '',
        'error'
      )
      document.getElementById("errorOfProName").innerHTML = typeof errorOfProName === "undefined" ? "" : errorOfProName;
      document.getElementById("errorOfProDescribe").innerHTML = typeof errorOfProDescribe === "undefined" ? "" : errorOfProDescribe;
      document.getElementById("errorOfProPrice").innerHTML = typeof errorOfProPrice === "undefined" ? "" : errorOfProPrice;
      document.getElementById("errorOfProNumber").innerHTML = typeof errorOfProNumber === "undefined" ? "" : errorOfProNumber;
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
    if (this.props.showEditFormProduct === false) return null;
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Sửa sản phẩm</h5>
          {/* Horizontal Form */}
          <form>
            <div className="row mb-3">
              <label htmlFor="inputProName" className="col-sm-2 col-form-label">Tên sản phẩm</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" id="inputProName" value={this.props.pro_Name}
                  onChange={(event) =>
                    this.props.handleFormProNameChange(event.target.value)
                  }
                />
                <label style={errorLabel} id="errorOfProName"></label>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputProPrice" className="col-sm-2 col-form-label">Giá sản phẩm</label>
              <div className="col-sm-6">
                <input type="number" className="form-control" id="inputProPrice" value={this.props.pro_Price}
                  onChange={(event) =>
                    this.props.handleFormProPriceChange(event.target.value)
                  }
                />
                <label style={errorLabel} id="errorOfProPrice"></label>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputProImage" className="col-sm-2 col-form-label">Hình ảnh</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" id="inputProName" value={this.props.pro_Image}
                  onChange={(event) =>
                    this.props.handleFormProImageChange(event.target.value)
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputProNumber" className="col-sm-2 col-form-label">Số lượng</label>
              <div className="col-sm-6">
                <input type="number" className="form-control" id="inputProNumber" value={this.props.pro_Number}
                  onChange={(event) =>
                    this.props.handleFormProNumberChange(event.target.value)
                  }
                />
                <label style={errorLabel} id="errorOfProName"></label>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputProDescribe" className="col-sm-2 col-form-label">Mô tả</label>
              <div className="col-sm-6">
                <textarea type="text" className="form-control" id="inputProDescribe" value={this.props.pro_Describe}
                  onChange={(event) =>
                    this.props.handleFormProDescribeChange(event.target.value)
                  }
                />
                <label style={errorLabel} id="errorOfProDescribe"></label>
              </div>
            </div>
            <div className="flex_right">
              <button className="ms-btn cancel_btn"  onClick={() => this.props.closeEditFormProduct()} >Hủy</button>
              <button type="button" className="ms-btn ms-btn_icon" onClick={() => this.validateProductUpdateForm()}><i className="far fa-save icon"/>Lưu</button>
            </div>
          </form>
        </div>
      </div>

    );
  }
}
export default ProductFormUpdate;