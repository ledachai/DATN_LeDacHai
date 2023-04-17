import React, {Component} from 'react';
import Home from './Home';
import { NavLink } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

class AccountSetting extends Component {
    render() {
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
            {/* header section strats */}
            <header className="header_section">
                <div className="container-fluid">
                <nav className="navbar navbar-expand-lg custom_nav-container ">
                    <a className="navbar-brand" href="index.html">
                    <span>
                        Timups
                    </span>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className> </span>
                    </button>
                    {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                        <a className="nav-link" href="index.html">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="watches.html"> Watches </a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="about.html"> About </a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="contact.html">Contact Us</a>
                        </li>
                    </ul>
                    {/* </div> */}
                    <ul className="d-flex align-items-center">
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
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                <i className="bi bi-person" />
                                <span>My Profile</span>
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                <i className="bi bi-gear" />
                                <span>Account Settings</span>
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                <i className="bi bi-question-circle" />
                                <span>Need Help?</span>
                                </a>
                            </li>
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
            {/* end slider section */}
            </div>
            <div className="card">
                <div className="card-body">
                <h5 className="card-title">Sửa thông tin cá nhân</h5>
                {/* Horizontal Form */}
                <form>
                    <div className="row mb-3">
                    <label htmlFor="inputProName" className="col-sm-2 col-form-label">Tên sản phẩm</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="inputProName" value={this.props.pro_Name}
                        onChange={(event) =>
                            this.props.handleFormProNameChange(event.target.value)
                        }
                        />
                        {/* <label style={errorLabel} id="errorOfProName"></label> */}
                    </div>
                    </div>
                    <div className="row mb-3">
                    <label htmlFor="inputProPrice" className="col-sm-2 col-form-label">Giá sản phẩm</label>
                    <div className="col-sm-6">
                        <input type="number" className="form-control" id="inputProPrice" value={this.props.pro_Price}
                        onChange={(event) =>
                            this.props.handleFormProPriceChange(event.target.value)
                        }
                        />
                        {/* <label style={errorLabel} id="errorOfProPrice"></label> */}
                    </div>
                    </div>
                    <div className="row mb-3">
                    <label htmlFor="inputProImage" className="col-sm-2 col-form-label">Hình ảnh</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="inputProName" value={this.props.pro_Image}
                        onChange={(event) =>
                            this.props.handleFormProImageChange(event.target.value)
                        }
                        />
                    </div>
                    </div>
                    <div className="row mb-3">
                    <label htmlFor="inputProNumber" className="col-sm-2 col-form-label">Số lượng</label>
                    <div className="col-sm-6">
                        <input type="number" className="form-control" id="inputProNumber" value={this.props.pro_Number}
                        onChange={(event) =>
                            this.props.handleFormProNumberChange(event.target.value)
                        }
                        />
                        {/* <label style={errorLabel} id="errorOfProName"></label> */}
                    </div>
                    </div>
                    <div className="row mb-3">
                    <label htmlFor="inputProDescribe" className="col-sm-2 col-form-label">Mô tả</label>
                    <div className="col-sm-6">
                        <textarea type="text" className="form-control" id="inputProDescribe" value={this.props.pro_Describe}
                        onChange={(event) =>
                            this.props.handleFormProDescribeChange(event.target.value)
                        }
                        />
                        {/* <label style={errorLabel} id="errorOfProDescribe"></label> */}
                    </div>
                    </div>
                    <div className="flex_right">
                    {/* <button className="ms-btn cancel_btn"  onClick={() => this.props.openFormAccountSetting()} >Hủy</button> */}
                    <NavLink to="/Home" className="ms-btn cancel_btn">
                        <span>Hủy</span>
                    </NavLink>
                    <button type="button" className="ms-btn ms-btn_icon" onClick={() => this.validateProductUpdateForm()}><i className="far fa-save icon"/>Lưu</button>
                    </div>
                </form>
                </div>
            </div>
            {/* shop section */}
            {/* end shop section */}
            {/* about section */}
            <section className="about_section layout_padding">
            <div className="container  ">
                <div className="row">
                <div className="col-md-6 col-lg-5 ">
                    <div className="img-box">
                    <img src="./img/about-img.png" alt="" />
                    </div>
                </div>
                <div className="col-md-6 col-lg-7">
                    <div className="detail-box">
                    <div className="heading_container">
                        <h2>
                        About Us
                        </h2>
                    </div>
                    <p>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
                        in some form, by injected humour, or randomised words which don't look even slightly believable. If you
                        are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in
                        the middle of text. All
                    </p>
                    <a href>
                        Read More
                    </a>
                    </div>
                </div>
                </div>
            </div>
            </section>
            {/* end about section */}
            {/* feature section */}
            <section className="feature_section layout_padding">
            <div className="container">
                <div className="heading_container">
                <h2>
                    Features Of Our Watches
                </h2>
                <p>
                    Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
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
            <section className="contact_section">
            <div className="container">
                <div className="row">
                <div className="col-md-6">
                    <div className="form_container">
                    <div className="heading_container">
                        <h2>
                        Contact Us
                        </h2>
                    </div>
                    <form action>
                        <div>
                        <input type="text" placeholder="Full Name " />
                        </div>
                        <div>
                        <input type="email" placeholder="Email" />
                        </div>
                        <div>
                        <input type="text" placeholder="Phone number" />
                        </div>
                        <div>
                        <input type="text" className="message-box" placeholder="Message" />
                        </div>
                        <div className="d-flex ">
                        <button>
                            SEND
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="img-box">
                    <img src="./img/contact-img.jpg" alt="" />
                    </div>
                </div>
                </div>
            </div>
            </section>
            {/* end contact section */}
            {/* client section */}
            <section className="client_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                <h2>
                    Testimonial
                </h2>
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
                        Necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with
                    </p>
                    <div className="footer_social">
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
                            Location
                        </span>
                        </a>
                        <a href>
                        <i className="fa fa-phone" aria-hidden="true" />
                        <span>
                            Call +01 1234567890
                        </span>
                        </a>
                        <a href>
                        <i className="fa fa-envelope" aria-hidden="true" />
                        <span>
                            demo@gmail.com
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
                    © <span id="displayYear" /> All Rights Reserved By
                    <a href="https://html.design/">Free Html Templates</a>
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