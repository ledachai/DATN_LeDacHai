import React, { Component } from "react";

class CategoryList extends Component {
    render() {
        if (this.props.showListCategory === false) return null;
        return(
            <div className="page_right-content">
            <div className="toolbar" id="toolbar">
            <div className="section1 flex_center">
                <h1 className="card-title">Danh sách danh mục</h1>
                    <div className="buttons accAdd_btn">
                        <button className="add_button ms-btn" id="accAdd_btn" commandtype="add"
                            onClick={() => this.props.renderFormCategory()}
                        >
                            <i className="fas fa-user-plus add_icon" />
                            Thêm danh mục
                        </button>
                    </div>
            </div>
            </div>
            <div className="section3 tables" id="employeegrid" toolbar="toolbar" show_option="show_option">
                <table className="table">
                    <thead>
                        <tr>
                            {/* <th>Mã danh mục</th> */}
                            <th>Tên danh mục</th>
                            <th>Mô tả</th>
                            <th>Số lượng sản phẩm</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>{this.props.renderCategory()}</tbody>
                </table>
            </div>
        </div>
        )
    }

}

export default CategoryList;