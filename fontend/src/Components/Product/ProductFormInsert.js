import React, { Component } from "react";
import Swal from "sweetalert2";

class ProductFormInsert extends Component {
    validateProductInsertForm = () => {
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
    if(pro_Price === "")
    {
        errorOfProPrice = errorOfProPrice + "Giá không được bỏ trống!\n";
    }
    else if(pro_Price<=0)
    {
        errorOfProPrice = errorOfProPrice + "Giá phải là số dương!\n";
    }
    let errorOfProNumber = "";
    let pro_Number = document.getElementById("inputProNumber").value;
    if(pro_Number === "")
    {
      errorOfProNumber = errorOfProNumber + "Số lượng được bỏ trống!\n";
    }
    else if(pro_Number<=0)
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
      this.props.postData();
    }
  };

  

  render() {
    const errorLabel = {
      color: "red",
      padding: "10px",
    }
    if (this.props.showFormInsert === false) return null;
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Tạo sản phẩm</h5>
          {/* Horizontal Form */}
          <form>
            <div className="row mb-3">
              <label htmlFor="inputCateName" className="col-sm-2 col-form-label">Danh mục</label>
              <div className="col-sm-6">
                    <select style={{width: '145px'}} className="form-select" aria-label="Default select example" 
                    onChange={(event) => this.props.handleFormCateIDChange(event.target.value)}
                    >
                        <option value={"Sei19165ED7-212E-21C4-0428-030D4265475Fko"}>Seiko</option>
                        <option value={"7A0B757E-41EB-4DF6-C6F8-494A84B910F4"}>Orient</option>
                        <option value={"2924C34D-68F1-1D0A-C9C7-6C0AEB6EC302"}>Tissot</option>
                        <option value={"5F7B48E5-16F9-2F2F-ECDC-845B5DCDAD45"}>Citizen</option>
                        <option value={"325C1970-8A35-46F0-A65B-8B98FE47CA55"}>Hublot</option>
                        <option value={"3631011E-4559-4AD8-B0AD-CB989F2177DA"}>Casio</option>
                        <option value={"4CF2DD43-5F4B-71B6-E212-EBBBCF065D1C"}>Rolex</option>
                    </select>
              </div>
            </div>
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
                <label style={errorLabel} id="errorOfProNumber"></label>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputProDescribe" className="col-sm-2 col-form-label">Mô tả</label>
              <div className="col-sm-6">
                <textarea type="text-area" className="form-control" id="inputProDescribe" value={this.props.pro_Describe}
                  onChange={(event) =>
                    this.props.handleFormProDescribeChange(event.target.value)
                  } />
                  <label style={errorLabel} id="errorOfProDescribe"></label>
              </div>
            </div>
            <div className="flex_right">
              <button className="ms-btn cancel_btn"  onClick={() => this.props.renderFormProductInsert()} >Hủy</button>
              <button type="button" className="ms-btn ms-btn_icon" onClick={() => this.validateProductInsertForm()}><i className="far fa-save icon"/>Thêm</button>
            </div>
          </form>
        </div>
      </div>

    );
  }
}
export default ProductFormInsert;