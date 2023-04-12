import React, { Component } from "react";

class AdminList extends Component {
    render() {
        return(
            <div className="page_right-content">
            <div className="toolbar" id="toolbar">
                <div className="section1 flex_center">
                    <h1 className="card-title">Thông tin quản trị viên</h1>
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
                        <tbody>{this.props.renderAdmin()}</tbody>
                </table>
            </div>
        </div>
        )
    }

}

export default AdminList;