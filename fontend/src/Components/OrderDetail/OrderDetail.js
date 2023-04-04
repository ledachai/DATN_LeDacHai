import React, { Component } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import OrderDetailList from "./OrderDetailList";

class OrderDetail extends Component {
  constructor() {
      super();
      this.state = {
          OrderDetail: [],
          showListOrderDetail: true,
          //showFormCategory: false,
          //showListCategory: true,
          // for post
          //cate_Name: '',
          //cate_Descibe: '',

          // for put
          //showEditFormCategory: false,
          order_ID: '',

          // for delete
          // TKIDToDelete: "",

          defaultUrl: "https://localhost:5001/api/V1/OrderDetail",
        //   urlforput: "https://localhost:5001/api/V1/Order/UpdateStatus?Order_ID=",
        //   urlforinsert: "https://localhost:5001/api/V1/OrderDetail/"
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
      //let config = this.getConfigToken();
      axios.get(this.state.defaultUrl)
          .then((response) => {
              this.setState({
                  OrderDetail: response.data
              })
          });
  }
  // FOR PUT
  // openEditFormCategory = (data) => {
  //     this.setState({
  //         showListCategory: !this.state.showListCategory,
  //         showEditFormCategory: !this.state.showEditFormCategory,
  //         cate_ID: data.cate_ID,
  //         cate_Name: data.cate_Name,
  //         cate_Descibe: data.cate_Descibe
  //     })
  // }

  // closeEditFormCategory = () => {
  //     this.setState({
  //         showListCategory: !this.state.showListCategory,
  //         showEditFormCategory: !this.state.showEditFormCategory,
  //     })
  //     this.clearInsertText();
  // }

  // putData = () => {
  //     var url = this.state.defaultUrl;
  //     //let config = this.getConfigToken();
  //     //console.log("haha")
  //     //let isEditSuccess;
  //     axios
  //         .put(url, {
  //             cate_ID: this.state.cate_ID,
  //             cate_Name: this.state.cate_Name,
  //             cate_Descibe: this.state.cate_Descibe
  //         })
  //         .then(response => {
  //             if (response.data) {
  //                 Swal.fire(
  //                     'Sửa tài khoản thành công!',
  //                     'Thay đổi đã xảy ra',
  //                     'success'
  //                 )
  //                 this.componentDidMount();
  //             }
  //             else {
  //                 Swal.fire(
  //                     'Không thể thực hiện sửa!',
  //                     'Đã xảy ra một vấn đề nào đó',
  //                     'warning'
  //                 )
  //             }
  //         })
  //         .catch(error => {
  //             Swal.fire(
  //                 'Không thể thực hiện sửa!!',
  //                 'Đã xảy ra một vấn đề nào đó',
  //                 'warning'
  //             )
  //             console.log(error)
  //         });
  //     //this.showUpdateResultAlert();
  //     this.clearInsertText();
  //     this.closeEditFormCategory();
  // };

    // FOR POST

//     postData = (order_ID) => {
//         //let config = this.getConfigToken();
//         //let isInsertSuccess
//         var url = this.state.urlforinsert + order_ID;
//         axios
//             .post(url)
//             .then(response => {
//                 if (response.data) {
//                     Swal.fire(
//                         'Giao hàng thành công!',
//                         'Thay đổi đã xảy ra',
//                         'success'
//                     )
//                     this.componentDidMount();
//                 }
//                 else {
//                     Swal.fire(
//                         'Có lỗi xảy ra!',
//                         'Đã xảy ra một vấn đề nào đó',
//                         'warning'
//                     )
//                 }
//             })
//             .catch(error => {
//                 Swal.fire(
//                     'Không thể thực hiện thêm!',
//                     'Đã xảy ra một vấn đề nào đó',
//                     'warning'
//                 )
//             });
//     };


//   //HTTP update status
//   updateStatus = (order_ID) => {
//       var url = this.state.urlforput + order_ID;
//       //let config = this.getConfigToken();
//       axios
//           .put(url)
//           .then(response => {
//               if (response.data) {
//                   Swal.fire(
//                       'Xác nhận thành công!',
//                       'Thay đổi đã xảy ra',
//                       'success'
//                     )
//                     this.componentDidMount();
//               }
//               else {
//                   Swal.fire(
//                       'Có lỗi xảy ra!',
//                       'Đã xảy ra một vấn đề nào đó',
//                       'warning'
//                     )
//               }
//           })
//           .catch(error => {
//               Swal.fire(
//                   'Lỗi xác nhận!',
//                   'Đơn hàng đang giao hoặc đã giao',
//                   'warning'
//               )
//           });
//   };


//   showUpdateConfirmAlert = (data) => {
//       const swalWithBootstrapButtons = Swal.mixin({
//           customClass: {
//               confirmButton: 'btn btn-success',
//               cancelButton: 'btn btn-danger'
//           },
//           buttonsStyling: false
//       })
//       swalWithBootstrapButtons.fire({
//           title: 'Xác nhận?',
//           text: "Thao tác này có thể không hoàn tác được!",
//           icon: 'warning',
//           showCancelButton: true,
//           confirmButtonText: 'Xác nhận!',
//           cancelButtonText: 'Hủy!',
//           reverseButtons: true
//       }).then((result) => {
//           if (result.isConfirmed) {
//               this.updateStatus(data.order_ID);
//               // end comfirmed
//           } 
//       })
//   }


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
                      <td>{data.pro_Number}</td>
                      <td>{this.formatMoney(data.cart_Pay)}</td>
                      <td>{this.formatDate(data.order_Date)}</td>
                      {/* <td class="actions">
                          <div className="flex_center">
                              <div className="update" commandtype="update" onClick={() => this.showUpdateConfirmAlert(data)}>
                                  <i class="fa-solid fa-pen-to-square"></i>
                              </div>
                              <div className="update" commandtype="update" onClick={() => this.postData(data)}>
                                  <i class="fa-solid fa-pen-to-square"></i>
                              </div>
                          </div> 
                      </td> */}
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
                  //renderFormCategory={this.renderFormCategory}
              />
              {/* <FormCategory
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
              /> */}
          </div>
      );
  }
}
export default OrderDetail;
