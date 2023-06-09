import React, { Component } from "react";
import axios from "axios";
import CategoryList from "./CategoryList";
import Swal from "sweetalert2";
import FormCategory from "./FormCategory";
import CategoryEditForm from "./CategoryEditForm";


class Category extends Component {
    constructor() {
        super();
        this.state = {
            Categories: [],
            showFormCategory: false,
            showListCategory: true,
            // for post
            cate_Name: '',
            cate_Descibe: '',

            // for put
            showEditFormCategory: false,
            cate_ID: '',
            defaultUrl: "https://localhost:5001/api/V1/Category"
        }
    }
    getConfigToken() {
        let config = {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("Token"),
                "Content-type": "application/json"
            }
        };
        return config;
    }

    componentDidMount() {
        let config = this.getConfigToken();
        axios.get(this.state.defaultUrl, config)
            .then((response) => {
                this.setState({
                    Categories: response.data
                })
            });
    }

    // FOR POST

    clearInsertText = () => {
        this.setState({
            cate_Name: "",
            cate_Descibe: "",
        });
    };

    postData = () => {
        let config = this.getConfigToken();
        //let isInsertSuccess
        axios
            .post(this.state.defaultUrl, {
                cate_Name: this.state.cate_Name,
                cate_Descibe: this.state.cate_Descibe
            }, config)
            .then(response => {
                if (response.data) {
                    Swal.fire(
                        'Thêm thành công!',
                        'Thay đổi đã xảy ra',
                        'success'
                    )
                    this.componentDidMount();
                }
                else {
                    Swal.fire(
                        'Không thể thực hiện thêm!',
                        'Đã xảy ra một vấn đề nào đó',
                        'error'
                    )
                }
            })
            .catch(error => {
                Swal.fire(
                    'Không thể thực hiện thêm!',
                    'Đã xảy ra một vấn đề nào đó',
                    'error'
                )
            });
        this.clearInsertText();
        this.renderFormCategory();
    };


    handleFormCateNameChange = (value) => {
        this.setState({
            cate_Name: value,
        });
    };
    handleFormCateDescibeChange = (value) => {
        this.setState({
            cate_Descibe: value,
        });
    };
    renderFormCategory = () => {
        this.setState({
            showListCategory: !this.state.showListCategory,
            showFormCategory: !this.state.showFormCategory,
        })
        this.clearInsertText();
    }

    // FOR PUT
    openEditFormCategory = (data) => {
        this.setState({
            showListCategory: !this.state.showListCategory,
            showEditFormCategory: !this.state.showEditFormCategory,
            cate_ID: data.cate_ID,
            cate_Name: data.cate_Name,
            cate_Descibe: data.cate_Descibe
        })
    }

    closeEditFormCategory = () => {
        this.setState({
            showListCategory: !this.state.showListCategory,
            showEditFormCategory: !this.state.showEditFormCategory,
        })
        this.clearInsertText();
    }

    putData = () => {
        var url = this.state.defaultUrl;
        let config = this.getConfigToken();
        axios
            .put(url, {
                cate_ID: this.state.cate_ID,
                cate_Name: this.state.cate_Name,
                cate_Descibe: this.state.cate_Descibe
            }, config)
            .then(response => {
                if (response.data) {
                    Swal.fire(
                        'Sửa danh mục thành công!',
                        'Thay đổi đã xảy ra',
                        'success'
                    )
                    this.componentDidMount();
                }
                else {
                    Swal.fire(
                        'Không thể thực hiện sửa!',
                        'Đã xảy ra một vấn đề nào đó',
                        'error'
                    )
                }
            })
            .catch(error => {
                Swal.fire(
                    'Không thể thực hiện sửa!!',
                    'Đã xảy ra một vấn đề nào đó',
                    'error'
                )
                console.log(error)
            });
        //this.showUpdateResultAlert();
        this.clearInsertText();
        this.closeEditFormCategory();
    };

    // FOR DISPLAY LIST DATA
    renderCategory = () => {
        return this.state.Categories.map((data, index) => {
            return (
                <tr key={data.cate_ID}>
                    {/* <td>{data.cate_ID}</td> */}
                    <td>{data.cate_Name}</td>
                    <td>{data.cate_Descibe}</td>
                    <td>{data.cate_Count} sản phẩm</td>
                    <td class="actions">
                        <div className="flex_center">
                            <div className="update" commandtype="update" onClick={() => this.openEditFormCategory(data)}>
                                <i class="fa-solid fa-pen-to-square"></i>
                            </div>
                        </div> 
                    </td>
                </tr>
            );
        }
        );
    }
    render() {
        return (
            <div className="container">
                <CategoryList
                    renderCategory={this.renderCategory}
                    showListCategory={this.state.showListCategory}
                    renderFormCategory={this.renderFormCategory}
                />
                <FormCategory
                    showFormCategory={this.state.showFormCategory}
                    renderFormCategory={this.renderFormCategory}
                    handleFormCateNameChange={this.handleFormCateNameChange}
                    handleFormCateDescibeChange={this.handleFormCateDescibeChange}
                    cate_Name={this.state.cate_Name}
                    cate_Descibe={this.state.cate_Descibe}
                    cate_Count={this.state.cate_Count}
                    postData={this.postData}
                />
                <CategoryEditForm
                    showEditFormCategory={this.state.showEditFormCategory}
                    closeEditFormCategory={this.closeEditFormCategory}
                    openEditFormCategory={this.openEditFormCategory}
                    cate_ID={this.state.cate_ID}
                    handleFormCateNameChange={this.handleFormCateNameChange}
                    handleFormCateDescibeChange={this.handleFormCateDescibeChange}
                    cate_Name={this.state.cate_Name}
                    cate_Descibe={this.state.cate_Descibe}
                    cate_Count={this.state.cate_Count}
                    putData={this.putData}
                />
            </div>
        );
    }
}
export default Category;