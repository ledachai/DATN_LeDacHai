import React, { Component } from "react";
import axios from "axios";
import CommentList from "./CommentList";

class Comment extends Component {
    constructor() {
        super();
        this.state = {
            Comment: [],
            defaultUrl: "https://localhost:5001/api/V1/Comment"
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
                Comment: response.data
            })
        });
    }
    componentDidMount = (url = this.state.defaultUrl) => {
        this.getData(url);
    }
    formatDate = dateSrc => {
        let date = new Date(dateSrc),
            year = date.getFullYear().toString(),
            month = (date.getMonth() + 1).toString().padStart(2, '0'),
            day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    // FOR DISPLAY LIST DATA
    renderComment = () => {
        return this.state.Comment.map((data, index) => {
                return (
                    <tr>
                        <td>{data.peo_Fullname}</td>
                        <td>{data.pro_Name}</td>
                        <td><img style={{width: '40px', height: '40px'}} src={'../img/'+data.pro_Image} alt="" /></td>
                        <td>{data.co_Content}</td>
                        <td>{this.formatDate(data.co_Date)}</td>
                    </tr>
                );
            // }
        }
        );
    }
    render() {
        return (
            <div className="container">
                <CommentList
                    renderComment={this.renderComment}
                />
            </div>
        );
    }
}
export default Comment;