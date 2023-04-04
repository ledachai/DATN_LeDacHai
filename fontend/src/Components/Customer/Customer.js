import React, { Component } from "react";
import axios from "axios";
import CustomerList from "./CustomerList";


class Customer extends Component {
    constructor() {
        super();
        this.state = {
            Customer: [],
            // showFormAccount: false,
            // showListAccount: true,
            // // for post
            // hoTen: '',
            // soDienThoai: '',
            // tenDangNhap: '',
            // password: '',
            // vaiTro: 'Nhân Viên',

            // for put
            // showEditFormAccount: false,
            // TKIDToEdit: '',

            // // for delete
            // TKIDToDelete: "",

            defaultUrl: "https://localhost:5001/api/V1/People"
        }
    }
    // getConfigToken() {
    //     let config = {
    //         headers: {
    //             "Authorization": 'Bearer ' + localStorage.getItem("Token"),
    //             "Content-type": "application/json"
    //         }
    //     };
    //     return config;
    // }

    componentDidMount() {
        // let config = this.getConfigToken();
        axios.get(this.state.defaultUrl)
            .then((response) => {
                this.setState({
                    Customer: response.data
                })
            });
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
    renderCustomer = () => {
        return this.state.Customer.map((data, index) => {
            return (
                <tr key={data.peo_ID}>
                    <td>{data.peo_Fullname}</td>
                    <td>{this.formatDate(data.peo_Dateofbirth)}</td>
                    <td>{data.peo_Sex}</td>
                    <td>{data.peo_Email}</td>
                    <td>{data.peo_Address}</td>
                    <td>{this.formatDate(data.peo_CreateDate)}</td>
                    <td>{data.per_Name}</td>
                </tr>
            );
        }
        );
    }
    render() {
        return (
            <div className="container">
                <CustomerList
                    renderCustomer={this.renderCustomer}
                />
            </div>
        );
    }
}
export default Customer;