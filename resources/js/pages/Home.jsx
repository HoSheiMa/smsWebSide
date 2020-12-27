import React, { Component } from "react";
import { Link } from "react-router-dom";
import { eraseCookie, getCookie, setCookie } from "./../../functions/Cookeis";
import { translate } from "./../json/translate";
export default class Home extends Component {
    state = {
        footer: null
    };
    footer = () => {
        fetch("/Home/FooterData", {
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content")
            },
            method: "post"
        }).then(async d => {
            d = await d.json();
            this.setState({ footer: d });
        });
    };
    componentWillMount() {
        this.footer();
        console.log(Object.keys(translate));
        var lang = getCookie("lang");
        if (!lang) {
            setCookie("lang", "fr", 7);
        }
        this.state.lang = getCookie("lang");
    }

    constructor(props) {
        super(props);
        this.state = {
            lang: null
        };
    }

    ChangeLang = lang => {
        setCookie("lang", lang, 7);
        window.location.reload();
    };
    render() {
        return (
            <div>
                <div
                    class="dropdown d-block d-sm-none"
                    style={{
                        position: "absolute",
                        right: "25%",
                        top: "2.7%",
                        zIndex: 9999
                    }}
                >
                    <button
                        class="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenu2"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        {this.state.lang}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                        {" "}
                        {Object.keys(translate).map(d => {
                            return (
                                <a
                                    class="dropdown-item"
                                    href="#"
                                    onClick={() => {
                                        this.ChangeLang(`${d}`);
                                    }}
                                >
                                    {d}
                                </a>
                            );
                        })}
                    </div>
                </div>

                <nav
                    class="navbar navbar-expand-lg navbar-light fixed-top py-3"
                    id="mainNav"
                >
                    <div class="container">
                        <a
                            class="navbar-brand js-scroll-trigger"
                            href="#page-top"
                        >
                            {this.state.footer
                                ? this.state.footer["Webtitle"]
                                : null}
                        </a>
                        <button
                            class="navbar-toggler navbar-toggler-right"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarResponsive"
                            aria-controls="navbarResponsive"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div
                            class="collapse navbar-collapse"
                            id="navbarResponsive"
                        >
                            <ul class="navbar-nav ml-auto my-2 my-lg-0">
                                <li class="nav-item">
                                    <a
                                        class="nav-link js-scroll-trigger"
                                        href="#about"
                                    >
                                        {translate[this.state.lang].About}
                                    </a>
                                </li>

                                <li class="nav-item">
                                    <a
                                        class="nav-link js-scroll-trigger"
                                        href="#contact"
                                    >
                                        {translate[this.state.lang].Contect}
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <Link
                                        to="login"
                                        class="nav-link js-scroll-trigger"
                                    >
                                        {translate[this.state.lang].Login}
                                    </Link>
                                </li>
                                <li
                                    class="nav-item"
                                    style={{
                                        marginBottom: 10
                                    }}
                                >
                                    <Link
                                        to="Register"
                                        class="nav-link js-scroll-trigger"
                                    >
                                        {translate[this.state.lang].Register}
                                    </Link>
                                </li>
                                <li
                                    class="nav-item d-none d-sm-block "
                                    style={{
                                        marginTop: -10
                                    }}
                                >
                                    <div class="dropdown">
                                        <button
                                            class="btn btn-secondary dropdown-toggle"
                                            type="button"
                                            id="dropdownMenu2"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            {this.state.lang}
                                        </button>
                                        <div
                                            class="dropdown-menu"
                                            aria-labelledby="dropdownMenu2"
                                        >
                                            {" "}
                                            {Object.keys(translate).map(d => {
                                                return (
                                                    <a
                                                        class="dropdown-item"
                                                        href="#"
                                                        onClick={() => {
                                                            this.ChangeLang(
                                                                `${d}`
                                                            );
                                                        }}
                                                    >
                                                        {d}
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <header class="masthead">
                    <div class="container h-100">
                        <div class="row h-100 align-items-center justify-content-center text-center">
                            <div class="col-lg-10 align-self-end">
                                <h1 class="text-uppercase text-white font-weight-bold">
                                    {
                                        translate[this.state.lang]
                                            .HomePageTopTitle
                                    }
                                </h1>
                                <hr
                                    style={{
                                        background: "#3949ab !important"
                                    }}
                                    class="divider my-4"
                                />
                            </div>
                            <div class="col-lg-8 align-self-baseline">
                                <p class="text-white-75 font-weight-light mb-5">
                                    {
                                        translate[this.state.lang]
                                            .HomePageTopMiniTitle
                                    }
                                </p>
                                <a
                                    class="btn btn-primary btn-xl js-scroll-trigger"
                                    href="#about"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(90deg, #3949ab 0%, #4fc3f7 100%)"
                                    }}
                                >
                                    {translate[this.state.lang].FindOutMore}
                                </a>
                            </div>
                        </div>
                    </div>
                </header>
                <section class="page-section bg-primary" id="about">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8 text-center">
                                <h2 class="text-white mt-0">
                                    {
                                        translate[this.state.lang]
                                            .Wevegotwhatyouneed
                                    }
                                </h2>
                                <hr class="divider light my-4" />
                                <p class="text-white-50 mb-4">
                                    {
                                        translate[this.state.lang]
                                            .WevegotwhatyouneedD
                                    }
                                </p>
                                <a
                                    class="btn btn-light btn-xl js-scroll-trigger"
                                    href="#services"
                                >
                                    {translate[this.state.lang].StartNow}
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="page-section" id="services">
                    <div class="container">
                        <h2 class="text-center mt-0">
                            {translate[this.state.lang].AtYourService}
                        </h2>
                        <hr class="divider my-4" />
                        <div class="row">
                            <div class="col-lg-3 col-md-6 text-center">
                                <div class="mt-5">
                                    <i class="fas fa-4x fa-gem text-primary mb-4"></i>
                                    <h3 class="h4 mb-2">
                                        {
                                            translate[this.state.lang]
                                                .SturdySystem
                                        }
                                    </h3>
                                    <p class="text-muted mb-0">
                                        {
                                            translate[this.state.lang]
                                                .SturdySystemD
                                        }
                                    </p>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 text-center">
                                <div class="mt-5">
                                    <i class="fas fa-4x fa-laptop-code text-primary mb-4"></i>
                                    <h3 class="h4 mb-2">
                                        {translate[this.state.lang].UpToDate}
                                    </h3>
                                    <p class="text-muted mb-0">
                                        {translate[this.state.lang].Dep}
                                    </p>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 text-center">
                                <div class="mt-5">
                                    <i class="fas fa-4x fa-globe text-primary mb-4"></i>
                                    <h3 class="h4 mb-2">
                                        {" "}
                                        {translate[this.state.lang].Red}
                                    </h3>
                                    <p class="text-muted mb-0">
                                        {translate[this.state.lang].RedD}
                                    </p>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 text-center">
                                <div class="mt-5">
                                    <i class="fas fa-4x fa-heart text-primary mb-4"></i>
                                    <h3 class="h4 mb-2">
                                        {translate[this.state.lang].Love}
                                    </h3>
                                    <p class="text-muted mb-0">
                                        {translate[this.state.lang].LoveD}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="page-section RImage text-white">
                    <div class="container text-center">
                        <h2 class="mb-4">{translate[this.state.lang].S}</h2>
                        <a
                            class="btn btn-light btn-xl"
                            href="https://startbootstrap.com/themes/creative/"
                        >
                            {translate[this.state.lang].StartNow}
                        </a>
                    </div>
                </section>
                <section class="page-section" id="contact">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8 text-center">
                                <h2 class="mt-0">
                                    {translate[this.state.lang].C}
                                </h2>
                                <hr class="divider my-4" />
                                <p class="text-muted mb-5">
                                    {translate[this.state.lang].CD}
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-4 ml-auto text-center mb-5 mb-lg-0">
                                <i class="fas fa-phone fa-3x mb-3 text-muted"></i>
                                <div>+1 (555) 123-4567</div>
                            </div>
                            <div class="col-lg-4 mr-auto text-center">
                                <i class="fas fa-envelope fa-3x mb-3 text-muted"></i>
                                <a
                                    class="d-block"
                                    href="mailto:contact@yourwebsite.com"
                                >
                                    contact@yourwebsite.com
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Footer */}
                {this.state.footer ? (
                    <footer
                        className="page-footer font-small "
                        style={{ backgroundColor: "#000" }}
                    >
                        <div style={{ backgroundColor: "#6351ce" }}>
                            <div className="container">
                                {/* Grid row*/}
                                <div className="row py-4 d-flex align-items-center">
                                    {/* Grid column */}
                                    <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                                        <h6 className="mb-0">
                                            {this.state.footer["Webtitle"]}
                                        </h6>
                                    </div>
                                    {/* Grid column */}
                                    {/* Grid column */}
                                    <div className="col-md-6 col-lg-7 text-center text-md-right">
                                        {/* Facebook */}

                                        <a
                                            href={this.state.footer["fb"]}
                                            className="fb-ic"
                                        >
                                            <i className="fab fa-facebook-f white-text mr-4">
                                                {" "}
                                            </i>
                                        </a>
                                        {/* Twitter */}
                                        <a
                                            href={this.state.footer["tw"]}
                                            className="tw-ic"
                                        >
                                            <i className="fab fa-twitter white-text mr-4">
                                                {" "}
                                            </i>
                                        </a>
                                        {/* Google +*/}
                                        <a
                                            href={this.state.footer["gplus"]}
                                            className="gplus-ic"
                                        >
                                            <i className="fab fa-google-plus-g white-text mr-4">
                                                {" "}
                                            </i>
                                        </a>
                                        {/*Linkedin */}
                                        <a
                                            href={this.state.footer["lin"]}
                                            className="li-ic"
                                        >
                                            <i className="fab fa-linkedin-in white-text mr-4">
                                                {" "}
                                            </i>
                                        </a>
                                        {/*Instagram*/}
                                        <a
                                            href={this.state.footer["ins"]}
                                            className="ins-ic"
                                        >
                                            <i className="fab fa-instagram white-text">
                                                {" "}
                                            </i>
                                        </a>
                                    </div>
                                    {/* Grid column */}
                                </div>
                                {/* Grid row*/}
                            </div>
                        </div>
                        {/* Footer Links */}
                        <div className="container text-center text-md-left mt-5">
                            {/* Grid row */}
                            <div className="row mt-3">
                                {/* Grid column */}
                                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                    {/* Content */}
                                    <h6 className="text-uppercase font-weight-bold">
                                        {this.state.footer["Webtitle"]}
                                    </h6>
                                    <hr
                                        className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                                        style={{ width: "60px" }}
                                    />
                                    <p>{this.state.footer["desc"]}</p>
                                </div>
                                {/* Grid column */}
                                {/* Grid column */}
                                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                    <hr
                                        className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                                        style={{ width: "60px" }}
                                    />
                                    {this.state.footer["side1"].map(d => {
                                        return (
                                            <p>
                                                <a href={d[1]}>{d[0]}</a>
                                            </p>
                                        );
                                    })}
                                </div>
                                {/* Grid column */}
                                {/* Grid column */}
                                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                    {/* Links */}

                                    <hr
                                        className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                                        style={{ width: "60px" }}
                                    />
                                    {this.state.footer["side2"].map(d => {
                                        return (
                                            <p>
                                                <a href={d[1]}>{d[0]}</a>
                                            </p>
                                        );
                                    })}
                                </div>
                                {/* Grid column */}
                                {/* Grid column */}
                                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                    {/* Links */}
                                    <h6 className="text-uppercase font-weight-bold">
                                        Contact
                                    </h6>
                                    <hr
                                        className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                                        style={{ width: "60px" }}
                                    />
                                    <p>
                                        <i className="fas fa-home mr-3" />{" "}
                                        {this.state.footer["address"]}
                                    </p>
                                    <p>
                                        <i className="fas fa-envelope mr-3" />{" "}
                                        {this.state.footer["email"]}
                                    </p>
                                    <p>
                                        <i className="fas fa-phone mr-3" />{" "}
                                        {this.state.footer["phone"]}
                                    </p>
                                    <p>
                                        <i className="fas fa-print mr-3" />{" "}
                                        {this.state.footer["fax"]}
                                    </p>
                                </div>
                                {/* Grid column */}
                            </div>
                            {/* Grid row */}
                        </div>
                        {/* Footer Links */}
                        {/* Copyright */}
                        <div className="footer-copyright text-center py-3">
                            © 2020 Copyright
                        </div>
                        {/* Copyright */}
                    </footer>
                ) : (
                    <div></div>
                )}
                {/* Footer */}
            </div>
        );
    }
}
