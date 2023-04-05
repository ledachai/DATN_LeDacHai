import React, {Component} from "react";
import axios from "axios";
import Swal from "sweetalert2";
class OrderDetailList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="page_right-content">
            <div className="toolbar" id="toolbar">
            <div className="section1 flex_center">
                <h1 className="card-title">Thông tin chi tiết đơn hàng</h1>
            </div>
            <div  className="section1 flex_center">
                {/* <div className="col-sm-10"> */}
                    <select style={{width: '100px'}} className="form-select" aria-label="Default select example" 
                    // onChange={(e) => {this.props.handleSearch("&search=" + e.target.value)}}
                    >
                    <option value={"2019"}>2019</option>
                    <option value={"2020"} selected>2020</option>
                    <option value={"2021"}>2021</option>
                    <option value={"2022"}>2022</option>
                    <option value={"2023"}>2023</option>
                    <option value={"2024"}>2024</option>
                    <option value={"2025"}>2025</option>
                    </select>
                {/* </div> */}
                <button type="button" class="btn btn-outline-success btn-sm">Thống kê</button>
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
                            <th scope="col">Số lượng</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Ngày đặt</th>
                            {/* //<th scope="col">Thao tác</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.renderOrderDetail()}
                    </tbody>
                </table>
            </div>
        </div>
        )
    }
}
export default OrderDetailList