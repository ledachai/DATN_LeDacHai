import React, { Component } from "react";

class GuessList extends Component {
    render() {
        if (this.props.showListGuess === false) return null;
        return(
            <div className="page_right-content">
            <div className="toolbar" id="toolbar">
                <div className="section1 flex_center">
                    <h1 className="card-title">Thông tin khách hàng</h1>
                </div>
                {/* <div className="section2 flex_center" id="show_option">
                    <div className="search_option">
                        <input style={{width:'200px'}} type="text" className="search_input ms-input" option_name="Search" placeholder="Tìm kiếm theo tên nhân viên"  
                        onChange={(e) => {
                            this.props.handleSearch("?Search=" + e.target.value);
                        }} />
                        <i className="fas fa-search search_icon search_icon" />
                    </div>
                </div> */}
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
                        <tbody>{this.props.renderGuess()}</tbody>
                </table>
            </div>
        </div>
        )
    }

}

export default GuessList;