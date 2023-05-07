import React, {Component} from 'react';
import Home from './Home';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

class AccountSetting extends Component {
    constructor() {
        super();
        this.state = {
            // showFormEmployee: false,
            // showListEmployee: true,
            // showFormEditEmployee: false,
            // for post, put
            peo_ID: '',
            peo_Fullname: '',
            peo_Dateofbirth: '',
            peo_Address: '',
            peo_Sex: '',
    
            defaultUrl: "https://localhost:5001/api/Employee"
        }
    }
    // getData(url){
    //     let config = this.getConfigToken();
    //     axios.get(url, config)
    //     .then((response) => {
    //         this.setState({
    //             peo_Fullname: response.data,
    //             peo_Address: response.data,
    //             peo_Dateofbirth: response.data,
    //             peo_Sex: response.data
    //         })
    //     });
    //     console.log({
    //         peo_ID: this.state.peo_ID,
    //         peo_Fullname: this.state.peo_Fullname,
    //         peo_Dateofbirth: this.state.peo_Dateofbirth,
    //         peo_Address: this.state.peo_Address,
    //         peo_Sex: this.state.peo_Sex
    //     })
    // }
    // componentDidMount = () => {
    //     var peo_ID = localStorage.getItem("Peo_ID");
    //     let url = this.state.defaultUrl+"/"+peo_ID;
    //     console.log(url)
    //     this.getData(url);
    // }
    handleFormPeoFullnameChange = (value) => {
        this.setState({
            peo_Fullname: value,
            peo_ID: localStorage.getItem("Peo_ID")
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
    getConfigToken() {
        let config = {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("Token"),
                "Content-type": "application/json"
            }
        };
        return config;
    }
    putData = () => {
        var url = this.state.defaultUrl;
        let config = this.getConfigToken();
        // console.log({
        //     peo_ID: this.state.peo_ID,
        //     peo_Fullname: this.state.peo_Fullname,
        //     peo_Dateofbirth: this.state.peo_Dateofbirth,
        //     peo_Address: this.state.peo_Address,
        //     peo_Sex: this.state.peo_Sex
        // })
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
                        'Đã sửa thông tin cá nhân!',
                        'Thay đổi đã xảy ra',
                        'success'
                    )
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
    };

    validateEmployeeEditForm = () => {
        // validate text
        let errorOfPeoFullname = "";
        let peo_Fullname = document.getElementById("inputPeoFullname").value;
        if (peo_Fullname === "") {
            errorOfPeoFullname = errorOfPeoFullname + "Họ tên không được bỏ trống!\n";
        }
        var format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
        if (format.test(peo_Fullname)) {
            errorOfPeoFullname += "Họ tên không được chứa ký tự đặc biệt";
        }
        let errorOfPeoAddress ="";
        let peo_Address = document.getElementById("inputPeoAddress").value;
        if(peo_Address===""){
            errorOfPeoAddress = errorOfPeoAddress + "Địa chỉ không được để trống!\n";
        }
        let errorOfPeoDateofbirth = "";
        let peo_Dateofbirth = document.getElementById("inputPeoDateofbirth").value;
        if (peo_Dateofbirth === "") {
            errorOfPeoDateofbirth = errorOfPeoDateofbirth + "Ngày sinh không được bỏ trống!\n";
        }
        let errorOfPeoSex = "";
        let peo_Sex = document.getElementById("inputPeoSex").value;
        if (peo_Sex === "") {
            errorOfPeoSex = errorOfPeoSex + "Giới tính không được bỏ trống!\n";
        }
        if (errorOfPeoFullname || errorOfPeoAddress || errorOfPeoDateofbirth || errorOfPeoSex) {
          Swal.fire(
            'Cảnh báo\n\n Dữ liệu không hợp lệ',
            '',
            'error'
          )
          document.getElementById("errorOfPeoFullname").innerHTML = typeof errorOfPeoFullname === "undefined" ? "" : errorOfPeoFullname;
          document.getElementById("errorOfPeoAddress").innerHTML = typeof errorOfPeoAddress === "undefined" ? "" : errorOfPeoAddress;
          document.getElementById("errorOfPeoDateofbirth").innerHTML = typeof errorOfPeoDateofbirth === "undefined" ? "" : errorOfPeoDateofbirth;
          document.getElementById("errorOfPeoSex").innerHTML = typeof errorOfPeoSex === "undefined" ? "" : errorOfPeoSex;
        }
        else {
          this.putData();
        }
    };
    render() {
        const errorLabel = {
            color: "red",
            padding: "10px",
        }
        return(
            <div>
                <Routes>
                    <Route path="/Home" element={<Home/>}></Route>
                </Routes>
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
                                    <i className="bi bi-gear" /><span>Account Settings</span>
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
                                <span>Sign Out</span>
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
            <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="fw-normal mb-0 text-black">Sửa thông tin cá nhân</h3>
                    </div>
                    <div className="card mb-4">
                        <div className="card-body p-4 d-flex flex-row">
                        <div className="form-outline flex-fill">
                            <div className="row mb-3">
                                <label htmlFor="inputPeoFullname" className="col-sm-2 col-form-label">Họ tên</label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" id="inputPeoFullname" value={this.peo_Fullname}
                                    onChange={(event) =>
                                        this.handleFormPeoFullnameChange(event.target.value)
                                    }
                                    />
                                    <label style={errorLabel} id="errorOfPeoFullname"></label>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputPeoDateofbirth" className="col-sm-2 col-form-label">Ngày sinh</label>
                                <div className="col-sm-6">
                                    <input type="date" className="form-control" id="inputPeoDateofbirth" value={this.peo_Dateofbirth}
                                    onChange={(event) =>
                                        this.handleFormPeoDateofbirthChange(event.target.value)
                                    } />
                                    <label style={errorLabel} id="errorOfPeoDateofbirth"></label>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputPeoAddress" className="col-sm-2 col-form-label">Địa chỉ</label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" id="inputPeoAddress" value={this.peo_Address}
                                    onChange={(event) =>
                                        this.handleFormPeoAddressChange(event.target.value)
                                    } />
                                    <label style={errorLabel} id="errorOfPeoAddress"></label>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputPeoSex" className="col-sm-2 col-form-label">Giới tính</label>
                                <div className="col-sm-6">
                                    <select className="form-control" id="inputPeoSex" value={this.peo_Sex}
                                    onChange={(event) => this.handleFormPeoSexChange(event.target.value)}>
                                        <option value={"Nam"}>Nam</option>
                                        <option value={"Nữ"}>Nữ</option>
                                    </select>
                                    <label style={errorLabel} id="errorOfPeoSex"></label>
                                </div>
                            </div>
                            <div className="flex_right">
                                <button className="ms-btn cancel_btn">
                                    <NavLink to="/Home">
                                        <span>Quay lại</span>
                                    </NavLink>
                                </button>
                                <button type="button" className="ms-btn ms-btn_icon" onClick={() => this.validateEmployeeEditForm()}><i className="far fa-save icon"/>Lưu</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
                </div>
                </section>
            {/* shop section */}
            {/* end shop section */}
            {/* about section */}
            {/* end about section */}
            {/* feature section */}
            {/* end feature section */}
            {/* contact section */}
            {/* end contact section */}
            {/* client section */}
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
            {/* end client section */}
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
export default AccountSetting;