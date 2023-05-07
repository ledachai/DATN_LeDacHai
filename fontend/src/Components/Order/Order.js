import React, { Component } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import OrderList from "./OrderList";

class Order extends Component {
  constructor() {
      super();
      this.state = {
          Orders: [],
          showListOrder: true,
          order_ID: '',

          defaultUrl: "https://localhost:5001/api/V1/Order/GetAllOrder",
          urlforput: "https://localhost:5001/api/V1/Order/UpdateStatus?Order_ID=",
          urlforinsert: "https://localhost:5001/api/V1/OrderDetail/"
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
                  Orders: response.data
              })
          });
  }
    // FOR POST

    postData = (order_ID) => {
        let config = this.getConfigToken();
        //let isInsertSuccess
        var url = this.state.urlforinsert + order_ID;
        
        axios
            .post(url,{
                order_ID: this.state.order_ID
            }, config)
            .then(response => {
                if (response.data) {
                    Swal.fire(
                        'Giao hàng thành công!',
                        'Thay đổi đã xảy ra',
                        'success'
                    )
                    this.componentDidMount();
                }
                else {
                    Swal.fire(
                        'Có lỗi xảy ra!',
                        'Đã xảy ra một vấn đề nào đó',
                        'error'
                    )
                }
            })
            .catch(error => {
                Swal.fire(
                    'Lỗi giao hàng',
                    'Đơn hàng đã được giao hoặc đã hủy!',
                    'error'
                )
            });
    };


  //HTTP update status
  updateStatus = (order_ID) => {
      var url = this.state.urlforput + order_ID;
      let config = this.getConfigToken();
      axios
          .put(url,{
            order_ID: this.state.order_ID
        }, config)
          .then(response => {
              if (response.data) {
                  Swal.fire(
                      'Xác nhận thành công!',
                      'Thay đổi đã xảy ra',
                      'success'
                    )
                    this.componentDidMount();
              }
              else {
                  Swal.fire(
                      'Có lỗi xảy ra!',
                      'Đã xảy ra một vấn đề nào đó',
                      'error'
                    )
              }
          })
          .catch(error => {
              Swal.fire(
                  'Lỗi xác nhận!',
                  'Đơn hàng đang giao hoặc đã giao',
                  'error'
              )
              console.log(error)
          });
  };

  showInsertConfirmAlert = (data) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Giao hàng?',
        text: "Thao tác này có thể không hoàn tác được!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Giao!',
        cancelButtonText: 'Hủy!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            this.postData(data.order_ID);
            // end comfirmed
        } 
    })
}

  showUpdateConfirmAlert = (data) => {
      const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
          title: 'Xác nhận đơn hàng?',
          text: "Thao tác này có thể không hoàn tác được!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Xác nhận!',
          cancelButtonText: 'Hủy!',
          reverseButtons: true
      }).then((result) => {
          if (result.isConfirmed) {
              this.updateStatus(data.order_ID);
              // end comfirmed
          } 
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
  renderOrder = () => {
      return this.state.Orders.map((data, index) => {
          // if(data.role !== "admin"){
              return (
                  <tr key={data.order_ID}>
                      {/* <td>{data.cate_ID}</td> */}
                      <td>{data.order_Fullname}</td>
                      <td>{data.order_Address}</td>
                      <td>{data.order_Phone}</td>
                      <td>{data.pro_Name}</td>
                      <td><img style={{width: '40px', height: '40px'}}  src={'../img/'+data.pro_Image} alt="" /></td>
                      <td>{data.pro_Number}</td>
                      <td>{this.formatMoney(data.cart_Pay)} đ</td>
                      <td>{this.formatDate(data.order_Date)}</td>
                      <td>{data.order_Status}</td>
                      <td class="actions">
                          <div className="flex_center">
                                <button type="button" class="btn btn-outline-success btn-sm" onClick={() => this.showUpdateConfirmAlert(data)}>
                                    <i class='fa fa-check'></i>
                                </button>
                                <button type="button" class="btn btn-outline-secondary btn-sm" onClick={() => this.showInsertConfirmAlert(data)}>
                                    <i class='fas fa-long-arrow-alt-right'></i>
                                </button>
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
              <OrderList
                  renderOrder={this.renderOrder}
                  showListOrder={this.state.showListOrder}
                  //renderFormCategory={this.renderFormCategory}
              />
          </div>
      );
  }
}
export default Order;
