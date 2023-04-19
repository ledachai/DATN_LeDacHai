import React, { Component } from "react";
import axios from "axios";
import EmployeeList from "./EmployeeList";
import Swal from "sweetalert2";
import FormEmployeeInsert from "./FormEmployeeInsert";
import EmployeeEditForm from "./EmployeeEditForm";

class Employee extends Component {
    constructor() {
        super();
        this.state = {
            Employee: [],
            showFormEmployee: false,
            showListEmployee: true,
            showFormEditEmployee: false,
            // for post, put
            peo_ID: '',
            peo_Fullname: '',
            peo_Password: '',
            peo_Email: '',
            peo_Dateofbirth: '',
            peo_Address: '',
            peo_Sex: '',

            defaultUrl: "https://localhost:5001/api/Employee"
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
    
    getData(url){
        let config = this.getConfigToken();
        axios.get(url, config)
        .then((response) => {
            this.setState({
                Employee: response.data
            })
        });
    }
    componentDidMount = (url = this.state.defaultUrl) => {
        this.getData(url);
    }
    handleSearch(search){
        let url = "https://localhost:5001/api/Employee" + search;
        console.log(url)
        this.componentDidMount(url);
    }
    // FOR POST

    clearInsertText = () => {
        this.setState({
            peo_Fullname: "",
            peo_Email: "",
            peo_Password: "",
            peo_Address: "",
            peo_Dateofbirth: "",
        });
    };

    postData = () => {
        let config = this.getConfigToken();
        //let isInsertSuccess
        axios
            .post(this.state.defaultUrl, {
                peo_Fullname: this.state.peo_Fullname,
                peo_Password: this.state.peo_Password,
                peo_Email: this.state.peo_Email,
                peo_Dateofbirth: this.state.peo_Dateofbirth,
                peo_Address: this.state.peo_Address,
                peo_Sex: this.state.peo_Sex
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
                    'Thêm thất bại!',
                    'Đã xảy ra một vấn đề nào đó',
                    'error'
                )
            });
        this.clearInsertText();
        this.renderFormEmployeeInsert();
    };


    handleFormPeoFullnameChange = (value) => {
        this.setState({
            peo_Fullname: value,
        });
    };
    handleFormPeoEmailChange = (value) => {
        this.setState({
            peo_Email: value,
        });
    };
    handleFormPeoPasswordChange = (value) => {
        this.setState({
            peo_Password: value,
        });
    };
    handleFormPeoDateofbirthChange = (value) => {
        this.setState({
            peo_Dateofbirth: value,
        });
    };
    handleFormPeoSexChange = (value) => {
        this.setState({
            peo_Sex: value,
        });
    };
    handleFormPeoAddressChange = (value) => {
        this.setState({
            peo_Address: value,
        });
    };
    renderFormEmployeeInsert = () => {
        this.setState({
            showListEmployee: !this.state.showListEmployee,
            showFormEmployee: !this.state.showFormEmployee,
        })
        this.clearInsertText();
    }
    // FOR PUT
    openEditFormEmployee = (data) => {
        this.setState({
            showListEmployee: !this.state.showListEmployee,
            showFormEditEmployee: !this.state.showFormEditEmployee,
            peo_ID: data.peo_ID,
            peo_Fullname: data.peo_Fullname,
            peo_Dateofbirth: data.peo_Dateofbirth,
            peo_Address: data.peo_Address,
            peo_Sex: data.peo_Sex,
        })
    }

    closeEditFormEmployee = () => {
        this.setState({
            showListEmployee: !this.state.showListEmployee,
            showFormEditEmployee: !this.state.showFormEditEmployee,
        })
        this.clearInsertText();
    }

    putData = () => {
        var url = this.state.defaultUrl;
        let config = this.getConfigToken();
        axios
            .put(url, {
                peo_ID: this.state.peo_ID,
                peo_Fullname: this.state.peo_Fullname,
                peo_Dateofbirth: this.state.peo_Dateofbirth,
                peo_Address: this.state.peo_Address,
                peo_Sex: this.state.peo_Sex
            }, config)
            .then(response => {
                if (response.data) {
                    Swal.fire(
                        'Đã sửa thông tin nhân viên!',
                        'Thay đổi đã xảy ra',
                        'success'
                    )
                    console.log(this.state.peo_Dateofbirth)
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
                    'Không thể sửa!!',
                    'Đã xảy ra một vấn đề nào đó',
                    'error'
                )
                console.log(error)
            });
        //this.showUpdateResultAlert();
        //this.clearInsertText();
        this.closeEditFormEmployee();
    };
    // FOR DELETE
    deleteEmployee = (peo_ID) => {
        var url = this.state.defaultUrl + "/" + peo_ID;
        let config = this.getConfigToken();
        axios
            .delete(url, config)
            .then(response => {
                if (response.data) {
                    Swal.fire(
                        'Xóa thành công!',
                        'Thay đổi đã xảy ra',
                        'success'
                    )
                    this.componentDidMount();
                }
                else {
                    Swal.fire(
                        'Không thể thực hiện xóa!',
                        'Đã xảy ra một vấn đề nào đó',
                        'error'
                    )
                }
            })
            .catch(error => {
                Swal.fire(
                    'Không thể xóa!',
                    'Đã xảy ra một vấn đề nào đó',
                    'error'
                )
            });
            this.componentDidMount();
    };


    showDeleteConfirmAlert = (data) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Xóa?',
            text: "Thao tác này có thể không hoàn tác được!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xoá!',
            cancelButtonText: 'Hủy!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                this.deleteEmployee(data.peo_ID);
                // end comfirmed
                console.log(data.peo_ID)
            } 
        })
    }
    // Format ngày tháng
    formatDate = dateSrc => {
        let date = new Date(dateSrc),
            year = date.getFullYear().toString(),
            month = (date.getMonth() + 1).toString().padStart(2, '0'),
            day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    // FOR DISPLAY LIST DATA
    renderEmployee = () => {
        return this.state.Employee.map((data, index) => {
            // if(data.role !== "admin"){
                return (
                    <tr key={data.peo_ID}>
                        <td>{data.peo_Fullname}</td>
                        <td>{this.formatDate(data.peo_Dateofbirth)}</td>
                        <td>{data.peo_Sex}</td>
                        <td>{data.peo_Email}</td>
                        <td>{data.peo_Address}</td>
                        <td>{this.formatDate(data.peo_CreateDate)}</td>
                        <td>
                        <div className="flex_center">
                            <div className="update" commandtype="update" onClick={() => this.openEditFormEmployee(data)}>
                                <i class="fa-solid fa-pen-to-square"></i>
                            </div>
                            <div className="delete" commandtype="delete" onClick={() => this.showDeleteConfirmAlert(data)}> 
                                <div className="delete_icon">
                                <i class="fas fa-trash"></i>
                                </div>
                            </div> 
                        </div>
                    </td>
                    </tr>
                );
            // }
        }
        );
    }
    render() {
        return (
            <div className="container">
                <EmployeeList
                    renderCategory={this.renderCategory}
                    showListEmployee={this.state.showListEmployee}
                    handleSearch={this.handleSearch}
                    renderEmployee={this.renderEmployee}
                    componentDidMount={this.componentDidMount}
                    renderFormEmployeeInsert={this.renderFormEmployeeInsert}
                />
                <FormEmployeeInsert
                    renderFormEmployeeInsert={this.renderFormEmployeeInsert}
                    showListEmployee={this.state.showListEmployee}
                    showFormEmployee={this.state.showFormEmployee}
                    postData={this.postData}
                    handleFormPeoFullnameChange={this.handleFormPeoFullnameChange}
                    handleFormPeoEmailChange={this.handleFormPeoEmailChange}
                    handleFormPeoPasswordChange={this.handleFormPeoPasswordChange}
                    handleFormPeoDateofbirthChange={this.handleFormPeoDateofbirthChange}
                    handleFormPeoSexChange={this.handleFormPeoSexChange}
                    handleFormPeoAddressChange={this.handleFormPeoAddressChange}
                />
                <EmployeeEditForm
                    showFormEditEmployee={this.state.showFormEditEmployee}
                    openEditFormEmployee={this.openEditFormEmployee}
                    closeEditFormEmployee={this.closeEditFormEmployee}
                    handleFormPeoFullnameChange={this.handleFormPeoFullnameChange}
                    handleFormPeoDateofbirthChange={this.handleFormPeoDateofbirthChange}
                    handleFormPeoSexChange={this.handleFormPeoSexChange}
                    handleFormPeoAddressChange={this.handleFormPeoAddressChange}
                    putData={this.putData}
                    peo_ID={this.state.peo_ID}
                    peo_Fullname={this.state.peo_Fullname}
                    peo_Address={this.state.peo_Address}
                    peo_Dateofbirth={this.formatDate(this.state.peo_Dateofbirth)}
                    peo_Sex={this.state.peo_Sex}
                />
            </div>
        );
    }
}
export default Employee;