import React, { Component } from "react";
import axios from "axios";
import GuessList from "./GuessList";
import Swal from "sweetalert2";

class Guess extends Component {
    constructor() {
        super();
        this.state = {
            Guess: [],
            showListGuess: true,
            peo_Fullname: '',
            defaultUrl: "https://localhost:5001/api/V1/People/GetPeopleByRole?PageIndex=1&RowPerPage=100&search=Khách hàng"
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
                Guess: response.data
            })
        });
    }
    componentDidMount = (url = this.state.defaultUrl) => {
        this.getData(url);
    }
    // handleSearch(search){
    //     let url = "https://localhost:5001/api/Employee" + search;
    //     console.log(url)
    //     this.componentDidMount(url);
    // }
    // Format ngày tháng
    formatDate = dateSrc => {
        let date = new Date(dateSrc),
            year = date.getFullYear().toString(),
            month = (date.getMonth() + 1).toString().padStart(2, '0'),
            day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    // FOR DISPLAY LIST DATA
    renderGuess = () => {
        return this.state.Guess.map((data, index) => {
            // if(data.role !== "admin"){
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
            // }
        }
        );
    }
    render() {
        return (
            <div className="container">
                <GuessList
                    renderGuess={this.renderGuess}
                    showListGuess={this.state.showListGuess}
                    // componentDidMount={this.componentDidMount}
                    // handleSearch={this.handleSearch}
                />
            </div>
        );
    }
}
export default Guess;