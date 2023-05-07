import React, { Component } from "react";

class CommentList extends Component {
    render() {
        return(
            <div className="page_right-content">
            <div className="toolbar" id="toolbar">
                <div className="section1 flex_center">
                    <h1 className="card-title">Danh sách comment</h1>
                </div>
            </div>
            <div className="section3 tables" id="employeegrid" toolbar="toolbar" show_option="show_option">
                <table className="table">
                        <thead>
                            <tr>
                                <th>Khách hàng</th>
                                <th>Sản phẩm</th>
                                <th>Hình ảnh</th>
                                <th>Nội dung</th>
                                <th>Ngày comment</th>
                            </tr>
                        </thead>
                        <tbody>{this.props.renderComment()}</tbody>
                </table>
            </div>
        </div>
        )
    }

}

export default CommentList;