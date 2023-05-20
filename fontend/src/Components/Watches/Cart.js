import React, {Component} from "react";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import $, {data, get} from "jquery";
class Cart extends Component {
    constructor() {
        super();
        this.state = {
            Cart: [],
            cart_ID: '',
            cart_Pay:'',
            pro_Name:'',
            pro_Image: '',
            cart_Pay: '',
            pro_Describe:'',
            cate_Name:'',
            order_Fullname:'',
            order_Address:'',
            order_Phone:'',
            defaultUrl: "https://localhost:5001/api/V1/Cart?Peo_ID=",
            urlDelete: "https://localhost:5001/api/V1/Cart/",
            urlPostOrder: "https://localhost:5001/api/V1/Order",
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
                Cart: response.data
            })
        });
    }
    componentDidMount = () => {
        let url = this.state.defaultUrl + localStorage.getItem("Peo_ID");
        this.getData(url);
    }
    // HTTP DELETE
    deleteCart = (cart_ID) => {
        var url = this.state.urlDelete + cart_ID;
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
                    'Không thể thực hiện xóa!',
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
            title: 'Xóa sản phẩm khỏi giỏ hàng?',
            text: "Thao tác này có thể không hoàn tác được!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xoá!',
            cancelButtonText: 'Hủy!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                this.deleteCart(data.cart_ID);
                // end comfirmed
            } 
        })
    }
    postData = (data) => {
        let config = this.getConfigToken();
        axios
            .post(this.state.urlPostOrder, {
                order_Fullname: this.state.order_Fullname,
                order_Address: this.state.order_Address,
                order_Phone: this.state.order_Phone,
                cart_ID: data.cart_ID
            }, config)
            .then(response => {
                if (response.data) {
                    Swal.fire(
                        'Đã đặt hàng!',
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
    };
    formatMoney = moneyinput => {
        let money = Math.round(moneyinput);
        if(money && !isNaN(money)){
            return money.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
        }else{
            return money;
        }
    }
    // formatDate = dateSrc => {
    //     let date = new Date(dateSrc),
    //         year = date.getFullYear().toString(),
    //         month = (date.getMonth() + 1).toString().padStart(2, '0'),
    //         day = date.getDate().toString().padStart(2, '0');

    //     return `${year}-${month}-${day}`;
    // }
    renderCart = () =>{
        return this.state.Cart.map((data, index) => {
            return (
                <div className="card rounded-3 mb-4" key={data.cart_ID}>
                    <div className="card-body p-4">
                    <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-md-2 col-lg-2 col-xl-2">
                        <img src={'../img/'+data.pro_Image} className="img-fluid rounded-3" alt="" />
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-3">
                        <p className="lead fw-normal mb-2">{data.pro_Name}</p>
                        <p><span className="text-muted">Category: </span>{data.cate_Name}</p>
                        </div>
                        {/* <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button className="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                            <i className="fas fa-minus" />
                        </button>
                        <input id="form1" min={0} name="quantity" defaultValue={2} type="number" className="form-control form-control-sm" />
                        <button className="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                            <i className="fas fa-plus" />
                            </button>
                        </div> */}
                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h5 className="mb-0">{this.formatMoney(data.cart_Pay)}</h5>
                        </div>
                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                            <div className="flex-center">
                                <button type="button" class="btn btn-danger btn-sm"  onClick={() => this.showDeleteConfirmAlert(data)}><i className="fas fa-trash fa-lg" /></button>
                            </div>
                            <div>
                                <button type="button" class="btn btn-outline-success btn-sm"  onClick={() => this.validateOrderForm(data)}><i className="fas fa-check fa-lg" /></button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                            
            );
        }
        );
    }
    handleFormOrderFullnameChange = (value) => {
        this.setState({
            order_Fullname: value,
        });
    };
    handleFormOrderAddressChange = (value) => {
        this.setState({
            order_Address: value,
        });
    };
    handleFormOrderPhoneChange = (value) => {
        this.setState({
            order_Phone: value,
        });
    };
    validateOrderForm = (data) => {
        // validate text
        let errorOfOrderFullname = "";
        let order_Fullname = document.getElementById("inputOrderFullname").value;
        if (order_Fullname === "") {
            errorOfOrderFullname = errorOfOrderFullname + "Họ tên không được bỏ trống!\n";
        }
        var format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
        if (format.test(order_Fullname)) {
            errorOfOrderFullname += "Họ tên không được chứa ký tự đặc biệt";
        }
        let errorOfOrderAddress ="";
        let order_Address = document.getElementById("inputOrderAddress").value;
        if(order_Address===""){
            errorOfOrderAddress = errorOfOrderAddress + "Địa chỉ không được bỏ trống!\n";
        }
        // Thêm validate SĐT
        let errorOfOrderPhone = "";
        var numbersOnly = /^[0-9]+$/;
        let order_Phone = document.getElementById("inputOrderPhone").value;
        var firstPhoneNumber = /((09|03|07|08|05)+[0-9]\b)/g;
        if (order_Phone === "") {
            errorOfOrderPhone = errorOfOrderPhone + "Số điện thoại không được bỏ trống!\n";
        }
        if (!numbersOnly.test(order_Phone)) {
            errorOfOrderPhone += 'Số điện thoại chỉ chứa số!';
        }
        // if (firstPhoneNumber.test(order_Phone)) {
        //     errorOfOrderPhone += 'Số điện thoại không hợp lệ!';
        // }
        if (order_Phone.length > 11 || order_Phone.length < 10) {
            errorOfOrderPhone = "Số điện thoại không vượt quá 11 số và nhỏ hơn 10 số!\n";
        }
        if (errorOfOrderFullname || errorOfOrderAddress || errorOfOrderPhone) {
          Swal.fire(
            'Cảnh báo\n\n Dữ liệu không hợp lệ',
            '',
            'error'
          )
          document.getElementById("errorOfOrderFullname").innerHTML = typeof errorOfOrderFullname === "undefined" ? "" : errorOfOrderFullname;
          document.getElementById("errorOfOrderAddress").innerHTML = typeof errorOfOrderAddress === "undefined" ? "" : errorOfOrderAddress;
          document.getElementById("errorOfOrderPhone").innerHTML = typeof errorOfOrderPhone === "undefined" ? "" : errorOfOrderPhone;
        }
        else {
          this.postData(data);
        }
    };
    render() {
        const errorLabel = {
            color: "red",
            padding: "10px",
        }
        return(
            <div>
            {/* Basic */}
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            {/* Mobile Metas */}
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            {/* Site Metas */}
            <meta name="keywords" content />
            <meta name="description" content />
            <meta name="author" content />
            <link rel="shortcut icon" href="images/favicon.png" type="image/x-icon" />
            <title>Timups</title>
            {/* bootstrap core css */}
            <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
            {/*owl slider stylesheet */}
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" />
            {/* font awesome style */}
            <link href="css/font-awesome.min.css" rel="stylesheet" />
            {/* Custom styles for this template */}
            <link href="css/style.css" rel="stylesheet" />
            {/* responsive style */}
            <link href="css/responsive.css" rel="stylesheet" />
            <div className="hero_area">
            <div className="hero_social">
                <a href>
                <i className="fa fa-facebook" aria-hidden="true" />
                </a>
                <a href>
                <i className="fa fa-twitter" aria-hidden="true" />
                </a>
                <a href>
                <i className="fa fa-linkedin" aria-hidden="true" />
                </a>
                <a href>
                <i className="fa fa-instagram" aria-hidden="true" />
                </a>
            </div>
            {/* header section strats */}
            <header className="header_section">
                <div className="container-fluid">
                <nav className="navbar navbar-expand-lg custom_nav-container ">
                    <a className="navbar-brand" href="index.html">
                    <span>
                        Dac Hai
                    </span>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className> </span>
                    </button>
                    {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/Home" className="nav-link collapsed">
                                <span>Trang chủ</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/Watches" className="nav-link collapsed">
                                <span>Đồng hồ</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/Cart" className="nav-link collapsed">
                                <span>Giỏ hàng</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/ListOrder" className="nav-link collapsed">
                                <span>Đơn hàng</span>
                            </NavLink>
                        </li>
                    </ul>
                    {/* </div> */}
                    <ul className="d-flex align-items-center">
                        <li className="nav-item dropdown">
                            <NavLink to="/Cart" className="nav-link nav-icon">
                            <i className="bi bi-cart" />
                            {/* <span className="badge bg-success badge-number">3</span> */}
                            </NavLink>{/* End Messages Icon */}
                        </li>
                        <li className="nav-item dropdown pe-3">
                            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                            <img src="./img/profile-img.jpg" style={{width: '30px'}} alt="Profile" className="rounded-circle" />
                            <span className="d-none d-md-block dropdown-toggle ps-2">{this.props.userName}</span>
                            </a>{/* End Profile Iamge Icon */}
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                            <li className="dropdown-header">
                                <h6>{localStorage.getItem("FullName")}</h6>
                                <span>{localStorage.getItem("Role")}</span>
                            </li>
                            {/* <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                <i className="bi bi-person" />
                                <span>My Profile</span>
                                </a>
                            </li> */}
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <NavLink to="/AccountSetting" className="dropdown-item d-flex align-items-center">
                                    <i className="bi bi-gear" /><span>Sửa thông tin cá nhân?</span>
                                </NavLink>
                            </li>
                            {/* <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                <i className="bi bi-question-circle" />
                                <span>Need Help?</span>
                                </a>
                            </li> */}
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <a className="dropdown-item d-flex align-items-center" href="../Login.js" onClick={() => localStorage.removeItem("Token")}>
                                <i className="bi bi-box-arrow-right" />
                                <span>Đăng xuất?</span>
                                </a>
                            </li>
                            </ul>{/* End Profile Dropdown Items */}
                        </li>{/* End Profile Nav */}
                        </ul>
                </nav>
                </div>
            </header>
            {/* end header section */}
            {/* slider section */}
             <section className="slider_section ">
                <div className="container-fluid "> 
                    <div className="row">
                        <div className="col-md-6">
                            <div className="detail-box">
                                <h1>
                                    Thời gian là vàng là bạc
                                </h1>
                                <p>
                                    Đối với nhiều người, thời gian là thước đo của sự thành công, là thứ có thể cho chúng ta sự cân bằng và cho thành quả theo đúng cách chúng ta sử dụng và trân trọng nó.
                                </p>
                            </div> 
                        </div>
                        <div className="col-md-6">
                            <div className="img-box">
                            <img src="./img/slider-img.png" alt="" />
                            </div>
                        </div> 
                    </div>
                </div>
            </section>
            {/* end slider section */}
            
            </div>
            {/* shop section */}
            <section className="shop_section layout_padding">
                <div className="container">
                    <section className="h-100" >
                        <div className="container h-100 py-5" style={{width:'100%'}}>
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h3 className="fw-normal mb-0 text-black">Giỏ hàng</h3>
                                </div>
                                {this.renderCart()}
                            </div>
                        </div>  
                    </section>
                </div>
            {/* </section> */}
            {/* end shop section */}
            {/* about section */}
            {/* end about section */}
            {/* feature section */}
            {/* <section className="feature_section layout_padding"> */}
                <div className="container">
                    <section className="h-100" >
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="fw-normal mb-0 text-black">Nhập thông tin nhận hàng</h3>
                            </div>
                            <div className="card mb-4">
                                <div className="card-body p-4 d-flex flex-row">
                                <div className="form-outline flex-fill">
                                    <div className="row mb-3">
                                        <label htmlFor="inputOrderFullname" className="col-sm-2 col-form-label">Họ tên người nhận</label>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control" id="inputOrderFullname"
                                            onChange={(event) =>
                                                this.handleFormOrderFullnameChange(event.target.value)
                                            }
                                            />
                                            <label style={errorLabel} id="errorOfOrderFullname"></label>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="inputOrderAddress" className="col-sm-2 col-form-label">Địa chỉ</label>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control" id="inputOrderAddress"
                                            onChange={(event) =>
                                                this.handleFormOrderAddressChange(event.target.value)
                                            } />
                                            <label style={errorLabel} id="errorOfOrderAddress"></label>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="inputOrderPhone" className="col-sm-2 col-form-label">Số điện thoại</label>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control" id="inputOrderPhone"
                                            onChange={(event) =>
                                                this.handleFormOrderPhoneChange(event.target.value)
                                            } />
                                            <label style={errorLabel} id="errorOfOrderPhone"></label>
                                        </div>
                                    </div>
                                    {/* <div className="flex_right">
                                        <button className="ms-btn cancel_btn">
                                            <NavLink to="/Home">
                                                <span>Quay lại</span>
                                            </NavLink>
                                        </button>
                                        <button type="button" className="ms-btn ms-btn_icon" onClick={() => this.validateEmployeeEditForm()}><i className="far fa-save icon"/>Lưu</button>
                                    </div> */}
                                </div>
                            </div>
                            </div>
                        </div>
                    </section>
                </div>
            {/* </section> */}
            {/* end feature section */}
            {/* contact section */}
            {/* end contact section */}
            {/* client section */}
            {/* <section className="client_section layout_padding"> */}
            <div className="container">
                <div className="heading_container heading_center">
                </div>
                <div className="carousel-wrap ">
                <div className="owl-carousel client_owl-carousel">
                    <div className="item">
                    <div className="box">
                        <div className="img-box">
                        <img src="./img/c1.jpg" alt="" />
                        </div>
                        <div className="detail-box">
                        <div className="client_info">
                            <div className="client_name">
                            <h5>
                                Mark Thomas
                            </h5>
                            <h6>
                                Customer
                            </h6>
                            </div>
                            <i className="fa fa-quote-left" aria-hidden="true" />
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore
                            et
                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum
                            dolore eu fugia
                        </p>
                        </div>
                    </div>
                    </div>
                    <div className="item">
                    <div className="box">
                        <div className="img-box">
                        <img src="./img/c2.jpg" alt="" />
                        </div>
                        <div className="detail-box">
                        <div className="client_info">
                            <div className="client_name">
                            <h5>
                                Alina Hans
                            </h5>
                            <h6>
                                Customer
                            </h6>
                            </div>
                            <i className="fa fa-quote-left" aria-hidden="true" />
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore
                            et
                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum
                            dolore eu fugia
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
            {/* end client section */}
            <section className="feature_section layout_padding">
            <div className="container">
            <div className="heading_container">
                <h2>
                    Các Tính Năng Của Đồng Hồ Thông Minh
                </h2>
                </div>
                <div className="row">
                <div className="col-sm-6 col-lg-3">
                    <div className="box">
                    <div className="img-box">
                        <img src="./img/f1.png" alt="" />
                    </div>
                    <div className="detail-box">
                        <h5>
                        Fitness Tracking
                        </h5>
                        <p>
                        Giúp theo dõi sức khỏe hàng ngày
                        </p>
                        <a href>
                        <span>
                            Read More
                        </span>
                        <i className="fa fa-long-arrow-right" aria-hidden="true" />
                        </a>
                    </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                    <div className="box">
                    <div className="img-box">
                        <img src="./img/f2.png" alt="" />
                    </div>
                    <div className="detail-box">
                        <h5>
                        Alerts &amp; Notifications
                        </h5>
                        <p>
                        Đưa ra những thông báo, cảnh báo khi cần
                        </p>
                        <a href>
                        <span>
                            Read More
                        </span>
                        <i className="fa fa-long-arrow-right" aria-hidden="true" />
                        </a>
                    </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                    <div className="box">
                    <div className="img-box">
                        <img src="./img/f3.png" alt="" />
                    </div>
                    <div className="detail-box">
                        <h5>
                        Messages
                        </h5>
                        <p>
                        Nhắn tin mọi lúc mọi nơi khi kết nối Internet
                        </p>
                        <a href>
                        <span>
                            Read More
                        </span>
                        <i className="fa fa-long-arrow-right" aria-hidden="true" />
                        </a>
                    </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                    <div className="box">
                    <div className="img-box">
                        <img src="./img/f4.png" alt="" />
                    </div>
                    <div className="detail-box">
                        <h5>
                        Bluetooth
                        </h5>
                        <p>
                        Kết nối với các thiết bị khác qua Bluetooth
                        </p>
                        <a href>
                        <span>
                            Read More
                        </span>
                        <i className="fa fa-long-arrow-right" aria-hidden="true" />
                        </a>
                    </div>
                    </div>
                </div>
                </div>
                <div className="btn-box">
                <a href>
                    View More
                </a>
                </div>
            </div>
            </section>
            {/* footer section */}
            <footer className="footer_section">
            <div className="container">
                <div className="row">
                <div className="col-md-6 col-lg-3 footer-col">
                    <div className="footer_detail">
                    <h4>
                        About
                    </h4>
                    <p>
                        Cửa hàng đồng hồ Dac Hai luôn mang đến một trải nghiệm tốt cho người tiêu dùng. 
                        Hẹn gặp quý khách tại các chi nhánh cửa hàng trên toàn quốc.
                    </p>
                    <div>
                        <a href style={{paddingRight:'30px'}}>
                        <i className="fa fa-facebook" aria-hidden="true" />
                        </a>
                        <a href style={{paddingRight:'30px'}}>
                        <i className="fa fa-twitter" aria-hidden="true" />
                        </a>
                        <a href style={{paddingRight:'30px'}}>
                        <i className="fa fa-linkedin" aria-hidden="true" />
                        </a>
                        <a href>
                        <i className="fa fa-instagram" aria-hidden="true" />
                        </a>
                    </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 footer-col">
                    <div className="footer_contact">
                    <h4>
                        Reach at..
                    </h4>
                    <div className="contact_link_box">
                        <a href>
                        <i className="fa fa-map-marker" aria-hidden="true" />
                        <span>
                            Nguyên Xá, Minh Khai, Bắc Từ Liêm, Hà Nội
                        </span>
                        </a>
                        <a href>
                        <i className="fa fa-phone" aria-hidden="true" />
                        <span>
                            Call +84 868 728 112
                        </span>
                        </a>
                        <a href>
                        <i className="fa fa-envelope" aria-hidden="true" />
                        <span>
                            lehai250801@gmail.com
                        </span>
                        </a>
                    </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 footer-col">
                    <div className="footer_contact">
                    <h4>
                        Subscribe
                    </h4>
                    <form action="#">
                        <input type="text" placeholder="Enter email" />
                        <button type="submit">
                        Subscribe
                        </button>
                    </form>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 footer-col">
                    <div className="map_container">
                    <div className="map">
                        <div id="googleMap" />
                    </div>
                    </div>
                </div>
                </div>
                <div className="footer-info">
                <p>
                    © <span id="displayYear" /> Dac Hai Watch
                </p>
                </div>
            </div>
            </footer>
            {/* footer section */}
            {/* jQery */}
            {/* popper js */}
            {/* bootstrap js */}
            {/* owl slider */}
            {/* custom js */}
            {/* Google Map */}
            {/* End Google Map */}
            
        </div>
        )
    }
}
export default Cart
