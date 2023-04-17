import React, { Component } from "react";
import axios from "axios";
import AdminList from "./AdminList";


class Admin1 extends Component {
    constructor() {
        super();
        this.state = {
            Admin: [],
            defaultUrl: "https://localhost:5001/api/V1/People/GetPeopleByRole?PageIndex=1&RowPerPage=100&Search=Admin"
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
                Admin: response.data
            })
        });
    }
    componentDidMount = (url = this.state.defaultUrl) => {
        this.getData(url);
    }
    handleSearch(search){
        let url = "https://localhost:5001/api/V1/People/GetPeopleByRole?PageIndex=1&RowPerPage=100" + search;
        console.log(url)
        this.componentDidMount(url);
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
    renderAdmin = () => {
        return this.state.Admin.map((data, index) => {
            return (
                <tr key={data.peo_ID}>
                    <td>{data.peo_Fullname}</td>
                    <td>{this.formatDate(data.peo_Dateofbirth)}</td>
                    <td>{data.peo_Sex}</td>
                    <td>{data.peo_Email}</td>
                    <td>{data.peo_Address}</td>
                    <td>{this.formatDate(data.peo_CreateDate)}</td>
                </tr>
            );
        }
        );
    }
    render() {
        return (
            <div className="container">
                <AdminList
                    renderAdmin={this.renderAdmin}
                    handleSearch={this.handleSearch}
                    componentDidMount={this.componentDidMount}
                />
            </div>
        );
    }
}
export default Admin1;