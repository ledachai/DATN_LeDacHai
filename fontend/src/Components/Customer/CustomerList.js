import React, { Component } from "react";

class CustomerList extends Component {
    render() {
        return(
            <div className="page_right-content">
            <div className="toolbar" id="toolbar">
                <div className="section1 flex_center">
                    <h1 className="card-title">Thông tin người dùng</h1>
                </div>
                <div className="section2 flex_center" id="show_option">
                <div className="show_options flex_center">
                <div className="col-sm-10">
                    <select style={{width: '145px'}} className="form-select" aria-label="Default select example" 
                    onChange={(e) => {this.props.handleSearch("&search=" + e.target.value)}}
                    >
                    <option value={""} selected>Tất cả</option>
                    <option value={"Khách hàng"}>Khách hàng</option>
                    <option value={"Nhân viên"}>Nhân viên</option>
                    <option value={"Admin"}>Quản trị</option>
                    </select>
                </div>
                </div>
            </div>
            </div>
            <div className="section3 tables" id="employeegrid" toolbar="toolbar" show_option="show_option">
                <table className="table">
                        <thead>
                            <tr>
                                <th>Họ tên</th>
                                <th>Ngày sinh</th>
                                <th>Giới tính</th>
                                <th>Email</th>
                                <th>Địa chỉ</th>
                                <th>Ngày đăng ký</th>
                            </tr>
                        </thead>
                        <tbody>{this.props.renderCustomer()}</tbody>
                </table>
            </div>
        </div>
        )
    }

}

export default CustomerList;