import React, {Component} from "react";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
class ProductDetail extends Component {
    constructor() {
        super();
        this.state = {
            Product: [],
            Comment:[],
            peo_Fullname:'',
            co_Content:'',
            co_Date:'',
            pro_ID: '',
            pro_Name: '',
            pro_Image: '',
            pro_Price: '',
            pro_Describe:'',
            cate_Name:'',
            defaultUrl: "https://localhost:5001/api/V1/Product/GetProductByID?Pro_ID=",
            urlComment: "https://localhost:5001/api/V1/Comment/",
            urlPostCart: "https://localhost:5001/api/V1/Cart",
            urlPostComment: "https://localhost:5001/api/V1/Comment",
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
    getComment(url){
        let config = this.getConfigToken();
        axios.get(url, config)
        .then((response) => {
            this.setState({
                Comment: response.data
            })
        });
        // console.log({
        //     peo_Fullname: this.state.peo_Fullname,
        //     co_Content: this.state.co_Content,
        //     co_Date: this.state.co_Date
        // })
    }
    getData(url){
        let config = this.getConfigToken();
        axios.get(url, config)
        .then((response) => {
            this.setState({
                Product: response.data
            })
        });
    }
    componentDidMount = () => {
        let url = this.state.defaultUrl + localStorage.getItem("Pro_ID");
        this.getData(url);
        // console.log(url)
        let url1 = this.state.urlComment + localStorage.getItem("Pro_ID");
        this.getComment(url1);
        // console.log(url1)
        this.clearInsertText();
    }
    postData = () => {
        let config = this.getConfigToken();
        axios
            .post(this.state.urlPostCart, {
                pro_ID: localStorage.getItem("Pro_ID"),
                peo_ID: localStorage.getItem("Peo_ID")
            }, config)
            .then(response => {
                if (response.data) {
                    Swal.fire(
                        'Đã thêm vào giỏ hàng!',
                        'Thay đổi đã xảy ra',
                        'success'
                    )
                    this.componentDidMount();
                }
                else {
                    Swal.fire(
                        'Hàng trong kho đã hết!',
                        'Đã xảy ra một vấn đề nào đó',
                        'error'
                    )
                }
            })
            .catch(error => {
                Swal.fire(
                    'Hàng trong kho đã hết!',
                    'Vui lòng chọn sản phẩm khác!',
                    'error'
                )
            });
    };
    handleFormContentChange = (value) => {
        this.setState({
            co_Content: value,
        });
    };
    clearInsertText = () => {
        this.setState({
            co_Content: ""
        });
    };
    postComment = () => {
        let config = this.getConfigToken();
        axios
            .post(this.state.urlPostComment, {
                pro_ID: localStorage.getItem("Pro_ID"),
                peo_ID: localStorage.getItem("Peo_ID"),
                co_Content: this.state.co_Content
            }, config)
            .then(response => {
                if (response.data) {
                    this.componentDidMount();
                    // this.clearInsertText();
                }
            })
            .catch(error => {
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
    formatDate = dateSrc => {
        let date = new Date(dateSrc),
            year = date.getFullYear().toString(),
            month = (date.getMonth() + 1).toString().padStart(2, '0'),
            day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
    renderProductDetail = () => {
        return this.state.Product.map((data, index) => {
            return (
                <div>
                    <div className="container my-5">
                    <div className="row">
                        <div className="col-md-5">
                        <div className="main-img">
                            <img className="img-fluid" src={'../img/'+data.pro_Image} alt="ProductS" />
                        </div>
                        </div>
                        <div className="col-md-7">
                        <div className="main-description px-2">
                            <div className="category text-bold">
                            Hãng: {data.cate_Name}
                            </div>
                            <div className="product-title text-bold my-3">
                            Tên sản phẩm: {data.pro_Name}
                            </div>
                            <div className="price-area my-4">
                            <p className="new-price text-bold mb-1">Giá: {this.formatMoney(data.pro_Price)} đ</p>
                            {/* <p className="text-secondary mb-1">(Additional tax may apply on checkout)</p> */}
                            </div>
                            <div className="buttons d-flex my-5">
                            <div className="block">
                                <button className="shadow btn custom-btn" onClick={() => this.postData()}>Add to cart</button>
                            </div>
                            {/* <div className="block quantity">
                                <input type="number" className="form-control" id="cart_quantity" defaultValue={1} min={0} max={5} placeholder="Enter email" name="cart_quantity" />
                            </div> */}
                            </div>
                        </div>
                        <div className="product-details my-4">
                            <p className="details-title text-color mb-1">Mô tả</p>
                            <p className="description">{data.pro_Describe}</p>
                        </div>
                        <div className="product-details my-4">
                            <p className="details-title text-color mb-1">Kho: {data.pro_Number}</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            );
        }
        );
    }
    renderPostComment = () =>{
        return(
            <div class="d-flex flex-row add-comment-section mt-4 mb-4">
                <input type="text" class="form-control mr-3" placeholder="Add comment"
                onChange={(event) =>
                    this.handleFormContentChange(event.target.value)
                } />
                <button class="btn btn-primary" type="button" onClick={() => this.postComment()}>
                    Comment
                </button>
            </div>
        );
    }
    renderComment = () =>{
        return this.state.Comment.map((data, index) => {
            return (
                <div>
                    <div class="container mt-5 mb-5">
                    <div>
                        <i class="bi bi-person"> </i>
                        {data.peo_Fullname}: {data.co_Content}
                    </div>
                    <div>
                        Thời gian: {this.formatDate(data.co_Date)}
                    </div>
                </div>
                </div>
            );
        }
        );
    }
    render() {
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
                {this.renderProductDetail()}
                {this.renderPostComment()}
                {this.renderComment()}
            </div>
            </section>
            {/* end shop section */}
            {/* about section */}
            {/* end about section */}
            {/* feature section */}
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
            {/* end feature section */}
            {/* contact section */}
            {/* end contact section */}
            {/* client section */}
            <section className="client_section layout_padding">
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
export default ProductDetail
