import React, { Component } from "react";

class OrderList extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="page_right-content">
            <div className="toolbar" id="toolbar">
            <div className="section1 flex_center">
                <h1 className="card-title">Thông tin đơn hàng</h1>
            </div>
            </div>
            <div className="section3 tables" id="employeegrid" toolbar="toolbar" show_option="show_option">
                <table className="table">
                    <thead>
                        <tr>
                            {/* <th scope="col">PID</th> */}
                            <th scope="col">Họ tên</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Điện thoại</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Ngày đặt</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.renderOrder()}
                    </tbody>
                </table>
            </div>
        </div>
        )
    }
}

export default OrderList;