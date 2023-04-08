import React, {Component} from "react";
import axios from "axios";
import Swal from "sweetalert2";
class ThongKeList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        if (this.props.showListThongKe === false) return null;
        return(
            <div className="page_right-content">
            <div className="toolbar" id="toolbar">
            <div className="section1 flex_center">
                <h1 className="card-title">Doanh thu và số lượng theo tháng</h1>
            </div>
            
            <div  className="section1 flex_center">
                <div className="col-sm-10"> 
                    <select style={{width: '100px'}} className="form-select" aria-label="Default select example" 
                     onChange={(e) => {this.props.ButtonThongKe(e.target.value)}}
                    >
                    <option value={"2019"}>2019</option>
                    <option value={"2020"} selected>2020</option>
                    <option value={"2021"}>2021</option>
                    <option value={"2022"}>2022</option>
                    <option value={"2023"}>2023</option>
                    <option value={"2024"}>2024</option>
                    <option value={"2025"}>2025</option>
                    </select>
                </div>
                {/* <div>
                    <input type="number" style={{width:'100px', height: '30px', marginRight: '10px'}}
                     id="inputYear" placeholder="Year?"
                     onChange={(event) => this.props.handleYearChange(event.target.value)
                     }
                    />
                    <button class="btn btn-outline-success btn-sm" onClick={() => this.props.handleButtonThongKe()}>Thống kê</button>
                </div> */}
                <button type="button" class="btn btn-outline-success btn-sm" onClick={() => this.props.openListThongKe()}>Quay lại</button>
            </div>
            </div>
            <div className="section3 tables" id="employeegrid" toolbar="toolbar" show_option="show_option">
                <table className="table">
                    <thead>
                        <tr>
                            {/* <th scope="col">PID</th> */}
                            <th scope="col">Tháng</th>
                            <th scope="col">Số lượng sản phẩm</th>
                            <th scope="col">Doanh thu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.renderThongKeList()}
                    </tbody>
                </table>
            </div>
        </div>
        )
    }
}
export default ThongKeList