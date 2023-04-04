import React, { Component } from "react";
import axios from "axios"; 
import RoomUpdatetForm from "./ProductFormUpdatet";
import ProductList from "./ProductList";
import Pagination from "react-js-pagination";
import Swal from "sweetalert2";
import ProductFormInsert from "./ProductFormInsert";
import ProductFormUpdate from "./ProductFormUpdatet";
class Product extends Component{
    constructor(props){
        super(props);
        this.state={
            Product: [],
            //updateResult: "",
            ShowForm: false,
            displayListProductPage: true,
            //for update
            showEditFormProduct: false,
            pro_ID:'',
            pro_Name:'',
            pro_Price:0,
            pro_Image:'',
            pro_Describe:'',
            pro_Number:0,
            cate_ID:'' ,
            //pageNumber: 

            //for post
            showFormInsert: false,


            // for delete

            defaultUrl: "https://localhost:5001/api/V1/Product"
        }
    }
    //put api
    handleFormProNameChange = (value)=>{
        this.setState({
            pro_Name:value
        })
    }
    handleFormProPriceChange = (value)=>{
        this.setState({
            pro_Price:value
        })
    }
    handleFormProImageChange = (value)=>{
        this.setState({
            pro_Image:value
        })
    }
    handleFormProDescribeChange = (value)=>{
        this.setState({
            pro_Describe:value
        })
    }
    handleFormProNumberChange = (value)=>{
        this.setState({
            pro_Number:value
        })
    }
    handleFormCateIDChange = (value)=>{
        this.setState({
            cate_ID:value
        })
    }
    renderFormProductInsert = () => {
        this.setState({
            showFormInsert: !this.state.showFormInsert,
            displayListProductPage: !this.state.displayListProductPage,
        })
        this.clearInsertText();
    }
    // handleRoomFormisDeleteChange = (value)=>{
    //     this.setState({
    //         isDelete:value
    //     })
    // }
    // handleRoomFormmoTaChange = (value)=>{
    //     this.setState({
    //         moTa:value
    //     })
    // }
    // RoomUpdateShowForm = (Room) => {
    //     this.setState({
    //     pid: Room.pid,
    //     tenPhong: Room.tenPhong,
    //     trangThai: Room.trangThai,
    //     giaPhong: Room.giaPhong,
    //     hoatDong: Room.hoatDong,
    //     isDelete: Room.isDelete,
    //     moTa: Room.moTa,
    //     ShowForm: !this.state.ShowForm,
    //     displayListRoomPage: !this.state.displayListRoomPage
    //     });
    // };
    // RoomUpdateCloseForm = () => {
    //     this.setState({
    //         ShowForm: !this.state.ShowForm,
    //         displayListRoomPage: !this.state.displayListRoomPage
    //     })
    // }
    // alertUpdateComfirm = () => {
    //     const swalWithBootstrapButtons = Swal.mixin({
    //       customClass: {
    //         confirmButton: 'btn btn-primary',
    //         cancelButton: 'btn btn-danger'
    //       },
    //       buttonsStyling: false
    //     })
    //     swalWithBootstrapButtons.fire({
    //       title: 'Xác nhận sửa?',
    //       text: "Bạn có thật sự muốn sửa phòng này?",
    //       icon: 'warning',
    //       showCancelButton: true,
    //       confirmButtonText: 'Sửa!',
    //       cancelButtonText: 'Hủy!',
    //       reverseButtons: true
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         //console.log(this.state.pid)
    //         this.putData(this.state.pid);
    //         // end comfirmed
    //       } else if (
    //         /* Read more about handling dismissals below */
    //         result.dismiss === Swal.DismissReason.cancel
    //       ) {
    //         swalWithBootstrapButtons.fire(
    //           'Cancelled',
    //           'Đã hủy',
    //           'success'
    //         )
    //       }
    //     })
    //   }
    // putData = (pid) => {
    //     let config = this.getConfigToken();
    //     var url = "https://localhost:5001/api/v1/Rooms";
    //     axios
    //     .put(url, {
    //         pid: pid,
    //         giaPhong: this.state.giaPhong,
    //         isDelete: this.state.isDelete,
    //         moTa: this.state.moTa,
    //     }, config)
    //     .then(response => {
    //         if (response.data) {
    //             Swal.fire(
    //                 'Đã sửa',
    //                 'Thay đổi đã xảy ra',
    //                 'success'
    //             )
    //             this.RoomUpdateCloseForm()
    //             this.componentDidMount();
    //         }
    //         else{
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Cảnh báo',
    //                 text: 'Sửa thất bại!',
    //             })
    //         }
    //     })
    //     .catch(error => {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Cảnh báo',
    //             text: 'Thông tin không hợp lệ!',
    //         })
    //             //console.log(error)
    //     });
    // };
    // getConfigToken(){
    //     let config = {
    //         headers: {
    //             "Authorization": 'Bearer ' + localStorage.getItem("Token"),
    //             "Content-type": "application/json"
    //           }
    //     };
    //     return config;
    // }

    // FOR PUT
    openEditFormProduct = (data) => {
        this.setState({
            showEditFormProduct: !this.state.showEditFormProduct,
            displayListProductPage: !this.state.displayListProductPage,
            pro_ID: data.pro_ID,
            pro_Name: data.pro_Name,
            pro_Price: data.pro_Price,
            pro_Image: data.pro_Image,
            pro_Describe: data.pro_Describe,
            pro_Number: data.pro_Number
        })
    }

    closeEditFormProduct = () => {
        this.setState({
            showEditFormProduct: !this.state.showEditFormProduct,
            displayListProductPage: !this.state.displayListProductPage,
        })
        this.clearInsertText();
    }

    putData = () => {
        var url = this.state.defaultUrl;
        //let config = this.getConfigToken();
        //console.log("haha")
        //let isEditSuccess;
        axios
            .put(url, {
                pro_Name: this.state.pro_Name,
                pro_Price: this.state.pro_Price,
                pro_Image: this.state.pro_Image,
                pro_Number: this.state.pro_Number,
                pro_Describe: this.state.pro_Describe
            })
            .then(response => {
                if (response.data) {
                    Swal.fire(
                        'Sửa sản phẩm thành công!',
                        'Thay đổi đã xảy ra',
                        'success'
                    )
                    this.componentDidMount();
                }
                else {
                    Swal.fire(
                        'Không thể thực hiện sửa!',
                        'Đã xảy ra một vấn đề nào đó',
                        'warning'
                    )
                }
            })
            .catch(error => {
                Swal.fire(
                    'Không thể sửa!!',
                    'Đã xảy ra một vấn đề nào đó',
                    'warning'
                )
                console.log(error)
            });
        //this.showUpdateResultAlert();
        this.clearInsertText();
        this.closeEditFormProduct();
    };

    // HTTP DELETE
    deleteProduct = (pro_ID) => {
        var url = this.state.defaultUrl + "/" + pro_ID;
        // let config = this.getConfigToken();
        axios
            .delete(url)
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
                        'success'
                    )
                }
            })
            .catch(error => {
                Swal.fire(
                    'Không thể thực hiện xóa!',
                    'Đã xảy ra một vấn đề nào đó',
                    'success'
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
            title: 'Bạn có chắc chắn?',
            text: "Thao tác này có thể không hoàn tác được!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xoá!',
            cancelButtonText: 'Hủy!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                this.deleteProduct(data.pro_ID);
                // end comfirmed
            } 
        })
    }

    //POST
    clearInsertText = () => {
        this.setState({
            pro_Name: "",
            pro_Describe: "",
            pro_Price: "",
            pro_Number: "",
            pro_Image: "",
        });
    };

    postData = () => {
        //let config = this.getConfigToken();
        //let isInsertSuccess
        axios
            .post(this.state.defaultUrl, {
                pro_Name: this.state.pro_Name,
                pro_Price: this.state.pro_Price,
                pro_Image: this.state.pro_Image,
                pro_Describe: this.state.pro_Describe,
                pro_Number: this.state.pro_Number,
                cate_ID: this.state.cate_ID
            })
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
                        'warning'
                    )
                }
            })
            .catch(error => {
                Swal.fire(
                    'Không thể thực hiện thêm!',
                    'Đã xảy ra một vấn đề nào đó',
                    'warning'
                )
            });
        this.clearInsertText();
        this.renderFormProductInsert();
    };
 

    //get api
    getData(url){
        //let config = this.getConfigToken();
        axios.get(url)
        .then((response) => {
            this.setState({
                Product: response.data
            })
        });
    }
    componentDidMount = (url = this.state.defaultUrl + "?PageIndex=1&RowPerPage=50") => {
        this.getData(url);
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
    rederData =()=>{
        return this.state.Product.map((item) => {
            return(
                <tr key={item.pro_ID}>
                    {/* <td>{item.pid}</td> */}
                    <td>{item.pro_Name}</td>
                    <td>{item.pro_Describe}</td>
                    <td>{this.formatMoney(item.pro_Price)}</td>
                    <td>{item.pro_Number}</td>
                    {/* <td>{item.cate_Name}</td> */}
                    <td>{<img style={{width: '40px', height: '40px'}} src="../img/card.jpg" alt="" />}</td>
                    <td>
                        <div className="flex_center">
                            <div className="update" commandtype="update" onClick={() => this.openEditFormProduct(item)}>
                                <i class="fa-solid fa-pen-to-square"></i>
                            </div>
                            <div className="delete" commandtype="delete" onClick={() => this.showDeleteConfirmAlert(item)}> 
                                <div className="delete_icon">
                                <i class="fas fa-trash"></i>
                                </div>
                            </div> 
                        </div>
                    </td>
                </tr>
            );
        });
   } 
    handleSearch(search){
        let url = "https://localhost:5001/api/V1/Product?PageIndex=1&RowPerPage=50" + search;
        console.log(url)
        this.componentDidMount(url);
    }
    render(){
        return(
                <div  className="page_right-content">
                    <ProductList
                        getData={this.getData}
                        //updateData={this.updateData}
                        componentDidMount={this.componentDidMount}
                        rederData={this.rederData}
                        handleSearch={this.handleSearch}
                        //handleUpdate={this.handleUpdate}
                        displayListProductPage={this.state.displayListProductPage}
                        //RoomUpdateShowForm={this.RoomUpdateShowForm}
                        renderFormProductInsert={this.renderFormProductInsert}
                    />
                    <ProductFormInsert
                        handleFormCateIDChange={this.handleFormCateIDChange}
                        handleFormProNameChange={this.handleFormProNameChange}
                        handleFormProDescribeChange={this.handleFormProDescribeChange}
                        handleFormProImageChange={this.handleFormProImageChange}
                        handleFormProPriceChange={this.handleFormProPriceChange}
                        handleFormProNumberChange={this.handleFormProNumberChange}
                        cate_ID={this.state.cate_ID}
                        pro_Name={this.state.pro_Name}
                        pro_Price={this.state.pro_Price}
                        pro_Number={this.state.pro_Number}
                        pro_Image={this.state.pro_Image}
                        pro_Describe={this.state.pro_Describe}
                        postData={this.postData}
                        renderFormProductInsert={this.renderFormProductInsert}
                        showFormInsert={this.state.showFormInsert}
                    />
                    <ProductFormUpdate
                        handleFormCateIDChange={this.handleFormCateIDChange}
                        handleFormProNameChange={this.handleFormProNameChange}
                        handleFormProDescribeChange={this.handleFormProDescribeChange}
                        handleFormProImageChange={this.handleFormProImageChange}
                        handleFormProPriceChange={this.handleFormProPriceChange}
                        handleFormProNumberChange={this.handleFormProNumberChange}
                        pro_ID={this.state.pro_ID}
                        pro_Name={this.state.pro_Name}
                        pro_Price={this.state.pro_Price}
                        pro_Number={this.state.pro_Number}
                        pro_Image={this.state.pro_Image}
                        pro_Describe={this.state.pro_Describe}
                        putData={this.putData}
                        closeEditFormProduct={this.closeEditFormProduct}
                        showEditFormProduct={this.state.showEditFormProduct}
                        openEditFormProduct={this.openEditFormProduct}
                    />
                </div>
        );
    }
}
export default Product;