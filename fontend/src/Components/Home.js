import React, {Component} from 'react';
import MainPageNav from './MainPageNav';
import { NavLink } from 'react-router-dom';

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            showFormAccountSetting: false,
            showHomePage: true
        }
    }
    // openFormAccountSetting = () => {
    //     this.setState({
    //         showFormAccountSetting: !this.state.showFormAccountSetting,
    //         showHomePage: !this.state.showHomePage,
    //     })
    // }
    render() {
        // if(this.state.showHomePage===false) return null;
        return(
            // <div>
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
            <title></title>
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
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <NavLink to="/AccountSetting" className="dropdown-item d-flex align-items-center">
                                    <i className="bi bi-gear" /><span>Sửa thông tin cá nhân?</span>
                                </NavLink>
                            </li>
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
                <div className="heading_container heading_center">
                <h2>
                    Đồng hồ thông minh
                </h2>
                </div>
                <div className="row">
                <div className="col-md-6 ">
                    <div className="box">
                    <a href>
                        <div className="img-box">
                        <img src="./img/w1.png" alt="" />
                        </div>
                        <div className="detail-box">
                        <h6>
                            Smartwatch
                        </h6>
                        <h6>
                            Price:
                            <span>
                            $300
                            </span>
                        </h6>
                        </div>
                        <div className="new">
                        <span>
                            Featured
                        </span>
                        </div>
                    </a>
                    </div>
                </div>
                <div className="col-sm-6 col-xl-3">
                    <div className="box">
                    <a href>
                        <div className="img-box">
                        <img src="./img/w2.png" alt="" />
                        </div>
                        <div className="detail-box">
                        <h6>
                            Smartwatch
                        </h6>
                        <h6>
                            Price:
                            <span>
                            $125
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
                <div className="col-sm-6 col-xl-3">
                    <div className="box">
                    <a href>
                        <div className="img-box">
                        <img src="./img/w3.png" alt="" />
                        </div>
                        <div className="detail-box">
                        <h6>
                            Smartwatch
                        </h6>
                        <h6>
                            Price:
                            <span>
                            $110
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
                <div className="col-sm-6 col-xl-3">
                    <div className="box">
                    <a href>
                        <div className="img-box">
                        <img src="./img/w4.png" alt="" />
                        </div>
                        <div className="detail-box">
                        <h6>
                            Smartwatch
                        </h6>
                        <h6>
                            Price:
                            <span>
                            $145
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
                <div className="col-sm-6 col-xl-3">
                    <div className="box">
                    <a href>
                        <div className="img-box">
                        <img src="./img/w5.png" alt="" />
                        </div>
                        <div className="detail-box">
                        <h6>
                            Smartwatch
                        </h6>
                        <h6>
                            Price:
                            <span>
                            $195
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
                <div className="col-sm-6  col-xl-3">
                    <div className="box">
                    <a href>
                        <div className="img-box">
                        <img src="./img/w6.png" alt="" />
                        </div>
                        <div className="detail-box">
                        <h6>
                            Smartwatch
                        </h6>
                        <h6>
                            Price:
                            <span>
                            $170
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
                <div className="col-sm-6 col-xl-3">
                    <div className="box">
                    <a href>
                        <div className="img-box">
                        <img src="./img/w1.png" alt="" />
                        </div>
                        <div className="detail-box">
                        <h6>
                            Smartwatch
                        </h6>
                        <h6>
                            Price:
                            <span>
                            $230
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
                </div>
                {/* <div className="btn-box">
                <a href>
                    View All
                </a>
                </div> */}
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
                        Về chúng tôi
                        </h2>
                    </div>
                    <p>
                        Cửa hàng đồng hồ Đắc Hải với phương châm Uy tín tạo thương hiệu. Khách hàng đến với cửa hàng sẽ có được trải nghiệm rất tốt.
                        Các sản phẩm với giá tiền rât phù hợp cho mọi lứa tuổi, mọi tầng lớp khách hàng. Bên cạnh đó, khách hàng sẽ có được sự phục vụ rất 
                        nhiệt tình từ các nhân viên của cửa hàng. Cửa hàng Đắc Hải luôn mang cho khách hàng sự hài lòng.
                    </p>
                    <a href>
                        Trải nghiệm
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
            {/* <AccountSetting
                showFormAccountSetting={this.state.showFormAccountSetting}
                openFormAccountSetting={this.openFormAccountSetting}
            /> */}
            {/* </div> */}
            {/* <main id="main" classname="main">
                <MainPageNav/>
            </main> */}
        </div>
        )
    }
}
export default Home;