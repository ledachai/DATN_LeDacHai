import React, {Component} from "react";
class ProductList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        if(this.props.displayListProductPage === false) return null;
        return(
            <div className="page_right-content">
            <div className="toolbar" id="toolbar">
            <div className="section1 flex_center">
                <h1 className="card-title">Thông tin sản phẩm</h1>
                <div className="buttons accAdd_btn">
                            <button className="add_button ms-btn" id="accAdd_btn" commandtype="add"
                                onClick={() => this.props.renderFormProductInsert()}
                            >
                                <i className="fas fa-user-plus add_icon" />
                                Thêm sản phẩm
                            </button>
                </div>
            </div>
            <div className="section2 flex_center" id="show_option">
                <div className="show_options flex_center">
                <div className="col-sm-10">
                    <select style={{width: '110px'}} className="form-select" aria-label="Default select example" 
                    onChange={(e) => {this.props.handleSearch("&search=" + e.target.value)}}
                    >
                    <option value={""} selected>Tất cả</option>
                    <option value={"Seiko"}>Seiko</option>
                    <option value={"Orient"}>Orient</option>
                    <option value={"Tissot"}>Tissot</option>
                    <option value={"Citizen"}>Citizen</option>
                    <option value={"Hublot"}>Hublot</option>
                    <option value={"Casio"}>Casio</option>
                    <option value={"Rolex"}>Rolex</option>
                    </select>
                </div>
                </div>
            </div>
            </div>
            <div className="section3 tables" id="employeegrid" toolbar="toolbar" show_option="show_option">
                <table className="table">
                    <thead>
                        <tr>
                            {/* <th scope="col">PID</th> */}
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Số lượng</th>
                            {/* <th scope="col">Danh mục</th> */}
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.rederData()}
                    </tbody>
                </table>
            </div>
        </div>
        )
    }
}
export default ProductList