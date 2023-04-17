import React, { Component } from "react";
import axios from "axios";
import OrderDetailList from "./OrderDetailList";
import ThongKeList from "./ThongKeList";

class OrderDetail extends Component {
  constructor() {
      super();
      this.state = {
          OrderDetail: [],
          showListOrderDetail: true,
          showListThongKe: false,
          ThongKe: [],
          order_ID: '',
          defaultUrl: "https://localhost:5001/api/V1/OrderDetail",
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
    ButtonThongKe = (year) => {
        let url = "https://localhost:5001/api/V1/OrderDetail/" + year;
        //console.log(url)
        this.getThongKe(url);
    }
    componentDidMount() {
      let config = this.getConfigToken();
      axios.get(this.state.defaultUrl, config)
          .then((response) => {
              this.setState({
                  OrderDetail: response.data
              })
          });
    }
    getThongKe(url){
        let config = this.getConfigToken();
        axios.get(url, config)
            .then((response) =>{
                this.setState({
                    ThongKe: response.data
                })
            });
    }
  openListThongKe = () => {
    this.setState({
        showListOrderDetail: !this.state.showListOrderDetail,
        showListThongKe: !this.state.showListThongKe
    })
  }
  // Hàm format số tiền
  formatMoney = moneyinput => {
    let money = Math.round(moneyinput);
    if(money && !isNaN(money)){
        return money.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
    }else{
        return money;
    }
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
  renderOrderDetail = () => {
      return this.state.OrderDetail.map((data, index) => {
          // if(data.role !== "admin"){
              return (
                  <tr key={data.order_ID}>
                      {/* <td>{data.cate_ID}</td> */}
                      <td>{data.order_Fullname}</td>
                      <td>{data.order_Address}</td>
                      <td>{data.order_Phone}</td>
                      <td>{data.pro_Name}</td>
                      <td>{data.pro_Number} sản phẩm</td>
                      <td>{this.formatMoney(data.cart_Pay)} đ</td>
                      <td>{this.formatDate(data.order_Date)}</td>
                  </tr>
              );
          // }
      }
      );
  }
  //render thống kê chi tiết
  renderThongKeList = () => {
    return this.state.ThongKe.map((data, index) => {
        // if(data.role !== "admin"){
            return (
                <tr>
                    <td>Tháng {data.month}</td>
                    <td>{data.count} sản phẩm</td>
                    <td>{this.formatMoney(data.pay)} đ</td>
                </tr>
            );
        // }
    }
    );
}
  render() {
      return (
          <div className="container">
              <OrderDetailList
                  renderOrderDetail={this.renderOrderDetail}
                  showListOrderDetail={this.state.showListOrderDetail}
                  openListThongKe={this.openListThongKe}
              />
              <ThongKeList
                  renderThongKeList={this.renderThongKeList}
                  showListThongKe={this.state.showListThongKe}
                  openListThongKe={this.openListThongKe}
                  ButtonThongKe={this.ButtonThongKe}
              />
          </div>
      );
  }
}
export default OrderDetail;
