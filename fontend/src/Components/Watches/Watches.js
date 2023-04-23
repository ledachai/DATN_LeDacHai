import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

class Watches extends Component {
    constructor() {
        super();
        this.state = {
            Product:[],
            pro_ID: '',
            pro_Name: '',
            pro_Image: '',
            pro_Price: '',
            pro_Describe:'',
            defaultUrl: "https://localhost:5001/api/V1/Product?PageIndex=1&RowPerPage=100&Search="
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
                Product: response.data
            })
        });
        // console.log({
        //     pro_ID: this.state.pro_ID,
        //     pro_Name: this.state.pro_Name,
        //     pro_Image: this.state.pro_Image,
        //     pro_Describe: this.state.pro_Describe,
        //     pro_Price: this.state.pro_Price,
        //     defaultUrl: this.state.defaultUrl
        // })
    }
    formatMoney = moneyinput => {
        let money = Math.round(moneyinput);
        if(money && !isNaN(money)){
            return money.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
        }else{
            return money;
        }
      }
    componentDidMount = (url = this.state.defaultUrl) => {
        this.getData(url);
    }
    renderProduct = () => {
        return this.state.Product.map((data, index) => {
            return (
                <div className="col-sm-6 col-xl-3">
                <div className="box">
                <a href key={data.pro_ID}>
                    <div className="img-box">
                    <img src={'../img/'+data.pro_Image} alt="" />
                    </div>
                    <div className="detail-box">
                    <h6>
                        {data.pro_Name}
                    </h6>
                    <h6>
                        Price(đ):
                        <span>
                        {this.formatMoney(data.pro_Price)}
                        </span>
                    </h6>
                    </div>
                    <div className="new">
                    <span>
                        New
                    </span>
                    </div>
                </a>
                </div>
            </div>
            );
            // }
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
                        <li className="nav-item">
                            <NavLink to="/Home" className="nav-link collapsed">
                                <span>Home</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/Watches" className="nav-link collapsed">
                                <span>Watches</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="about.html"> About </a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="contact.html">Me</a>
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
                                <NavLink to="/AccountSetting" className="dropdown-item d-flex align-items-center">
                                    <i className="bi bi-gear" /><span>Account Settings</span>
                                </NavLink>
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
            <section className="slider_section ">
                <div id="customCarousel1" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <div className="container-fluid ">
                        <div className="row">
                        <div className="col-md-6">
                            <div className="detail-box">
                            <h1>
                                Smart Watches
                            </h1>
                            <p>
                                Aenean scelerisque felis ut orci condimentum laoreet. Integer nisi nisl, convallis et augue sit amet, lobortis semper quam.
                            </p>
                            <div className="btn-box">
                                <a href className="btn1">
                                Contact Us
                                </a>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="img-box">
                            <img src="./img/slider-img.png" alt="" />
                            {/* <img src="./img/hinh1.jpg" alt="" /> */}
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="carousel-item ">
                    <div className="container-fluid ">
                        <div className="row">
                        <div className="col-md-6">
                            <div className="detail-box">
                            <h1>
                                Smart Watches
                            </h1>
                            <p>
                                Aenean scelerisque felis ut orci condimentum laoreet. Integer nisi nisl, convallis et augue sit amet, lobortis semper quam.
                            </p>
                            <div className="btn-box">
                                <a href className="btn1">
                                Contact Us
                                </a>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="img-box">
                            <img src="./img/slider-img.png" alt="" />
                            {/* <img src="./img/hinh39.jpg" alt="" /> */}
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="carousel-item ">
                    <div className="container-fluid ">
                        <div className="row">
                        <div className="col-md-6">
                            <div className="detail-box">
                            <h1>
                                Smart Watches
                            </h1>
                            <p>
                                Aenean scelerisque felis ut orci condimentum laoreet. Integer nisi nisl, convallis et augue sit amet, lobortis semper quam.
                            </p>
                            <div className="btn-box">
                                <a href className="btn1">
                                Contact Us
                                </a>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="img-box">
                            <img src="./img/slider-img.png" alt="" />
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <ol className="carousel-indicators">
                    <li data-target="#customCarousel1" data-slide-to={0} className="active" />
                    <li data-target="#customCarousel1" data-slide-to={1} />
                    <li data-target="#customCarousel1" data-slide-to={2} />
                </ol>
                </div>
            </section>
            {/* end slider section */}
            </div>
            {/* shop section */}
            <section className="shop_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                <h2>
                    Latest Watches
                </h2>
                </div>
                <div className="row">
                    {this.renderProduct()}
                </div>
                <div className="btn-box">
                <a href>
                    View All
                </a>
                </div>
            </div>
            </section>
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
export default Watches;